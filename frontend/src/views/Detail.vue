<template>
  <Row>
    <Col :xs="1" :lg="6"> . </Col>

    <Col :xs="22" :lg="12">
      <div class="detail">
        <Button @click="goHome()">
          <Icon type="ios-arrow-back" />
          Back
        </Button>
        <br/>

        <h1>{{detail.name}}</h1>
        <br/>
        <p>{{detail.description}}</p>
        <br/>
        <br/>
        <p>Ordinality: {{detail.ordinality}}</p>
        <br/>
        <p>Size: {{detail.size}} Earth Masses</p>
        <br/>
        <p>Distance: {{detail.distance}} AU</p>
      </div>
    </Col>

    <Col :xs="1" :lg="6"> . </Col>
  </Row>
</template>

<script>
export default {
  name: 'detail',

  computed: {
    detail() {
      const d = this.$store.state.data.find(e => e.name == this.$route.params.name);
      return d || {
        name: '',
        ordinality: null,
        size: null,
        distance: null,
        desription: '',
      };
    },
  },
  methods: {
    goHome() {
      this.$router.push('/');
    },
  },

  created() {
    console.log('mounted');

    if (!this.$store.state.interval) {
      const interval = window.setInterval(() => {
        this.$store.dispatch('load');
      }, 2000);
      this.$store.commit('setInterval', interval);
    }
  },
};
</script>

<style scoped>
.detail{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
</style>
