import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import ai from './ai'
import iView from 'iview';

Vue.use(Vuex);

// var ai = axios.create({
//   baseURL: 'http://localhost:3000/data/',
//   timeout: 1000,
// })


export default new Vuex.Store({
  state: {
    data: [],
    // displayMsg: true
    interval: null
  },
  mutations: {
    setData(state, newData) {
      state.data = newData
    },

    setInterval(state, newInterval) {
      state.interval = newInterval
    },

    fill(state) {
      console.log('fill commited')
      state.data = {
        name: "Petry",
        ordinality: 1,
        size: 6,
        distance: 100,
        description: "wkfg"
      }
    }

  },
  actions: {
    async load({commit, state}) {
      try {
        var getContent = await ai.get('/')
        commit('setData', getContent.data)
        // state.displayMsg = false
        console.log(getContent.data)
      } catch (e) {
        console.log(e)
        iView.Message.error(e.response? e.response.data:'Cannot connect to server');
      }
    },
    a(){console.log(a)},
    
  },
});
