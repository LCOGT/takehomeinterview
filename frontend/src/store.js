import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import ai from './ai';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    interval: null,
  },

  mutations: {
    setData(state, newData) {
      state.data = newData;
    },

    setInterval(state, newInterval) {
      state.interval = newInterval;
    },

  },

  actions: {
    async load({ commit }) {
      try {
        const getContent = await ai.get('/');
        commit('setData', getContent.data);
      } catch (e) {
        console.log(e);
        iView.Message.error(e.response ? e.response.data : 'Cannot connect to server... Retrying');
      }
    },

  },
});
