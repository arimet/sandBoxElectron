'use strict'

const { app } = require('electron');

const Window = require('./src/Window');

// Fonction qui crée une fenetre
function createWindow() {
    let mainWindow = new Window({
        file: './src/home/index.html'
    })
}

// Quand l'application est initialiisé
app.on('ready', createWindow);

// Quand l'application est éteinte
app.on('window-all-closed', () => {
    app.quit();
});