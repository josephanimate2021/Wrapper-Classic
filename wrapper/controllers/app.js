/**
 * app routes
 */
// modules
const httpz = require("@octanuary/httpz")
let discord;
require("../../utils/discord")
	.then((f) => discord = f);
// vars
const { SWF_URL, STORE_URL, CLIENT_URL } = process.env;
// stuff
const database = require("../../data/database"), DB = new database(true);
const reqIsStudio = require("../middlewares/req.isStudio");
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

// create the group
const group = new httpz.Group();

group
	.add(reqIsStudio)
	// video list
	.route("*", "/", (req, res) => {
		discord("Video List");
		res.render("list", {});
	})
	// settings
	.route("*", "/settings", (req, res) => {
		discord("Settings");
		res.render("settings", {});
	})
	// themelist page
	.route("GET", "/create", (req, res) => {
		discord("Choosing a Theme");
		res.render("create", {});
	})
	// flash pages
	.route("GET", "/oldcc", async (req, res) => {
		const { VERSION, CLIENT_THEME } = DB.select();
		discord("Character Creator");
		let flashvars = {
			appCode: "go",
			ctc: CLIENT_THEME,
			isLogin: "Y",
			lid: 7,
			gobuck: 100,
			nextUrl: "/",
			siteId: "go",
			themeId: "family",
			trial: 1,
			ut: 40,
			tlang: "en_US",
			userId: '28989',
			apiserver: "http://localhost:4343/",
			storePath: "http://localhost:4343/static/store/<store>",
			clientThemePath: "http://localhost:4343/static/tommy/<client_theme>"
		};
		Object.assign(flashvars, req.query);
		res.render("app/char", {
			title: "Character Creator",
			attrs: {
				data: "http://localhost:4343/animation/" + VERSION + "/cc_old.swf",
				type: "application/x-shockwave-flash", 
				id: "char_creator", 
				width: "960", 
				height: "600", 
				class: "char_object"
			},
			params: {
				flashvars,
				allowScriptAccess: "always",
				movie: "http://localhost:4343/animation/" + VERSION + "/cc_old.swf",
			},
			object: toObjectString
		});
	})
	.route("GET", "/cc", async (req, res) => {
		discord("Character Creator");
		let flashvars = {
			appCode: "go",
			ctc: "go",
			isEmbed: 1,
			isLogin: "Y",
            		username:"Jerry",
            		usemail:"jerryguy69420@gmail.com",
            		userId: '28989',
			m_mode: "school",
			page: "",
			siteId: "go",
			tlang: "en_US",
			ut: 40,
			// options
			bs: "adam",
			original_asset_id: req.query["id"] || "",
			themeId: "family",
			// paths
			apiserver: "http://localhost:4343/",
			storePath: "http://localhost:4343/static/store/<store>",
			clientThemePath: "http://localhost:4343/static/<client_theme>"
		};
		Object.assign(flashvars, req.query);
		res.render("app/char", {
			title: "Character Creator",
			attrs: {
				data: SWF_URL + "/cc.swf",
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
	})
	.route("GET", "/cc_browser", async (req, res) => {
		discord("Character Browser");
		let flashvars = {
			appCode: "go",
			ctc: "go",
			isEmbed: 1,
			isLogin: "Y",
			m_mode: "school",
			page: "",
			userId: '28989',
			siteId: "go",
			tlang: "en_US",
			ut: 40,
			// options
			themeId: "family",
			// paths
			apiserver: "/",
			storePath: "http://localhost:4343/static/store/<store>",
			clientThemePath: CLIENT_URL + "/<client_theme>"
		};
		Object.assign(flashvars, req.query);
		res.render("app/char", {
			title: "Character Browser",
			attrs: {
				data: SWF_URL + "/cc_browser.swf",
				type: "application/x-shockwave-flash", 
				id: "char_creator", 
				width: "100%", 
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
	})
	//Old go_full!
	.route("GET", "/old_full", async (req, res) => {
		const { IS_WIDE, CLIENT_THEME, VERSION } = DB.select();
		discord( VERSION + " Video Maker");
		let flashvars = {
            		tts_enabled: 1,
			credits: 100,
			uisa: "Y",
			ve: "Y",
			ctc: CLIENT_THEME,
			appCode: "go",
			ctc: CLIENT_THEME,
			isLogin: "Y",
			siteId: "go",
			tray: "sf",
			tlang: "en_US",
			userId: '28989',
			isWide: IS_WIDE,
			nextUrl: "http://localhost:4343/",
			gocoins: 100,
			lid: 7,
			ut: 40,
			s3URL: "http://localhost:4343/",
			apiserver: "http://localhost:4343/",
			server: "http://localhost:4343/",
			storePath: "http://localhost:4343/static/store/<store>",
			clientThemePath:"http://localhost:4343/static/tommy/<client_theme>"
		};
		Object.assign(flashvars, req.query);
		res.render("app/oldstudio", {
			attrs: {
				data: "http://localhost:4343/animation/" + VERSION + "/old_full.swf",
				type: "application/x-shockwave-flash", width: "100%", height: "100%",
			},
			params: {
				flashvars,
				allowScriptAccess: "always",
			},
			frame: `<embed height="100%" width="100%" src="https://josephanimate2021.github.io/lvm-static/retro.html?v=${VERSION}&tray=${flashvars.tray}&type=old&staticVer=static"></embed>`
		});
	})
	.route("GET", "/go_full", async (req, res) => {
		discord("Video Maker");
		const { IS_WIDE } = DB.select();
		let flashvars = {
            		tts_enabled: true,
            		username:"Jerry",
            		usemail:"jerryguy69420@gmail.com",
			userId: '28989',
			appCode: "go",
			collab: 1,
			ctc: "go",
			goteam_draft_only: 1,
			isLogin: "Y",
			isWide: IS_WIDE,
			lid: 0,
			nextUrl: "/",
			page: "",
			retut: 1,
			siteId: "go",
			tray: "custom",
			tlang: "en_US",
			ut: 60,
			apiserver: "http://localhost:4343/",
			storePath: "http://localhost:4343/static/store/<store>",
			clientThemePath: CLIENT_URL + "/<client_theme>"
		};
		Object.assign(flashvars, req.query);
		res.render("app/studio", {
			attrs: {
				data: SWF_URL + "/go_full.swf",
				type: "application/x-shockwave-flash", width: "100%", height: "100%",
			},
			params: {
				flashvars,
				allowScriptAccess: "always",
			},
			object: toObjectString
		});
	})
	.route("GET", "/player", async (req, res) => {
		discord("Video Player");
		const { IS_WIDE } = DB.select();
		let flashvars = {
            		username:"Jerry",
            		usemail:"jerryguy69",
			userId: '28989',
			autostart: 1,
			isWide: IS_WIDE,
			ut: 40,
			apiserver: "http://localhost:4343/",
			storePath: "http://localhost:4343/static/store/<store>",
			clientThemePath: CLIENT_URL + "/<client_theme>"
		};
		Object.assign(flashvars, req.query);
		res.render("app/player", {
			attrs: {
				data: SWF_URL + "/player.swf",
				type: "application/x-shockwave-flash", width: "100%", height: "100%",
			},
			params: {
				flashvars,
				allowScriptAccess: "always",
			},
			object: toObjectString
		});
	});
module.exports = group;
