'use strict'

const { ipcRenderer } = require('electron');

// On ajoute un elistener sur l'envoie de la todo
document.getElementById('todoForm').addEventListener('submit', (e) => {
    e.preventDefault()

    // On récupère l'input
    const input = e.target[0]

    // On envoie la todo à notre page principale
    ipcRenderer.send('add-todo', input.value)

    // On reset l'input
    input.value = '';
})