const httpz = require("@octanuary/httpz")
const path = require("path");
const database = require("../../data/database"), DB = new database(true);
const fUtil = require("../../utils/fileUtil");
const folder = path.join(__dirname, "../../server", process.env.STORE_URL);
const group = new httpz.Group();
const fs = require("fs");
const nodezip = require("node-zip");
const https = require("https");
const asset = require("../models/asset");
function get(url, options = {}) {
	var data = [];
	return new Promise((res, rej) => {
		https.get(url, options, (o) => {
			o.on("data", (v) => data.push(v)).on("end", () => res(Buffer.concat(data))).on("error", rej)
		});
	});
};

/*
list
*/
group.route("POST", "/goapi/getThemeList/", async (_req, res) => {
	const xmlPath = path.join(folder, "themelist.xml");
	const zip = await fUtil.zippy(xmlPath, "themelist.xml");
	res.setHeader("Content-Type", "application/zip");
	res.end(zip);
})

/*
load
*/
.route("POST", "/goapi/getTheme/", async (req, res) => {
	const id = req.body.themeId;
	res.assert(id, 500, "Missing one or more fields.");
	const xmlPath = path.join(folder, `${id}/theme.xml`);
	const zip = await fUtil.zippy(xmlPath, "theme.xml");
	// create xmls for the Comm folder located in the store folder.
	// i have no idea why i put all of this here. i guess that i could use this to help out movie parsing after someone uses community assets.
	const commFolder = path.join(folder, `Comm`);
	const commPath = path.join(commFolder, `theme.xml`);
	const commZip = path.join(commFolder, `Comm.zip`);
	if (!fs.existsSync(commFolder)) fs.mkdirSync(commFolder);
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
				tXml += asset.meta2StoreXml(v);
				const subtype = v.subtype;
				const assetBuff = await get(`https://goanimate-remastered.joseph-animate.repl.co/assets/${v.mId}/${v.id}`);
				if (!fs.existsSync(path.join(commFolder, subtype))) fs.mkdirSync(path.join(commFolder, subtype));
				fs.writeFileSync(path.join(commFolder, `${subtype}/${v.id}`), assetBuff);
			}
			fs.writeFileSync(commPath, tXml + "</theme>");
			const zip2 = nodezip.create();
			fUtil.addToZip(zip2, "theme.xml", tXml + "</theme>");
			fs.writeFileSync(commZip, await zip2.zip());
			res.setHeader("Content-Type", "application/zip");
			res.end(zip);
		}).on("error", handleError);
	}).on("error", handleError).end();
});

module.exports = group;
