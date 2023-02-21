const { BrowserWindow, Menu } = require("electron");
const httpz = require("@octanuary/httpz")

/**
 * Sets the status bar.
 * @param {httpz.Request} req
 * @param {httpz.Response} res
 * @param {Function} next 
 * @returns {void}
 */
module.exports = function resRender(req, res, next) {
	Menu.setApplicationMenu(Menu.buildFromTemplate([{
		label: "Home",
		click: () => {
			const id = +process.env.MAIN_WINDOW_ID;
			BrowserWindow.fromId(id).loadURL("http://localhost:4343")
		}
	}]));
	next();
};
