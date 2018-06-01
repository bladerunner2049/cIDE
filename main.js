var app = require('electron').app;
const {BrowserWindow} = require('electron');
var path = require('path');
//app.on('window-all-closed', function() {
//  if (process.platform !== 'darwin') {
//    app.quit();
//  }
//});
app.on('ready', function() {
  let mainWindow = new BrowserWindow({minWidth: 800, minHeight: 600, darkTheme: true})
  mainWindow.loadURL('file://'+ __dirname+ '/index.html')
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

const dialog = require('electron');

    function openFile () {
        //event.preventDefault;

        dialog.showOpenDialog({properties: [ 'openFile' ]} ,function (fileNames) {

            if (fileNames === undefined) return;

            var fileName = fileNames[0];

            fs.readFile(fileName, 'utf-8', function (err, data) {

                document.getElementById("editor").value = data;
                //document.getElementById("codearea").innerHTML = data;

            });

        });

    }

