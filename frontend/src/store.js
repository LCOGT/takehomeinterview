import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

var ai = axios.create({
  baseURL: 'http://localhost:3000/data/',
  timeout: 1000,
})

export default new Vuex.Store({
  state: {
    data: []
  },
  mutations: {
    set: function(state){},
    fill: function(state){
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
    load: function() {

    }

  },
});
