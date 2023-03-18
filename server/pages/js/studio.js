const previewer = $("#previewer");
const body = $("body");
const importer = $("#importer");

/**
 * studio functions
 */
const tutorialReload = (new URLSearchParams(window.location.search)).get("tutorial");
interactiveTutorial = {
	neverDisplay: function() {
		return tutorialReload ? false : true;
	}
};
function studioLoaded(arg) { console.log(arg) }

/**
 * show and hide widgets
 */
let importerVisible = false;
function showImporter() {
	switch(importerVisible) {
		case true: {
			hideImporter();
			break;
		}
		case false:
		default: {
			importerVisible = true;
			importer.show();
			if (!importer.data("importer"))
				importer.data("importer", new AssetImporter(importer));
		}
	}
	return true;
}
function hideImporter() {
	importerVisible = false;
	importer.hide();
}
function initPreviewPlayer(dataXmlStr, startFrame) {
	movieDataXmlStr = dataXmlStr;
	filmXmlStr = dataXmlStr.split("<filmxml>")[1].split("</filmxml>")[0];
	hideImporter(); // hide importer before previewing
	// update flashvars
	const flashvars = new URLSearchParams({
		apiserver: "/",
		isEmbed: 1,
		tlang: "en_US",
		isInitFromExternal: 1,
		startFrame: startFrame,
		autostart: 1,
		isPreview: 1,
		storePath: STORE_URL + "/<store>",
		clientThemePath: CLIENT_URL + "/<client_theme>",
	}).toString();
	previewer.find("object param[name='flashvars']").attr("value", flashvars);
	previewer.css("display", "block");
	studio.css("height", "1px");
	body.css("background-color", "#262d3f");
}
function retrievePreviewPlayerData() { return movieDataXmlStr }
function hidePreviewer() {
	previewer.css("display", "none");
	studio.css("height", "");
	body.css("background-color", "");
}
function publishStudio() {
	document.getElementById("obj").onExternalPreviewPlayerPublish();
	hidePreviewer();
}
/**
 * importer
 */
