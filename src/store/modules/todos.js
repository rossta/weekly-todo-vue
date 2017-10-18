import debug from 'debug';
import * as db from '@/database';
import * as types from '@/store/types';

const log = debug('app:store/modules/todos');

const defaultState = {
  all: [],
};

function findIndex(state, todo) {
  return state.all.findIndex(t => t._id === todo._id);
}

const getters = {
  allTodos: state => state.all,

  find: state => id => state.all.find(t => t._id === id),

  projectTodos: state => (project) => {
    const projectName = project.toLowerCase();
    return state.all.filter(todo => todo.project.toLowerCase() === projectName);
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

  updateTodo({ commit }, todo) {
    return db.updateTodo(todo).then((t) => {
      commit(types.DID_UPDATE_TODO, { todo: t });
    });
  },

  changeTodo({ commit }, todo) {
    commit(types.DID_CHANGE_TODO, { todo });
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

  [types.DID_UPDATE_TODO](state, { todo }) {
    log('updated todo', todo);
    const index = findIndex(state, todo);
    state.all.splice(index, 1, todo);
  },

  [types.DID_DELETE_TODO](state, { todo }) {
    log('deleted todo', todo);
    const index = findIndex(state, todo);
    state.all.splice(index, 1);
  },

  [types.DID_CHANGE_TODO](state, { todo }) {
    log('changed todo', todo);
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
