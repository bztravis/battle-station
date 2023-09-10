const { app, BrowserWindow } = require('electron')
const drivelist = require('drivelist')
const fs = require('fs')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // fullscreen: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.\\

const checkFiles = async (prev) => {
  delayBeforeNext = 100
  // console.log('running')
  const drives = await drivelist.list()

  if (JSON.stringify(prev) != JSON.stringify(drives)) {
    setTimeout(() => {
      // console.log('USB DRIVES', getUSBDrives(drives))
      const driveCandidates = getUSBDrives(drives)
      let driveConfigs = []
      for (let i = 0; i < driveCandidates.length; i++) {
        // console.log('driveCandidates[i]', driveCandidates[i])
        try {
          if (fs.readdirSync(`${driveCandidates[i]}`).includes('.driveduels'))
            driveConfigs = [
              ...driveConfigs,
              JSON.parse(
                fs.readFileSync(`${driveCandidates[i]}/.driveduels`, 'utf8')
              ),
            ]
          console.log('driveConfigs', driveConfigs)
        } catch {
          continue
        }
      }
    }, 1000)
  }
  setTimeout(() => {
    checkFiles(drives)
  }, 100)
}

const startCheckFiles = async () => {
  checkFiles(await drivelist.list())
}
startCheckFiles()

function getUSBDrives(drives) {
  let results = []
  for (let i = 0; i < drives.length; i++) {
    if (drives[i].isUSB && drives[i].mountpoints[0])
      results = [...results, drives[i].mountpoints[0].path]
  }

  return results
}
