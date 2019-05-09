// Modules to control application life and create native browser window
const {app, ipcMain} = require('electron')
const mainWindow = require('./mainWindow');
const readItem = require('./readItem');


// require('electron-reload')(__dirname);


// Listen For New Item

ipcMain.on('new-item', (e, itemURL) => {
  // Get Read Item with readItem module

  readItem(itemURL, (item) => {
    e.sender.send('new-item-success', item);
  })

  
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', mainWindow.createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow.win === null) mainWindow.createWindow()
})