import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
import ai from './ai'

Vue.use(Vuex);

// var ai = axios.create({
//   baseURL: 'http://localhost:3000/data/',
//   timeout: 1000,
// })


export default new Vuex.Store({
  state: {
    data: [],
    msg: '',
    displayMsg: true
  },
  mutations: {
    setData(state, newData) {
      state.data = newData
    },

    setMsg(state, newMsg) {
      state.msg = newMsg
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
    async load({commit}) {
      try {
        var getContent = await ai.get('/')
        commit('setData', getContent.data)
        console.log(getContent.data)
      } catch (e) {
        console.log(e)
        commit('setMsg', e)
      }
    }

  },
});
