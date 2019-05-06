// Modules
const {BrowserWindow} = require('electron');

// BrowserWindow
let bgItemWin

// New Read Item Method
module.exports = (url, callback) => {
    // Create new offscreen BrowserWindow
    bgItemWin = new BrowserWindow({
        width: 1000,
        height: 1000,
        show: false,
        webPreferences: {
            offscreen: true,
        }
    });

    // Load Read Item
    bgItemWin.loadURL(url);

    // Wait for page finish load
    bgItemWin.webContents.on('did-finish-load', () => {
        
        // Get Screenshot (Thumbnail)
        bgItemWin.webContents.capturePage(image => {
            // Get Image As dataURI
            let screenshot = image.toDataURL();

            // Get Page Title
            let title = bgItemWin.getTitle();

            // Return New Item Data

            callback({title, screenshot, url});

            // Clean Up
            bgItemWin.close();
            bgItemWin = null;
        });

    });
};