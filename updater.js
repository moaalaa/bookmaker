// Modules
const {BrowserWindow, dialog, ipcMain} = require('electron');
const {autoUpdater} = require('electron-updater');

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

// Disable auto downloading
autoUpdater.autoDownload = false;

// Check for updates
module.exports.check = () => {

    // Start update check
    autoUpdater.checkForUpdates();

    // Listen For download (update) found
    autoUpdater.on("update-available", () => {
        
        // Track Progress percentage
        let downloadProgress = 0;

        // Prompt user to update
        dialog.showMessageBox({
            type: 'info',
            title: "Update Available",
            message: "A New Version Of Bookmarker is available. Do you want to update now?",
            buttons: ['Update', 'No']
        }, (btnIndex) => {
            // If not 'Update' button, return
            if (btnIndex !== 0) return;

            // Else start download and show download progress in new window
            autoUpdater.downloadUpdate();

            // Create Progress Window
            let progressWin = new BrowserWindow({
                width: 350,
                height: 35,
                useContentSize: true,
                autoHideMenuBar: true,
                maximize: false,
                fullscreen: false,
                fullscreenable: false,
                resizable: false,
            });

            // Load Progress HTML
            progressWin.loadFile(`./renderer/progress.html`)

            progressWin.on('close', () => {
                progressWin = null
            });

            // listen for progress request  from progressWin
            ipcMain.on('download-progress-request', (e) => {
                e.returnValue = downloadProgress;
            })

            // Track download Progress on autoUpdater
            autoUpdater.on('download-progress', (d) => {
                downloadProgress = d.percent
            })

            // Listen for complete update download
            autoUpdater.on('update-downloaded', () => {

                // Close Progress Win
                if (progressWin) progressWin.close();

                // Prompt user to quit and install update
                dialog.showMessageBox({
                    type: 'info',
                    title: 'Update Ready',
                    message: 'A new version of Bookmarker is ready. Quit to install now?',
                    buttons: ['Yes', 'Later'],
                }, (buttonIndex) => {
                    
                    // Update if 'Yes'
                    if (buttonIndex === 0) autoUpdater.quitAndInstall();



                })
            })
        })
    });
}
