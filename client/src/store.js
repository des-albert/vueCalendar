import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: '',
    userId: '',
    logged_in: false
  },
  mutations: {
    userName(state, name) {
      state.userName = name;
    },
    userId(state, id) {
      state.userId = id;
    },
    logged_in(state, value) {
      state.logged_in = value;
    }
  },
  getters: {
    userName: state => state.userName,
    userId: state => state.userId,
    logstate: state => state.logged_in
  },
  actions: {}
});
