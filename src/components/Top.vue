<template>
  <div class="container">
      <Card v-bind:posts="posts" />

      <div class="text-center"
        v-show="postsLoading">
          Loading...
      </div>
    </div>
</template>

<script>

import api from "../services/api.js"
import Card from './Card.vue'

export default {
    
  name: 'Top',
  components: {
    Card
  },
  async created () {
      const { posts, nextPage } = await api.getPosts("top", null, 30 , 30);


this.posts = posts;


this.nextPage = nextPage;
  },

  data () {
    return {
      posts: [],
      postsLoading: false,
      nextPage: null
    }
    
  },

  methods: {
    morePosts () {
      window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            if (this.nextPage != null) {
                const { posts, nextPage } = await api.getPosts("top", this.nextPage, 30, 30)

                this.posts = this.posts.concat(posts);

                this.nextPage = nextPage;

            }
        }
    }
  }
},

    mounted () {
      this.morePosts();
    }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>