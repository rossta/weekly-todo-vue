import debug from 'debug';

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import startOfWeek from 'date-fns/start_of_week';
import endOfWeek from 'date-fns/end_of_week';

PouchDB.plugin(PouchDBFind);

const db = new PouchDB('weekly');

const log = debug('app:database');

export function get(...args) {
  return db.get(...args);
}

function putTodo(todo) {
  return db.put(todo, (err, result) => {
    if (err) {
      log('Error while saving todo', err);
    } else {
      log('Sucessfully saved a todo', result);
    }
  }).then(response => get(response.id));
}

export function addTodo({ title, project, done = false }) {
  return putTodo({
    _id: new Date().toISOString(),
    title,
    project,
    done,
  });
}

export function getTodos() {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }).toISOString();
  const endDate = endOfWeek(new Date(), { weekStartsOn: 1 }).toISOString();
  log('getTodos', 'from', startDate, 'to', endDate);
  return db.find({
    selector: {
      $or: [{
        _id: {
          $gte: startDate,
          $lt: endDate,
        },
      }, {
        done: false,
      }],
    },
    sort: [{
      _id: 'desc',
    }],
  }).then(doc => doc.docs);
}

export function deleteTodo(todo) {
  return db.remove(todo);
}

export function updateTodo(todo) {
  log('updating todo', todo);
  return putTodo(todo);
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

window.db = db;
