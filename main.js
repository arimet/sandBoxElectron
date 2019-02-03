'use strict'

const path = require('path');
const { app, ipcMain } = require('electron');

const Window = require('./src/Window');
const DataStore = require('./src/DataStore');

// On créé un store
const todosData = new DataStore({ name: 'TodoList' })


// Fonction qui crée une fenetre
function main() {
    let mainWindow = new Window({
        file: path.join('./src/home/home.html')
    })

    // On initialise une nouvelle fenetre
    let addTodoWindow;

    // On initialise la todoList
    mainWindow.once('show', () => {
        mainWindow.webContents.send('todoList', todosData.todos)
    })

    // ON crée la fenetre pour ajouter les todos
    ipcMain.on('add-todo-window', () => {
        // Si la fenetre n'existe pas encore
        if (!addTodoWindow) {
            addTodoWindow = new Window({
                file: path.join('./src/todo/todo.html'),
                width: 400,
                height: 400,
                parent: mainWindow
            })

            // On ajoute une listener au close
            addTodoWindow.on('closed', () => {
                addTodoWindow = null;
            })
        }
    })

    // On ajoute
    ipcMain.on('add-todo', (event, todo) => {
        const updatedTodos = todosData.addTodo(todo).todos;

        mainWindow.send('todoList', updatedTodos);
    })

    // On supprime une todo
    ipcMain.on('delete-todo', (event, todo) => {
        const updatedTodos = todosData.delete(todo).todos;

        mainWindow.send('todoList', updatedTodos);
    })


}

// Quand l'application est initialiisé
app.on('ready', main);

// Quand l'application est éteinte
app.on('window-all-closed', () => {
    app.quit();
});