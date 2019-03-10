// import store from '../store'
export default {
  name: 'Home',
  props: {
    msg: String,
  },

  computed: {
    data () {
      return this.$store.state.data
    }
  },

  methods: {

  },
  mounted: function() {
    console.log('mounted')
    this.$store.commit('fill')
  }
};
