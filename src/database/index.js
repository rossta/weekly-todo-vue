import debug from 'debug';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';

import {
  startOfWeek,
  endOfWeek,
} from '@/utils/dates';

import { hexEncode } from '@/utils/strings';

const log = debug('app:database');

PouchDB.plugin(PouchDBFind);

const currentUser = {
  id: '1234',
  couchdbToken: 'couchdbToken',
};

const db = new PouchDB('weekly');
const remoteCouch = `${process.env.COUCHDB_URL}/userdb-${hexEncode(currentUser.id)}`;

export function sync() {
  const opts = {
    live: true,
    ajax: {
      headers: {
        'X-Auth-CouchDB-UserName': `${currentUser.id}`,
        // 'X-Auth-CouchDB-Roles': 'users',
        // 'X-Auth-CouchDB-Token': currentUser.couchdbToken,
        // 'Content-Type': 'application/json; charset=utf-8',
      },
    },
  };
  db.replicate.to(remoteCouch, opts);
  db.replicate.from(remoteCouch, opts);
}

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

export function addTodo({ title, project, week, done = false }) {
  const type = 'todo';
  return putTodo({
    _id: new Date().toISOString(),
    title,
    project,
    done,
    week,
    type,
  });
}

function queryTodos(query) {
  return db.find(query).then(doc => doc.docs);
}

export function getTodo({ id }) {
  return db.find({
    selector: {
      type: 'todo',
      _id: {
        $eq: id,
      },
    },
  }).then((doc) => {
    const [first] = doc.docs;
    return first;
  });
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
