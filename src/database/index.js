import debug from 'debug';

import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import {
  startOfWeek,
  endOfWeek,
} from '@/utils';

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
  const type = 'todo';
  return putTodo({
    _id: new Date().toISOString(),
    title,
    project,
    done,
    type,
  });
}

function queryTodos(query) {
  return db.find(query).then(doc => doc.docs);
}

export function getTodos({ now = new Date() }) {
  const startDate = startOfWeek(now).toISOString();
  const endDate = endOfWeek(now).toISOString();
  log('getTodos', 'from', startDate, 'to', endDate);

  return queryTodos({
    selector: {
      type: 'todo',
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
  });
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
