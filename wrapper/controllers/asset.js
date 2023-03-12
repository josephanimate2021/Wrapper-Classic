const Asset = require("../models/asset");
const database = require("../../data/database"), DB = new database();
const ffmpeg = require("fluent-ffmpeg");
const { fromFile } = require("file-type");
const { extensions, mimeTypes } = require("file-type/supported");
const fs = require("fs");
const httpz = require("@octanuary/httpz")
const path = require("path");
const tempfile = require("tempfile");
const rFileUtil = require("../../utils/realFileUtil");
const fUtil = require("../../utils/fileUtil");
const fileTypes = require("../data/fileTypes.json");
const nodezip = require("node-zip");
const header = process.env.XML_HEADER;
const thumbUrl = process.env.THUMB_BASE_URL;
const group = new httpz.Group();
const base = Buffer.alloc(1, 0);
const https = require("https");
function get(url, options = {}) {
	var data = [];
	return new Promise((res, rej) => {
		https.get(url, options, (o) => {
			o.on("data", (v) => data.push(v)).on("end", () => res(Buffer.concat(data))).on("error", rej)
		});
	});
};
ffmpeg.setFfmpegPath(require("@ffmpeg-installer/ffmpeg").path);
ffmpeg.setFfprobePath(require("@ffprobe-installer/ffprobe").path);

function listAssets(filters) {
	const files = DB.select("assets", filters);
	return `${header}<ugc more="0">${
		files.map(Asset.meta2Xml).join("")}</ugc>`;
}

/*
delete
*/
group.route("POST", "/goapi/deleteAsset/", (req, res) => {
	const id = req.body.assetId;
	res.assert(id, 400, { status: "error" });

	if (!DB.delete("assets", id)) {
		res.end('1');
	} else {
		res.statusCode = 404;
		res.end("404 Not Found");
	}
})

/*
list
*/
.route("GET", "/api/assets/list", (req, res) => {
	res.json(DB.select("assets"));
}).route("POST", "/goapi/getCommunityAssets/", async (req, res) => {
	const handleError = (err) => {
		console.log("Error fetching asset info:", err);
		res.statusCode = 500;
		res.end("1");
	};
	if (req.body.type == "char") {
		console.log(req.body);
		const json = JSON.parse(await get(`https://goanimate-wrapper.joseph-animate.repl.co/ajax/getCommunityAssetData/?type=char&themeId=anime&movieId=m-7`));
		const tXml = `<theme id="Comm" name="Community Library">${
			json.map(Asset.meta2StoreXml).join("")
		}</theme>`;
		console.log(tXml);
		const zip = nodezip.create();
		const zip2 = nodezip.create();
		fUtil.addToZip(zip, "desc.xml", Buffer.from(tXml));
		for (const meta of json) {
			const buffer = await get(`https://goanimate-wrapper.joseph-animate.repl.co/characters/${meta.id}.xml`);
			const buff = await get(`https://goanimate-wrapper.joseph-animate.repl.co/char_thumbs/${meta.id}.png`)
			///fUtil.addToZip(zip, `char/${meta.id}.xml`, buffer);
			fUtil.addToZip(zip, `char/${meta.id}/${meta.id}.png`, buff);
		}
		res.setHeader("Content-Type", "application/zip");
		res.end(Buffer.concat[base, await zip.zip()]);
	} else https.request({ // gets asset data from GR to work with the community library
		hostname: "goanimate-remastered.joseph-animate.repl.co",
		path: `/ajax/getCommunityAssetData/?type=${req.body.type}`,
		method: "POST",
		headers: {
			"User-Agent": req.headers['user-agent']
		}
	}, (res2) => {
		let buffers = [];
		res2.on("data", (c) => buffers.push(c)).on("end", async () => {
			const meta = JSON.parse(Buffer.concat(buffers));
			const tXml = `<theme id="Comm" name="Community Library">${
				meta.map(Asset.meta2StoreXml).join("")
			}</theme>`
			const zip = nodezip.create();
			fUtil.addToZip(zip, "desc.xml", Buffer.from(tXml));
			for (const file of meta) {
				const buffer = await get(`https://goanimate-remastered.joseph-animate.repl.co/assets/${file.mId}/${file.id}`);
				fUtil.addToZip(zip, `${file.mode}/${file.id}`, buffer);
			}
			res.setHeader("Content-Type", "application/zip");
			res.end(Buffer.concat([base, await zip.zip()]));
		}).on("error", handleError);
	}).on("error", handleError).end();
}).route("POST", "/goapi/searchCommunityAssets/", async (req, res) => {
	const handleError = (err) => {
		console.log("Error fetching asset info:", err);
		res.statusCode = 500;
		res.end("1");
	};
	https.request({ // gets asset data from GR to work with the community library
		hostname: "goanimate-remastered.joseph-animate.repl.co",
		path: `/ajax/getAllCommunityAssetData/`,
		method: "POST",
		headers: {
			"User-Agent": req.headers['user-agent']
		}
	}, (res2) => {
		let buffers = [];
		res2.on("data", (c) => buffers.push(c)).on("end", async () => {
			const meta = JSON.parse(Buffer.concat(buffers));
			var tXml = `<theme id="Comm" name="Community Library">`
			for (const v of meta) {
				if (v.title.startsWith(req.body.keywords)) tXml += Asset.meta2StoreXml(v);
			}
			const zip = nodezip.create();
			fUtil.addToZip(zip, "desc.xml", tXml + "</theme>");
			for (const file of meta) {
				if (file.title.startsWith(req.body.keywords)) {
					const buffer = await get(`https://goanimate-remastered.joseph-animate.repl.co/assets/${file.mId}/${file.id}`);
					fUtil.addToZip(zip, `${file.mode}/${file.id}`, buffer);
				}
			}
			res.setHeader("Content-Type", "application/zip");
			res.end(Buffer.concat([base, await zip.zip()]));
		}).on("error", handleError);
	}).on("error", handleError).end();
})
.route("POST", "/goapi/getUserAssets/", async (req, res) => {
	const zip = nodezip.create();
	fUtil.addToZip(zip, "desc.xml", Buffer.from(listAssets(req.body)));
	res.setHeader("Content-Type", "application/zip");
	res.write(base);
	res.end(await zip.zip());
}).route("POST", "/goapi/getUserAssetsXml/", async (req, res) => {
	let themeId;
	switch (req.body.themeId) {
		case "custom":
			themeId = "family";
			break;
		case "action":
		case "animal":
		case "botdf":
		case "space":
			themeId = "cc2";
			break;
		default:
			themeId = req.body.themeId;
	}

	const filters = {
		themeId,
		type: "char"
	};
	res.setHeader("Content-Type", "application/xml");
	res.end(listAssets(filters));
})

