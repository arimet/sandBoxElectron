'use strict'

const { BrowserWindow } = require('electron')

// On définit des propriètés par défaut
const defaultProps = {
    width: 500,
    height: 800,
    show: false
}
class Window extends BrowserWindow {
    constructor({ file, ...windowSettings }) {
        super({ ...defaultProps, ...windowSettings })

        // On charge le fichier
        this.loadFile(file);

        // prevent flickering
        this.once('ready-to-show', () => {
            this.show()
        })

    }
}

module.exports = Window