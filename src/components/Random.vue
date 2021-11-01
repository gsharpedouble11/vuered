<template>
  <div class="container">
      <Card v-bind:posts="posts" />

      <div class="text-center"
        v-show="postsLoading">
          Loading...
      </div>
      <!-- <button :disabled="postsLoading" type="button" class="btn btn-secondary btn-lg btn-block" id="more-posts" v-on:click="morePosts">Load more posts</button> -->
    </div>
</template>

<script>

import api from "../services/api.js"
import Card from "./Card.vue"

export default {
    
  name: 'Random',
  components: {
    Card
  },
  async created () {
      const { posts, nextPage } = await api.getPosts("controversial", null, 30 , 30);

console.log(posts);
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
            console.log("bottom");
            if (this.nextPage != null) {
                console.log(this.nextPage)
                const { posts, nextPage } = await api.getPosts("controversial", this.nextPage, 30, 30)

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
#more-posts {
  margin-bottom: 3rem;
  cursor: pointer;
}
</style>