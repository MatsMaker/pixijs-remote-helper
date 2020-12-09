const Menu = require('electron').Menu;

const mainMenuTemplate = [{
  label: 'Help'
}];

if (process.env.NODE_ENV !== 'production') {

}

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

Menu.setApplicationMenu(mainMenu);

module.exports = mainMenu