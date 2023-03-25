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
const nodezip = require("node-zip");
const header = process.env.XML_HEADER;
const thumbUrl = process.env.THUMB_BASE_URL;
const sFolder = path.join(__dirname, "../../server", process.env.STORE_URL);
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
	DB.delete("assets", id);
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
	switch (req.body.type) {
		case "char": {
			const folder = path.join(sFolder, "Comm/char")
			const tXml = `<theme id="Comm" name="Community Library"><char id="1147194" name="BLUE CENTURION=SECTION31" published="1" facing="left" thumb="1147195.swf" default="1147195.swf"><tags/><action id="1147195.swf" name="STAND RIGHT"/><action id="1147200.swf" name="FIRE RIGHT"/><action id="1147201.swf" name="POINT DISRUPTOR"/></char>
			<char id="1867628" name="MUTANTDALEK by solarbaby" published="1" facing="left" thumb="1867629.swf" default="1867629.swf"><tags>mutant dalekdead</tags><action id="1867629.swf" name="mutant dalekdead"/><action id="1867631.swf" name="MOVING"/></char>
			<char id="1757567" name="DEEPSPACENINE by solarbaby" published="1" facing="left" thumb="1757568.swf" default="1757568.swf"><tags/><action id="1757568.swf" name="DEFAULT"/><action id="1757573.swf" name="firephaser"/></char>
			<char id="547437" name="Bamboo" published="1" facing="left" thumb="547438.swf" default="547438.swf"><tags/><action id="547438.swf" name="standing"/><action id="547439.swf" name="sit"/><action id="547440.swf" name="sit_talk"/><action id="547442.swf" name="walk"/><action id="554124.swf" name="talk"/></char>
			<char id="2179798" name="Chaostoons Wolfman" published="1" facing="left" thumb="2179814.swf" default="2179814.swf"><tags>chaostoon wolfman</tags><action id="2179800.swf" name="Wolf Step Forward"/><action id="2179802.swf" name="Wolf Back Breathing"/><action id="2179803.swf" name="Wolf Look Over Shoulder"/><action id="2179804.swf" name="Wolf Scary Look"/><action id="2179806.swf" name="Wolf Howl All Fours"/><action id="2179808.swf" name="Wolf Howl All Fours Night"/><action id="2179809.swf" name="Wolf Eye Squint"/><action id="2179810.swf" name="Wolf Running"/><action id="2179812.swf" name="Wolf Running Night"/><action id="2179813.swf" name="Wolf Dramatic Jaw Open"/><action id="2179814.swf" name="Wolf Standing"/><action id="2179815.swf" name="Wolf Howl Standing"/><action id="2179820.swf" name="Wolf Howl Standing Night"/><action id="2179826.swf" name="Wolf Walking"/></char>
			<char id="16378923" name="bop aft flat by solarbaby" published="1" facing="left" thumb="16378924.swf" default="16378924.swf"><tags>defualt</tags><action id="16378924.swf" name="defualt"/><action id="16379173.swf" name="cloak"/><action id="16380462.swf" name="decloak"/></char>
			<char id="1634460" name="bird of prey front by solarbaby" published="1" facing="left" thumb="1634490.swf" default="1634490.swf"><tags/><action id="1634464.swf" name="bird of prey front cloak"/><action id="1634466.swf" name="bird of prey front decloak"/><action id="1634474.swf" name="bird of prey front shields"/><action id="1634488.swf" name="bird of prey front torpedo"/><action id="1634490.swf" name="bird of prey front disruptors"/><action id="2635563.swf" name="bird of prey front default"/></char>
			<char id="2954524" name="BOP SIDE by solarbaby" published="1" facing="left" thumb="2954525.swf" default="2954525.swf"><tags/><action id="2954525.swf" name=" default"/><action id="5092273.swf" name="bop side torpedos"/><action id="5096192.swf" name="bop side explode"/></char>
			<char id="547400" name="Luna" published="1" facing="left" thumb="547406.swf" default="547406.swf"><tags/><action id="547401.swf" name="bow_greet"/><action id="547402.swf" name="sit"/><action id="547403.swf" name="sit_read"/><action id="547405.swf" name="sit_talk"/><action id="547406.swf" name="standing"/><action id="547408.swf" name="talk"/><action id="547410.swf" name="walk"/></char>
			<char id="87303429" name="Sonic by Chaostoon" published="1" facing="left" thumb="87305017.swf" default="87305017.swf"><tags/><action id="87303430.swf" name="Ball Rolling"/><action id="87303987.swf" name="Eat a Chilidog"/><action id="87304035.swf" name="Run 3"/><action id="87304062.swf" name="Homing"/><action id="87304085.swf" name="Homing Attack"/><action id="87304104.swf" name="Kick"/><action id="87304308.swf" name="Punch"/><action id="87304380.swf" name="Revv up Rolling Ball"/><action id="87304409.swf" name="Run 1"/><action id="87304503.swf" name="Stop"/><action id="87304548.swf" name="Spinball"/><action id="87304585.swf" name="Standing"/><action id="87304647.swf" name="Super Sonic flying"/><action id="87304677.swf" name="Angry"/><action id="87304739.swf" name="Happy"/><action id="87304775.swf" name="Laugh"/><action id="87304820.swf" name="Taunt"/><action id="87304851.swf" name="Thumbs Up"/><action id="87304920.swf" name="Super Sonic Transform"/><action id="87304942.swf" name="Super Sonic Transform Back"/><action id="87304960.swf" name="Turn into Spinball"/><action id="87305017.swf" name="Waiting"/><action id="87306283.swf" name="Run 2"/></char>
			<char id="2665444" name="ROM BOP by solarbaby" published="1" facing="left" thumb="2665445.swf" default="2665445.swf"><tags/><action id="2665445.swf" name=" DEFAULT"/><action id="2665458.swf" name=" decloak"/><action id="2665466.swf" name="cloak"/><action id="2672400.swf" name="TORPEDOS"/><action id="5096801.swf" name="ROM BOP EXPLODE"/></char>
			<char id="1498163" name="Kung Fu Cat by cool34606" published="1" facing="left" thumb="1498164.swf" default="1498164.swf"><tags>kung fu cat,cool34606kfc</tags><action id="1498164.swf" name="Kung Fu Cat Stand Front"/><action id="1498381.swf" name="KFC Double Kick Front"/><action id="1498715.swf" name="KFC Fighting Stance"/><action id="1498981.swf" name="KFC Fighting Stance Walk"/><action id="1508763.swf" name="KFC Fighting Stance Punch"/><action id="1508930.swf" name="KFC Fighting Stance kick"/><action id="1508986.swf" name="Kung Fu Cat credits"/><action id="1509040.swf" name="KFC Fighting Stance energyblast"/><action id="1509249.swf" name="KFC Fighting Stance Talk"/><action id="1509260.swf" name="KFC Sitting"/><action id="1509485.swf" name="KFC Talk"/><action id="1510725.swf" name="KFC Stand Side"/><action id="1515229.swf" name="KFC Walk"/><action id="1588452.swf" name="KFC Fighting Stance Scratch"/><action id="1588455.swf" name="KFC Get knocked Out"/><action id="1588461.swf" name="KFC Knocked Out"/><action id="1764037.swf" name="KFC Get Hit"/></char>
			<char id="66709814" name="Knuckles by Johnny Hotdog" published="1" facing="left" thumb="66709815.swf" default="66709815.swf"><tags>jhcharacters</tags><action id="66709815.swf" name="Knuckles"/><action id="66709876.swf" name="knuckles_ball"/><action id="66709921.swf" name="knuckles_ball_running"/><action id="66709932.swf" name="knuckles_run"/><action id="66709960.swf" name="knuckles_run2"/><action id="66709967.swf" name="knuckles_standby"/><action id="66712993.swf" name="knuckles_credits"/></char>
			<char id="80552677" name="artoo by solarbaby" published="1" facing="left" thumb="80552678.swf" default="80552678.swf"><tags/><action id="80552678.swf" name="DEFAULT"/><action id="80552854.swf" name="ANGRY"/><action id="80553107.swf" name="TILT BACKWARDS"/><action id="80554100.swf" name="HEAD SPIN"/><action id="80554349.swf" name="hologram"/><action id="80554599.swf" name="OIL SLICK"/><action id="80556335.swf" name="ELECTRIC SHOCK"/></char>
			<char id="2634795" name="ENT TOP OBLIQUE by solarbaby" published="1" facing="left" thumb="2634796.swf" default="2634796.swf"><tags/><action id="2634796.swf" name="DEFAULT"/><action id="2634802.swf" name="sheilds up"/><action id="2634814.swf" name="sheilds down"/><action id="2634826.swf" name="sheild on"/><action id="2634902.swf" name=" continuous  torpedo"/><action id="2634931.swf" name="fire 1 torpedo"/><action id="4714269.swf" name="sheild on fire side phasers"/><action id="23699210.swf" name=" ZOOM"/><action id="24755852.swf" name=" shield on fire side phasers"/><action id="58555786.swf" name="escape pods"/></char>
			<char id="1164668" name="DALEK by section31" published="1" facing="left" thumb="1164669.swf" default="1164669.swf"><tags/><action id="1164669.swf" name="default"/><action id="1202469.swf" name="movehead"/><action id="1202491.swf" name="exterminate"/><action id="1202516.swf" name="wide beam exterminate"/><action id="1202541.swf" name="blackdalekdefault"/><action id="1202542.swf" name="blackdalekmovehead"/><action id="1202543.swf" name="blackdalekexterminate"/><action id="1731087.swf" name="reddalek1explode"/></char>
			<char id="1814132" name="Demon Biker by Charles Zippel" published="1" facing="left" thumb="1814133.swf" default="1814133.swf"><tags>czdemonbiker</tags><action id="1814133.swf" name="Stand"/><action id="1814135.swf" name="Stand Talk"/><action id="1814136.swf" name="Walk"/><action id="1814137.swf" name="Fighting Stance"/><action id="1814140.swf" name="Energy Blast Position"/><action id="1814141.swf" name="Point Arm"/><action id="1814144.swf" name="Punch"/><action id="1814146.swf" name="Sit"/><action id="1814149.swf" name="Motorbike Only"/><action id="1814150.swf" name="Ride Motorbike Slow"/><action id="1814161.swf" name="Ride Motorbike Fast"/><action id="1814162.swf" name="Credits"/><action id="1814222.swf" name="Get Hit"/><action id="1814225.swf" name="Get Knocked Out"/><action id="1814226.swf" name="Knocked Out"/><action id="1835556.swf" name="Double Punch"/><action id="1839298.swf" name="Ride Motorbike stopped"/></char>
			<char id="1819715" name="Spinning Tardis by section31" published="1" facing="left" thumb="1819747.swf" default="1819747.swf"><tags>tardis  spinround</tags><action id="1819721.swf" name="phase out"/><action id="1819724.swf" name="phasein"/><action id="1819747.swf" name="spinround"/></char>
			<char id="1166428" name="REPLICATORCUP" published="1" facing="left" thumb="1166435.swf" default="1166435.swf"><tags>replicatorcuponly</tags><action id="1166435.swf" name="STILL"/><action id="1166439.swf" name="ONLY"/></char>
			<char id="1164416" name="TARDIS by section31" published="1" facing="left" thumb="1819265.swf" default="1819265.swf"><tags/><action id="1819245.swf" name="door opening"/><action id="1819248.swf" name="door closing"/><action id="1819249.swf" name="door opened"/><action id="1819265.swf" name="tardis"/><action id="1819267.swf" name="tardisappear"/><action id="1819270.swf" name="tardisdissappear"/></char>
			<char id="1885278" name="Police Car" published="1" facing="left" thumb="1885279.swf" default="1885279.swf"><tags>tetpolicecar</tags><action id="1885279.swf" name="Parked"/><action id="1885281.swf" name="Cruising"/><action id="1885286.swf" name="Pursuit"/><action id="1885287.swf" name="Credit"/></char>
			<char id="1324346" name="FA Artist" published="1" facing="left" thumb="1324355.swf" default="1324355.swf"><tags/><action id="1324347.swf" name="artist gets easel back CS4"/><action id="1324354.swf" name="Artist yelling hey CS4"/><action id="1324355.swf" name="i need help moving hold CS4"/><action id="1324358.swf" name="woah doctor bills CS4"/><action id="1324479.swf" name="artist whats FA CS4"/><action id="1324480.swf" name="Artist painting CS4"/><action id="1324569.swf" name="i need help CS4"/><action id="199399952.swf" name="Jack New Crying"/><action id="199400095.swf" name="Jack New Good Job"/><action id="200378157.swf" name="Queen angry"/></char>
			<char id="1154816" name="ROMULAN WARBIRD" published="1" facing="left" thumb="1154817.swf" default="1154817.swf"><tags/><action id="1154817.swf" name="default"/><action id="1154820.swf" name="default"/><action id="1154919.swf" name=" fire disruptors"/><action id="1154924.swf" name="continuous fire"/><action id="1154936.swf" name="fire tirpedoes"/><action id="1154972.swf" name="decloak"/><action id="1156192.swf" name=" shield hit"/><action id="1156270.swf" name="shields up"/><action id="1156296.swf" name="shields and torpedos"/><action id="1156315.swf" name="torpedoesdisruptors"/><action id="1156318.swf" name="shields/torpedoes/disruptors"/><action id="1156331.swf" name="diruptors shields"/><action id="1156356.swf" name="LOWER SHIELDS"/><action id="1156428.swf" name="shields down"/><action id="1918427.swf" name="decloak melt"/><action id="1918470.swf" name="cloak melt"/></char>
			<char id="1306082" name="CATWOMAN" published="1" facing="left" thumb="1306181.swf" default="1306181.swf"><tags/><action id="1306135.swf" name="scheming"/><action id="1306164.swf" name="walk"/><action id="1306181.swf" name="stand"/><action id="1307395.swf" name="kiss"/><action id="1985062.swf" name="threaten"/><action id="1985067.swf" name=" murdered"/><action id="1985105.swf" name="talk"/><action id="1985156.swf" name=" think"/><action id="1985823.swf" name="on bike"/></char>
			<char id="4754587" name="GALILEO AFT by solarbaby" published="1" facing="left" thumb="4754588.swf" default="4754588.swf"><tags>aft default</tags><action id="4754588.swf" name=" AFT DEFAULT"/><action id="4754658.swf" name="WARP OUT"/><action id="4795386.swf" name="burn up"/><action id="4878559.swf" name="crashedaft"/></char>
			<char id="66713375" name="Dr.Eggman by Johnny Hotdog" published="1" facing="left" thumb="66713376.swf" default="66713376.swf"><tags>jhcharacters</tags><action id="66713376.swf" name="eggman_facefront"/><action id="66713389.swf" name="eggman_faceright"/><action id="66713581.swf" name="eggman_credits"/></char>
			<char id="1636962" name="HUMPTY DUMPTY" published="1" facing="left" thumb="1636963.swf" default="1636963.swf"><tags/><action id="1636963.swf" name="humpty"/><action id="1637066.swf" name="humptyNAUGHTY"/></char>
			<char id="13828229" name="Chaostoons Sonic" published="1" facing="left" thumb="13828231.swf" default="13828231.swf"><tags/><action id="13828231.swf" name="APRILFOOLSDAY2011"/></char>
			<char id="1973023" name="MILLENIUM FALCON " published="1" facing="left" thumb="1973024.swf" default="1973024.swf"><tags/><action id="1973024.swf" name=" DEFAULT"/><action id="1973027.swf" name=" LASERZ"/></char>
			<char id="1680552" name="Hoot" published="1" facing="left" thumb="1680553.swf" default="1680553.swf"><tags>tethoot</tags><action id="1680553.swf" name="Standing"/><action id="1680794.swf" name="Sleeping"/><action id="1680909.swf" name="Talking"/><action id="1696746.swf" name="Credits"/><action id="1696921.swf" name="Look to side"/><action id="1764153.swf" name="Excited flap wings"/><action id="1764210.swf" name="Stand side"/><action id="1764293.swf" name="walk"/><action id="1764375.swf" name="Jump"/><action id="3786391.swf" name="Backview talking"/><action id="132008268.swf" name="walk and talk"/><action id="132785152.swf" name="Talk side"/></char>
			<char id="3473744" name="OBERTH by solarbaby" published="1" facing="left" thumb="3473745.swf" default="3473745.swf"><tags/><action id="3473745.swf" name="default"/><action id="3479049.swf" name=" fire weapons"/><action id="3479178.swf" name="OBERTH "/></char>
			<char id="1925052" name="KTINGA FRONT by solarbaby" published="1" facing="left" thumb="1925053.swf" default="1925053.swf"><tags/><action id="1925053.swf" name=" DEFAULT"/><action id="1925057.swf" name="DE CLOAK"/><action id="1925066.swf" name="KTINGA CLOAK"/><action id="1925121.swf" name="KTINGA FRONT TORPEDOLIGHT"/><action id="4323301.swf" name=" SPIN WARP OUT"/></char>
			<char id="547421" name="Cubic Cat" published="1" facing="left" thumb="547422.swf" default="547422.swf"><tags>cubicpets</tags><action id="547422.swf" name="standing"/><action id="547423.swf" name="talking"/><action id="547424.swf" name="sleeping"/><action id="547425.swf" name="shy"/><action id="547426.swf" name="walking"/></char>
			<char id="72551015" name="golden gate bridge by solarbaby" published="1" facing="left" thumb="72551017.swf" default="72551017.swf"><tags/><action id="72551017.swf" name="default"/><action id="72552392.swf" name="blurry"/><action id="72552795.swf" name="night"/><action id="72554839.swf" name="moving traffic"/></char>
			<char id="4645322" name="ENTERPRISE AFT by solarbaby" published="1" facing="left" thumb="4645323.swf" default="4645323.swf"><tags/><action id="4645323.swf" name="enterprise aft default"/><action id="4645345.swf" name="enterprise aft fire phasers"/><action id="4675082.swf" name="fire phasers torps"/><action id="4675084.swf" name="fire torps"/><action id="4753097.swf" name="shuttle leave"/><action id="4753110.swf" name="shuttle land"/><action id="4753942.swf" name="shuttle doors close"/><action id="5043080.swf" name="ent aft fire top phasers"/><action id="23597553.swf" name="ent aft going to warp"/><action id="24227886.swf" name="enterprise aft fire phasers torps sound"/><action id="50132269.swf" name="leaking warp plasma"/><action id="50132346.swf" name="damaged nacelle"/><action id="53863841.swf" name="enterprise aft shuttle decompress"/><action id="56563035.swf" name="shuttle approachandland"/><action id="79490714.swf" name="enterprise aft OMEGA FLASH"/></char>
			<char id="66712491" name="Darth Vader by Johnny Hotdog" published="1" facing="left" thumb="66712492.swf" default="66712492.swf"><tags>jhcharacters</tags><action id="66712492.swf" name="Darth Vader"/><action id="66712510.swf" name="darthvader_back"/><action id="66712570.swf" name="darthvader_back_slash"/><action id="66712584.swf" name="darthvader_back_slash_2"/><action id="66712591.swf" name="darthvader_psy"/><action id="66712641.swf" name="darthvader_front_slash"/><action id="66712759.swf" name="darthvader_walk"/><action id="66712878.swf" name="darthvader_credits"/></char>
			<char id="9729292" name="USS REPUBLIC" published="1" facing="left" thumb="9729535.swf" default="9729535.swf"><tags/><action id="9729293.swf" name=" Default"/><action id="9729535.swf" name=" ventral"/><action id="9729890.swf" name=" aft PHASERS"/><action id="9732465.swf" name="aft torpedos"/></char>
			<char id="3249729" name="ENTERPRISE FRONT" published="1" facing="left" thumb="3249730.swf" default="3249730.swf"><tags/><action id="3249730.swf" name="default"/></char>
			<char id="1146317" name="PURPLE CENTURION =SECTION31" published="1" facing="left" thumb="1146318.swf" default="1146318.swf"><tags/><action id="1146318.swf" name="STANDING"/><action id="1146319.swf" name="WALK"/><action id="1146855.swf" name="DISRUPTOR POINT LEFT"/><action id="1146942.swf" name="WALK RIGHT"/><action id="1147038.swf" name="FIRE RIGHT"/></char>
			<char id="1969493" name="CATHERINE WHEELS" published="1" facing="left" thumb="1969534.swf" default="1969534.swf"><tags/><action id="1969495.swf" name="move"/><action id="1969520.swf" name="spinaround"/><action id="1969534.swf" name="default"/><action id="1969570.swf" name=" fire energy blast"/><action id="1969571.swf" name=" fire energy blast still"/><action id="1969612.swf" name=" car park"/><action id="1969615.swf" name=" transmogrify"/></char>
			<char id="9680294" name="tardis controls by solarbaby" published="1" facing="left" thumb="9680295.swf" default="9680295.swf"><tags>tardis controls</tags><action id="9680295.swf" name="tardis controls"/><action id="9680329.swf" name="tardis controlsoff"/></char>
			<char id="1205495" name="HOLODECK DOORS" published="1" facing="left" thumb="1205503.swf" default="1205503.swf"><tags/><action id="1205503.swf" name=" CLOSED"/><action id="1205504.swf" name=" OPEN"/><action id="1210934.swf" name="OPENING"/><action id="1210946.swf" name="CLOSING"/></char>
			<char id="4324159" name="KTINGA SIDE OBLIQUE by solarbaby" published="1" facing="left" thumb="4324160.swf" default="4324160.swf"><tags/><action id="4324160.swf" name="DEFAULT"/><action id="4324488.swf" name=" PHASE OUT"/><action id="16409892.swf" name="cloak"/><action id="16410249.swf" name="Decloak"/><action id="16412240.swf" name="torpedoes"/></char>
			<char id="14187548" name="Hidden Sonic 2" published="1" facing="left" thumb="14187550.swf" default="14187550.swf"><tags/><action id="14187550.swf" name="Sonic Joke2"/></char>
			<char id="1148845" name="PICARD" published="1" facing="left" thumb="1151155.swf" default="1151155.swf"><tags>dematerialise</tags><action id="1148846.swf" name=" dematerialise"/><action id="1148867.swf" name="materialise"/><action id="1151103.swf" name="walk"/><action id="1151155.swf" name="stand"/><action id="1177214.swf" name="PICARD walk2"/><action id="1186425.swf" name="PICARD STANDblink"/><action id="1186691.swf" name=" STAND Talk"/><action id="1191156.swf" name=" walk left"/><action id="1191182.swf" name="STAND Talkleft"/><action id="1191241.swf" name=" STAND blink right"/><action id="1192213.swf" name="SHOCKED"/><action id="1199177.swf" name="CALCULATE"/><action id="1205275.swf" name="sit"/><action id="1205289.swf" name=" sit left"/><action id="1205301.swf" name="sit talk"/><action id="1205303.swf" name=" sit left talk"/><action id="1208145.swf" name="TURD SHOCKED"/><action id="1208198.swf" name=" TURD STAND Talkleft"/><action id="1208227.swf" name="TURD STAND left"/><action id="1211241.swf" name="SHOCKED LEFT"/><action id="1211879.swf" name="SNIFFUP"/><action id="1212111.swf" name="MAKE IT SO"/><action id="1251971.swf" name="PICARD TURBULANCE LEFT"/><action id="1252428.swf" name="TURBULANCE RIGHT"/><action id="1260543.swf" name="STANDblinkbreathe"/><action id="1260544.swf" name="blink left breathe"/><action id="1268137.swf" name="ferengi tubulance"/><action id="1280975.swf" name="mucus walk left"/><action id="1280994.swf" name="MUCUS amp STAND TALK"/><action id="1284638.swf" name="walk talk left"/><action id="1339002.swf" name="MUCUS AMPUTATED"/><action id="1946022.swf" name="make it so right"/></char>
			<char id="1687173" name="BLUE DALEK" published="1" facing="left" thumb="1687174.swf" default="1687174.swf"><tags/><action id="1687174.swf" name="DEFAULT"/><action id="1687180.swf" name="exterminate "/><action id="1687184.swf" name="movehead "/><action id="1687214.swf" name="exterminate"/><action id="1731152.swf" name="bluedalek1explode"/></char>
			<char id="1905326" name="EXCELSIOR BELOW" published="1" facing="left" thumb="1905327.swf" default="1905327.swf"><tags>excelsior dorsla default</tags><action id="1905327.swf" name="excelsior dorsla default"/><action id="1905328.swf" name=" torpedos"/></char>
			<char id="547337" name="SUSU" published="1" facing="left" thumb="547341.swf" default="547341.swf"><tags/><action id="547338.swf" name="confused"/><action id="547339.swf" name="sad"/><action id="547341.swf" name="stand"/><action id="547343.swf" name="walk"/><action id="547351.swf" name="talk"/></char>
			<char id="1687187" name="GOLD DALEK" published="1" facing="left" thumb="1687188.swf" default="1687188.swf"><tags/><action id="1687188.swf" name="DEAFAULT"/><action id="1687190.swf" name="movehead "/><action id="1687193.swf" name="Exterminate "/><action id="1687217.swf" name="exterminate2 "/><action id="1731223.swf" name="golddalek1explode"/></char>
			<char id="2959056" name="BOP AFT  by solarbaby" published="1" facing="left" thumb="2959057.swf" default="2959057.swf"><tags/><action id="2959057.swf" name=" default"/><action id="5073941.swf" name="bop AFT fire torpedos"/></char>
			<char id="1359681" name="picg" published="1" facing="left" thumb="1359682.swf" default="1359682.swf"><tags/><action id="1359682.swf" name="43_pig"/></char>
			<char id="1667228" name="JEAP" published="1" facing="left" thumb="1667586.swf" default="1667586.swf"><tags/><action id="1667230.swf" name="jeapdrive"/><action id="1667586.swf" name="jeap door close"/><action id="1667588.swf" name="jeap door open"/><action id="1667591.swf" name="jeap"/><action id="1667597.swf" name="jeap door opened"/><action id="1667819.swf" name="jeapsidedrive"/><action id="1688181.swf" name="jeapsidestill"/></char>
			<char id="1894754" name="shuttlebay by solarbaby" published="1" facing="left" thumb="1894755.swf" default="1894755.swf"><tags/><action id="1894755.swf" name="closed"/><action id="1894770.swf" name="opening"/><action id="1894772.swf" name="closing"/><action id="1894828.swf" name="opened"/><action id="57503006.swf" name="shuttle in hangar"/><action id="57504422.swf" name="shuttle hangar retract"/><action id="80107000.swf" name="shuttlebay rear"/></char>
			<char id="1198772" name="Dragon by Chaostoon" published="1" facing="left" thumb="1198773.swf" default="1198773.swf"><tags>chaostoon dragon</tags><action id="1198773.swf" name="Standing"/><action id="1198775.swf" name="Throw Fire and Hover"/><action id="1198777.swf" name="Fly"/><action id="1198779.swf" name="Landing from Fly"/><action id="1198784.swf" name="Roar / Throw Fire"/><action id="1198785.swf" name="Roar Hold"/><action id="1198787.swf" name="Sad"/><action id="1198788.swf" name="Takeoff"/><action id="1198789.swf" name="Thinking"/><action id="1198790.swf" name="Upset"/><action id="1198793.swf" name="Walk"/><action id="1198801.swf" name="Throw Fire Flying"/></char>
			<char id="1271772" name="BATOMBILE by section31" published="1" facing="left" thumb="1271787.swf" default="1271787.swf"><tags/><action id="1271773.swf" name="DRIVE HEADLIGHTS"/><action id="1271776.swf" name="parked"/><action id="1271778.swf" name="lights on"/><action id="1271779.swf" name="lights off"/><action id="1271787.swf" name="default"/></char>
			<char id="1978343" name="Filliblustes Scorpion gunship" published="1" facing="left" thumb="1978344.swf" default="1978344.swf"><tags/><action id="1978344.swf" name="default"/><action id="1978487.swf" name="credits"/><action id="1979163.swf" name=" flying"/><action id="1984354.swf" name="missiles"/></char>
			<char id="1164896" name="enterprise by solarbaby" published="1" facing="left" thumb="1164903.swf" default="1164903.swf"><tags/><action id="1164900.swf" name=" battledamaged"/><action id="1164903.swf" name="default1"/><action id="1164943.swf" name="shields2"/><action id="1893019.swf" name="enterprise redphasers"/><action id="1893020.swf" name="enterprise torpedos"/><action id="1893624.swf" name="enterprise explode"/><action id="2622755.swf" name="enterprise battledamagednofire"/><action id="2628022.swf" name="leaving warp"/><action id="2633455.swf" name="ENT TOP ZOOM"/><action id="2633476.swf" name="ENT TOP OBLIQUE"/><action id="3422424.swf" name="enterprise silhouette"/><action id="4943041.swf" name="enterprise default tholian web trapped"/><action id="4984750.swf" name="enterprise default tholian web warp"/><action id="5066009.swf" name="materialise"/><action id="5066013.swf" name="dematerialise"/><action id="5066164.swf" name="leaving warp2"/></char>
			<char id="2953867" name="bop front by solarbaby" published="1" facing="left" thumb="2953868.swf" default="2953868.swf"><tags/><action id="2953868.swf" name="default"/><action id="5093729.swf" name=" front torpedos"/><action id="5097281.swf" name="bop front explode"/></char>
			<char id="1400048" name="Klingon aft by solarbaby" published="1" facing="left" thumb="1400049.swf" default="1400049.swf"><tags/><action id="1400049.swf" name="DEFAULT"/><action id="1400050.swf" name="TORPEDOS"/><action id="1400051.swf" name="PHASERS"/><action id="1892933.swf" name="KTINGA cloak"/><action id="1892934.swf" name="KTINGA decloak"/></char>
			<char id="547316" name="GIGI" published="1" facing="left" thumb="547317.swf" default="547317.swf"><tags/><action id="547317.swf" name="stand"/><action id="547319.swf" name="shy"/><action id="547322.swf" name="sleeping"/><action id="547324.swf" name="walk"/><action id="547331.swf" name="furious"/></char>
			<char id="547369" name="Cubic Bear" published="1" facing="left" thumb="547370.swf" default="547370.swf"><tags>cubicpets</tags><action id="547370.swf" name="standing"/><action id="547374.swf" name="talking"/><action id="547380.swf" name="grabbed"/><action id="547381.swf" name="walking"/><action id="547418.swf" name="sleeping"/></char>
			<char id="1856666" name="lampost" published="1" facing="left" thumb="1856667.swf" default="1856667.swf"><tags/><action id="1856667.swf" name="default"/><action id="1856670.swf" name="on"/><action id="1856678.swf" name="shine on"/><action id="1856680.swf" name="shine off"/><action id="1856697.swf" name="flicker"/><action id="1856718.swf" name="shine"/></char>
			  <char id="gipsy" name="Gipsy" thumb="walk.swf" facing="left" default="laugh.swf" motion="walk.swf" enable="Y" is_premium="N" aid="237" money="0" sharing="0">
				<action id="laugh.swf" name="Laugh" loop="Y" totalframe="1" enable="Y" aid="238"/>
				<motion id="walk.swf" name="Walk" loop="Y" totalframe="1" enable="Y" aid="239"/>
				<action id="drool.swf" name="Drool" loop="Y" totalframe="1" enable="Y" aid="240"/>
				<action id="hit.swf" name="Get hit" loop="Y" totalframe="1" enable="Y" aid="241"/>
				<motion id="hop.swf" name="Hop" loop="Y" totalframe="1" enable="Y" aid="242"/>
				<action id="back.swf" name="Gipsy from Back" loop="Y" totalframe="1" enable="Y" aid="243"/>
				<action id="pant.swf" name="Pant" loop="Y" totalframe="1" enable="Y" aid="244"/>
				<action id="talk.swf" name="Talk" loop="Y" totalframe="1" enable="Y" aid="245"/>
			  </char>
			  <char id="ios" name="IOS" thumb="ios.swf" facing="left" default="ios.swf" motion="ios.swf" enable="Y" is_premium="N" aid="237" money="0" sharing="0">
				<action aid="6928" enable="Y" name="Be a phone" id="ios.swf" totalframe="1" loop="Y"/>
			  </char>
			  <char id="android" name="Android" thumb="android.swf" facing="left" default="android.swf" motion="android.swf" enable="Y" is_premium="N" aid="237" money="0" sharing="0">
				<action aid="6928" enable="Y" name="Be a phone" id="android.swf" totalframe="1" loop="Y"/>
			  </char></theme>`;
			const zip = nodezip.create();
			fUtil.addToZip(zip, "desc.xml", Buffer.from(tXml));
			fs.readdirSync(folder).forEach(charFolder => {
				fs.readdirSync(path.join(folder, charFolder)).forEach(file => {
					if (file.includes("head")) {
						fs.readdirSync(path.join(folder, `${charFolder}/head`)).forEach(file2 => {
							const buffer = fs.readFileSync(path.join(folder, `${charFolder}/head/${file2}`));
							fUtil.addToZip(zip, `char/${charFolder}/head/${file2}`, buffer);
						})
					} else {
						const buffer = fs.readFileSync(path.join(folder, `${charFolder}/${file}`));
						fUtil.addToZip(zip, `char/${charFolder}/${file}`, buffer);
					}
				});
			});
			res.setHeader("Content-Type", "application/zip");
			res.end(Buffer.concat([base, await zip.zip()]));
			break;
		} case "effect": {
			const folder = path.join(sFolder, "Comm/effect")
			const tXml = `<theme id="Comm" name="Community Library"><effect id="328995073.swf" name="bubbles" type="ANIME" resize="false" move="false" published="1"><tags></tags></effect><effect id="328993953.swf" name="bubbles" type="ANIME" resize="false" move="false" published="1"><tags></tags></effect><effect id="823760.swf" name="warpspeed" type="ANIME" resize="false" move="false" published="1"><tags></tags></effect><effect id="1211151.swf" name="arrowfx" type="ANIME" resize="false" move="false" published="1"><tags></tags></effect></theme>`;
			const zip = nodezip.create();
			fUtil.addToZip(zip, "desc.xml", Buffer.from(tXml));
			fs.readdirSync(folder).forEach(file => {
				const buffer = fs.readFileSync(path.join(folder, file));
				fUtil.addToZip(zip, `effect/${file}`, buffer);
			});
			res.setHeader("Content-Type", "application/zip");
			res.end(Buffer.concat([base, await zip.zip()]));
			break;
		} default: {
			https.request({ // gets asset data from GR to work with the community library
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
					const tXml = `<theme id="Comm" name="Community Library">${meta.map(Asset.meta2StoreXml).join("")}</theme>`
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
		}
	}
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
	const files = DB.select("assets", {
		type: req.body.type,
		themeId: "ugc"
	});
	for (const file of files) {
		const buffer = Asset.load(file.id, true);
		fUtil.addToZip(zip, `${file.type}/${file.id}`, buffer);
	}
	res.setHeader("Content-Type", "application/zip");
	res.end(Buffer.concat([base, await zip.zip()]));
}).route("POST", "/goapi/getUserAssetsXml/", async (req, res) => {
	let filters, themeId;
	if (req.body.type == "char") {
		switch (req.body.themeId) {
			case "custom": {
				themeId = "family";
				break;
			}
			case "action":
			case "animal":
			case "botdf":
			case "space": {
				themeId = "cc2";
				break;
			} default: themeId = req.body.themeId;
		}
		filters = {
			themeId,
			type: "char"
		};
	} else filters = req.body;
	res.setHeader("Content-Type", "application/xml");
	res.end(listAssets(filters));
}).route("POST", ["/api_v2/assets/imported","/api_v2/assets/team","/api_v2/assets/shared"], (req, res) => {
	res.assert(req.body.data.type, 400, { status: "error" });
	if (req.body.data.type == "prop") req.body.data.subtype ||= 0;

	// what's even the point of this if it still uses an xml
	// it's dumb
	res.json({
		status: "ok",
		data: {
			xml: listAssets(req.body.data)
		}
	});
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
		res.end(Asset.load(id, true));
	} catch (err) {
		if (err.message === "404") {
			res.statusCode = 404;
			res.end("1");
		} else {
			console.log("Error loading asset:", err);
			res.statusCode = 500;
			res.end("1");
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
.route("GET", /\/go\/studio\/theme\/([\S]+)/, (req, res) => res.redirect(`/go_full?tray=${req.matches[1]}&older=1`)).route("POST", "/goapi/updateAsset/", (req, res) => {
	const id = req.body.assetId;
	const title = req.body.title;
	const tags = req.body.tag;
	if (!id || !title || !tags) {
		res.statusCode = 400;
		res.end("1");
	}

	const update = {
		tags: tags,
		title: title
	}
	if (DB.update("assets", id, update)) {
		res.end("0");
	} else {
		res.statusCode = 404;
		res.end("1");
	}
})

/*
save
*/
.route("POST", "/goapi/saveProp/", async (req, res) => {
	const file = req.files.Filedata;
	res.assert(file, req.body.type, req.body.title, 400, {
		status: "error",
		msg: "Missing one or more fields."
	});

	// get the filename and extension
	const { filepath } = file;
	const origName = file.originalFilename;
	const filename = path.parse(origName).name;
	const { ext } = await fromFile(filepath);

	let info = {
		type: "prop",
		subtype: "0",
		title: filename,
	};
	info.ptype = "placeable";
	info.file = await Asset.save(filepath, ext, info);

	// stuff for the lvm
	info.enc_asset_id = info.file;
	res.setHeader("Content-Type", "application/xml");
	res.end("0<status=\"ok\" type=\"prop\" subtype=\"0\" title=\"" + info.title + "\" ptype=\"placeable\" id=\"" + info.enc_asset_id + "\" file=\"" + info.enc_asset_id + "\" enc_asset_id=\"" + info.enc_asset_id + "\" />");
})
.route("POST", "/goapi/saveBackground/", async (req, res) => {
	const file = req.files.Filedata;
	res.assert(file, req.body.title, 400, {
		status: "error",
		msg: "Missing one or more fields."
	});

	// get the filename and extension
	const { filepath } = file;
	const origName = file.originalFilename;
	const filename = path.parse(origName).name;
	const { ext } = await fromFile(filepath);

	let info = {
		type: "bg",
		subtype: "0",
		title: filename,
	};
	info.ptype = "placeable";
	info.file = await Asset.save(filepath, ext, info);

	// stuff for the lvm
	info.enc_asset_id = info.file;
	res.setHeader("Content-Type", "application/xml");
	res.end("0<status=\"ok\" type=\"bg\" subtype=\"0\" title=\"" + req.body.title + "\" id=\"" + info.enc_asset_id + "\" file=\"" + info.enc_asset_id + "\" enc_asset_id=\"" + info.enc_asset_id + "\" />");
})
.route("POST", "/goapi/saveSound/", async (req, res) => {
	console.log(req.body);
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
		if (!req.body.headable) res.end(`0<response><asset><id>${id}</id><enc_asset_id>${id}</enc_asset_id><type>sound</type><subtype>${info.subtype}</subtype><title>${info.title}</title><published>0</published><tags></tags><duration>${info.duration}</duration><downloadtype>progressive</downloadtype><file>${id}</file></asset></response>`);
		else res.end("0<status=\"ok\" downloadtype=\"progressive\" enable=\"Y\" type=\"sound\" subtype=\"" + info.subtype + "\" name=\"" + info.title + "\" tag=\"\" themeId=\"ugc\" duration=\"" + info.duration + "\" id=\"" + id + "\" file=\"" + id + "\" enc_asset_id=\"" + id + "\" />");
	});
})

module.exports = group;
