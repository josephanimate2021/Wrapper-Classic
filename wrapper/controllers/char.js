const fs = require("fs");
const httpz = require("@octanuary/httpz");
const Char = require("../models/char");
const { exists } = require("../models/asset");
const base = Buffer.alloc(1, "0");
const group = new httpz.Group();

/*
load
*/
group.route("POST", "/goapi/getCcCharCompositionXml/", (req, res) => {
	const id = req.body.assetId;
	res.assert(id, 400, "Missing one or more fields.");

	console.log(`Loading character #${id}...`);
	try {
		const buf = Char.load(id);
		res.setHeader("Content-Type", "application/xml");
		res.end(Buffer.concat([base, buf]));
	} catch (e) {
		console.log("But nobody came.");
		res.status(404);
		res.end("1");
	}
});

/*
redirect
*/
group.route("GET", "/go/character_creator", (req, res) => {	
	res.redirect("/cc?older=1");
});

/*
save
*/
// save character + thumbnail
group.route("POST", "/goapi/saveCCCharacter/", (req, res) => {
	res.assert(
		req.body.body,
		req.body.imagedata,
		req.body.themeId,
		400, "Missing one or more fields."
	);
	const body = req.body.body;
	const thumb = Buffer.from(req.body.imagedata, "base64");

	const meta = {
		type: "char",
		subtype: 0,
		title: req.body.title,
		themeId: req.body.themeId
	};
	const id = Char.save(body, meta);
	Char.saveThumb(id, thumb);
	res.end("0" + id);
});
// save thumbnail only
group.route("POST", "/goapi/saveCCThumbs/", (req, res) => {
	const id = req.body.assetId;
	res.assert(
		req.body.thumbdata,
		id,
		400, "Missing one or more fields."
	);
	const thumb = Buffer.from(req.body.thumbdata, "base64");

	if (exists(`${id}.xml`)) {
		Char.saveThumb(id, thumb);
		res.end("0" + id);
	} else {
		res.end("1");
	}
})
.route("GET", /\/go\/movie\/file\/([^/]+)$/)

/*
upload
*/
group.route("*", "/api/char/upload", (req, res) => {
	const file = req.files.import;
	if (!file) {
		console.log("Error uploading character: No file.");
		res.statusCode = 400;
		return res.json({ msg: "No file" });
	} else if (file.mimetype !== "text/xml") {
		console.log("Attempted character upload with invalid file.");
		res.statusCode = 400;
		return res.json({ msg: "Character is not an XML" });
	}
	const origName = file.originalFilename;
	const path = file.filepath, buffer = fs.readFileSync(path);

	const meta = {
		type: "char",
		subtype: 0,
		title: origName || "Untitled",
		themeId: Char.getTheme(buffer)
	};
	try {
		Char.save(buffer, meta, true);
		fs.unlinkSync(path);
		const url = `/cc_browser?themeId=${meta.themeId}`;
		res.redirect(url);
	} catch (e) {
		console.error("Error uploading character:", e);
		res.statusCode = 500;
		res.json({ status: "error" });
	}
});

module.exports = group;
