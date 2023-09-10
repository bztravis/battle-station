// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { ipcRenderer } = require("electron");

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }

  ipcRenderer.on("devices", (_event, text) => replaceText("devices", text));
});

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  onAddDrive: (callback) => ipcRenderer.on("drives:ADD_DRIVE", callback),
  onRemoveDrive: (callback) => ipcRenderer.on("drives:REMOVE_DRIVE", callback),
  updateFile: (file, contents) =>
    ipcRenderer.invoke("files:UPDATE", { file, contents }),
});
