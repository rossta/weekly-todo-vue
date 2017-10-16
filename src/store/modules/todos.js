import debug from 'debug';
import * as db from '@/database';
import * as types from '@/store/types';

const log = debug('app:store/modules/todos');

const defaultState = {
  all: [],
};

const getters = {
  allTodos: state => state.all,

  projectTodos: state => (project) => {
    const projectName = project.toLowerCase();
    return state.all.filter(todo => todo.project.toLowerCase() === projectName);
  },
};

const actions = {
  fetchTodos({ commit }) {
    db.getTodos().then((doc) => {
      const todos = doc.rows.map(row => row.doc);
      log('fetched todos', todos);
      commit(types.DID_FETCH_TODOS, { todos });
    });
  },
};

const mutations = {
  [types.DID_FETCH_TODOS](state, { todos }) {
    state.all = todos;
    return state;
  },
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
