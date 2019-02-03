const Store = require('electron-store')

// On définit la classe dateStore
class DataStore extends Store {
    constructor(settings) {
        super(settings);

        // On récupère notre liste sinon on dit que c'est vide
        // this.get vient de electron store
        this.todos = this.get('todos') || [];
    }

    // Fonction qui nous récupère nos todos
    getTodos() {
        this.todos = this.get('todos') || [];
        return this;
    }

    // Fonction qui sauvegarde notre liste
    saveTodos() {
        this.set('todos', this.todos)
        return this;
    }

    // Ajoute une todo à notre liste
    addTodo(todo) {
        this.todos = [...this.todos, todo];

        // On sauvegarde notre liste
        return this.saveTodos();
    }

    // Fonction qui delete un element dans notre liste
    delete(todo) {
        this.todos = this.todos.filter(t => t !== todo)
        return this.saveTodos()
    }
}

module.exports = DataStore