// import debug from 'debug';
// import * as types from '@/store/types';

// const log = debug('app:store/modules/dates');

const defaultState = {
  now: null,
};

const getters = {
  now: (state) => {
    const date = state.now || new Date();
    return date;
  },
};

const actions = {};

const mutations = {};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
