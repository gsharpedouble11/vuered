<template>

  <div class="container">
      <div>
        <label for="get-global">Select Country</label>
        <select  class="form-control" id="get-global" @change="getPostsGlobal(selectables.value, null, limit=30, count=30)" :options="selectables">
        <option v-for="selectable in selectables" v-bind:key="selectable.value">
            {{selectable.name}}
        </option>
    </select>
      </div>
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
import axios from 'axios'

export default {
    
  name: 'Hot',
  async created () {
      const { posts, nextPage } = await api.getPosts("hot", null, 30 , 30);

console.log(posts);
this.posts = posts;


this.nextPage = nextPage;
  },

  data () {
    return {
        posts: [],
        postsLoading: false,
        nextPage: null,
        selectables: [ 
            {name: 'Great Britain', value: 'GB'}, 
            {name: 'United States', value: 'US'},
            {name: 'Canada', value: 'CA'} 
        ]
        }
        
    },

  methods: {
    // get api of 'hot' based on location
    async getPostsGlobal( selected, page, limit=30, count=30 ) {
        let url = `https://www.reddit.com/r/all/hot.json?limit=${limit}&count=${count}&g=${selected}`
        console.log(selected)
        console.log(url)
        if (page != null) {
            url += `&after=` + page
        }

        const { data } = await axios.get(url);

        return {

            posts: data.data.children,

            nextPage: data.data.after

          

        };
    },

    morePosts () {
      window.onscroll = async () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            console.log("bottom");
            if (this.nextPage != null) {
                console.log(this.nextPage)
                const { posts, nextPage } = await api.getPosts("hot", this.nextPage, 30, 30)

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
#get-global {
    margin: 0 auto 2rem;
    text-align: center;
    width: 50%;
}
</style>