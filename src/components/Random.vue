<template>
  <div class="container">
      <div class="card-columns">

        <div class="card p-3"
          v-for="post in posts" v-bind:key="post.data.title">

          <blockquote class="card-blockquote">
            <p>
              {{ post.data.title }}
            </p>
            <footer>
              <small>
                <a target="_blank"
                  :href="post.data.url">
                  Read more on {{ post.data.domain }}
                </a>
              </small>
            </footer>
          </blockquote>

        </div>

      </div>

      <div class="text-center"
        v-show="postsLoading">
          Loading...
      </div>
      <!-- <button :disabled="postsLoading" type="button" class="btn btn-secondary btn-lg btn-block" id="more-posts" v-on:click="morePosts">Load more posts</button> -->
    </div>
</template>

<script>

import api from "../services/api.js"

export default {
    
  name: 'Random',
  async created () {
      const { posts, nextPage } = await api.getPosts("random", null, 30 , 30);


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
                const { posts, nextPage } = await api.getPosts("random", this.nextPage, 30, 30)

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