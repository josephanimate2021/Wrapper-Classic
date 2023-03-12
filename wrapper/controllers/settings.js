const httpz = require("@octanuary/httpz");
const https = require("https");
const database = require("../../data/database"), DB = new database(true);
const group = new httpz.Group();
const fs = require("fs");

/*
list
*/
group.route("GET", "/api/animations/list", (req, res) => {
	const table = [];
	fs.readdirSync('./server/animation').forEach(number => {
		table.push({ num: number})
	});
	res.end(JSON.stringify(table));
}).route("GET", "/api/settings/list", (req, res) => {
	res.json(DB.select());
})

/*
upload
*/
.route("POST", "/api/settings/update", (req, res) => {
	const { setting } = req.body;
	// convert true or false to a boolean
	const value = req.body.value == "true" ? true : 
		req.body.value == "false" ? false : req.body.value;
	res.assert(
		setting,
		typeof value != "undefined",
		400, { status: "error" }
	);

	const db = DB.select();
	// check if the setting exists
	res.assert(setting in db, 400, { status: "error" });

	db[setting] = value;
	DB.save(db);
	res.json({ status: "ok" });
})

/*
check for updates
*/
.route("GET", "/api/settings/get_updates", (req, res) => {
	const handleError = (err) => {
		console.log("Error checking for updates:", err);
		res.statusCode = 500;
		res.end();
	};
	https.get({
		host: "api.github.com",
		path: "/repos/josephanimate2021/Wrapper-Classic/tags",
		headers: {
			"User-Agent": req.headers['user-agent']
		}
	}, (res2) => {
		let buffers = [];
		res2.on("data", (c) => buffers.push(c)).on("end", () => {
			const json = JSON.parse(Buffer.concat(buffers));
			try {
				const latest = json[0].name;
				if (+(latest.substring(1).replace(/\./, "")) > +(process.env.WRAPPER_VER.replace(/\./, ""))) {
					res.json({ updates_available: true, tag_name: latest });
				} else res.json({ updates_available: false });
			} catch (e) {
				console.log(e);
				res.json({ updates_available: false });
			}
		}).on("error", handleError);
	}).on("error", handleError);
});

module.exports = group;
