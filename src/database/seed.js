import * as db from '@/database';

const todos = [{
  title: 'Practice speech for Wendt Center',
  project: 'Home',
  done: false,
}, {
  title: 'Code review and cleanup for Webpack Day',
  project: 'Work',
  done: true,
}, {
  title: 'Plan get together with Ian',
  project: 'Work',
  done: false,
}, {
  title: 'Finish 2017 taxes',
  project: 'Home',
  done: false,
}];

function createTodos() {
  for (let i = 0; i < todos.length; i += 1) {
    const todo = todos[i];
    const addTodo = () => db.addTodo(todo);
    setTimeout(addTodo, i * 1000);
  }
}

createTodos();