/*
load
*/
.route("*", /\/(assets|goapi\/getAsset)\/([\S]*)/, (req, res, next) => {
	let id;
	switch (req.method) {
		case "GET":
			id = req.matches[2];
			break;
		case "POST":
			id = req.body.assetId;
			break;
		default:
			next();
			return;
	}
	if (!id) {
		res.statusCode = 400;
		res.end();
	}

	try {
		const ext = id.split(".")[-1] || "xml";
		const mime = mimeTypes[extensions.indexOf(ext)];
		const readStream = Asset.load(id);
		res.setHeader("Content-Type", mime);
		readStream.pipe(res);
	} catch (err) {
		if (err.message === "404") {
			res.statusCode = 404;
			res.end();
		} else {
			console.log("Error loading asset:", err);
			res.statusCode = 500;
			res.end();
		}
	}
})

/*
thumb
*/
.route("GET", /\/stock_thumbs\/([\S]+)/, (req, res) => {
	const filepath = path.join(__dirname, "../../", thumbUrl, req.matches[1]);
	if (fs.existsSync(filepath)) {
		fs.createReadStream(filepath).pipe(res);
	} else {
		res.status(404);
		res.end();
	}
})

/*
studio redirect
*/
.route("GET", /\/go\/studio\/theme\/([\S]+)/, (req, res) => res.redirect(`/go_full?tray=${
	req.matches[1]
}&older=1`)).route("POST", "/goapi/updateAsset/", (req, res) => {
	const id = req.body.assetId;
	const title = req.body.title;
	const tags = req.body.tag;
	if (!id || !title || !tags) {
		res.statusCode = 400;
		res.end("malformed");
	}

	const update = {
		tags: tags,
		title: title
	}
	if (DB.update("assets", id, update)) {
		res.end("1");
	} else {
		res.statusCode = 404;
		res.json("404 Not Found");
	}
})

