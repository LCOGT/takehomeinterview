<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Planet Database</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <!-- Renders detail of clicked planet when the name of the planet is clicked -->
    <div v-if="this.detail">
      <h1> {{ model.name }} </h1>
      <h2> {{ model.description }} </h2>
      <br>
      <p>Ordinality: {{ model.ordinality }}</p>
      <p>Size: {{ model.size }}</p>
      <p>Distance: {{ model.distance }}</p>
    </div>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Ordinality</th>
              <th>Name</th>
              <th>Size</th>
              <th>Distance (AU)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.ordinality }}</td>
              <td><a href="#" @click.prevent="getDetail(post.name)">{{ post.name }}</a></td>
              <td>{{ post.size }}</td>
              <td>{{ post.distance }}</td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <form @submit.prevent="savePost">
          <b-form-group label="Name">
            <b-form-input type="text" v-model="model.name" required placeholder="Enter name"/>
          </b-form-group>
          <b-form-group label="Size">
            <b-form-input type="number" v-model="model.size" required placeholder="Enter size in Earth mass"/>
          </b-form-group>
          <b-form-group label="Distance">
            <b-form-input type="number" v-model="model.distance" required placeholder="Enter distance from sun in AU"/>
          </b-form-group>
          <b-form-group label="Ordinality">
            <b-form-input type="number" min = 1 max = 8 v-model="model.ordinality" required placeholder="Enter Ordinality"/>
          </b-form-group>
          <b-form-group label="Description">
            <b-form-textarea rows="4" v-model="model.description" required placeholder="Enter description"/>
          </b-form-group>
          <div>
            <b-btn type="submit" variant="success">Save Post</b-btn>
            <b-alert :show="warning" variant="warning">No Duplicate data</b-alert>
          </div>
        </form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      detail: false,
      warning: false,
      posts: [],
      model: {},
      fields: {
        ordinality: {
          label: 'Ordinality',
          sortable: true
        },
        name: {
          label: 'Name',
          sortable: true
        },
        size: {
          label: 'Size',
          sortable: true
        },
        distance: {
          label: 'Distance',
          sortable: true
        }
      }
    }
  },
  async created () {
    this.refreshPosts()
  },
  methods: {
    async refreshPosts () {
      this.loading = true
      this.posts = await api.getPosts()
      this.loading = false
    },
    async savePost () {
      if (this.posts.filter(post => post.name === this.model.name).length > 0 ||
        this.posts.filter(post => post.ordinality.toString() === this.model.ordinality).length > 0) {
        this.warning = true
        this.model = {}
      } else {
        this.warning = false
        await api.createPost(this.model)
        this.model = {} // reset form
        await this.refreshPosts()
      }
    },
    async getDetail (name) {
      this.detail = true
      this.model = {}
      this.model = await api.getPost(name)
    }
  }
}
</script>
