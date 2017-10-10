import PouchDB from 'pouchdb';
import debug from 'debug';

const db = new PouchDB('weekly');

const log = debug('app:database');

export function addTodo({ title, project, done = false }) {
  const todo = {
    _id: new Date().toISOString(),
    title,
    project,
    done,
  };

  return db.put(todo, (err, result) => {
    if (err) {
      log('Error while saving todo', err);
    } else {
      log('Sucessfully saved a todo', result);
    }
  });
}

export function getTodos() {
  return db.allDocs({ include_docs: true, descending: false });
}

export function deleteTodo(todo) {
  return db.remove(todo);
}

export function onChange(callback) {
  return db.changes({
    since: 'now',
    live: true,
  }).on('change', callback);
}

export function destroy() {
  return db.destroy();
}
