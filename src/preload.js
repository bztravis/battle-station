// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer, contextBridge } = require('electron')

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }

  ipcRenderer.on('devices', (_event, text) => replaceText('devices', text))
})

contextBridge.exposeInMainWorld('electronAPI', {
  onUpdateDrives: (callback) =>
    ipcRenderer.on('drives:UPDATE_DRIVES', callback),
  updateFile: (file, contents) =>
    ipcRenderer.invoke('files:UPDATE', { file, contents }),
})
