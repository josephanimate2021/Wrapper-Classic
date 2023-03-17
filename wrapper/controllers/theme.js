const httpz = require("@octanuary/httpz")
const path = require("path");
const database = require("../../data/database"), DB = new database(), DB2 = new database(true);
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
group.route("POST", "/goapi/getThemeList/", async (req, res) => {
	if (req.body.older == "1") { // i don't know (Designed for comedy world characters for some shit.)
		const tThemeZip = path.join(folder, "custom/custom.zip");
		const zip = nodezip.create();
		const files = DB.select("assets", {
			themeId: "family",
			type: "char"
		});
		var tThemeXml = `<?xml version="1.0" encoding="utf-8"?>
		<theme id="custom" name="Custom World" cc_theme_id="family">
		  <background id="living_room_bg.swf" name="Living room" enable="N" default="N" is_premium="N" aid="9811" money="0" sharing="0"/>
		  <background id="barn_ext_bg.swf" name="Y" enable="N" default="N" is_premium="N" aid="9700" money="0" sharing="0">
			<colorset enable="Y" aid="9701">
		  <color r="ccColorA">0xC2493E</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </background>
		  <background id="changing_room_bg.swf" name="Y" enable="N" default="N" is_premium="N" aid="9699" money="0" sharing="0"/>
		  <background id="battlefield_bg.swf" name="Y" enable="N" default="N" is_premium="N" aid="9698" money="0" sharing="0"/>
		  <background id="camp_int_bg.swf" name="Y" enable="N" default="N" is_premium="N" aid="9697" money="0" sharing="0"/>
		  <background id="army_camp_close_bg.swf" name="Army camp (close up)" enable="N" default="N" is_premium="N" aid="9658" money="0" sharing="0"/>
		  <background id="army_camp_bg.swf" name="Army camp (wide)" enable="N" default="N" is_premium="N" aid="9611" money="0" sharing="0"/>
		  <background id="toilet_bg.swf" name="Toilet" enable="N" default="N" is_premium="N" aid="9609" money="0" sharing="0">
			<colorset enable="Y" aid="9610">
		  <color r="ccColorA">0xCE9493</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </background>
		  <background id="basketball_court02_bg.swf" name="Basketball court (exterior)" enable="N" default="N" is_premium="N" aid="9608" money="0" sharing="0"/>
		  <background id="basketball_court01_bg.swf" name="Basketball court (interior)" enable="N" default="N" is_premium="N" aid="9606" money="0" sharing="0">
			<colorset enable="Y" aid="9607">
		  <color r="ccColorA">0xEBC270</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </background>
		  <background id="blackboard.swf" name="Blackboard" enable="N" default="N" is_premium="N" aid="9604" money="0" sharing="0">
			<colorset enable="Y" aid="9605">
		  <color r="ccColorA">0x1B211F</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </background>
		  <background id="school_ext_bg.swf" name="School exterior" enable="N" default="N" is_premium="N" aid="9603" money="0" sharing="0"/>
		  <background id="classroom_bg.swf" name="Classroom" enable="N" default="N" is_premium="N" aid="9537" money="0" sharing="0">
			<colorset enable="Y" aid="9538">
		  <color r="ccColorA">0x859459</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </background>
		  <background id="school_locker_bg.swf" name="School Locker Area" enable="N" default="N" is_premium="N" aid="9535" money="0" sharing="0">
			<colorset enable="Y" aid="9536">
		  <color r="ccColorA">0x839559</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </background>
		  <background id="barn_int_bg.swf" name="Y" enable="N" default="N" is_premium="N" aid="9702" money="0" sharing="0">
			<colorset enable="N" aid="9703">
		  <color r="ccColorA">0xFDF3BE</color>
		  <color r="ccColorB">0xFFF4DD</color>
		</colorset>
			<c_parts enable="N">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </background>
		  <background id="kitchen02_bg.swf" name="Y" enable="N" default="N" is_premium="N" aid="9704" money="0" sharing="0">
			<colorset enable="Y" aid="9705">
		  <color r="ccColorA">0xFDF3BE</color>
		  <color r="ccColorB">0xFFF4DD</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </background>
		  <background id="boy_rm_bg.swf" name="" enable="N" default="N" is_premium="N" aid="9733" money="0" sharing="0"/>
		  <background id="disco_bg.swf" name="Disco entrance" enable="N" default="N" is_premium="N" aid="9810" money="0" sharing="0"/>
		  <background id="bar_bg.swf" name="Bar" enable="N" default="N" is_premium="N" aid="9809" money="0" sharing="0"/>
		  <background id="cockpit_bg.swf" name="Plane cockpit" enable="N" default="N" is_premium="N" aid="9808" money="0" sharing="0"/>
		  <background id="airport_security_bg.swf" name="Airport security check" enable="N" default="N" is_premium="N" aid="9778" money="0" sharing="0"/>
		  <background id="airport_waiting_bg.swf" name="Airport boarding gate" enable="N" default="N" is_premium="N" aid="9777" money="0" sharing="0"/>
		  <background id="airport_lobby_bg.swf" name="Airport check in" enable="N" default="N" is_premium="N" aid="9776" money="0" sharing="0"/>
		  <background id="oscar_sit_bg.swf" name="Movie theatre" enable="N" default="N" is_premium="N" aid="9775" money="0" sharing="0"/>
		  <background id="oscar_stage_bg.swf" name="Awards ceremony" enable="N" default="N" is_premium="N" aid="9774" money="0" sharing="0"/>
		  <background id="coffee_shop_bg.swf" name="Coffee shop" enable="N" default="N" is_premium="N" aid="9751" money="0" sharing="0"/>
		  <background id="bus_stop_bg.swf" name="Bus Stop" enable="N" default="N" is_premium="N" aid="9750" money="0" sharing="0"/>
		  <background id="donut_shop_bg.swf" name="Donut Shop" enable="N" default="N" is_premium="N" aid="9749" money="0" sharing="0"/>
		  <background id="shower_room_bg.swf" name="Shower room" enable="N" default="N" is_premium="N" aid="9748" money="0" sharing="0"/>
		  <background id="girl_rm_bg.swf" name="" enable="N" default="N" is_premium="N" aid="9734" money="0" sharing="0"/>
		  <background id="restaurnat_ext_day_bg.swf" name="French restaurant Day" enable="N" default="N" is_premium="N" aid="9534" money="0" sharing="0"/>
		  <background id="restaurant_ext_bg.swf" name="French restaurant Night" enable="N" default="N" is_premium="N" aid="9533" money="0" sharing="0"/>
		  <background id="white_house_ext_bg.swf" name="White house" enable="N" default="N" is_premium="N" aid="9061" money="0" sharing="0"/>
		  <background id="white_house_bg.swf" name="Oval office" enable="N" default="N" is_premium="N" aid="9060" money="0" sharing="0"/>
		  <background id="subway_station_bg.swf" name="Subway station" enable="N" default="N" is_premium="N" aid="9058" money="0" sharing="0"/>
		  <background id="sitting_room_bg.swf" name="Sitting room" enable="N" default="N" is_premium="N" aid="9057" money="0" sharing="0"/>
		  <background id="restaurant_bg.swf" name="Restaurant" enable="N" default="N" is_premium="N" aid="9056" money="0" sharing="0"/>
		  <background id="office_pentry_bg.swf" name="Office pantry" enable="N" default="N" is_premium="N" aid="9055" money="0" sharing="0"/>
		  <background id="office_bg.swf" name="Office" enable="N" default="N" is_premium="N" aid="9054" money="0" sharing="0"/>
		  <background id="kitchen_bg.swf" name="Kitchen" enable="N" default="N" is_premium="N" aid="9053" money="0" sharing="0"/>
		  <background id="bedroom_bg.swf" name="Bedroom" enable="N" default="N" is_premium="N" aid="9052" money="0" sharing="0"/>
		  <background id="outside.swf" name="Outside" enable="N" default="N" is_premium="N" aid="9051" money="0" sharing="0"/>
		  <background id="library.swf" name="Library" enable="N" default="N" is_premium="N" aid="9050" money="0" sharing="0"/>
		  <background id="dining_room.swf" name="Reception hall" enable="N" default="N" is_premium="N" aid="9049" money="0" sharing="0"/>
		  <background id="corridor.swf" name="Corridor" enable="N" default="N" is_premium="N" aid="9048" money="0" sharing="0"/>
		  <background id="toy_workshop_bg.swf" name="Toy workshop" enable="N" default="N" is_premium="N" aid="9062" money="0" sharing="0"/>
		  <background id="santacastle.swf" name="Santa Castle" enable="N" default="N" is_premium="N" aid="9063" money="0" sharing="0"/>
		  <background id="restaurant_int_bg.swf" name="French restaurant Interior" enable="N" default="N" is_premium="N" aid="9531" money="0" sharing="0">
			<colorset enable="Y" aid="9532">
		  <color r="ccColorA">0x5B3E52</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </background>
		  <background id="office_bg02.swf" name="Office" enable="N" default="N" is_premium="N" aid="9529" money="0" sharing="0">
			<colorset enable="Y" aid="9530">
		  <color r="ccColorA">0x808A89</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </background>
		  <background id="hospital_lab_bg.swf" name="Hospital lab" enable="N" default="N" is_premium="N" aid="9141" money="0" sharing="0"/>
		  <background id="hospital_rm_bg.swf" name="Hospital room" enable="N" default="N" is_premium="N" aid="9140" money="0" sharing="0"/>
		  <background id="supermarket_bg.swf" name="Supermarket" enable="N" default="N" is_premium="N" aid="9139" money="0" sharing="0"/>
		  <background id="police_station_bg.swf" name="Police station" enable="N" default="N" is_premium="N" aid="9138" money="0" sharing="0"/>
		  <background id="house_ext_bg.swf" name="house ext" enable="N" default="N" is_premium="N" aid="9137" money="0" sharing="0"/>
		  <background id="front_yard_bg.swf" name="Front yard" enable="N" default="N" is_premium="N" aid="9136" money="0" sharing="0"/>
		  <background id="court_room_interior_bg.swf" name="Court room" enable="N" default="N" is_premium="N" aid="9135" money="0" sharing="0"/>
		  <background id="court_room_ext_bg.swf" name="Court room" enable="N" default="N" is_premium="N" aid="9134" money="0" sharing="0"/>
		  <background id="convinient_store_cashier_bg.swf" name="Convinient store cashier" enable="N" default="N" is_premium="N" aid="9133" money="0" sharing="0"/>
		  <background id="convinient_store_bg.swf" name="Convinient store" enable="N" default="N" is_premium="N" aid="9132" money="0" sharing="0"/>
		  <background id="classroom.swf" name="Potion room" enable="N" default="N" is_premium="N" aid="9047" money="0" sharing="0"/>
		  <background id="snowynight.swf" name="Snowy Night" enable="Y" default="N" is_premium="N" aid="9064" money="0" sharing="0"/>
		  <background id="subway_train_bg.swf" name="Subway train" enable="N" default="N" is_premium="N" aid="9059" money="0" sharing="0"/>
		  <compositebg id="cbg_bedroom" name="Bedroom" enable="Y" default="Y" thumb="bedroom.png" display_order="1" is_premium="N" money="0" sharing="0" aid="9065">
		  <bg id="cbg_bedroom_BG65" index="0">
			<file>custom.bedroom_bg.swf</file>
		  </bg>
		  <prop id="cbg_bedroom_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bedroom_PROP40" index="4">
			<file>custom.bedroom_lamp.swf</file>
			<x>422</x>
			<y>207</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bedroom_PROP43" index="5">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP48" index="3">
			<file>custom.bedroom_drawer02.swf</file>
			<x>422.6</x>
			<y>280.7</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP49" index="6">
			<file>custom.bedroom_blanket_bed.swf</file>
			<x>434</x>
			<y>251</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_kitchen" name="Kitchen" enable="Y" default="N" thumb="kitchen.png" display_order="2" is_premium="N" money="0" sharing="0" aid="9066">
		  <bg id="cbg_kitchen_BG76" index="0">
			<file>custom.kitchen_bg.swf</file>
		  </bg>
		  <prop id="cbg_kitchen_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_kitchen_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_kitchen_PROP49" index="4">
			<file>custom.kitchen_microwave01.swf</file>
			<x>345</x>
			<y>194</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_kitchen_PROP50" index="5">
			<file>custom.kitchen_refig.swf</file>
			<x>528</x>
			<y>201</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_kitchen_PROP51" index="6">
			<file>custom.kitchen_cup.swf</file>
			<x>423</x>
			<y>211</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_sittingroom" name="Sitting room" enable="Y" default="N" thumb="sitting_room.png" display_order="3" is_premium="N" money="0" sharing="0" aid="9074">
		  <bg id="cbg_sittingroom_BG260" index="0">
			<file>custom.sitting_room_bg.swf</file>
		  </bg>
		  <prop id="cbg_sittingroom_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_sittingroom_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_sittingroom_PROP74" index="4">
			<file>custom.sitting_room_lamp.swf</file>
			<x>446</x>
			<y>246</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_sittingroom_PROP75" index="6">
			<file>custom.sitting_room_plant.swf</file>
			<x>107</x>
			<y>245</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP8" index="5">
			<file>custom.sitting_room_sofa2.swf</file>
			<x>290</x>
			<y>256</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP9" index="7">
			<file>custom.sitting_room_sofa.swf</file>
			<x>561</x>
			<y>279</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_office_pentry" name="Office Pentry" enable="Y" default="N" thumb="office_pentry.png" display_order="4" is_premium="N" money="0" sharing="0" aid="9068">
		  <bg id="cbg_office_pentry_BG102" index="0">
			<file>custom.office_pentry_bg.swf</file>
		  </bg>
		  <prop id="cbg_office_pentry_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_pentry_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_pentry_PROP71" index="4">
			<file>custom.office_pentry_coffee.swf</file>
			<x>120</x>
			<y>190</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_pentry_PROP72" index="5">
			<file>custom.office_pentry_water_dispenser.swf</file>
			<x>445</x>
			<y>245</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_office" name="Office" enable="Y" default="N" thumb="office.png" display_order="5" is_premium="N" money="0" sharing="0" aid="9067">
		  <bg id="cbg_office_BG86" index="0">
			<file>custom.office_bg.swf</file>
		  </bg>
		  <prop id="cbg_office_PROP62" index="2">
			<file>custom.office_chair02.swf</file>
			<x>307</x>
			<y>254</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_PROP61" index="3">
			<file>custom.office_chair01.swf</file>
			<x>270</x>
			<y>267</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_PROP60" index="4">
			<file>custom.office_flag.swf</file>
			<x>511</x>
			<y>173</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_PROP58" index="5">
			<file>custom.office_chair.swf</file>
			<x>462</x>
			<y>266</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_PROP21" index="6">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_PROP43" index="7">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_PROP57" index="8">
			<file>custom.office_table.swf</file>
			<x>377</x>
			<y>283</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_PROP59" index="9">
			<file>custom.office_plant.swf</file>
			<x>580</x>
			<y>213</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_oval_office" name="Oval office" enable="Y" default="N" thumb="white_house.png" display_order="6" is_premium="N" money="0" sharing="0" aid="9070">
		  <bg id="cbg_oval_office_BG146" index="0">
			<file>custom.white_house_bg.swf</file>
		  </bg>
		  <prop id="cbg_oval_office_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oval_office_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oval_office_PROP30" index="4">
			<file>custom.white_house_wall.swf</file>
			<x>325.2</x>
			<y>199.8</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oval_office_PROP31" index="5">
			<file>custom.white_house_clothes.swf</file>
			<x>269.2</x>
			<y>141.8</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oval_office_PROP32" index="6">
			<file>custom.white_house_flag.swf</file>
			<x>103.2</x>
			<y>156.8</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oval_office_PROP33" index="7">
			<file>custom.white_house_flag.swf</file>
			<x>317.2</x>
			<y>160.8</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oval_office_PROP34" index="8">
			<file>custom.white_house_chair.swf</file>
			<x>225.2</x>
			<y>226.8</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oval_office_PROP35" index="9">
			<file>custom.white_house_table.swf</file>
			<x>231.2</x>
			<y>253.8</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oval_office_PROP36" index="10">
			<file>custom.white_house_sofa.swf</file>
			<x>520.2</x>
			<y>264.8</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_white_house" name="White house" enable="Y" default="N" thumb="white_house_ext.png" display_order="7" is_premium="N" money="0" sharing="0" aid="9075">
		  <bg id="cbg_white_house_BG273" index="0">
			<file>custom.white_house_ext_bg.swf</file>
		  </bg>
		  <prop id="cbg_white_house_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_white_house_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_white_house_PROP83" index="4">
			<file>custom.white_house_ext_house.swf</file>
			<x>315</x>
			<y>180</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_white_house_PROP84" index="5">
			<file>custom.white_house_ext_tree02.swf</file>
			<x>504</x>
			<y>249</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_white_house_PROP85" index="6">
			<file>custom.white_house_ext_tree01.swf</file>
			<x>151</x>
			<y>255</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_subway_train" name="Subway train" enable="Y" default="N" thumb="subway_train.png" display_order="7" is_premium="N" money="0" sharing="0" aid="9069">
		  <bg id="cbg_subway_train_BG137" index="0">
			<file>custom.subway_train_bg.swf</file>
		  </bg>
		  <prop id="cbg_subway_train_PROP102" index="2">
			<file>custom.subway_train_chair02.swf</file>
			<x>164.4</x>
			<y>249.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subway_train_PROP21" index="3">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subway_train_PROP43" index="4">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subway_train_PROP99" index="5">
			<file>custom.subway_train_door.swf</file>
			<x>510</x>
			<y>203</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subway_train_PROP101" index="6">
			<file>custom.subway_train_chair.swf</file>
			<x>283</x>
			<y>289</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subway_train_PROP100" index="7">
			<file>custom.subway_train_stand.swf</file>
			<x>282</x>
			<y>144</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_subwaystaton" name="Subway station" enable="Y" default="N" thumb="subway_station.png" display_order="8" is_premium="N" money="0" sharing="0" aid="9073">
		  <bg id="cbg_subwaystaton_BG246" index="0">
			<file>custom.subway_station_bg.swf</file>
		  </bg>
		  <prop id="cbg_subwaystaton_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP61" index="4">
			<file>custom.subway_station_train.swf</file>
			<x>74</x>
			<y>201</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP65" index="5">
			<file>custom.subway_station_trash.swf</file>
			<x>257</x>
			<y>295</y>
			<xscale>1.23</xscale>
			<yscale>1.23</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP64" index="6">
			<file>custom.subway_station_stair.swf</file>
			<x>507</x>
			<y>195</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP62" index="7">
			<file>custom.subway_station_trash.swf</file>
			<x>578</x>
			<y>297</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP74" index="8">
			<file>custom.subway_station_prop01.swf</file>
			<x>319</x>
			<y>212</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP76" index="9">
			<file>custom.subway_station_trash.swf</file>
			<x>274</x>
			<y>254</y>
			<xscale>1.29</xscale>
			<yscale>1.29</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP63" index="10">
			<file>custom.subway_station_chair.swf</file>
			<x>282</x>
			<y>259</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_subwaystaton_PROP75" index="11">
			<file>custom.subway_station_trash.swf</file>
			<x>584</x>
			<y>261</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_restaurant" name="Restaurant" enable="Y" default="N" thumb="restaurant.png" display_order="9" is_premium="N" money="0" sharing="0" aid="9072">
		  <bg id="cbg_restaurant_BG220" index="0">
			<file>custom.restaurant_bg.swf</file>
		  </bg>
		  <prop id="cbg_restaurant_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_restaurant_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_restaurant_PROP57" index="4">
			<file>custom.restaurant_table.swf</file>
			<x>338</x>
			<y>307</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_restaurant_PROP58" index="5">
			<file>custom.restaurant_lamp.swf</file>
			<x>152</x>
			<y>74</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_restaurant_PROP59" index="6">
			<file>custom.restaurant_lamp.swf</file>
			<x>512</x>
			<y>74</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_restaurant_PROP60" index="7">
			<file>custom.restaurant_picture.swf</file>
			<x>342</x>
			<y>92</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_convinient_store" name="Convenient store" enable="Y" default="N" thumb="convinient_store.jpg" display_order="10" is_premium="N" money="0" sharing="0" aid="9142">
		  <bg id="cbg_convinient_store_BG2" index="0">
			<file>custom.convinient_store_bg.swf</file>
		  </bg>
		  <prop id="cbg_convinient_store_PROP0" index="2">
			<file>custom.convinient_store_tray.swf</file>
			<x>175</x>
			<y>233</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_convinient_store_cashier" name="Counter" enable="Y" default="N" thumb="convinient_store_cashier.jpg" display_order="11" is_premium="N" money="0" sharing="0" aid="9143">
		  <bg id="cbg_convinient_store_cashier_BG58" index="0">
			<file>custom.convinient_store_cashier_bg.swf</file>
		  </bg>
		  <prop id="cbg_convinient_store_cashier_PROP38" index="2">
			<file>custom.convinient_store_cashier_counter.swf</file>
			<x>345</x>
			<y>241</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_court_ext" name="Courthouse" enable="Y" default="N" thumb="court_room_ext.jpg" display_order="12" is_premium="N" money="0" sharing="0" aid="9144">
		  <bg id="cbg_court_ext_BG37" index="0">
			<file>custom.court_room_ext_bg.swf</file>
		  </bg>
		  <prop id="cbg_court_ext_PROP21" index="2">
			<file>custom.msp_building_name.msp_building_name_court_room_ext_title_courthouse.swf</file>
			<x>402</x>
			<y>141</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_court_ext_PROP26" index="3">
			<file>custom.court_room_ext_collum.swf</file>
			<x>414</x>
			<y>217</y>
			<xscale>1</xscale>
			<yscale>0.97</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_court_ext_PROP27" index="4">
			<file>custom.court_room_ext_collum.swf</file>
			<x>379</x>
			<y>216</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_court_interior" name="Courtroom" enable="Y" default="N" thumb="court_room_interior.jpg" display_order="13" is_premium="N" money="0" sharing="0" aid="9145">
		  <bg id="cbg_court_interior_BG45" index="0">
			<file>custom.court_room_interior_bg.swf</file>
		  </bg>
		  <prop id="cbg_court_interior_PROP28" index="2">
			<file>custom.court_room_chair02.swf</file>
			<x>85</x>
			<y>235</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_court_interior_PROP29" index="3">
			<file>custom.court_room_table01.swf</file>
			<x>94</x>
			<y>254</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_court_interior_PROP30" index="4">
			<file>custom.court_room_chair02.swf</file>
			<x>104</x>
			<y>264</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_court_interior_PROP31" index="5">
			<file>custom.court_room_table02.swf</file>
			<x>110</x>
			<y>288</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_court_interior_PROP32" index="6">
			<file>custom.court_room_chair01.swf</file>
			<x>456</x>
			<y>267</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_court_interior_PROP33" index="7">
			<file>custom.court_room_table03.swf</file>
			<x>437</x>
			<y>335</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_frontyard" name="Front yard" enable="Y" default="N" thumb="front_yard.jpg" display_order="14" is_premium="N" money="0" sharing="0" aid="9146">
		  <bg id="cbg_frontyard_BG52" index="0">
			<file>custom.front_yard_bg.swf</file>
		  </bg>
		  <prop id="cbg_frontyard_PROP34" index="2">
			<file>custom.msp_door.msp_door_front_yard_house_door_opened.swf</file>
			<x>192</x>
			<y>148</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_frontyard_PROP35" index="3">
			<file>custom.front_yard_house.swf</file>
			<x>146</x>
			<y>96</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_frontyard_PROP36" index="4">
			<file>custom.front_yard_tree.swf</file>
			<x>486</x>
			<y>82</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_frontyard_PROP37" index="5">
			<file>custom.front_yard_sign.swf</file>
			<x>353</x>
			<y>212</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_hospital_lab" name="Hospital" enable="Y" default="N" thumb="hospital_lab.jpg" display_order="15" is_premium="N" money="0" sharing="0" aid="9147">
		  <bg id="cbg_hospital_lab_BG2" index="0">
			<file>custom.hospital_lab_bg.swf</file>
		  </bg>
		  <prop id="cbg_hospital_lab_PROP1" index="3">
			<file>custom.hospital_rm_hanger.swf</file>
			<x>104</x>
			<y>244</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP17" index="2">
			<file>custom.hospital_lab_bed2.swf</file>
			<x>261</x>
			<y>297</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_hospital_rm" name="Hospital room" enable="Y" default="N" thumb="hospital_rm.jpg" display_order="16" is_premium="N" money="0" sharing="0" aid="9148">
		  <bg id="cbg_hospital_rm_BG2" index="0">
			<file>custom.hospital_rm_bg.swf</file>
		  </bg>
		  <prop id="cbg_hospital_rm_PROP0" index="2">
			<file>custom.hospital_rm_bed.swf</file>
			<x>256</x>
			<y>283</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_hospital_rm_PROP1" index="3">
			<file>custom.msp_hosiptal_blanket.msp_hosiptal_blanket_hospital_rm_blanket_full.swf</file>
			<x>254.5</x>
			<y>278.3</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_hospital_rm_PROP2" index="4">
			<file>custom.hospital_rm_hanger.swf</file>
			<x>123.5</x>
			<y>223.3</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_police_station" name="Interrogation room" enable="Y" default="N" thumb="police_station.jpg" display_order="17" is_premium="N" money="0" sharing="0" aid="9149">
		  <bg id="cbg_police_station_BG2" index="0">
			<file>custom.police_station_bg.swf</file>
		  </bg>
		  <prop id="cbg_police_station_PROP3" index="2">
			<file>custom.police_station_chair.swf</file>
			<x>208</x>
			<y>298</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_police_station_PROP2" index="3">
			<file>custom.police_station_chair.swf</file>
			<x>408</x>
			<y>298</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_police_station_PROP1" index="4">
			<file>custom.police_station_table.swf</file>
			<x>306.9</x>
			<y>313</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_supermarket" name="Supermarket" enable="Y" default="N" thumb="supermarket.jpg" display_order="18" is_premium="N" money="0" sharing="0" aid="9150">
		  <bg id="cbg_supermarket_BG300" index="0">
			<file>custom.supermarket_bg.swf</file>
		  </bg>
		  <prop id="cbg_supermarket_cbg_bedroom_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_supermarket_cbg_bedroom_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_supermarket_PROP32" index="4">
			<file>custom.supermarket_cloth_tray.swf</file>
			<x>391</x>
			<y>190</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_supermarket_PROP33" index="5">
			<file>custom.supermarket_pants_tray.swf</file>
			<x>163</x>
			<y>206</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_house_ext" name="House" enable="Y" default="N" thumb="house_ext.jpg" display_order="19" is_premium="N" money="0" sharing="0" aid="9151">
		  <bg id="cbg_house_ext_BG2" index="0">
			<file>custom.house_ext_bg.swf</file>
		  </bg>
		</compositebg>
		  <compositebg id="cbg_office_02" name="Office" enable="Y" default="N" thumb="office02.jpg" display_order="20" is_premium="N" money="0" sharing="0" aid="9539">
		  <bg id="cbg_office_02_BG15" index="0">
			<file>custom.office_bg02.swf</file>
			<color r="ccColorA" oc="0x0">8424073</color>
		  </bg>
		  <prop id="cbg_office_02_PROP8" index="2">
			<file>custom.office_table03.swf</file>
			<x>409.5</x>
			<y>232.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP0" index="3">
			<file>custom.office_table03.swf</file>
			<x>194.5</x>
			<y>231.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP3" index="4">
			<file>custom.office_table02.swf</file>
			<x>54.5</x>
			<y>231.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP47" index="5">
			<file>custom.office_chair.swf</file>
			<x>69.5</x>
			<y>272.6</y>
			<xscale>0.67</xscale>
			<yscale>0.67</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP26" index="6">
			<file>custom.office_table02.swf</file>
			<x>551.5</x>
			<y>231.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP43" index="7">
			<file>custom.office_chair.swf</file>
			<x>530.5</x>
			<y>273.6</y>
			<xscale>0.67</xscale>
			<yscale>0.67</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP2" index="8">
			<file>custom.office_board.swf</file>
			<x>160.5</x>
			<y>232.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP10" index="9">
			<file>custom.office_board.swf</file>
			<x>442.5</x>
			<y>233.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP41" index="10">
			<file>custom.office_table01.swf</file>
			<x>306.5</x>
			<y>248.6</y>
			<xscale>1.02</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP49" index="11">
			<file>custom.cc_calendar.swf</file>
			<x>318.5</x>
			<y>215.6</y>
			<xscale>0.54</xscale>
			<yscale>0.54</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_PROP46" index="12">
			<file>custom.office_chair.swf</file>
			<x>309.5</x>
			<y>277.6</y>
			<xscale>0.67</xscale>
			<yscale>0.67</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP52" index="13">
			<file>custom.office_plant.swf</file>
			<x>162.5</x>
			<y>266.6</y>
			<xscale>0.49</xscale>
			<yscale>0.49</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP53" index="14">
			<file>custom.msp_computer.msp_computer_cc_computer02.swf</file>
			<x>362.5</x>
			<y>241.6</y>
			<xscale>0.81</xscale>
			<yscale>0.81</yscale>
			<face>-1</face>
			<rotation>0</rotation>
			<color r="ccColorA" oc="0x0">13421772</color>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_office_02_non" name="Office" enable="Y" default="N" thumb="office02b.jpg" display_order="21" is_premium="N" money="0" sharing="0" aid="9659">
		  <bg id="cbg_office_02_non_cbg_office_02_BG15" index="0">
			<file>custom.office_bg02.swf</file>
			<color r="ccColorA" oc="0x0">8424073</color>
		  </bg>
		  <prop id="cbg_office_02_non_cbg_office_02_PROP8" index="2">
			<file>custom.office_table03.swf</file>
			<x>409.5</x>
			<y>232.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_non_cbg_office_02_PROP0" index="3">
			<file>custom.office_table03.swf</file>
			<x>194.5</x>
			<y>231.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_non_cbg_office_02_PROP3" index="4">
			<file>custom.office_table02.swf</file>
			<x>54.5</x>
			<y>231.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_non_cbg_office_02_PROP47" index="5">
			<file>custom.office_chair.swf</file>
			<x>69.5</x>
			<y>272.6</y>
			<xscale>0.67</xscale>
			<yscale>0.67</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_non_cbg_office_02_PROP26" index="6">
			<file>custom.office_table02.swf</file>
			<x>551.5</x>
			<y>231.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_non_cbg_office_02_PROP43" index="7">
			<file>custom.office_chair.swf</file>
			<x>530.5</x>
			<y>273.6</y>
			<xscale>0.67</xscale>
			<yscale>0.67</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_non_cbg_office_02_PROP2" index="8">
			<file>custom.office_board.swf</file>
			<x>160.5</x>
			<y>232.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_office_02_non_cbg_office_02_PROP10" index="9">
			<file>custom.office_board.swf</file>
			<x>442.5</x>
			<y>233.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_rest_int" name="Restaurant interior" enable="Y" default="N" thumb="restautrant_inside.jpg" display_order="22" is_premium="N" money="0" sharing="0" aid="9540">
		  <bg id="BG2" index="0">
			<file>custom.restaurant_int_bg.swf</file>
			<dcsn>9532</dcsn>
			<color r="ccColorA" oc="0x0">5979730</color>
		  </bg>
		  <prop id="PROP0" index="1">
			<file>custom.restaurant_int_column.swf</file>
			<x>324.1</x>
			<y>144.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP1" index="5">
			<file>custom.restaurant_int_table.swf</file>
			<x>569.1</x>
			<y>272.6</y>
			<xscale>0.59</xscale>
			<yscale>0.59</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP2" index="4">
			<file>custom.restaurant_int_chair.swf</file>
			<x>524.8</x>
			<y>235.1</y>
			<xscale>0.64</xscale>
			<yscale>0.64</yscale>
			<face>-1</face>
			<rotation>0</rotation>
			<dcsn>9516</dcsn>
			<color r="ccColorA" oc="0x0">7021109</color>
		  </prop>
		  <prop id="PROP3" index="6">
			<file>custom.restaurant_int_table.swf</file>
			<x>26.1</x>
			<y>291.6</y>
			<xscale>0.72</xscale>
			<yscale>0.72</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP4" index="3">
			<file>custom.restaurant_int_chair.swf</file>
			<x>79.1</x>
			<y>250.6</y>
			<xscale>0.72</xscale>
			<yscale>0.72</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9516</dcsn>
			<color r="ccColorA" oc="0x0">7021109</color>
		  </prop>
		  <prop id="PROP5" index="9">
			<file>custom.restaurant_int_table.swf</file>
			<x>312.1</x>
			<y>329.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP6" index="7">
			<file>custom.restaurant_int_chair.swf</file>
			<x>417.9</x>
			<y>286.2</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9516</dcsn>
			<color r="ccColorA" oc="0x0">7021109</color>
		  </prop>
		  <prop id="PROP7" index="8">
			<file>custom.restaurant_int_chair.swf</file>
			<x>198.9</x>
			<y>285.2</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
			<dcsn>9516</dcsn>
			<color r="ccColorA" oc="0x0">7021109</color>
		  </prop>
		  <prop id="PROP8" index="11">
			<file>custom.msp_dishes.msp_dishes_restaurant_int_food.swf</file>
			<x>366.1</x>
			<y>249.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP9" index="13">
			<file>custom.msp_dishes.msp_dishes_restaurant_int_food.swf</file>
			<x>258.1</x>
			<y>248.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP10" index="10">
			<file>custom.cc_vase.swf</file>
			<x>576</x>
			<y>206</y>
			<xscale>0.97</xscale>
			<yscale>0.58</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9205</dcsn>
			<color r="ccColorA" oc="0x0">10027008</color>
		  </prop>
		  <prop id="PROP11" index="12">
			<file>custom.cc_vase.swf</file>
			<x>31</x>
			<y>216</y>
			<xscale>0.97</xscale>
			<yscale>0.58</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9205</dcsn>
			<color r="ccColorA" oc="0x0">10027008</color>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_rest_night" name="Restaurant nighttime" enable="Y" default="N" thumb="restaurant_night.jpg" display_order="23" is_premium="N" money="0" sharing="0" aid="9541">
		  <bg id="BG2" index="0">
			<file>custom.restaurant_ext_bg.swf</file>
		  </bg>
		  <prop id="PROP0" index="3">
			<file>custom.restaurant_ext_booth.swf</file>
			<x>95</x>
			<y>267</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP1" index="2">
			<file>custom.msp_door02.msp_door02_restaurant_ext_doorclosed.swf</file>
			<x>239</x>
			<y>289</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9512</dcsn>
			<color r="ccColorA" oc="0x0">5783370</color>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_rest_day" name="Restaurant daytime" enable="Y" default="N" thumb="restaurant_day.jpg" display_order="24" is_premium="N" money="0" sharing="0" aid="9542">
		  <bg id="BG5" index="0">
			<file>custom.restaurnat_ext_day_bg.swf</file>
		  </bg>
		  <prop id="PROP0" index="3">
			<file>custom.restaurant_ext_booth.swf</file>
			<x>95</x>
			<y>267</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP1" index="2">
			<file>custom.msp_door02.msp_door02_restaurant_ext_doorclosed.swf</file>
			<x>239</x>
			<y>289</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9512</dcsn>
			<color r="ccColorA" oc="0x0">5783370</color>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_school_locker" name="School locker area" enable="Y" default="N" thumb="school_locker.jpg" display_order="25" is_premium="N" money="0" sharing="0" aid="9543">
		  <bg id="BG2" index="0">
			<file>custom.school_locker_bg.swf</file>
			<dcsn>9536</dcsn>
			<color r="ccColorA" oc="0x0">8623449</color>
		  </bg>
		  <prop id="PROP0" index="2">
			<file>custom.school_locker.swf</file>
			<x>460</x>
			<y>197</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP1" index="3">
			<file>custom.school_locker_open.swf</file>
			<x>493</x>
			<y>196</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_classroom" name="Classroom" enable="Y" default="N" thumb="classroom.jpg" display_order="26" is_premium="N" money="0" sharing="0" aid="9544">
		  <bg id="BG2" index="0">
			<file>custom.classroom_bg.swf</file>
			<dcsn>9538</dcsn>
			<color r="ccColorA" oc="0x0">8754265</color>
		  </bg>
		  <prop id="PROP0" index="2">
			<file>custom.classrm_tech_table.swf</file>
			<x>236</x>
			<y>287</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP1" index="3">
			<file>custom.classrm_tech_chair.swf</file>
			<x>523.5</x>
			<y>255</y>
			<xscale>0.79</xscale>
			<yscale>0.79</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP2" index="4">
			<file>custom.classrm_stu_table.swf</file>
			<x>476.5</x>
			<y>263</y>
			<xscale>0.65</xscale>
			<yscale>0.65</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP3" index="6">
			<file>custom.classrm_stu_table.swf</file>
			<x>512.5</x>
			<y>289</y>
			<xscale>0.8</xscale>
			<yscale>0.8</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP4" index="8">
			<file>custom.classrm_stu_table.swf</file>
			<x>551.5</x>
			<y>318</y>
			<xscale>0.92</xscale>
			<yscale>0.92</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP5" index="5">
			<file>custom.classrm_tech_chair.swf</file>
			<x>558.5</x>
			<y>275</y>
			<xscale>0.92</xscale>
			<yscale>0.92</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP6" index="7">
			<file>custom.classrm_tech_chair.swf</file>
			<x>599.5</x>
			<y>296</y>
			<xscale>1.12</xscale>
			<yscale>1.12</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_school_ext" name="School exterior" enable="Y" default="N" thumb="school_ext.jpg" display_order="28" is_premium="N" money="0" sharing="0" aid="9612">
		  <bg id="cbg_school_ext_BG2" index="0">
			<file>custom.school_ext_bg.swf</file>
		  </bg>
		  <prop id="cbg_school_ext_PROP3" index="2">
			<file>custom.school_ext_gate.swf</file>
			<x>287</x>
			<y>248</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_school_ext_PROP0" index="3">
			<file>custom.school_ext_tree01.swf</file>
			<x>79</x>
			<y>215</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_school_ext_PROP1" index="4">
			<file>custom.school_ext_tree02.swf</file>
			<x>520</x>
			<y>228</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_school_ext_PROP2" index="5">
			<file>custom.school_ext_flag.swf</file>
			<x>466</x>
			<y>203</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_blackboard" name="Blackboard" enable="Y" default="N" thumb="blackboard.jpg" display_order="29" is_premium="N" money="0" sharing="0" aid="9613">
		  <bg id="cbg_blackboard_BG2" index="0">
			<file>custom.blackboard.swf</file>
			<dcsn>9605</dcsn>
			<color r="ccColorA" oc="0x0">1777951</color>
		  </bg>
		</compositebg>
		  <compositebg id="cbg_basketball_int" name="Basketball court (interior)" enable="Y" default="N" thumb="basketball_court01.jpg" display_order="30" is_premium="N" money="0" sharing="0" aid="9614">
		  <bg id="cbg_basketball_int_BG2" index="0">
			<file>custom.basketball_court01_bg.swf</file>
			<dcsn>9607</dcsn>
			<color r="ccColorA" oc="0x0">15450736</color>
		  </bg>
		  <prop id="cbg_basketball_int_PROP0" index="3">
			<file>custom.basketball_court01_goal.swf</file>
			<x>102</x>
			<y>203</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_basketball_int_PROP1" index="2">
			<file>custom.basketball_court01_people.swf</file>
			<x>445</x>
			<y>159</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_basketball_ext" name="Basketball court (exterior)" enable="Y" default="N" thumb="basketball_court02.jpg" display_order="31" is_premium="N" money="0" sharing="0" aid="9615">
		  <bg id="BG4" index="0">
			<file>custom.basketball_court02_bg.swf</file>
		  </bg>
		  <prop id="PROP1" index="2">
			<file>custom.basketball_court02_web.swf</file>
			<x>314</x>
			<y>155</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP2" index="3">
			<file>custom.basketball_court02_people.swf</file>
			<x>458.9</x>
			<y>210.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP0" index="4">
			<file>custom.basketball_court02_goal.swf</file>
			<x>119</x>
			<y>205</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_toilet" name="Toilet" enable="Y" default="N" thumb="toilet.jpg" display_order="32" is_premium="N" money="0" sharing="0" aid="9616">
		  <bg id="cbg_toilet_BG2" index="0">
			<file>custom.toilet_bg.swf</file>
			<dcsn>9610</dcsn>
			<color r="ccColorA" oc="0x0">13538451</color>
		  </bg>
		  <prop id="cbg_toilet_PROP0" index="2">
			<file>custom.msp_toilet_door.msp_toilet_door_toilet_door_close.swf</file>
			<x>93</x>
			<y>185</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_army_wide" name="Army camp (wide)" enable="Y" default="N" thumb="army_camp.jpg" display_order="33" is_premium="N" money="0" sharing="0" aid="9617">
		  <bg id="cbg_army_wide_BG4" index="0">
			<file>custom.army_camp_bg.swf</file>
		  </bg>
		  <prop id="cbg_army_wide_PROP1" index="2">
			<file>custom.army_camp_tower01.swf</file>
			<x>378.9</x>
			<y>128.1</y>
			<xscale>0.5</xscale>
			<yscale>0.5</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_army_wide_PROP2" index="3">
			<file>custom.army_camp_tower01.swf</file>
			<x>523.9</x>
			<y>129.1</y>
			<xscale>0.5</xscale>
			<yscale>0.5</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_army_wide_PROP3" index="4">
			<file>custom.army_camp_camp01.swf</file>
			<x>434</x>
			<y>176.1</y>
			<xscale>0.51</xscale>
			<yscale>0.51</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_army_wide_PROP5" index="5">
			<file>custom.army_camp_camp02.swf</file>
			<x>267.7</x>
			<y>203.7</y>
			<xscale>0.82</xscale>
			<yscale>0.82</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_army_wide_PROP6" index="6">
			<file>custom.army_camp_camp01.swf</file>
			<x>495</x>
			<y>226.1</y>
			<xscale>1.02</xscale>
			<yscale>1.02</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_camp_close" name="Army camp (close up)" enable="Y" default="N" thumb="army_camp_close.jpg" display_order="34" is_premium="N" money="0" sharing="0" aid="9660">
		  <bg id="cbg_camp_close_BG2" index="0">
			<file>custom.army_camp_close_bg.swf</file>
		  </bg>
		  <prop id="cbg_camp_close_PROP0" index="2">
			<file>custom.army_camp_tower01.swf</file>
			<x>278</x>
			<y>93.1</y>
			<xscale>1.13</xscale>
			<yscale>1.13</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_camp_close_PROP1" index="3">
			<file>custom.army_camp_camp02.swf</file>
			<x>-62.8</x>
			<y>104.1</y>
			<xscale>2.41</xscale>
			<yscale>2.41</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_camp_close_PROP2" index="4">
			<file>custom.army_camp_camp01.swf</file>
			<x>746</x>
			<y>73.1</y>
			<xscale>3.95</xscale>
			<yscale>3.95</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_camp_int" name="Military Camp interior" enable="Y" default="N" thumb="camp_interior.jpg" display_order="35" is_premium="N" money="0" sharing="0" aid="9706">
		  <bg id="cbg_camp_int_BG2" index="0">
			<file>custom.camp_int_bg.swf</file>
		  </bg>
		  <prop id="cbg_camp_int_PROP0" index="2">
			<file>custom.camp_int_gun_rack.swf</file>
			<x>486</x>
			<y>260</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_camp_int_PROP1" index="3">
			<file>custom.camp_int_screen.swf</file>
			<x>191</x>
			<y>205</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_camp_int_PROP2" index="4">
			<file>custom.camp_int_board.swf</file>
			<x>115</x>
			<y>243</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_camp_int_PROP3" index="5">
			<file>custom.camp_int_table.swf</file>
			<x>306</x>
			<y>313</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_camp_int_PROP6" index="6">
			<file>custom.camp_int_globe.swf</file>
			<x>307.3</x>
			<y>220.2</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_camp_int_PROP5" index="7">
			<file>custom.cc_binoculars.swf</file>
			<x>261.8</x>
			<y>258.2</y>
			<xscale>0.74</xscale>
			<yscale>0.74</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9556</dcsn>
			<color r="ccColorA" oc="0x0">6776931</color>
		  </prop>
		  <prop id="cbg_camp_int_PROP4" index="8">
			<file>custom.cc_water_bottle.swf</file>
			<x>225</x>
			<y>252</y>
			<xscale>0.76</xscale>
			<yscale>0.76</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9558</dcsn>
			<color r="ccColorA" oc="0x0">7627576</color>
		  </prop>
		  <prop id="cbg_camp_int_PROP7" index="9">
			<file>custom.camp_int_map.swf</file>
			<x>316</x>
			<y>265</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_camp_int_PROP8" index="10">
			<file>custom.camp_int_chair02.swf</file>
			<x>469</x>
			<y>347</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9693</dcsn>
			<color r="ccColorA" oc="0x0">4144671</color>
		  </prop>
		  <prop id="cbg_camp_int_PROP9" index="11">
			<file>custom.camp_int_chair02.swf</file>
			<x>537</x>
			<y>323</y>
			<xscale>0.85</xscale>
			<yscale>0.85</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9693</dcsn>
			<color r="ccColorA" oc="0x0">4144671</color>
		  </prop>
		  <prop id="cbg_camp_int_PROP10" index="12">
			<file>custom.camp_int_chair01.swf</file>
			<x>96</x>
			<y>320</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9691</dcsn>
			<color r="ccColorA" oc="0x0">3355443</color>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_battlefield" name="Battlefield" enable="Y" default="N" thumb="battlefield.jpg" display_order="36" is_premium="N" money="0" sharing="0" aid="9707">
		  <bg id="cbg_battlefield_BG2" index="0">
			<file>custom.battlefield_bg.swf</file>
		  </bg>
		  <prop id="cbg_battlefield_PROP1" index="2">
			<file>custom.battlefield_boxes.swf</file>
			<x>134</x>
			<y>185</y>
			<xscale>0.79</xscale>
			<yscale>0.79</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_battlefield_PROP0" index="3">
			<file>custom.battlefield_boxes.swf</file>
			<x>73</x>
			<y>183</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_battlefield_PROP2" index="4">
			<file>custom.battlefield_sandbag.swf</file>
			<x>222</x>
			<y>223</y>
			<xscale>0.57</xscale>
			<yscale>0.57</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_battlefield_PROP4" index="5">
			<file>custom.cc_m16_rifle.swf</file>
			<x>201</x>
			<y>218</y>
			<xscale>0.33</xscale>
			<yscale>0.33</yscale>
			<face>-1</face>
			<rotation>-13.8</rotation>
			<dcsn>9548</dcsn>
			<color r="ccColorA" oc="0x0">3355443</color>
		  </prop>
		  <prop id="cbg_battlefield_PROP5" index="6">
			<file>custom.cc_m16_rifle.swf</file>
			<x>208</x>
			<y>241</y>
			<xscale>0.33</xscale>
			<yscale>0.33</yscale>
			<face>-1</face>
			<rotation>-6.5</rotation>
			<dcsn>9548</dcsn>
			<color r="ccColorA" oc="0x0">3355443</color>
		  </prop>
		  <prop id="cbg_battlefield_PROP6" index="7">
			<file>custom.battlefield_sandbag.swf</file>
			<x>144</x>
			<y>232</y>
			<xscale>0.55</xscale>
			<yscale>0.55</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_battlefield_PROP7" index="8">
			<file>custom.cc_sniper_rifle.swf</file>
			<x>122</x>
			<y>223</y>
			<xscale>0.37</xscale>
			<yscale>0.37</yscale>
			<face>1</face>
			<rotation>103</rotation>
			<dcsn>9552</dcsn>
			<color r="ccColorA" oc="0x0">4210752</color>
			<color r="ccColorB" oc="0x0">8343606</color>
		  </prop>
		  <prop id="cbg_battlefield_PROP9" index="9">
			<file>custom.battlefield_oil_drum03.swf</file>
			<x>496</x>
			<y>274</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_battlefield_PROP8" index="10">
			<file>custom.battlefield_oil_drum01.swf</file>
			<x>499</x>
			<y>191</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_battlefield_PROP10" index="11">
			<file>custom.battlefield_oil_drum02.swf</file>
			<x>436</x>
			<y>190</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_battlefield_PROP11" index="12">
			<file>custom.battlefield_sandbag.swf</file>
			<x>347</x>
			<y>320</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_battlefield_PROP12" index="13">
			<file>custom.cc_sniper_rifle.swf</file>
			<x>391.4</x>
			<y>321.4</y>
			<xscale>0.6</xscale>
			<yscale>0.6</yscale>
			<face>-1</face>
			<rotation>-103.2</rotation>
			<dcsn>9552</dcsn>
			<color r="ccColorA" oc="0x0">4210752</color>
			<color r="ccColorB" oc="0x0">8343606</color>
		  </prop>
		  <prop id="cbg_battlefield_PROP14" index="14">
			<file>custom.cc_ammunition_box.swf</file>
			<x>504</x>
			<y>315</y>
			<xscale>0.61</xscale>
			<yscale>0.61</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9574</dcsn>
			<color r="ccColorA" oc="0x0">7817011</color>
		  </prop>
		  <prop id="cbg_battlefield_PROP13" index="15">
			<file>custom.cc_gasoline_can.swf</file>
			<x>442</x>
			<y>325</y>
			<xscale>0.58</xscale>
			<yscale>0.58</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9578</dcsn>
			<color r="ccColorA" oc="0x0">7301171</color>
		  </prop>
		  <prop id="cbg_battlefield_PROP15" index="16">
			<file>custom.cc_sniper_rifle.swf</file>
			<x>569</x>
			<y>283</y>
			<xscale>0.5</xscale>
			<yscale>0.5</yscale>
			<face>-1</face>
			<rotation>-100.9</rotation>
			<dcsn>9552</dcsn>
			<color r="ccColorA" oc="0x0">4210752</color>
			<color r="ccColorB" oc="0x0">8343606</color>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_changing_rm" name="Changing room" enable="Y" default="N" thumb="changing_room.jpg" display_order="37" is_premium="N" money="0" sharing="0" aid="9708">
		  <bg id="cbg_changing_rm_BG2" index="0">
			<file>custom.changing_room_bg.swf</file>
		  </bg>
		  <prop id="cbg_changing_rm_PROP0" index="2">
			<file>custom.msp_changingrm_door.msp_changingrm_door_changing_room_door02.swf</file>
			<x>515</x>
			<y>228</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_changing_rm_PROP1" index="3">
			<file>custom.changing_room_shoes.swf</file>
			<x>304.6</x>
			<y>326</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9684</dcsn>
			<color r="ccColorA" oc="0x0">10066329</color>
			<color r="ccColorB" oc="0x0">3355443</color>
		  </prop>
		  <prop id="cbg_changing_rm_PROP2" index="4">
			<file>custom.changing_room_bench02.swf</file>
			<x>357.7</x>
			<y>338.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_changing_rm_PROP3" index="5">
			<file>custom.msp_bag.msp_bag_cc_bag_closed.swf</file>
			<x>320</x>
			<y>282</y>
			<xscale>0.78</xscale>
			<yscale>0.78</yscale>
			<face>-1</face>
			<rotation>0</rotation>
			<dcsn>9633</dcsn>
			<color r="ccColorA" oc="0x0">7106681</color>
			<color r="ccColorB" oc="0x0">13395456</color>
			<color r="ccColorC" oc="0x0">3368601</color>
		  </prop>
		  <prop id="cbg_changing_rm_PROP4" index="6">
			<file>custom.cc_basketball.swf</file>
			<x>389.7</x>
			<y>302.8</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9629</dcsn>
			<color r="ccColorA" oc="0x0">10243863</color>
		  </prop>
		  <prop id="cbg_changing_rm_PROP5" index="7">
			<file>custom.changing_room_bench01.swf</file>
			<x>199</x>
			<y>290</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_changing_rm_PROP6" index="8">
			<file>custom.msp_bag.msp_bag_cc_bag_closed.swf</file>
			<x>123</x>
			<y>304</y>
			<xscale>0.81</xscale>
			<yscale>0.81</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9633</dcsn>
			<color r="ccColorA" oc="0x0">7106681</color>
			<color r="ccColorB" oc="0x0">13395456</color>
			<color r="ccColorC" oc="0x0">3368601</color>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_barn_ext" name="Barn exterior" enable="Y" default="N" thumb="barn_ext.jpg" display_order="38" is_premium="N" money="0" sharing="0" aid="9709">
		  <bg id="cbg_barn_ext_BG2" index="0">
			<file>custom.barn_ext_bg.swf</file>
			<dcsn>9701</dcsn>
			<color r="ccColorA" oc="0x0">12732734</color>
		  </bg>
		  <prop id="cbg_barn_ext_PROP0" index="2">
			<file>custom.barn_ext_hay.swf</file>
			<x>158.4</x>
			<y>295.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_barn_ext_PROP1" index="3">
			<file>custom.barn_ext_fence.swf</file>
			<x>303.4</x>
			<y>355.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_barn_int" name="Barn interior" enable="Y" default="N" thumb="barn_int.jpg" display_order="39" is_premium="N" money="0" sharing="0" aid="9710">
		  <bg id="cbg_barn_int_BG2" index="0">
			<file>custom.barn_int_bg.swf</file>
		  </bg>
		  <prop id="cbg_barn_int_PROP0" index="2">
			<file>custom.barn_int_cow.swf</file>
			<x>337</x>
			<y>271</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_barn_int_PROP2" index="3">
			<file>custom.msp_milk_bucket.msp_milk_bucket_barn_int_milk_bucket01.swf</file>
			<x>356</x>
			<y>341</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9669</dcsn>
			<color r="ccColorA" oc="0x0">14014669</color>
		  </prop>
		  <prop id="cbg_barn_int_PROP3" index="4">
			<file>custom.msp_milk_bucket.msp_milk_bucket_barn_int_milk_bucket02.swf</file>
			<x>391</x>
			<y>348</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9669</dcsn>
			<color r="ccColorA" oc="0x0">14014669</color>
		  </prop>
		  <prop id="cbg_barn_int_PROP4" index="5">
			<file>custom.barn_int_stool.swf</file>
			<x>439.8</x>
			<y>345</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_barn_int_PROP5" index="6">
			<file>custom.barn_int_fence.swf</file>
			<x>531</x>
			<y>198</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_barn_int_PROP6" index="7">
			<file>custom.barn_int_hay.swf</file>
			<x>579</x>
			<y>362</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_kitchen_02" name="Kitchen" enable="Y" default="N" thumb="kitchen02.jpg" display_order="40" is_premium="N" money="0" sharing="0" aid="9711">
		  <bg id="cbg_kitchen_02_BG2" index="0">
			<file>custom.kitchen02_bg.swf</file>
			<dcsn>9705</dcsn>
			<color r="ccColorA" oc="0x0">16643006</color>
			<color r="ccColorB" oc="0x0">16774365</color>
		  </bg>
		  <prop id="cbg_kitchen_02_PROP0" index="2">
			<file>custom.kitchen02_table02.swf</file>
			<x>361</x>
			<y>236.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_kitchen_02_PROP1" index="3">
			<file>custom.kitchen02_table01.swf</file>
			<x>203</x>
			<y>319.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_kitchen_02_PROP2" index="4">
			<file>custom.msp_dish02.msp_dish02_cc_tray_closed.swf</file>
			<x>112.7</x>
			<y>243.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9637</dcsn>
			<color r="ccColorA" oc="0x0">14803425</color>
		  </prop>
		  <prop id="cbg_kitchen_02_PROP3" index="5">
			<file>custom.msp_dish02.msp_dish02_cc_tray_closed.swf</file>
			<x>201.6</x>
			<y>244.5</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9637</dcsn>
			<color r="ccColorA" oc="0x0">14803425</color>
		  </prop>
		  <prop id="cbg_kitchen_02_PROP4" index="6">
			<file>custom.msp_dish02.msp_dish02_cc_tray_open.swf</file>
			<x>364.4</x>
			<y>243.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
			<dcsn>9637</dcsn>
			<color r="ccColorA" oc="0x0">14803425</color>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_boy_rm" name="Boy bedroom" enable="Y" default="N" thumb="boy_rm.jpg" display_order="41" is_premium="N" money="0" sharing="0" aid="9735">
		  <bg id="cbg_boy_rm_BG6" index="0">
			<file>custom.boy_rm_bg.swf</file>
		  </bg>
		  <prop id="cbg_boy_rm_PROP5" index="2">
			<file>custom.msp_boy_rm_blanket.msp_boy_rm_blanket_boy_rm_blanket01.swf</file>
			<x>219</x>
			<y>255</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_boy_rm_PROP6" index="3">
			<file>custom.boy_rm_chair02.swf</file>
			<x>89</x>
			<y>257</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_boy_rm_PROP7" index="4">
			<file>custom.boy_rm_chair01.swf</file>
			<x>458</x>
			<y>264</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_girl_rm" name="Girl bedroom" enable="Y" default="N" thumb="girl_rm.jpg" display_order="42" is_premium="N" money="0" sharing="0" aid="9736">
		  <bg id="cbg_girl_rm_BG2" index="0">
			<file>custom.girl_rm_bg.swf</file>
		  </bg>
		  <prop id="cbg_girl_rm_PROP5" index="2">
			<file>custom.msp_girl_rm_blanket.msp_girl_rm_blanket_girl_rm_blanket01.swf</file>
			<x>256.6</x>
			<y>255.4</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_girl_rm_PROP0" index="3">
			<file>custom.girl_rm_table.swf</file>
			<x>498.5</x>
			<y>218.5</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_girl_rm_PROP6" index="4">
			<file>custom.girl_rm_chair02.swf</file>
			<x>125.4</x>
			<y>261.4</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_girl_rm_PROP7" index="5">
			<file>custom.girl_rm_chair01.swf</file>
			<x>429</x>
			<y>303.4</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_coffee_shop" name="Coffee shop" enable="Y" default="N" thumb="coffee_shop.jpg" display_order="43" is_premium="N" money="0" sharing="0" aid="9752">
		  <bg id="cbg_coffee_shop_BG9" index="0">
			<file>custom.coffee_shop_bg.swf</file>
		  </bg>
		  <prop id="cbg_coffee_shop_PROP0" index="6">
			<file>custom.coffee_shop_table.swf</file>
			<x>114</x>
			<y>310</y>
			<xscale>0.87</xscale>
			<yscale>0.87</yscale>
			<face>1</face>
			<rotation>0.1</rotation>
		  </prop>
		  <prop id="cbg_coffee_shop_PROP1" index="5">
			<file>custom.coffee_shop_chair.swf</file>
			<x>175</x>
			<y>310</y>
			<xscale>0.75</xscale>
			<yscale>0.75</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_coffee_shop_PROP2" index="3">
			<file>custom.coffee_shop_chair.swf</file>
			<x>60</x>
			<y>306</y>
			<xscale>0.74</xscale>
			<yscale>0.74</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_coffee_shop_PROP3" index="1">
			<file>custom.coffee_shop_table.swf</file>
			<x>156</x>
			<y>255</y>
			<xscale>0.45</xscale>
			<yscale>0.45</yscale>
			<face>1</face>
			<rotation>0.1</rotation>
		  </prop>
		  <prop id="cbg_coffee_shop_PROP5" index="2">
			<file>custom.coffee_shop_counter.swf</file>
			<x>450</x>
			<y>298</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_coffee_shop_PROP6" index="7">
			<file>custom.coffee_shop_chair.swf</file>
			<x>423</x>
			<y>352</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_coffee_shop_PROP7" index="8">
			<file>custom.coffee_shop_chair.swf</file>
			<x>247</x>
			<y>341</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_coffee_shop_PROP8" index="9">
			<file>custom.coffee_shop_table.swf</file>
			<x>341</x>
			<y>355</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_bus_stop" name="Bus Stop" enable="Y" default="N" thumb="bus_stop.jpg" display_order="44" is_premium="N" money="0" sharing="0" aid="9753">
		  <bg id="cbg_bus_stop_BG2" index="0">
			<file>custom.bus_stop_bg.swf</file>
		  </bg>
		  <prop id="cbg_bus_stop_PROP0" index="2">
			<file>custom.bus_stop_door01.swf</file>
			<x>513</x>
			<y>165.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bus_stop_PROP2" index="3">
			<file>custom.bus_stop_stop.swf</file>
			<x>276</x>
			<y>165.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bus_stop_PROP3" index="4">
			<file>custom.bus_stop_bus.swf</file>
			<x>-17</x>
			<y>191.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_donut_shop" name="Donut Shop" enable="Y" default="N" thumb="donut_shop.jpg" display_order="45" is_premium="N" money="0" sharing="0" aid="9754">
		  <bg id="cbg_donut_shop_BG2" index="0">
			<file>custom.donut_shop_bg.swf</file>
		  </bg>
		  <prop id="cbg_donut_shop_PROP0" index="2">
			<file>custom.donut_shop_wall.swf</file>
			<x>340.2</x>
			<y>151.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_donut_shop_PROP3" index="3">
			<file>custom.coffee_shop_chair.swf</file>
			<x>224.5</x>
			<y>210.6</y>
			<xscale>0.89</xscale>
			<yscale>0.89</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_donut_shop_PROP4" index="4">
			<file>custom.coffee_shop_chair.swf</file>
			<x>86.5</x>
			<y>210.6</y>
			<xscale>0.89</xscale>
			<yscale>0.89</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_donut_shop_PROP8" index="5">
			<file>custom.coffee_shop_table.swf</file>
			<x>156.6</x>
			<y>213.6</y>
			<xscale>0.94</xscale>
			<yscale>0.94</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_donut_shop_PROP9" index="6">
			<file>custom.donut_shop_counter.swf</file>
			<x>519.6</x>
			<y>327.2</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_shower_room" name="Shower room" enable="Y" default="N" thumb="shower_room.jpg" display_order="46" is_premium="N" money="0" sharing="0" aid="9755">
		  <bg id="cbg_shower_room_BG2" index="0">
			<file>custom.shower_room_bg.swf</file>
		  </bg>
		  <prop id="cbg_shower_room_PROP0" index="2">
			<file>custom.msp_curtain.msp_curtain_shower_room_curtain01.swf</file>
			<x>428.6</x>
			<y>179.4</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_oscar_stage" name="Awards ceremony" enable="Y" default="N" thumb="oscar_stage.jpg" display_order="47" is_premium="N" money="0" sharing="0" aid="9779">
		  <bg id="cbg_oscar_stage_BG2" index="0">
			<file>custom.oscar_stage_bg.swf</file>
		  </bg>
		  <prop id="cbg_oscar_stage_PROP4" index="6">
			<file>custom.oscar_stage_stand.swf</file>
			<x>284</x>
			<y>261</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oscar_stage_PROP3" index="5">
			<file>custom.oscar_stage_light.swf</file>
			<x>356</x>
			<y>129</y>
			<xscale>1.8</xscale>
			<yscale>1.8</yscale>
			<face>1</face>
			<rotation>80.3</rotation>
		  </prop>
		  <prop id="cbg_oscar_stage_PROP2" index="4">
			<file>custom.oscar_stage_light.swf</file>
			<x>572</x>
			<y>67</y>
			<xscale>1.12</xscale>
			<yscale>1.12</yscale>
			<face>1</face>
			<rotation>93.5</rotation>
		  </prop>
		  <prop id="cbg_oscar_stage_PROP1" index="3">
			<file>custom.oscar_stage_light.swf</file>
			<x>174</x>
			<y>45</y>
			<xscale>1.56</xscale>
			<yscale>1.56</yscale>
			<face>1</face>
			<rotation>15.8</rotation>
		  </prop>
		  <prop id="cbg_oscar_stage_PROP0" index="2">
			<file>custom.oscar_stage_light.swf</file>
			<x>145</x>
			<y>129</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP15" index="1">
			<file>custom.oscar_stage_screen.swf</file>
			<x>495</x>
			<y>133.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_oscar_sit" name="Movie theatre" enable="Y" default="N" thumb="oscar_sit.jpg" display_order="48" is_premium="N" money="0" sharing="0" aid="9780">
		  <bg id="cbg_oscar_sit_BG2" index="0">
			<file>custom.oscar_sit_bg.swf</file>
		  </bg>
		  <prop id="cbg_oscar_sit_PROP1" index="2">
			<file>custom.oscar_sit_chair04.swf</file>
			<x>404</x>
			<y>192</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oscar_sit_PROP2" index="3">
			<file>custom.oscar_sit_chair03.swf</file>
			<x>337</x>
			<y>239</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oscar_sit_PROP3" index="4">
			<file>custom.oscar_sit_chair02.swf</file>
			<x>283</x>
			<y>283</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oscar_sit_PROP4" index="5">
			<file>custom.oscar_sit_chair01.swf</file>
			<x>217</x>
			<y>321.6</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oscar_sit_PROP6" index="6">
			<file>custom.oscar_sit_light.swf</file>
			<x>103</x>
			<y>71</y>
			<xscale>1.14</xscale>
			<yscale>1.14</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_oscar_sit_PROP7" index="7">
			<file>custom.oscar_sit_light.swf</file>
			<x>528.6</x>
			<y>49.7</y>
			<xscale>1.01</xscale>
			<yscale>1.01</yscale>
			<face>-1</face>
			<rotation>-7.3</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_airport_lobby" name="Airport check in" enable="Y" default="N" thumb="airport_lobby.jpg" display_order="49" is_premium="N" money="0" sharing="0" aid="9781">
		  <bg id="cbg_airport_lobby_BG8" index="0">
			<file>custom.airport_lobby_bg.swf</file>
		  </bg>
		  <prop id="cbg_airport_lobby_PROP4" index="2">
			<file>custom.airport_lobby_counter.swf</file>
			<x>256.5</x>
			<y>240</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_airport_lobby_PROP7" index="3">
			<file>custom.airport_lobby_counter.swf</file>
			<x>78.9</x>
			<y>258.8</y>
			<xscale>1.21</xscale>
			<yscale>1.21</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_airport_lobby_PROP11" index="4">
			<file>custom.airport_lobby_counter.swf</file>
			<x>-128.1</x>
			<y>282.8</y>
			<xscale>1.42</xscale>
			<yscale>1.42</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_airport_lobby_PROP12" index="5">
			<file>custom.airport_lobby_stand.swf</file>
			<x>725</x>
			<y>355.1</y>
			<xscale>0.87</xscale>
			<yscale>0.87</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_airport_lobby_PROP13" index="6">
			<file>custom.airport_lobby_stand.swf</file>
			<x>227</x>
			<y>394.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_airport_waiting" name="Airport boarding gate" enable="Y" default="N" thumb="airport_waiting.jpg" display_order="50" is_premium="N" money="0" sharing="0" aid="9782">
		  <bg id="cbg_airport_waiting_BG2" index="0">
			<file>custom.airport_waiting_bg.swf</file>
		  </bg>
		  <prop id="cbg_airport_waiting_PROP1" index="2">
			<file>custom.airport_waiting_counter.swf</file>
			<x>106.9</x>
			<y>270.5</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_airport_waiting_PROP2" index="3">
			<file>custom.airport_waiting_sit.swf</file>
			<x>502.9</x>
			<y>316.5</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_airport_security" name="Airport security check" enable="Y" default="N" thumb="airport_security.jpg" display_order="51" is_premium="N" money="0" sharing="0" aid="9783">
		  <bg id="cbg_airport_security_BG2" index="0">
			<file>custom.airport_security_bg.swf</file>
		  </bg>
		  <prop id="cbg_airport_security_PROP0" index="2">
			<file>custom.airport_security_machine.swf</file>
			<x>278.6</x>
			<y>241</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_airport_security_PROP1" index="4">
			<file>custom.msp_airport_door.msp_airport_door_airport_security_door_off.swf</file>
			<x>184.9</x>
			<y>183</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_airport_security_PROP2" index="5">
			<file>custom.airport_security_door_02.swf</file>
			<x>118</x>
			<y>203.3</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_airport_security_PROP3" index="3">
			<file>custom.airport_security_cover.swf</file>
			<x>267.6</x>
			<y>194.7</y>
			<xscale>0.87</xscale>
			<yscale>0.87</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_plane_cockpit" name="Plane cockpit" enable="Y" default="N" thumb="cockpit.jpg" display_order="52" is_premium="N" money="0" sharing="0" aid="9812">
		  <bg id="cbg_plane_cockpit_BG348" index="0">
			<file>custom.cockpit_bg.swf</file>
		  </bg>
		  <prop id="cbg_plane_cockpit_PROP123" index="2">
			<file>custom.msp_cockpit_door.msp_cockpit_door_cockpit_door_close.swf</file>
			<x>319</x>
			<y>194</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_plane_cockpit_PROP125" index="3">
			<file>custom.cockpit_sit.swf</file>
			<x>301.1</x>
			<y>274.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_plane_cockpit_PROP124" index="4">
			<file>custom.cockpit_front.swf</file>
			<x>329</x>
			<y>314</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_bar" name="Bar" enable="Y" default="N" thumb="bar.jpg" display_order="53" is_premium="N" money="0" sharing="0" aid="9813">
		  <bg id="cbg_bar_BG2" index="0">
			<file>custom.bar_bg.swf</file>
		  </bg>
		  <prop id="cbg_bar_PROP63" index="2">
			<file>custom.msp_bar_door.msp_bar_door_bar_door_close.swf</file>
			<x>146</x>
			<y>142</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP64" index="3">
			<file>custom.bar_table.swf</file>
			<x>409</x>
			<y>296</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP65" index="4">
			<file>custom.bar_stool.swf</file>
			<x>205</x>
			<y>249</y>
			<xscale>0.58</xscale>
			<yscale>0.58</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP66" index="5">
			<file>custom.bar_stool.swf</file>
			<x>256</x>
			<y>269</y>
			<xscale>0.66</xscale>
			<yscale>0.66</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP67" index="6">
			<file>custom.bar_stool.swf</file>
			<x>321</x>
			<y>291</y>
			<xscale>0.78</xscale>
			<yscale>0.78</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP68" index="7">
			<file>custom.bar_stool.swf</file>
			<x>420</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP69" index="8">
			<file>custom.bar_stool.swf</file>
			<x>538</x>
			<y>360</y>
			<xscale>1.15</xscale>
			<yscale>1.15</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP14" index="9">
			<file>custom.bar_light_01.swf</file>
			<x>452</x>
			<y>103</y>
			<xscale>1.06</xscale>
			<yscale>1.06</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP15" index="10">
			<file>custom.bar_light_01.swf</file>
			<x>309</x>
			<y>69</y>
			<xscale>1.18</xscale>
			<yscale>1.18</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_bar_PROP16" index="11">
			<file>custom.bar_light_02.swf</file>
			<x>122</x>
			<y>104</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>-41.9</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_disco_entrance" name="Disco entrance" enable="Y" default="N" thumb="disco.jpg" display_order="54" is_premium="N" money="0" sharing="0" aid="9814">
		  <bg id="cbg_disco_entrance_BG2" index="0">
			<file>custom.disco_bg.swf</file>
		  </bg>
		  <prop id="cbg_disco_entrance_PROP0" index="3">
			<file>custom.msp_disco_door.msp_disco_door_disco_door_open.swf</file>
			<x>154</x>
			<y>201</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_disco_entrance_PROP1" index="2">
			<file>custom.disco_logo.swf</file>
			<x>151.6</x>
			<y>40.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_disco_entrance_PROP2" index="4">
			<file>custom.disco_stand.swf</file>
			<x>363.4</x>
			<y>283.1</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_living_room" name="Living room" enable="Y" default="N" thumb="living_room.jpg" display_order="55" is_premium="N" money="0" sharing="0" aid="9815">
		  <bg id="cbg_living_room_BG2" index="0">
			<file>custom.living_room_bg.swf</file>
		  </bg>
		  <prop id="cbg_living_room_PROP0" index="2">
			<file>custom.msp_living_rm_door.msp_living_rm_door_living_room_door_close.swf</file>
			<x>292.6</x>
			<y>129</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_living_room_PROP1" index="3">
			<file>custom.living_room_sofa.swf</file>
			<x>369.6</x>
			<y>250</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_living_room_PROP2" index="4">
			<file>custom.msp_TV_version.msp_TV_version_living_room_tv01.swf</file>
			<x>76.6</x>
			<y>283</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_forest" name="Forest" enable="Y" default="N" thumb="outside.png" display_order="301" is_premium="N" money="0" sharing="0" aid="9076">
		  <bg id="cbg_forest_BG2" index="0">
			<file>custom.outside.swf</file>
		  </bg>
		  <prop id="cbg_forest_PROP0" index="2">
			<file>custom.outside_tree02.swf</file>
			<x>538</x>
			<y>165</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_forest_PROP1" index="3">
			<file>custom.outside_tree01.swf</file>
			<x>88</x>
			<y>182</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_reception_hall" name="Reception hall" enable="Y" default="N" thumb="dining_room.png" display_order="302" is_premium="N" money="0" sharing="0" aid="9077">
		  <bg id="cbg_reception_hall_BG4" index="0">
			<file>custom.dining_room.swf</file>
		  </bg>
		  <prop id="cbg_reception_hall_PROP2" index="2">
			<file>custom.dining_room_table.swf</file>
			<x>438</x>
			<y>208</y>
			<xscale>0.47</xscale>
			<yscale>0.52</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_reception_hall_PROP1" index="3">
			<file>custom.dining_room_table.swf</file>
			<x>346</x>
			<y>261</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_library" name="Library" enable="Y" default="N" thumb="library.png" display_order="303" is_premium="N" money="0" sharing="0" aid="9078">
		  <bg id="cbg_library_BG3" index="0">
			<file>custom.library.swf</file>
		  </bg>
		  <prop id="cbg_library_PROP0" index="2">
			<file>custom.library_bookshelf.swf</file>
			<x>145.5</x>
			<y>183</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_library_PROP1" index="3">
			<file>custom.library_bookshelf.swf</file>
			<x>645.5</x>
			<y>183</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_library_PROP2" index="4">
			<file>custom.library_chair.swf</file>
			<x>262</x>
			<y>242</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_corridor" name="Corridor" enable="Y" default="N" thumb="corridor.png" display_order="304" is_premium="N" money="0" sharing="0" aid="9079">
		  <bg id="cbg_corridor_BG2" index="0">
			<file>custom.corridor.swf</file>
		  </bg>
		  <prop id="cbg_corridor_PROP0" index="2">
			<file>custom.corridor_wall.swf</file>
			<x>320</x>
			<y>151</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_potion_room" name="Potion room" enable="Y" default="N" thumb="classroom.png" display_order="305" is_premium="N" money="0" sharing="0" aid="9080">
		  <bg id="cbg_potion_room_BG63" index="0">
			<file>custom.classroom.swf</file>
		  </bg>
		  <prop id="cbg_potion_room_PROP50" index="2">
			<file>custom.classroom_wall.swf</file>
			<x>342</x>
			<y>141</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_potion_room_PROP51" index="3">
			<file>custom.classroom_table.swf</file>
			<x>533.3</x>
			<y>338.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_toyworkshop" name="Toy workshop" enable="Y" default="N" thumb="toy_workshop.png" display_order="400" is_premium="N" money="0" sharing="0" aid="9071">
		  <bg id="cbg_toyworkshop_BG219" index="0">
			<file>custom.toy_workshop_bg.swf</file>
		  </bg>
		  <prop id="cbg_toyworkshop_PROP52" index="2">
			<file>custom.msp_toy_workshop_doorframe.msp_toy_workshop_doorframe_toy_workshop_doorframe1.swf</file>
			<x>420</x>
			<y>130</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP21" index="3">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP43" index="4">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP67" index="5">
			<file>custom.toy_workshop_chair.swf</file>
			<x>319.9</x>
			<y>210.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP66" index="6">
			<file>custom.toy_workshop_chair.swf</file>
			<x>225.9</x>
			<y>223.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP65" index="7">
			<file>custom.toy_workshop_chair.swf</file>
			<x>138.9</x>
			<y>235.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP68" index="8">
			<file>custom.toy_workshop_chair.swf</file>
			<x>448.9</x>
			<y>196.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>-1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP50" index="9">
			<file>custom.toy_workshop_table.swf</file>
			<x>293</x>
			<y>294</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP49" index="10">
			<file>custom.toy_workshop_drum.swf</file>
			<x>511</x>
			<y>298</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_toyworkshop_PROP51" index="11">
			<file>custom.toy_workshop_toys.swf</file>
			<x>310.9</x>
			<y>211.9</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <compositebg id="cbg_house" name="House" enable="Y" default="N" thumb="house.png" display_order="403" is_premium="N" money="0" sharing="0" aid="9081">
		  <bg id="cbg_sittingroom_BG260" index="0">
			<file>custom.sitting_room_bg.swf</file>
		  </bg>
		  <prop id="cbg_sittingroom_PROP21" index="2">
			<file>custom.office_chair01.swf</file>
			<x>-154</x>
			<y>258</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_sittingroom_PROP43" index="3">
			<file>custom.msp_bedroom_blanket.msp_bedroom_blanket_bedroom_blanket_1.swf</file>
			<x>-199</x>
			<y>325</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_sittingroom_PROP74" index="4">
			<file>custom.sitting_room_lamp.swf</file>
			<x>446</x>
			<y>246</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP8" index="5">
			<file>custom.sitting_room_sofa2.swf</file>
			<x>290</x>
			<y>256</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="cbg_sittingroom_PROP75" index="6">
			<file>custom.sitting_room_plant.swf</file>
			<x>107</x>
			<y>245</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP9" index="8">
			<file>custom.sitting_room_sofa.swf</file>
			<x>561</x>
			<y>279</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP278" index="9">
			<file>custom.house_top.swf</file>
			<x>352</x>
			<y>46</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP279" index="10">
			<file>custom.xm_tree.swf</file>
			<x>114</x>
			<y>215</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP280" index="7">
			<file>custom.xm_gift.swf</file>
			<x>61</x>
			<y>303</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		  <prop id="PROP281" index="11">
			<file>custom.house_deco.swf</file>
			<x>262</x>
			<y>67</y>
			<xscale>1</xscale>
			<yscale>1</yscale>
			<face>1</face>
			<rotation>0</rotation>
		  </prop>
		</compositebg>
		  <prop id="cc_ak47.swf" name="AK47" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9004" money="0" sharing="0"/>
		  <prop id="cc_arrow.swf" name="arrow" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9005" money="0" sharing="0"/>
		  <prop id="cc_book.swf" name="book" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9006" money="0" sharing="0"/>
		  <prop id="cc_briefcase.swf" name="brief case" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9007" money="0" sharing="0"/>
		  <prop id="cc_cake.swf" name="cake" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9008" money="0" sharing="0"/>
		  <prop id="cc_camera.swf" name="camera" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9009" money="0" sharing="0"/>
		  <prop id="cc_camera_with_flash.swf" name="camera with flash" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9010" money="0" sharing="0"/>
		  <prop id="cc_carton_box.swf" name="carton box" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9011" money="0" sharing="0"/>
		  <prop id="cc_cross.swf" name="cross" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9012" money="0" sharing="0"/>
		  <prop id="cc_diamond_ring.swf" name="diamond ring" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9013" money="0" sharing="0"/>
		  <prop id="cc_febex_envelope.swf" name="Febex envelope" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9014" money="0" sharing="0"/>
		  <prop id="cc_hammer.swf" name="hammer" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9016" money="0" sharing="0"/>
		  <prop id="cc_interview_cup.swf" name="interview cup" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9017" money="0" sharing="0"/>
		  <prop id="cc_martini_glass.swf" name="martini class" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9018" money="0" sharing="0"/>
		  <prop id="cc_microphone.swf" name="microphone" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9019" money="0" sharing="0"/>
		  <prop id="cc_micstand.swf" name="micstand" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9020" money="0" sharing="0"/>
		  <prop id="cc_milk.swf" name="milk" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9021" money="0" sharing="0"/>
		  <prop id="cc_necklace.swf" name="necklace" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9022" money="0" sharing="0"/>
		  <prop id="cc_paint_roller.swf" name="paint roller" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9023" money="0" sharing="0"/>
		  <prop id="cc_rose.swf" name="rose" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9024" money="0" sharing="0"/>
		  <prop id="cc_saw.swf" name="saw" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9025" money="0" sharing="0"/>
		  <prop id="cc_screwdriver.swf" name="screw driver" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9026" money="0" sharing="0"/>
		  <prop id="cc_secretfolder.swf" name="secert folder" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9027" money="0" sharing="0"/>
		  <prop id="cc_spanner.swf" name="spanner" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9028" money="0" sharing="0"/>
		  <prop id="cc_spinbat.swf" name="Spin Bat" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9029" money="0" sharing="0"/>
		  <prop id="cc_tick.swf" name="tick" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9030" money="0" sharing="0"/>
		  <prop id="cc_tool_box.swf" name="tool box" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9031" money="0" sharing="0"/>
		  <prop id="cc_walking_stick.swf" name="walking stick" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9032" money="0" sharing="0"/>
		  <prop id="cc_wine1.swf" name="wine1" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9033" money="0" sharing="0"/>
		  <prop id="cc_wool_ball.swf" name="wool ball" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9034" money="0" sharing="0"/>
		  <prop id="cc_angel ring.swf" name="angel ring" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9035" money="0" sharing="0"/>
		  <prop id="cc_crown.swf" name="crown" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9036" money="0" sharing="0"/>
		  <prop id="cc_devilcorn.swf" name="devil horn" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9037" money="0" sharing="0"/>
		  <prop id="cc_rabitear.swf" name="rabbit ear" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9038" money="0" sharing="0"/>
		  <prop id="cc_coffin.swf" name="coffin" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9039" money="0" sharing="0"/>
		  <prop id="cc_flying_ufo.swf" name="flying UFO" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9040" money="0" sharing="0"/>
		  <prop id="cc_foldedchair.swf" name="foldChair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9041" money="0" sharing="0"/>
		  <prop id="cc_lightray.swf" name="light ray" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9042" money="0" sharing="0"/>
		  <prop id="cc_mosaic.swf" name="mosaic" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9043" money="0" sharing="0"/>
		  <prop id="cc_mosaic_02.swf" name="mosaic02" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9044" money="0" sharing="0"/>
		  <prop id="cc_road_block.swf" name="road block" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9045" money="0" sharing="0"/>
		  <prop id="cc_table1.swf" name="table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9046" money="0" sharing="0"/>
		  <prop id="bedroom_lamp.swf" name="Lamp" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8932" money="0" sharing="0"/>
		  <prop id="msp_bedroom_blanket" name="blanket" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_bedroom_blanket_bedroom_blanket_1.swf" enable="Y" is_premium="N" aid="8933" money="0" sharing="0">
			<state id="msp_bedroom_blanket_bedroom_blanket_1.swf" name="single" enable="Y" default="Y"/>
			<state id="msp_bedroom_blanket_bedroom_blanket_2.swf" name="double" enable="Y"/>
		  </prop>
		  <prop id="bedroom_blanket_bed.swf" name="Bed" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8936" money="0" sharing="0"/>
		  <prop id="bedroom_drawer.swf" name="Drawer" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8937" money="0" sharing="0"/>
		  <prop id="bedroom_drawer02.swf" name="Drawer" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9082" money="0" sharing="0"/>
		  <prop id="kitchen_refig.swf" name="Refrigerator" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8938" money="0" sharing="0"/>
		  <prop id="kitchen_cup.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8939" money="0" sharing="0"/>
		  <prop id="kitchen_microwave01.swf" name="Microwave" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8940" money="0" sharing="0"/>
		  <prop id="office_table.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8941" money="0" sharing="0"/>
		  <prop id="office_chair01.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8942" money="0" sharing="0"/>
		  <prop id="office_chair02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8943" money="0" sharing="0"/>
		  <prop id="office_chair.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8944" money="0" sharing="0"/>
		  <prop id="office_flag.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8945" money="0" sharing="0"/>
		  <prop id="office_plant.swf" name="Plant" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8946" money="0" sharing="0"/>
		  <prop id="office_pentry_water_dispenser.swf" name="Water dispenser" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8947" money="0" sharing="0"/>
		  <prop id="office_pentry_coffee.swf" name="Coffee" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8948" money="0" sharing="0"/>
		  <prop id="restaurant_table.swf" name="Table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8949" money="0" sharing="0"/>
		  <prop id="restaurant_lamp.swf" name="Lamp" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8950" money="0" sharing="0"/>
		  <prop id="restaurant_picture.swf" name="Picture" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8951" money="0" sharing="0"/>
		  <prop id="sitting_room_carpat.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8952" money="0" sharing="0"/>
		  <prop id="sitting_room_lamp.swf" name="Lamp" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8953" money="0" sharing="0"/>
		  <prop id="sitting_room_plant.swf" name="Plant" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8954" money="0" sharing="0"/>
		  <prop id="subway_station_prop01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8956" money="0" sharing="0"/>
		  <prop id="subway_station_stair.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8957" money="0" sharing="0"/>
		  <prop id="subway_station_train.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8958" money="0" sharing="0"/>
		  <prop id="subway_station_trash.swf" name="Trash" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8959" money="0" sharing="0"/>
		  <prop id="subway_station_chair.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8960" money="0" sharing="0"/>
		  <prop id="subway_train_stand.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8961" money="0" sharing="0"/>
		  <prop id="subway_train_chair02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8962" money="0" sharing="0"/>
		  <prop id="subway_train_chair.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8963" money="0" sharing="0"/>
		  <prop id="subway_train_door.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8964" money="0" sharing="0"/>
		  <prop id="white_house_wall.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8965" money="0" sharing="0"/>
		  <prop id="white_house_chair.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8966" money="0" sharing="0"/>
		  <prop id="white_house_clothes.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8967" money="0" sharing="0"/>
		  <prop id="white_house_flag.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8968" money="0" sharing="0"/>
		  <prop id="white_house_sofa.swf" name="Sofa" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8969" money="0" sharing="0"/>
		  <prop id="white_house_table.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8970" money="0" sharing="0"/>
		  <prop id="white_house_ext_tree02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8971" money="0" sharing="0"/>
		  <prop id="white_house_ext_house.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8972" money="0" sharing="0"/>
		  <prop id="white_house_ext_tree01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8973" money="0" sharing="0"/>
		  <prop id="toy_workshop_chair.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8974" money="0" sharing="0"/>
		  <prop id="toy_workshop_table.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8975" money="0" sharing="0"/>
		  <prop id="toy_workshop_toys.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8976" money="0" sharing="0"/>
		  <prop id="toy_workshop_drum.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8977" money="0" sharing="0"/>
		  <prop id="sitting_room_sofa.swf" name="Sofa" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8993" money="0" sharing="0"/>
		  <prop id="sitting_room_sofa2.swf" name="Sofa" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9001" money="0" sharing="0"/>
		  <prop id="cc_beanie_hat.swf" name="Beanie Hat With Ball" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="8994" money="0" sharing="0"/>
		  <prop id="cc_beanie_hat_ball.swf" name="Beanie Hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="8995" money="0" sharing="0"/>
		  <prop id="cc_ear_muffs.swf" name="Ear Muffs" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="8996" money="0" sharing="0"/>
		  <prop id="cc_elf_hat.swf" name="Elf Hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="8997" money="0" sharing="0"/>
		  <prop id="msp_toy_workshop_doorframe" name="doorframe" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_toy_workshop_doorframe_toy_workshop_doorframe1.swf" enable="N" is_premium="N" aid="8978" money="0" sharing="0">
			<state id="msp_toy_workshop_doorframe_toy_workshop_doorframe1.swf" name="closed" enable="Y" default="Y"/>
			<state id="msp_toy_workshop_doorframe_toy_workshop_doorframe2.swf" name="open" enable="Y"/>
		  </prop>
		  <prop id="cc_ushanka_hat.swf" name="Ushanka Hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="8999" money="0" sharing="0"/>
		  <prop id="cc_ushanka_hat_wool.swf" name="Ushanka Hat With Wool" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9000" money="0" sharing="0"/>
		  <prop id="msp_forearmup" name="Forearm" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_forearmup_cc_hand_up_large.swf" enable="Y" is_premium="N" aid="9083" money="0" sharing="0">
			<state id="msp_forearmup_cc_hand_up_large.swf" name="Large" enable="Y" default="Y"/>
			<state id="msp_forearmup_cc_hand_up_med.swf" name="Medium" enable="Y"/>
			<state id="msp_forearmup_cc_hand_up_thin.swf" name="Thin" enable="Y"/>
			<colorset enable="Y" aid="9087">
		  <color r="ccSkin">0xFFE0C1</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccSkin</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_forearmside" name="Forearm" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_forearmside_cc_hand_side_large.swf" enable="Y" is_premium="N" aid="9088" money="0" sharing="0">
			<state id="msp_forearmside_cc_hand_side_large.swf" name="Large" enable="Y" default="Y"/>
			<state id="msp_forearmside_cc_hand_side_med.swf" name="Medium" enable="Y"/>
			<state id="msp_forearmside_cc_hand_side_thin.swf" name="Thin" enable="Y"/>
			<colorset enable="Y" aid="9092">
		  <color r="ccSkin">0xFFE0C1</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccSkin</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_gleg" name="Leg" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_gleg_cc_leg_girl_quarter.swf" enable="Y" is_premium="N" aid="9093" money="0" sharing="0">
			<state id="msp_gleg_cc_leg_girl_quarter.swf" name="Three quarter" enable="Y" default="Y"/>
			<state id="msp_gleg_cc_leg_girl_side.swf" name="Side view" enable="Y"/>
			<colorset enable="Y" aid="9096">
		  <color r="ccPants">0x336699</color>
		  <color r="ccShoe">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccPants</c_area>
		  <c_area oc="">ccShoe</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_mleg" name="Leg" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_mleg_cc_leg_guy_quarter.swf" enable="Y" is_premium="N" aid="9097" money="0" sharing="0">
			<state id="msp_mleg_cc_leg_guy_quarter.swf" name="Three quarter" enable="Y" default="Y"/>
			<state id="msp_mleg_cc_leg_guy_side.swf" name="Side view" enable="Y"/>
			<colorset enable="Y" aid="9100">
		  <color r="ccPants">0x336699</color>
		  <color r="ccShoe">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccPants</c_area>
		  <c_area oc="">ccShoe</c_area>
		</c_parts>
		  </prop>
		  <prop id="convinient_store_tray.swf" name="Convenient store shelf" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9103" money="0" sharing="0"/>
		  <prop id="convinient_store_cashier_counter.swf" name="Convenient store cashier" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9104" money="0" sharing="0"/>
		  <prop id="msp_building_name" name="Building name" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_building_name_court_room_ext_title_courthouse.swf" enable="N" is_premium="N" aid="9105" money="0" sharing="0">
			<state id="msp_building_name_court_room_ext_title_courthouse.swf" name="Courthouse" enable="Y" default="Y"/>
			<state id="msp_building_name_court_room_ext_title_museum.swf" name="Museum" enable="Y"/>
			<state id="msp_building_name_court_room_ext_title_library.swf" name="Library" enable="Y"/>
			<state id="msp_building_name_court_room_ext_title_cityhall.swf" name="Cityhall" enable="Y"/>
		  </prop>
		  <prop id="court_room_ext_collum.swf" name="Collum" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9110" money="0" sharing="0"/>
		  <prop id="court_room_chair01.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9111" money="0" sharing="0"/>
		  <prop id="court_room_chair02.swf" name="Seats" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9112" money="0" sharing="0"/>
		  <prop id="court_room_table01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9113" money="0" sharing="0"/>
		  <prop id="court_room_table02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9114" money="0" sharing="0"/>
		  <prop id="court_room_table03.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9115" money="0" sharing="0"/>
		  <prop id="front_yard_house.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9116" money="0" sharing="0"/>
		  <prop id="msp_door" name="Door" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_door_front_yard_house_door_closed.swf" enable="N" is_premium="N" aid="9117" money="0" sharing="0">
			<state id="msp_door_front_yard_house_door_closed.swf" name="Closed" enable="Y" default="Y"/>
			<state id="msp_door_front_yard_house_door_opened.swf" name="Open" enable="Y" default="Y"/>
		  </prop>
		  <prop id="front_yard_tree.swf" name="Tree" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9120" money="0" sharing="0"/>
		  <prop id="front_yard_sign.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9121" money="0" sharing="0"/>
		  <prop id="police_station_chair.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9122" money="0" sharing="0"/>
		  <prop id="police_station_table.swf" name="Table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9123" money="0" sharing="0"/>
		  <prop id="supermarket_cloth_tray.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9124" money="0" sharing="0"/>
		  <prop id="supermarket_pants_tray.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9125" money="0" sharing="0"/>
		  <prop id="hospital_rm_bed.swf" name="Bed" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9126" money="0" sharing="0"/>
		  <prop id="msp_hosiptal_blanket" name="Blanket" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_hosiptal_blanket_hospital_rm_blanket_full.swf" enable="N" is_premium="N" aid="9127" money="0" sharing="0">
			<state id="msp_hosiptal_blanket_hospital_rm_blanket_empty.swf" name="Empty" enable="Y"/>
			<state id="msp_hosiptal_blanket_hospital_rm_blanket_full.swf" name="Occupied" enable="Y" default="Y"/>
		  </prop>
		  <prop id="cc_foldchair.swf" name="fold chair" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9015" money="0" sharing="0"/>
		  <prop id="hospital_rm_hanger.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9130" money="0" sharing="0"/>
		  <prop id="hospital_lab_bed.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9131" money="0" sharing="0"/>
		  <prop id="msp_clock" name="Clock" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_clock_cc_clock_move.swf" enable="Y" is_premium="N" aid="9153" money="0" sharing="0">
			<state id="msp_clock_cc_clock_move.swf" name="Moving" enable="Y" default="Y"/>
			<state id="msp_clock_cc_clock_no_move.swf" name="Still" enable="Y"/>
		  </prop>
		  <prop id="cc_calendar.swf" name="calendar" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9156" money="0" sharing="0"/>
		  <prop id="cc_tick1.swf" name="check" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9157" money="0" sharing="0">
			<colorset enable="Y" aid="9158">
		  <color r="ccColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_cross1.swf" name="cross" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9161" money="0" sharing="0">
			<colorset enable="Y" aid="9162">
		  <color r="ccColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_arrow1.swf" name="arrow" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9165" money="0" sharing="0">
			<colorset enable="Y" aid="9166">
		  <color r="ccColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_tick2.swf" name="check" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9159" money="0" sharing="0">
			<colorset enable="Y" aid="9160">
		  <color r="ccColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_cross2.swf" name="cross" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9163" money="0" sharing="0">
			<colorset enable="Y" aid="9164">
		  <color r="ccColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_arrow2.swf" name="arrow" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9167" money="0" sharing="0">
			<colorset enable="Y" aid="9168">
		  <color r="ccColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="hospital_rm_blanket.swf" name="Blanket" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9169" money="0" sharing="0"/>
		  <prop id="cc_sign.swf" name="Sign" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9170" money="0" sharing="0">
			<colorset enable="Y" aid="9171">
		  <color r="ccColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="hospital_lab_bed2.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9172" money="0" sharing="0"/>
		  <prop id="cc_computer01.swf" name="Computer backview" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9173" money="0" sharing="0">
			<colorset enable="Y" aid="9174">
		  <color r="ccColorA">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_computer" name="Computer" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_computer_cc_computer02.swf" enable="Y" is_premium="N" aid="9175" money="0" sharing="0">
			<state id="msp_computer_cc_computer02.swf" name="On" enable="Y" default="Y"/>
			<state id="msp_computer_cc_computer03.swf" name="Off" enable="Y"/>
			<state id="msp_computer_cc_computer04.swf" name="Transparent" enable="Y"/>
			<colorset enable="Y" aid="9179">
		  <color r="ccColorA">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_computer_front" name="Computer" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_computer_front_cc_computer05.swf" enable="Y" is_premium="N" aid="9180" money="0" sharing="0">
			<state id="msp_computer_front_cc_computer05.swf" name="On" enable="Y" default="Y"/>
			<state id="msp_computer_front_cc_computer06.swf" name="Off" enable="Y"/>
			<state id="msp_computer_front_cc_computer07.swf" name="Transparent" enable="Y"/>
			<colorset enable="Y" aid="9184">
		  <color r="ccColorA">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_table02.swf" name="Table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9185" money="0" sharing="0">
			<colorset enable="Y" aid="9186">
		  <color r="ccColorA">0xA67A4D</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_table03.swf" name="Table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9187" money="0" sharing="0">
			<colorset enable="Y" aid="9188">
		  <color r="ccColorA">0xA67A4D</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_dish" name="Dish set" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_dish_msp_computer_cc_dish_02.swf" enable="Y" is_premium="N" aid="9189" money="0" sharing="0">
			<state id="msp_dish_msp_computer_cc_dish_01.swf" name="Empty" enable="Y"/>
			<state id="msp_dish_msp_computer_cc_dish_02.swf" name="Food" enable="Y" default="Y"/>
		  </prop>
		  <prop id="cc_tv_back.swf" name="TV backview" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9192" money="0" sharing="0">
			<colorset enable="Y" aid="9193">
		  <color r="ccColorA">0x946538</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_tv_front.swf" name="TV frontview" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9194" money="0" sharing="0">
			<colorset enable="Y" aid="9195">
		  <color r="ccColorA">0x946538</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_memo.swf" name="Memo" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9196" money="0" sharing="0">
			<colorset enable="Y" aid="9197">
		  <color r="ccColorA">0xFFFF66</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_note" name="Note" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_note_msp_computer_cc_notebook.swf" enable="Y" is_premium="N" aid="9198" money="0" sharing="0">
			<state id="msp_note_msp_computer_cc_notebook.swf" name="With line" enable="Y" default="Y"/>
			<state id="msp_note_msp_computer_cc_notebook_noline.swf" name="Without line" enable="Y"/>
			<colorset enable="Y" aid="9201">
		  <color r="ccColorA">0xFFF7D5</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_folder.swf" name="Top secret note" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9202" money="0" sharing="0">
			<colorset enable="Y" aid="9203">
		  <color r="ccColorA">0xDAC08F</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_vase.swf" name="Vase" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9204" money="0" sharing="0">
			<colorset enable="Y" aid="9205">
		  <color r="ccColorA">0x990000</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="restaurant_ext_booth.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9508" money="0" sharing="0"/>
		  <prop id="msp_door02" name="Door" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_door02_restaurant_ext_doorclosed.swf" enable="N" is_premium="N" aid="9509" money="0" sharing="0">
			<state id="msp_door02_restaurant_ext_doorclosed.swf" name="Closed" enable="Y" default="Y"/>
			<state id="msp_door02_restaurant_ext_dooropen.swf" name="Open" enable="Y"/>
			<colorset enable="Y" aid="9512">
		  <color r="ccColorA">0x583F4A</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="restaurant_int_column.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9513" money="0" sharing="0"/>
		  <prop id="restaurant_int_table.swf" name="Table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9514" money="0" sharing="0"/>
		  <prop id="restaurant_int_chair.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9515" money="0" sharing="0">
			<colorset enable="Y" aid="9516">
		  <color r="ccColorA">0x6B2235</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_dishes" name="Dish" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_dishes_restaurant_int_food.swf" enable="Y" is_premium="N" aid="9517" money="0" sharing="0">
			<state id="msp_dishes_restaurant_int_food.swf" name="Food" enable="Y" default="Y"/>
			<state id="msp_dishes_restaurant_int_empty.swf" name="Empty" enable="Y"/>
		  </prop>
		  <prop id="office_board.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9520" money="0" sharing="0"/>
		  <prop id="office_table01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9521" money="0" sharing="0"/>
		  <prop id="office_table02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9522" money="0" sharing="0"/>
		  <prop id="office_table03.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9523" money="0" sharing="0"/>
		  <prop id="school_locker.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9524" money="0" sharing="0"/>
		  <prop id="school_locker_open.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9525" money="0" sharing="0"/>
		  <prop id="classrm_tech_table.swf" name="Table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9526" money="0" sharing="0"/>
		  <prop id="classrm_tech_chair.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9527" money="0" sharing="0"/>
		  <prop id="classrm_stu_table.swf" name="Table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9528" money="0" sharing="0"/>
		  <prop id="cc_grenade.swf" name="Grenade" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9545" money="0" sharing="0">
			<colorset enable="Y" aid="9546">
		  <color r="ccColorA">0x776E4D</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_m16_rifle.swf" name="M16 rifle" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9547" money="0" sharing="0">
			<colorset enable="Y" aid="9548">
		  <color r="ccColorA">0x333333</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_military_knife.swf" name="Military knife" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9549" money="0" sharing="0">
			<colorset enable="Y" aid="9550">
		  <color r="ccColorA">0xA3947F</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_sniper_rifle.swf" name="Sniper rifle" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9551" money="0" sharing="0">
			<colorset enable="Y" aid="9552">
		  <color r="ccColorA">0x404040</color>
		  <color r="ccColorB">0x7F5036</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_minesweeper.swf" name="Minesweeper" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9553" money="0" sharing="0">
			<colorset enable="Y" aid="9554">
		  <color r="ccColorA">0x666666</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_binoculars.swf" name="Binoculars" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9555" money="0" sharing="0">
			<colorset enable="Y" aid="9556">
		  <color r="ccColorA">0x676863</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_water_bottle.swf" name="Water bottle" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9557" money="0" sharing="0">
			<colorset enable="Y" aid="9558">
		  <color r="ccColorA">0x746338</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_army_cap.swf" name="Army cap" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="N" is_premium="N" aid="9559" money="0" sharing="0">
			<colorset enable="Y" aid="9560">
		  <color r="ccColorA">0xDCDEC8</color>
		  <color r="ccColorB">0xA49B70</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_army_cap_02.swf" name="Army cap" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9652" money="0" sharing="0">
			<colorset enable="Y" aid="9653">
		  <color r="ccHColorA">0xDCDEC8</color>
		  <color r="ccHColorB">0xA49B70</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		  <c_area oc="">ccHColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_army_helmet.swf" name="Army helmet" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="N" is_premium="N" aid="9561" money="0" sharing="0">
			<colorset enable="Y" aid="9562">
		  <color r="ccColorA">0xDCDEC8</color>
		  <color r="ccColorB">0xA49B70</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_army_helmet_02.swf" name="Army helmet" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9654" money="0" sharing="0">
			<colorset enable="Y" aid="9655">
		  <color r="ccHColorA">0xDCDEC8</color>
		  <color r="ccHColorB">0xA49B70</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		  <c_area oc="">ccHColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_sergeant_hat_02.swf" name="Sergeant hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9650" money="0" sharing="0">
			<colorset enable="Y" aid="9651">
		  <color r="ccHColorA">0x535B3E</color>
		  <color r="ccHColorB">0x3F2B21</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		  <c_area oc="">ccHColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_sergeant_hat.swf" name="Sergeant hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="N" is_premium="N" aid="9563" money="0" sharing="0">
			<colorset enable="Y" aid="9564">
		  <color r="ccColorA">0x535B3E</color>
		  <color r="ccColorB">0x3F2B21</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_gasmask.swf" name="Gas mask" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="N" is_premium="N" aid="9565" money="0" sharing="0">
			<colorset enable="Y" aid="9566">
		  <color r="ccColorA">0x333333</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_gasmask_02.swf" name="Gas mask" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9656" money="0" sharing="0">
			<colorset enable="Y" aid="9657">
		  <color r="ccHColorA">0x333333</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_glasses01_02.swf" name="Glasses" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9646" money="0" sharing="0">
			<colorset enable="Y" aid="9647">
		  <color r="ccHColorA">0x000000</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_glasses01.swf" name="Glasses" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="N" is_premium="N" aid="9567" money="0" sharing="0">
			<colorset enable="Y" aid="9568">
		  <color r="ccColorA">0x000000</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_glasses02.swf" name="Glasses" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="N" is_premium="N" aid="9569" money="0" sharing="0">
			<colorset enable="Y" aid="9570">
		  <color r="ccColorA">0x333333</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_glasses02_02.swf" name="Glasses" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9648" money="0" sharing="0">
			<colorset enable="Y" aid="9649">
		  <color r="ccHColorA">0x333333</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_chef_hat.swf" name="Chef hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="N" is_premium="N" aid="9571" money="0" sharing="0">
			<colorset enable="Y" aid="9572">
		  <color r="ccColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_chef_hat_02.swf" name="Chef hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9644" money="0" sharing="0">
			<colorset enable="Y" aid="9645">
		  <color r="ccHColorA">0xFFFFFF</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_ammunition_box.swf" name="Ammunition box" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9573" money="0" sharing="0">
			<colorset enable="Y" aid="9574">
		  <color r="ccColorA">0x774733</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_bush.swf" name="Bush grass" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9575" money="0" sharing="0">
			<colorset enable="Y" aid="9576">
		  <color r="ccColorA">0xCACB3A</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_gasoline_can.swf" name="Gasoline can" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9577" money="0" sharing="0">
			<colorset enable="Y" aid="9578">
		  <color r="ccColorA">0x6F6833</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_danger.swf" name="Danger" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9579" money="0" sharing="0">
			<colorset enable="Y" aid="9580">
		  <color r="ccColorA">0xBA3434</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_painting.swf" name="Paintings" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9581" money="0" sharing="0">
			<colorset enable="Y" aid="9582">
		  <color r="ccColorA">0x996600</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_candles.swf" name="Candle holders" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9583" money="0" sharing="0">
			<colorset enable="Y" aid="9584">
		  <color r="ccColorA">0xD9D9D9</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_special.swf" name="Specials" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9585" money="0" sharing="0">
			<colorset enable="Y" aid="9586">
		  <color r="ccColorA">0xBA3434</color>
		  <color r="ccColorB">0x6F6833</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="school_ext_tree01.swf" name="Tree" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9587" money="0" sharing="0"/>
		  <prop id="school_ext_tree02.swf" name="Tree" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9588" money="0" sharing="0"/>
		  <prop id="school_ext_flag.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9589" money="0" sharing="0"/>
		  <prop id="school_ext_gate.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9590" money="0" sharing="0"/>
		  <prop id="army_camp_camp01.swf" name="Army tent" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9591" money="0" sharing="0"/>
		  <prop id="army_camp_camp02.swf" name="Army tent" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9592" money="0" sharing="0"/>
		  <prop id="army_camp_tower01.swf" name="Lookout tower" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9593" money="0" sharing="0"/>
		  <prop id="basketball_court01_goal.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9594" money="0" sharing="0"/>
		  <prop id="basketball_court01_people.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9595" money="0" sharing="0"/>
		  <prop id="basketball_court02_goal.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9596" money="0" sharing="0"/>
		  <prop id="basketball_court02_people.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9597" money="0" sharing="0"/>
		  <prop id="msp_toilet_door" name="Door" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_toilet_door_toilet_door_close.swf" enable="N" is_premium="N" aid="9598" money="0" sharing="0">
			<state id="msp_toilet_door_toilet_door_close.swf" name="Closed" enable="Y" default="Y"/>
			<state id="msp_toilet_door_toilet_door_open.swf" name="Open" enable="Y"/>
			<state id="msp_toilet_door_toilet_door_half.swf" name="Half opened" enable="Y"/>
		  </prop>
		  <prop id="basketball_court02_web.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9602" money="0" sharing="0"/>
		  <prop id="cc_hay.swf" name="Bale of hay" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9618" money="0" sharing="0">
			<colorset enable="Y" aid="9619">
		  <color r="ccColorA">0xF1CC38</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_shoes.swf" name="Shoes" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9620" money="0" sharing="0">
			<colorset enable="Y" aid="9621">
		  <color r="ccColorA">0x999999</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_display.swf" name="Score display" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9622" money="0" sharing="0">
			<colorset enable="Y" aid="9623">
		  <color r="ccColorA">0x9692AB</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_tank.swf" name="Tank" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9624" money="0" sharing="0">
			<colorset enable="Y" aid="9625">
		  <color r="ccColorA">0xD7CAC1</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="xm_bear.swf" name="Xmas Bear" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8981" money="0" sharing="0"/>
		  <prop id="xm_bell.swf" name="Xmas Bell" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8982" money="0" sharing="0"/>
		  <prop id="xm_candle.swf" name="candle" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8983" money="0" sharing="0"/>
		  <prop id="xm_cookies.swf" name="cookies" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8984" money="0" sharing="0"/>
		  <prop id="xm_decoball.swf" name="decoball" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8985" money="0" sharing="0"/>
		  <prop id="xm_gift.swf" name="Gift" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8986" money="0" sharing="0"/>
		  <prop id="xm_jettoy.swf" name="jet toy" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8987" money="0" sharing="0"/>
		  <prop id="xm_sock.swf" name="Xmas Sock" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8988" money="0" sharing="0"/>
		  <prop id="xm_stick.swf" name="Xmas Stick" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8989" money="0" sharing="0"/>
		  <prop id="xm_hat.swf" name="Chrismas Hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="8990" money="0" sharing="0"/>
		  <prop id="xm_tree.swf" name="Tree" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8991" money="0" sharing="0"/>
		  <prop id="xm_turkey.swf" name="Turkey" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8992" money="0" sharing="0"/>
		  <prop id="xm_tree.swf" name="Tree" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8930" money="0" sharing="0"/>
		  <prop id="xm_turkey.swf" name="Turkey" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8931" money="0" sharing="0"/>
		  <prop id="cc_mosse_hat02.swf" name="Moose hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9640" money="0" sharing="0">
			<colorset enable="Y" aid="9641">
		  <color r="ccHColorA">0x990000</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_mosse_hat.swf" name="Moose Hat" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="N" is_premium="N" aid="8998" money="0" sharing="0"/>
		  <prop id="house_deco.swf" name="Decoration" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9002" money="0" sharing="0"/>
		  <prop id="house_top.swf" name="Decoration" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9003" money="0" sharing="0"/>
		  <prop id="sorting_hat_still.swf" name="Sorting Hat (still)" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="8913" money="0" sharing="0"/>
		  <prop id="sorting_hat_talk.swf" name="Sorting Hat (talk)" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="8914" money="0" sharing="0"/>
		  <prop id="broomstick.swf" name="Broomstick" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8915" money="0" sharing="0"/>
		  <prop id="snitch.swf" name="Golden snitch" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8916" money="0" sharing="0"/>
		  <prop id="owl.swf" name="Owl" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8917" money="0" sharing="0"/>
		  <prop id="magic_wand.swf" name="Magic Wand" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8918" money="0" sharing="0"/>
		  <prop id="magic_book.swf" name="Book" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8919" money="0" sharing="0"/>
		  <prop id="feather_pen.swf" name="Feather" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8920" money="0" sharing="0"/>
		  <prop id="owl_cage.swf" name="Cage" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8921" money="0" sharing="0"/>
		  <prop id="classroom_table.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8922" money="0" sharing="0"/>
		  <prop id="classroom_wall.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8923" money="0" sharing="0"/>
		  <prop id="corridor_wall.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8924" money="0" sharing="0"/>
		  <prop id="dining_room_table.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8925" money="0" sharing="0"/>
		  <prop id="library_bookshelf.swf" name="Bookshelves" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8926" money="0" sharing="0"/>
		  <prop id="library_chair.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="8927" money="0" sharing="0"/>
		  <prop id="outside_tree01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8928" money="0" sharing="0"/>
		  <prop id="outside_tree02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="8929" money="0" sharing="0"/>
		  <prop id="cc_hoe.swf" name="Hoe" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9626" money="0" sharing="0">
			<colorset enable="Y" aid="9627">
		  <color r="ccColorA">0xD0BB8C</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_basketball.swf" name="Basketball" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9628" money="0" sharing="0">
			<colorset enable="Y" aid="9629">
		  <color r="ccColorA">0x9C4F17</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_bag" name="Bag" holdable="1" placeable="1" wearable="0" facing="left" thumb="msp_bag_cc_bag_closed.swf" enable="Y" is_premium="N" aid="9630" money="0" sharing="0">
			<state id="msp_bag_cc_bag_closed.swf" name="Closed" enable="Y" default="Y"/>
			<state id="msp_bag_cc_bag_open.swf" name="Open" enable="Y"/>
			<colorset enable="Y" aid="9633">
		  <color r="ccColorA">0x6C7079</color>
		  <color r="ccColorB">0xCC6600</color>
		  <color r="ccColorC">0x336699</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		  <c_area oc="">ccColorC</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_dish02" name="Dish" holdable="1" placeable="1" wearable="0" facing="left" thumb="msp_dish02_cc_tray_closed.swf" enable="Y" is_premium="N" aid="9634" money="0" sharing="0">
			<state id="msp_dish02_cc_tray_closed.swf" name="Covered" enable="Y" default="Y"/>
			<state id="msp_dish02_cc_tray_open.swf" name="Uncovered" enable="Y"/>
			<colorset enable="Y" aid="9637">
		  <color r="ccColorA">0xE1E1E1</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_eyemask.swf" name="Party mask" holdable="0" placeable="1" wearable="1" facing="left" thumb="" enable="Y" is_premium="N" aid="9638" money="0" sharing="0">
			<colorset enable="Y" aid="9639">
		  <color r="ccHColorA">0x73257C</color>
		  <color r="ccHColorB">0xCCCCCC</color>
		  <color r="ccHColorC">0x64ABCB</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccHColorA</c_area>
		  <c_area oc="">ccHColorB</c_area>
		  <c_area oc="">ccHColorC</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_trolleys.swf" name="Trolley" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9642" money="0" sharing="0">
			<colorset enable="Y" aid="9643">
		  <color r="ccColorA">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="barn_ext_fence.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9661" money="0" sharing="0"/>
		  <prop id="barn_ext_hay.swf" name="Hay" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9662" money="0" sharing="0"/>
		  <prop id="barn_int_hay.swf" name="Hay" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9663" money="0" sharing="0"/>
		  <prop id="barn_int_fence.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9664" money="0" sharing="0"/>
		  <prop id="barn_int_stool.swf" name="Stool" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9665" money="0" sharing="0"/>
		  <prop id="msp_milk_bucket" name="Bucket" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_milk_bucket_barn_int_milk_bucket02.swf" enable="Y" is_premium="N" aid="9666" money="0" sharing="0">
			<state id="msp_milk_bucket_barn_int_milk_bucket01.swf" name="full" enable="Y"/>
			<state id="msp_milk_bucket_barn_int_milk_bucket02.swf" name="empty" enable="Y" default="Y"/>
			<colorset enable="Y" aid="9669">
		  <color r="ccColorA">0xD5D8CD</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="barn_int_cow.swf" name="Cow" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9670" money="0" sharing="0"/>
		  <prop id="barn_ext_house.swf" name="House" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9671" money="0" sharing="0">
			<colorset enable="Y" aid="9672">
		  <color r="ccColorA">0xC2493E</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="battlefield_sandbag.swf" name="Sandbag" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9673" money="0" sharing="0"/>
		  <prop id="battlefield_oil_drum01.swf" name="Oil drum" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9674" money="0" sharing="0"/>
		  <prop id="battlefield_oil_drum02.swf" name="Oil drum" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9675" money="0" sharing="0"/>
		  <prop id="battlefield_oil_drum03.swf" name="Oil drum group" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9676" money="0" sharing="0"/>
		  <prop id="battlefield_boxes.swf" name="Boxes" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9677" money="0" sharing="0"/>
		  <prop id="changing_room_bench01.swf" name="Bench" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9678" money="0" sharing="0"/>
		  <prop id="changing_room_bench02.swf" name="Bench" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9679" money="0" sharing="0"/>
		  <prop id="msp_changingrm_door" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_changingrm_door_changing_room_door01.swf" enable="N" is_premium="N" aid="9680" money="0" sharing="0">
			<state id="msp_changingrm_door_changing_room_door01.swf" name="Open" enable="Y"/>
			<state id="msp_changingrm_door_changing_room_door02.swf" name="Closed" enable="Y" default="Y"/>
		  </prop>
		  <prop id="changing_room_shoes.swf" name="Shoes" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9683" money="0" sharing="0">
			<colorset enable="Y" aid="9684">
		  <color r="ccColorA">0x999999</color>
		  <color r="ccColorB">0x333333</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="kitchen02_table01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9685" money="0" sharing="0"/>
		  <prop id="kitchen02_table02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9686" money="0" sharing="0"/>
		  <prop id="camp_int_table.swf" name="Table" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9687" money="0" sharing="0"/>
		  <prop id="camp_int_map.swf" name="Map" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9688" money="0" sharing="0"/>
		  <prop id="camp_int_globe.swf" name="Globe" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9689" money="0" sharing="0"/>
		  <prop id="camp_int_chair01.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9690" money="0" sharing="0">
			<colorset enable="Y" aid="9691">
		  <color r="ccColorA">0x333333</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="camp_int_chair02.swf" name="Chair" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9692" money="0" sharing="0">
			<colorset enable="Y" aid="9693">
		  <color r="ccColorA">0x3F3E1F</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="camp_int_board.swf" name="Board" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9694" money="0" sharing="0"/>
		  <prop id="camp_int_screen.swf" name="Screen" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9695" money="0" sharing="0"/>
		  <prop id="camp_int_gun_rack.swf" name="Gun rack" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9696" money="0" sharing="0"/>
		  <prop id="cc_newspaper_hand.swf" name="Newspaper with hand" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9712" money="0" sharing="0"/>
		  <prop id="cc_newspaper.swf" name="Newspaper" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9713" money="0" sharing="0"/>
		  <prop id="boy_rm_chair01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9714" money="0" sharing="0"/>
		  <prop id="boy_rm_chair02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9715" money="0" sharing="0"/>
		  <prop id="msp_boy_rm_blanket" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_boy_rm_blanket_boy_rm_blanket01.swf" enable="N" is_premium="N" aid="9716" money="0" sharing="0">
			<state id="msp_boy_rm_blanket_boy_rm_blanket01.swf" name="empty" enable="Y" default="Y"/>
			<state id="msp_boy_rm_blanket_boy_rm_blanket02.swf" name="occupied" enable="Y"/>
		  </prop>
		  <prop id="girl_rm_table.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9719" money="0" sharing="0"/>
		  <prop id="girl_rm_chair01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9720" money="0" sharing="0"/>
		  <prop id="girl_rm_chair02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9721" money="0" sharing="0"/>
		  <prop id="msp_girl_rm_blanket" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_girl_rm_blanket_girl_rm_blanket01.swf" enable="N" is_premium="N" aid="9722" money="0" sharing="0">
			<state id="msp_girl_rm_blanket_girl_rm_blanket01.swf" name="empty" enable="Y" default="Y"/>
			<state id="msp_girl_rm_blanket_girl_rm_blanket02.swf" name="occupied" enable="Y"/>
		  </prop>
		  <prop id="cc_shuriken01.swf" name="Shuriken" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9725" money="0" sharing="0">
			<colorset enable="Y" aid="9726">
		  <color r="ccColorA">0x9C9C9C</color>
		  <color r="ccColorB">0xFF6666</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		  <c_area oc="">ccColorB</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_shuriken02.swf" name="Shuriken" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9727" money="0" sharing="0">
			<colorset enable="Y" aid="9728">
		  <color r="ccColorA">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_shield.swf" name="Shield" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9729" money="0" sharing="0">
			<colorset enable="Y" aid="9730">
		  <color r="ccColorA">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="cc_sword.swf" name="Sword" holdable="1" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9731" money="0" sharing="0">
			<colorset enable="Y" aid="9732">
		  <color r="ccColorA">0xCCCCCC</color>
		</colorset>
			<c_parts enable="Y">
		  <c_area oc="">ccColorA</c_area>
		</c_parts>
		  </prop>
		  <prop id="msp_curtain" name="Curtain" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_curtain_shower_room_curtain01.swf" enable="N" is_premium="N" aid="9737" money="0" sharing="0">
			<state id="msp_curtain_shower_room_curtain01.swf" name="Open" enable="Y" default="Y"/>
			<state id="msp_curtain_shower_room_curtain02.swf" name="Close" enable="Y"/>
		  </prop>
		  <prop id="donut_shop_counter.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9740" money="0" sharing="0"/>
		  <prop id="donut_shop_wall.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9741" money="0" sharing="0"/>
		  <prop id="coffee_shop_counter.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9742" money="0" sharing="0"/>
		  <prop id="coffee_shop_table.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9743" money="0" sharing="0"/>
		  <prop id="coffee_shop_chair.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9744" money="0" sharing="0"/>
		  <prop id="bus_stop_stop.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9745" money="0" sharing="0"/>
		  <prop id="bus_stop_door01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9746" money="0" sharing="0"/>
		  <prop id="bus_stop_bus.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9747" money="0" sharing="0"/>
		  <prop id="airport_waiting_sit.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9756" money="0" sharing="0"/>
		  <prop id="airport_waiting_counter.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9757" money="0" sharing="0"/>
		  <prop id="airport_lobby_stand.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9758" money="0" sharing="0"/>
		  <prop id="airport_lobby_counter.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9759" money="0" sharing="0"/>
		  <prop id="airport_security_machine.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9760" money="0" sharing="0"/>
		  <prop id="airport_security_door_02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9761" money="0" sharing="0"/>
		  <prop id="msp_airport_door" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_airport_door_airport_security_door_off.swf" enable="N" is_premium="N" aid="9762" money="0" sharing="0">
			<state id="msp_airport_door_airport_security_door_off.swf" name="Off" enable="Y" default="Y"/>
			<state id="msp_airport_door_airport_security_door_on.swf" name="On" enable="Y"/>
		  </prop>
		  <prop id="oscar_sit_light.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9765" money="0" sharing="0"/>
		  <prop id="oscar_sit_chair01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9766" money="0" sharing="0"/>
		  <prop id="oscar_sit_chair02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9767" money="0" sharing="0"/>
		  <prop id="oscar_sit_chair03.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9768" money="0" sharing="0"/>
		  <prop id="oscar_sit_chair04.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9769" money="0" sharing="0"/>
		  <prop id="oscar_stage_stand.swf" name="Mic" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9770" money="0" sharing="0"/>
		  <prop id="oscar_stage_light.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9771" money="0" sharing="0"/>
		  <prop id="oscar_stage_screen.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9772" money="0" sharing="0"/>
		  <prop id="airport_security_cover.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9773" money="0" sharing="0"/>
		  <prop id="msp_cockpit_door" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_cockpit_door_cockpit_door_close.swf" enable="N" is_premium="N" aid="9784" money="0" sharing="0">
			<state id="msp_cockpit_door_cockpit_door_close.swf" name="Closed" enable="Y" default="Y"/>
			<state id="msp_cockpit_door_cockpit_door_open.swf" name="Open" enable="Y"/>
		  </prop>
		  <prop id="cockpit_front.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9787" money="0" sharing="0"/>
		  <prop id="cockpit_sit.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9788" money="0" sharing="0"/>
		  <prop id="disco_stand.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9789" money="0" sharing="0"/>
		  <prop id="msp_disco_door" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_disco_door_disco_door_open.swf" enable="N" is_premium="N" aid="9790" money="0" sharing="0">
			<state id="msp_disco_door_disco_door_close.swf" name="Closed" enable="Y"/>
			<state id="msp_disco_door_disco_door_open.swf" name="Open" enable="Y" default="Y"/>
		  </prop>
		  <prop id="disco_logo.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9793" money="0" sharing="0"/>
		  <prop id="msp_living_rm_door" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_living_rm_door_living_room_door_close.swf" enable="N" is_premium="N" aid="9794" money="0" sharing="0">
			<state id="msp_living_rm_door_living_room_door_close.swf" name="Closed" enable="Y" default="Y"/>
			<state id="msp_living_rm_door_living_room_door_open.swf" name="Open" enable="Y"/>
		  </prop>
		  <prop id="msp_TV_version" name="TV" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_TV_version_living_room_tv01.swf" enable="Y" is_premium="N" aid="9798" money="0" sharing="0">
			<state id="msp_TV_version_living_room_tv01.swf" name="flat screen" enable="Y" default="Y"/>
			<state id="msp_TV_version_living_room_tv02.swf" name="old television" enable="Y"/>
		  </prop>
		  <prop id="bar_table.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9801" money="0" sharing="0"/>
		  <prop id="msp_bar_door" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="msp_bar_door_bar_door_close.swf" enable="N" is_premium="N" aid="9802" money="0" sharing="0">
			<state id="msp_bar_door_bar_door_close.swf" name="Closed" enable="Y" default="Y"/>
			<state id="msp_bar_door_bar_door_open.swf" name="Open" enable="Y"/>
		  </prop>
		  <prop id="bar_light_01.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9805" money="0" sharing="0"/>
		  <prop id="bar_light_02.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9806" money="0" sharing="0"/>
		  <prop id="bar_stool.swf" name="" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="N" is_premium="N" aid="9807" money="0" sharing="0"/>
		  <prop id="living_room_sofa.swf" name="Sofa" holdable="0" placeable="1" wearable="0" facing="left" thumb="" enable="Y" is_premium="N" aid="9797" money="0" sharing="0"/>${files.map(file => `<char id="${file.id}" name="${file.title || "Untitled"}" cc_theme_id="family" copyable="Y"></char>`).join('')}</theme>`;
		  fUtil.addToZip(zip, 'theme.xml', tThemeXml);
		  /*fs.readdirSync(path.join(folder, 'cc_store/family')).forEach(folder2 => {*/
			fUtil.addToZip(zip, 'char/cc_theme.xml', fs.readFileSync(path.join(folder, `cc_store/family/cc_theme.xml`)));
			// i believe that you have to add the actions as well???
		  //})
		  fs.writeFileSync(tThemeZip, await zip.zip());
	}
	if (req.body.aniVer != "414827163ad4eb60") {
		const xmlPath = path.join(folder, "themelist_noComm.xml");
		const zip = await fUtil.zippy(xmlPath, "themelist.xml");
		res.setHeader("Content-Type", "application/zip");
		res.end(zip);
	} else {
		const xmlPath = path.join(folder, "themelist.xml");
		const zip = await fUtil.zippy(xmlPath, "themelist.xml");
		res.setHeader("Content-Type", "application/zip");
		res.end(zip);
	}
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
			try {
				const meta = JSON.parse(Buffer.concat(buffers));
				var tXml = `<theme id="Comm" name="Community Library"><effect id="328995073.swf" name="bubbles" type="ANIME" resize="false" move="false" published="1"><tags></tags></effect><effect id="328993953.swf" name="bubbles" type="ANIME" resize="false" move="false" published="1"><tags></tags></effect><effect id="823760.swf" name="warpspeed" type="ANIME" resize="false" move="false" published="1"><tags></tags></effect><effect id="1211151.swf" name="arrowfx" type="ANIME" resize="false" move="false" published="1"><tags></tags></effect><char id="1147194" name="BLUE CENTURION=SECTION31" published="1" facing="left" thumb="1147195.swf" default="1147195.swf"><tags/><action id="1147195.swf" name="STAND RIGHT"/><action id="1147200.swf" name="FIRE RIGHT"/><action id="1147201.swf" name="POINT DISRUPTOR"/></char>
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
			  </char>`;
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
			} catch (e) { // loads a theme xml despite an error
				console.log(e);
				res.setHeader("Content-Type", "application/zip");
				res.end(zip);
			}
		}).on("error", (e) => { // loads a theme xml despite an error
			handleError(e);
			res.setHeader("Content-Type", "application/zip");
			res.end(zip);
		});
	}).on("error", (e) => { // loads a theme xml despite an error
		handleError(e);
		res.setHeader("Content-Type", "application/zip");
		res.end(zip);
	}).end();
});

module.exports = group;
