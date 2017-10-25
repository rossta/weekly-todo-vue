import * as db from './index';

const type = 'todo';

db.getTodos()
  .then(doc => doc.rows.map(row => row.doc))
  .then(todos => todos.map((todo) => {
    const { done, project, title, _id, _rev } = todo;
    const updatedTodo = { done, project, title, _id, _rev, type };
    return db.updateTodo(updatedTodo);
  }));
