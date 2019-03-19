<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Planet Database</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Ordinality</th>
              <th>Name</th>
              <th>Size</th>
              <th>Distance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.ordinality }}</td>
              <td><a href="#" @click.prevent="">{{ post.name }}</a></td>
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
            <b-form-input type="float" v-model="model.size" required placeholder="Enter size in Earth mass"/>
          </b-form-group>
          <b-form-group label="Distance">
            <b-form-input type="float" v-model="model.distance" required placeholder="Enter distance from sun"/>
          </b-form-group>
          <b-form-group label="Ordinality">
            <b-form-input type="number" v-model="model.ordinality" required placeholder="Enter Ordinality"/>
          </b-form-group>
          <b-form-group label="Description">
            <b-form-textarea rows="4" v-model="model.description" required placeholder="Enter description"/>
          </b-form-group>
          <div>
            <b-btn type="submit" variant="success">Save Post</b-btn>
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
      await api.createPost(this.model)
      this.model = {} // reset form
      await this.refreshPosts()
    }
  }
}
</script>
