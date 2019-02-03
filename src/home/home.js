'use strict'

const { ipcRenderer } = require('electron');

// On ouvre la page pour ajouter les todo
document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window');
})

// Fonction qui permet de supprimer une todo
const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent);
}

// Quand on recoi une todo de la page addTodo
ipcRenderer.on('todoList', (event, todos) => {

    // On récupère notre élément html
    const todoList = document.getElementById('todoList');

    // on crée notre string html
    const todoItems = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`;
        return html;
    }, '');

    // On ajoute notre string au bon endroit
    todoList.innerHTML = todoItems;

    // On ajoute un listener pour delete l'item
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo);
    })
})