const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { parse } = require("csv-parse");
const array = require("lodash/array");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 665,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("./index.html");
};

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (canceled) {
    return;
  } else {
    const data = await fileReader(filePaths);
    return [filePaths[0], data];
  }
}

function fileReader(path) {
  return new Promise((resolve) => {
    var csvData = [];
    for (var i = 0; i < path.length; i++) {
      file = path[i];

      fs.createReadStream(file)

        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", function (csvrow) {
          csvData.push(csvrow);
        })
        .on("end", () => resolve(csvData));
    }
  });
}

// async function sendGraphData() {
//   const final = fileReader(fileList);
//   console.log(final);
//   return final;
// }

app.whenReady().then(() => {
  ipcMain.handle("dialog:openFile", handleFileOpen);
  // ipcMain.handle("send:graph", sendGraphData);
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
