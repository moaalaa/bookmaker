// Modules
const {BrowserWindow} = require('electron');

// BrowserWIndow Instance

module.exports.win;

// minWindow Create Window Function
module.exports.createWindow = () => {
    this.win = new BrowserWindow({
        width: 500,
        height: 650,
        minWidth: 350,
        maxWidth: 650,
        minHeight: 310,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    // DevTools
    this.win.webContents.openDevTools();

    // Load Main Window Content
    this.win.loadFile('./renderer/main.html');

    // handle Window Close Event

    this.win.on('close', () => {
        this.win = null;
    })

};
