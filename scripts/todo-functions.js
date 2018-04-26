'use strict';

// Fetch saved todos from localStorage or set todos to empty array
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// Remove todo by id
const removeTodo = id => {
  const removeIndex = todos.findIndex(todo => todo.id === id);

  if (removeIndex > -1) {
    todos.splice(removeIndex, 1);
  }
};

// Save todos to localStorage
const saveTodos = todos => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Changes the todo completed property
const toggleTodo = id => {
  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// generate a DOM element for an individual note
const generateTodoDOM = todo => {
  const todoEl = document.createElement('label');
  const containerEl = document.createElement('div');
  const checkbox = document.createElement('input');
  const todoText = document.createElement('span');
  const removeButton = document.createElement('button');

  checkbox.setAttribute('type', 'checkbox');
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add('list-item');
  containerEl.classList.add('list-item__container');
  todoEl.appendChild(containerEl);

  removeButton.textContent = 'remove';
  removeButton.classList.add('button', 'button--text');
  todoEl.appendChild(removeButton);

  removeButton.addEventListener('click', () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

const generateSummaryDOM = incompleteTodos => {
  const plural = incompleteTodos.length === 1 ? 'todo' : 'todos';
  const summary = document.createElement('h2');
  summary.classList.add('list-title');
  summary.textContent = `You have ${incompleteTodos.length} ${plural} left`;
  return summary;
};

const renderTodos = (todos, filters) => {
  const todoEl = document.querySelector('#todos');
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todoEl.innerHTML = '';

  const summary = generateSummaryDOM(incompleteTodos);
  todoEl.appendChild(summary);

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const noTodos = document.createElement('p');
    noTodos.classList.add('empty-message');
    noTodos.textContent = 'No todos to show';
    todoEl.appendChild(noTodos);
  }
};