class AssetImporter {
	constructor(importer) {
		this.importer = importer;
		this.queue = importer.find("#importer-queue");
		this.config = { maxsize: false };
		this.initialize();
	}
	initialize() {
		this.importer.find("#importer-files").on("input", event => {
			//uploads every file
			var fileUpload = document.getElementById("importer-files");
			for (var i = 0; i < fileUpload.files.length; i++) {
				this.addFiles(fileUpload.files[i]);
			}
		});
		this.importer.on("dragover", event => {
			event.preventDefault();
			event.stopPropagation();
		});
		this.importer.on("dragenter", event => {
			event.preventDefault();
			event.stopPropagation();
		})
		this.importer.on("drop", event => {
			event.preventDefault();
			event.stopPropagation();
			const files = event.originalEvent.dataTransfer.files;
			for (var i = 0; i < files.length; i++) {
				this.addFiles(files[i]);
			}
		})
	}
	addFiles(file) { //adds a file to the queue
		const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
		const maxsize = this.config.maxsize;
		if (maxsize && file.size > maxsize) return; // check if file is too large
		let validFileType = false;
		let el;
		switch (ext) {
			case "ogg":
			case "mp3":
			case "wma":
			case "wav": {
				validFileType = true;
				el = $(`
					<div class="importer_asset">
						<div class="asset_metadata">
							<img class="asset_preview" src="http://localhost:4343/pages/img/importer/sound.png" />
							<div>
								<h4 contenteditable="true" class="asset_name">${file.name}</h4>
								<p class="asset_subtype">${filesize(file.size)} | Import as...</p>
							</div>
						</div>
						<div class="import_as">
							<a href="#" type="bgmusic">Music</a>
							<a href="#" type="soundeffect">Sound effect</a>
							<a href="#" type="voiceover">Voiceover</a>
							<a href="#" action="cancel">Cancel</a>
						</div>
					</div>
				`.trim()).appendTo(this.queue);
				break;
			}
			case "swf":
			case "gif":
			case "jpg":
			case "png": {
				validFileType = true;
				el = $(`
					<div class="importer_asset">
						<div class="asset_metadata">
							<img class="asset_preview" src="http://localhost:4343/pages/img/importer/image.png" />
							<div>
								<h4 contenteditable="true" class="asset_name">${file.name}</h4>
								<p class="asset_subtype">${filesize(file.size)} | Import as...</p>
							</div>
						</div>
						<div class="import_as">
							<a href="#" type="bg">Background</a>
							<a href="#" type="prop">Prop</a>
							<a href="#" type="watermark">Watermark</a>
							<a href="#" action="cancel">Cancel</a>
						</div>
					</div>
				`.trim()).prependTo(this.queue);
				break;
			}
			case "mp4": {
				validFileType = true;
				// begins file upload without asking
				el = "video"
				break;
			}
		}
		if (!validFileType) {
			console.error("Invalid file type!");
			return;
		}
		const request = new ImporterFile(file, el, ext);
	}
}
class ImporterFile {
	constructor(file, element, ext) {
		this.file = file;
		this.el = element;
		this.ext = ext;
		this.initialize();
	}
	initialize() {
		let name;
		if (this.el != "video") {
			this.el.find("[type]").on("click", async event => {
				const el = $(event.target);
				const type = el.attr("type");
				Object.assign(this, this.typeFickser(type));

				if (this.type == "prop" && this.subtype != "video") {
					// wait for the prop type to be selected
					await new Promise((resolve, reject) => {
						this.el.find(".import_as").html(`<a href='#' ptype='holdable'>Handheld</a><a href='#' ptype='headable'>Headable Prop</a><a href='#' ptype='wearable'>Headgear</a><a href='#' ptype='placeable'>Other Prop</a><a href="#" action="cancel">Close</a>`.trim());
						this.el.on("click", "[ptype]", event => {
							const el = $(event.target);
							this.ptype = el.attr("ptype");
							resolve();
						});
					});
				}

				// get the title
				name = this.el.find(".asset_name").text();
				this.upload(name);
			});
		} else this.upload(this.file);
		this.el.on("click", "[action]", event => {
			const el = $(event.target);
			const action = el.attr("action");

			switch (action) {
				case "add-to-scene": {
					studio.importerAddAsset(this.type, this.id);
					break;
				} case "cancel": {
					this.el.fadeOut(() => this.el.remove());
					studio.importerStatus("clear");
					break;
				}
			}
		});
	}
	typeFickser(type) {
		switch (type) {
			case "bgmusic":
			case "soundeffect":
			case "voiceover": {
				return { type: "sound", subtype: type };
			} case "video": {
				return { type: "prop", subtype: type };
			} default: {
				return { type: type, subtype: 0 };
			}
		}
	}
	upload(passedname) {
		let name = passedname;
		if (name == "") name = "unnamed" + Math.random().toString().substring(2, 8);

		// set the importer icon
		if (IS_STUDIO) studio.importerStatus("processing");

		let b = new FormData();
		b.append("import", this.file);
		b.append("name", name)
		b.append("type", this.type);
		b.append("subtype", this.subtype);
		b.append("ptype", this.ptype || "placeable");
		$.ajax({
			url: "/api/asset/upload",
			method: "POST",
			data: b,
			processData: false,
			contentType: false,
			dataType: "json"
		}).done(d => {
			if (d.status == "ok") {
				if (IS_STUDIO) {
					if (this.type == "watermark") this.el.fadeOut(() => this.el.remove());
					this.id = d.data.file;

					// why
					const importType = this.subtype == "video" ? "video" : this.type;
					const thumbUrl = `${window.location.origin}/assets/${d.data.file.slice(0, -3) + "png"}`;
					d.data.thumbnail = thumbUrl;

					// alert the studio
					if (this.type == "watermark") document.getElementById("obj").importerStatus("clear");
					else {
						document.getElementById("obj").importerStatus("done");
						document.getElementById("obj").importerUploadComplete(importType, d.data.file, d.data);
					}

					// update html
					if (this.ext != "swf" && this.ext != "mp3" && this.ext != "mp4") this.el.find("img").attr("src", `/assets/${d.data.file}`);
					this.el.find(".import_as").html(`<a href='#' action='add-to-scene'>Add to scene</a><a href="#" action="cancel">Close</a>`.trim());
					return;
				}
			} else {
				alert("Error importing asset.");
				document.getElementById("obj").importerStatus("clear");
			}
		}).catch(e => {
			console.error("Import failed. Error:", e);
			alert("Error importing asset. Please check the browser console using the ctrl+shift+i keyboard shortcut for more details.");
			document.getElementById("obj").importerStatus("clear");
		})
	}
}
