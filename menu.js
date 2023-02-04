const { app, Menu } = require("electron");

const isMac = process.platform === "darwin";
const template = [
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [],
        },
      ]
    : []),
];
const mainProcess = require("./main");

module.exports = Menu.buildFromTemplate(template);
