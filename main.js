
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 1040,
    height: 600,
    minWidth: "1024px",
    autoHideMenuBar:true,
    // fullscreen:true,
    icon:path.join(__dirname, "/src/assets/img/policia2.png")
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })
  mainWindow.loadFile('index.html');
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

