const httpz = require("@octanuary/httpz")
let discord;
require("../../utils/discord")
	.then((f) => discord = f);
const database = require("../../data/database"), DB = new database(true);
const reqIsStudio = require("../middlewares/req.isStudio");
const { SWF_URL, STORE_URL, CLIENT_URL } = process.env;
const group = new httpz.Group();
const fs = require("fs");
function switchGroups(swftype, isOlder = false) {
	var buffer, buff;
	fs.unlinkSync(`./server/static/client_theme/go/en_US/${swftype}.swf`);
	fs.unlinkSync(`./server/static/client_theme/go/lang_common/${swftype}.swf`);
	if (isOlder) {
		buffer = fs.readFileSync(`./server/client_theme/go/en_US/${swftype}.swf`);
		buff = fs.readFileSync(`./server/client_theme/go/lang_common/${swftype}.swf`);
	} else {
		buffer = fs.readFileSync(`./server/477/client_theme/go/en_US/${swftype}.swf`);
		buff = fs.readFileSync(`./server/477/client_theme/go/lang_common/${swftype}.swf`);
	}
	fs.writeFileSync(`./server/static/client_theme/go/en_US/${swftype}.swf`, buffer);
	fs.writeFileSync(`./server/static/client_theme/go/lang_common/${swftype}.swf`, buff);
}

group.add(reqIsStudio);
// video list
group.route("*", "/", (req, res) => {
	discord("Video List");
	res.render("list", {});
});
// settings
group.route("*", "/settings", (req, res) => {
	discord("Settings");
	res.render("settings", {});
});
// themelist page
group.route("GET", "/create", (req, res) => {
	discord("Choosing a Theme");
	const { TRUNCATED_THEMELIST } = DB.select();
	res.render("create", { truncatedThemelist: TRUNCATED_THEMELIST });
});
// flash pages
group.route("GET", "/cc", async (req, res) => {
	discord("Character Creator");
	let flashvars = {
		appCode: "go",
		ctc: "go",
		isEmbed: 1,
		isLogin: "Y",
		userName:"Jerry",
		userEmail:"jerryguy69420@gmail.com",
		userId:  2292,
		m_mode: "normal",
		page: "",
		siteId: "go",
		tlang: "en_US",
		ut: 40,
		lid: 7,
		// options
		themeId: "family",
		// paths
		apiserver: "http://localhost:4343/",
		storePath: STORE_URL + "/<store>",
		clientThemePath: CLIENT_URL + "/<client_theme>"
	};
	Object.assign(flashvars, req.query);
	switchGroups("cc", req.query.older ? true : false);
	res.render("app/char", {
		title: "Character Creator",
		attrs: {
			data: SWF_URL + `/${req.query.older ? "old_" : ""}cc.swf?v=458`,
			type: "application/x-shockwave-flash", 
			id: "char_creator", 
			width: "960", 
			height: "600", 
			class: "char_object"
		},
		params: {
			flashvars,
			allowScriptAccess: "always",
			movie: SWF_URL + "/cc.swf",
		},
		object: toObjectString
	});
});
group.route("GET", "/go_full", async (req, res) => {
	discord("Video Maker");
	const { IS_WIDE } = DB.select();
	let flashvars = {
		appCode: "go",
		ctc: "go",
		isEmbed: 1,
		isLogin: "Y",
		userName:"Jerry",
		userEmail:"jerryguy69420@gmail.com",
		tray: "custom",
		userId:  2292,
		isWide: IS_WIDE,
		page: "",
		siteId: "go",
		tlang: "en_US",
		ut: 40,
		lid: 7,
		apiserver: "http://localhost:4343/",
		storePath: STORE_URL + "/<store>",
		clientThemePath: CLIENT_URL + "/<client_theme>"
	};
	Object.assign(flashvars, req.query);
	switchGroups("go_full", req.query.older ? true : false);
	res.render("app/studio", {
		attrs: {
			data: SWF_URL + `/${req.query.older ? "old" : "go"}_full.swf?v=458`,
			type: "application/x-shockwave-flash", width: "100%", height: "100%",
		},
		params: {
			flashvars,
			allowScriptAccess: "always",
		},
		object: toObjectString
	});
});
group.route("GET", "/player", async (req, res) => {
	discord("Video Player");
	const { IS_WIDE } = DB.select();
	let flashvars = {
		appCode: "go",
		ctc: "go",
		isEmbed: 1,
		isLogin: "Y",
		userName:"Jerry",
		userEmail:"jerryguy69420@gmail.com",
		userId:  2292,
		isWide: IS_WIDE,
		autostart: 1,
		page: "",
		siteId: "go",
		tlang: "en_US",
		ut: 40,
		lid: 7,
		apiserver: "http://localhost:4343/",
		storePath: STORE_URL + "/<store>",
		clientThemePath: CLIENT_URL + "/<client_theme>"
	};
	Object.assign(flashvars, req.query);
	switchGroups("player", req.query.older ? true : false);
	res.render("app/player", {
		attrs: {
			data: SWF_URL + `/${req.query.older ? "old_" : ""}player.swf?v=458`,
			type: "application/x-shockwave-flash", width: "100%", height: "100%",
		},
		params: {
			flashvars,
			allowFullScreen: "true",
			allowScriptAccess: "always",
		},
		object: toObjectString
	});
});

function toAttrString(table) {
	return typeof (table) == "object" ? new URLSearchParams(table).toString() : table.replace(/"/g, "\\\"");
}
function toParamString(table) {
	return Object.keys(table).map(key =>
		`<param name="${key}" value="${toAttrString(table[key])}">`
	).join(" ");
}
function toObjectString(attrs, params) {
	return `<object id="obj" ${Object.keys(attrs).map(key =>
		`${key}="${attrs[key].replace(/"/g, "\\\"")}"`
	).join(" ")}>${toParamString(params)}</object>`;
}

module.exports = group;
