const httpz = require("@octanuary/httpz")
const path = require("path");
const database = require("../../data/database"), DB = new database(true);
const fUtil = require("../../utils/fileUtil");
const folder = path.join(__dirname, "../../server", process.env.STORE_URL);
const group = new httpz.Group();
const fs = require("fs");

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
	console.log(req.body);
	const id = req.body.themeId || req.body.tray || "sf";
	res.assert(id, 500, "Missing one or more fields.");

	const xmlPath = path.join(folder, `${id}/theme.xml`);
	const zip = await fUtil.zippy(xmlPath, "theme.xml");
	res.setHeader("Content-Type", "application/zip");
	res.end(zip);
});

module.exports = group;