/*
save
*/
.route("POST", "/api/asset/upload", async (req, res) => {
	const file = req.files.import;
	if (typeof file === "undefined" && !req.body.type && !req.body.subtype) {
		res.statusCode = 400;
		res.json({ status: "malformed" });
	}

	// get the filename and extension
	const { filepath } = file;
	const origName = file.originalFilename;
	const filename = path.parse(origName).name;
	const { ext } = await fromFile(filepath);

	// validate the file type
	if ((fileTypes[req.body.type] || []).indexOf(ext) < 0) {
		res.status(400);
		res.json({
			status: "error",
			msg: "Invalid file type."
		});
		return;
	}

	let info = {
		type: req.body.type,
		subtype: req.body.subtype,
		title: req.body.name || filename,
	}, stream;

	switch (info.type) {
		case "bg" : {
			if (ext == "swf") {
				stream = fs.createReadStream(filepath);
			} else {
				stream = await rFileUtil.resizeImage(filepath, 550, 354);
			}
			stream.pause();

			// save asset
			info.file = await Asset.save(stream, ext, info);
			break;
		}
		case "watermark": {
			stream = fs.createReadStream(filepath);
			stream.pause();

			// save asset
			info.file = await Asset.save(stream, ext, info);
			break;
		}
		case "sound": {
			await new Promise(async (resolve, reject) => {
				if (ext != "mp3") {
					stream = await rFileUtil.convertToMp3(filepath, ext);
				} else {
					stream = fs.createReadStream(filepath);
				}
				const temppath = tempfile(".mp3");
				const writeStream = fs.createWriteStream(temppath);
				stream.pipe(writeStream);
				stream.on("end", async () => {
					info.duration = await rFileUtil.mp3Duration(temppath);
					info.file = await Asset.save(temppath, "mp3", info);
					info.downloadtype = "progressive";
					resolve();
				});
			});
			break;
		}
		case "prop": {
			let { ptype } = req.body;
			// verify the prop type
			switch (ptype) {
				case "placeable":
				case "wearable":
				case "holdable":
					info.ptype = ptype;
				default:
					info.ptype = "placeable";
			}

			if (info.subtype == "video") {
				delete info.ptype;
				const temppath = tempfile(".flv");
				await new Promise((resolve, rej) => {
					// get the height and width
					ffmpeg(filepath).ffprobe((e, data) => {
						if (e) rej(e);
						info.width = data.streams[0].width;
						info.height = data.streams[0].height;

						// convert the video to an flv
						ffmpeg(filepath)
							.output(temppath)
							.on("end", async () => {
								const readStream = fs.createReadStream(temppath);
								info.file = await Asset.save(readStream, "flv", info);

								// save the first frame
								ffmpeg(filepath)
									.seek("0:00")
									.output(path.join(
										__dirname,
										"../../",
										process.env.ASSET_FOLDER,
										info.id.slice(0, -3) + "png"
									))
									.outputOptions("-frames", "1")
									.on("end", () => resolve(info.id))
									.run();
							})
							.on("error", (e) => rej("Error converting video:", e))
							.run();
					});
				});
			} else {
				info.file = await Asset.save(filepath, ext, info);
			}
			break;
		}
		default: {
			res.status(400);
			res.json({
				status: "error",
				msg: "Invalid asset type."
			});
			return;
		}
	}

	// stuff for the lvm
	info.enc_asset_id = info.file;

	res.json({
		status: "ok", 
		data: info
	});
}).route("POST", "/goapi/saveSound/", async (req, res) => {
	isRecord = req.body.bytes ? true : false;

	let filepath, ext, stream;
	if (isRecord) {
		filepath = tempfile(".ogg");
		ext = "ogg";
		const buffer = Buffer.from(req.body.bytes, "base64");
		fs.writeFileSync(filepath, buffer);
	} else {
		// read the file
		filepath = req.files.Filedata.filepath;
		ext = (await fromFile(filepath)).ext;
	}

	let info = {
		type: "sound",
		subtype: req.body.subtype,
		title: req.body.title
	};

	if (ext != "mp3") {
		stream = await rFileUtil.convertToMp3(filepath, ext);
	} else {
		stream = fs.createReadStream(filepath);
	}

	const temppath = tempfile(".mp3");
	const writeStream = fs.createWriteStream(temppath);
	stream.pipe(writeStream);
	stream.on("end", async () => {
		info.duration = await rFileUtil.mp3Duration(temppath);
		const id = await Asset.save(temppath, "mp3", info);
		res.end(
			`0<response><asset><id>${id}</id><enc_asset_id>${id}</enc_asset_id><type>sound</type><subtype>${info.subtype}</subtype><title>${info.title}</title><published>0</published><tags></tags><duration>${info.duration}</duration><downloadtype>progressive</downloadtype><file>${id}</file></asset></response>`
		);
	});
});

module.exports = group;
