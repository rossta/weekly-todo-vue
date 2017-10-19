import debug from 'debug';
import * as db from '@/database';
import * as types from '@/store/types';

const log = debug('app:store/modules/todos');

const defaultState = {
  all: [],
};

const titleize = text => text[0].toUpperCase() + text.substr(1);

const findIndex = (state, todo) => state.all.findIndex(t => t._id === todo._id);

const getters = {
  allTodos: state => state.all,

  find: state => id => state.all.find(t => t._id === id),

  projectTodos: state => (project) => {
    const projectName = project.toLowerCase();
    return state.all.filter(todo => todo.project.toLowerCase() === projectName);
  },

  projectNames: state => new Set(state.all.map(todo => todo.project.toLowerCase())),

  projects: (state, getter) => {
    return Array.from(getter.projectNames).map(name => ({
      name,
      path: `todos/${name}`,
      title: titleize(name),
    }));
  },
};

const actions = {
  fetchTodos({ commit }) {
    db.getTodos().then((doc) => {
      const todos = doc.rows.map(row => row.doc);
      commit(types.DID_FETCH_TODOS, { todos });
    });
  },

  addTodo({ commit }, todo) {
    db.addTodo(todo).then((t) => {
      commit(types.DID_ADD_TODO, { todo: t });
    });
  },

  updateTodo({ commit }, { todo, changes }) {
    log('updateTodo', todo, changes);
    return db.updateTodo({ ...todo, ...changes }).then(() => {
      commit(types.DID_UPDATE_TODO, { todo, changes });
    });
  },

  changeTodo({ commit }, { todo, changes }) {
    commit(types.DID_CHANGE_TODO, { todo, changes });
  },

  deleteTodo({ commit }, todo) {
    return db.deleteTodo(todo).then(() => {
      commit(types.DID_DELETE_TODO, { todo });
    });
  },
};

const mutations = {
  [types.DID_FETCH_TODOS](state, { todos }) {
    log(types.DID_FETCH_TODOS, todos);
    state.all = [...todos];
  },

  [types.DID_ADD_TODO](state, { todo }) {
    log(types.DID_ADD_TODO, todo);
    state.all = [todo, ...state.all];
  },

  [types.DID_UPDATE_TODO](state, { todo, changes }) {
    log('updated todo', todo);
    Object.assign(todo, changes);
  },

  [types.DID_DELETE_TODO](state, { todo }) {
    log('deleted todo', todo);
    const index = findIndex(state, todo);
    state.all.splice(index, 1);
  },

  [types.DID_CHANGE_TODO](state, { todo, changes }) {
    log('changed todo', todo);
    Object.assign(todo, changes);
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
