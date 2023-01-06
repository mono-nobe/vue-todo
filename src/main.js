const app = new Vue({
  el: "#app",
  data: function () {
    return {
      todos: [],
      editModeTodos: [],
      todoText: "",
    };
  },
  created() {
    if (localStorage.todos) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
    }
  },
  methods: {
    createTodo() {
      if (this.todoText === "") {
        return;
      }

      const maxId = detectMaxId(this.todos);
      this.todos.push({
        id: maxId + 1,
        text: this.todoText,
      });
      saveToLocalStorage(this.todos);

      this.todoText = "";
    },
    editTodo(targetTodo) {
      this.editModeTodos.push(targetTodo);
    },
    saveTodo(targetTodo) {
      if (targetTodo.text === "") {
        return;
      }

      this.editModeTodos = this.editModeTodos.filter(
        (todo) => todo !== targetTodo
      );

      saveToLocalStorage(this.todos);
    },
    deleteTodo(targetTodo) {
      this.todos = this.todos.filter((todo) => todo !== targetTodo);

      saveToLocalStorage(this.todos);
    },
    isEditMode(targetTodo) {
      return this.editModeTodos.includes(targetTodo);
    },
  },
});

app.mount("#app");

function detectMaxId(todos) {
  if (todos.length === 0) {
    return 0;
  }

  return Math.max(...todos.map((todo) => todo.id));
}

function saveToLocalStorage(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
