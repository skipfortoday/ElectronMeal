const electron = require('electron');
const {app, BrowserWindow} = require('electron');
const serve = require('electron-serve');
const path = require('path');
const loadURL = serve({directory: 'build'});

let mainWindow;

(async () => {
	await app.whenReady();

	const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({
		width: width,
      	height: height,
      	nodeIntegration: true,
      	minimizable: true,
        fullscreenable:true, 
      	maximizable: true,
        autoHideMenuBar: true,
        backgroundColor:'#f7a440',
      	icon: path.join(__dirname, 'build/favicon.ico')
	});

	// await mainWindow.setMenu(menu);
	await loadURL(mainWindow);

	// The above is equivalent to this:
	await mainWindow.loadURL('build');
	// The `-` is just the required hostname

	//mainWindow.webContents.openDevTools();
})();