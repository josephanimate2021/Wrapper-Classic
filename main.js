const { app, BrowserWindow, Menu, globalShortcut } = require("electron");
const path = require("path");

/*
load flash player
*/
let pluginName = "./extensions/pepflashplayer.dll";
app.commandLine.appendSwitch("ppapi-flash-path", path.join(__dirname, pluginName));
app.commandLine.appendSwitch("ppapi-flash-version", "32.0.0.371");

let mainWindow;
const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 910,
		height: 629,
		title: "Domo Animate",
		webPreferences: {
			plugins: true,
			contextIsolation: true
		}
	});
	process.env.MAIN_WINDOW_ID = mainWindow.id;

	Menu.setApplicationMenu(Menu.buildFromTemplate([]));
	mainWindow.loadURL("https://gowdpk.3hj.repl.co/static/domo/list.html");
	mainWindow.on("closed", () => mainWindow = null);
};

app.whenReady().then(() => {
	// wait for the server
	setTimeout(() => {
		createWindow();
		// set shortcuts
		globalShortcut.register("CommandOrControl+Shift+I", () => {
			const window = BrowserWindow.fromId(+process.env.MAIN_WINDOW_ID);
			if (window.webContents.isDevToolsOpened()) {
				window.webContents.closeDevTools();
			} else {
				window.webContents.openDevTools();
			}
		});
		globalShortcut.register("CommandOrControl+-", () => {
			const window = BrowserWindow.fromId(+process.env.MAIN_WINDOW_ID);
			const zoom = window.webContents.getZoomFactor();
			if (zoom - 0.2 > 0.1) {
				window.webContents.setZoomFactor(zoom - 0.2);
			}
		});
		globalShortcut.register("CommandOrControl+=", () => {
			const window = BrowserWindow.fromId(+process.env.MAIN_WINDOW_ID);
			const zoom = window.webContents.getZoomFactor();
			window.webContents.setZoomFactor(zoom + 0.2);
		});
	}, 2000);
});
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
	if (mainWindow === null) createWindow();
});
