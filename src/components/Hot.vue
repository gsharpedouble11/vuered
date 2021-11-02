<template>

  <div class="container">
      <div>
        <div class="text-center" v-if="postsLoading">
            Loading...
        </div>
        <label for="get-global">Select Country</label>
        <select  class="form-control" id="get-global" :options="selectables" v-model="selected" v-on:change="getPostsGlobal(selected)">
        <option v-for="selectable in selectables" v-bind:key="selectable.value">
            {{selectable.name}}
        </option>
        </select>
      </div>
      <Card v-bind:posts="posts" />
  </div>
</template>

<script>

// import api from "../services/api.js"
import axios from 'axios'
import Card from './Card.vue'

export default {
    
  name: 'Hot',
  components: {
    Card
    },


  data () {
    return {
        posts: [],
        postsLoading: false,
        nextPage: null,
        selected: '',
        selectables: [ 
            {name: 'Great Britain', value: 'GB'}, 
            {name: 'United States', value: 'US'},
            {name: 'Canada', value: 'CA'} 
        ]
        }
        
    },

  methods: {
    // get api of 'hot' based on location
      async getPostsGlobal( selected = "", page, limit=30, count=30 ) {
        this.postsLoading = true;
          let url = `https://www.reddit.com/r/all/hot.json?limit=${limit}&count=${count}`

          if (selected) {
            const selectedRegion = `&g=${selected}`
            url += selectedRegion;
          }

          if (page != null) {
              url += `&after=` + page
          }

          const { data } = await axios.get(url);
          const { children, after } = data.data;
          this.posts = children
          this.nextPage = after
          this.postsLoading = false
          return {
          posts: children,
          nextPage: after
          }
      },
      
      morePosts () {
        window.onscroll = async () => {
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
          if (bottomOfWindow && !this.postsLoading) {
              this.postsLoading = true;
              if (this.nextPage != null) {
                  const { posts, nextPage } = await this.getPostsGlobal("hot", this.nextPage, 30, 30)
                  this.posts = this.posts.concat(posts);
                  this.nextPage = nextPage;
                  this.postsLoading = false;
              }
          }
      }
  }
},

    mounted () {
        this.getPostsGlobal()
        this.morePosts();
    }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#more-posts {
  margin-bottom: 3rem;
  cursor: pointer;
}
#get-global {
    margin: 0 auto 2rem;
    text-align: center;
    width: 50%;
}
</style>