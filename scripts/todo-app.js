'use strict';

let todos = getSavedTodos();

const filters = {
  searchText: '',
  hideCompleted: false
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', e => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#new-todo').addEventListener('submit', e => {
  e.preventDefault();
  const trimmedTodo = e.target.elements.newTodoText.value.trim();
  if (trimmedTodo.length > 0) {
    todos.push({
      id: uuidv4(),
      text: trimmedTodo,
      completed: false
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.newTodoText.value = '';
  }
});

document.querySelector('#hide-completed').addEventListener('change', e => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
