<template>

  <div class="container">
      <div>
        <div class="text-center" v-if="postsLoading">
            Loading...
        </div>
        <label for="get-global">Select Country</label>
        <select  class="form-control" id="get-global" :options="selectables" v-model="selected" v-on:change="getPostsGlobal(selected)">
        <option v-for="selectable in selectables" v-bind:key="selectable.value">
            {{selectable.value}}
        </option>
    </select>
      </div>
    <div class="card-columns">

        <div class="card p-3"
          v-for="post in posts" v-bind:key="post.data.id">

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

 
      <!-- <button :disabled="postsLoading" type="button" class="btn btn-secondary btn-lg btn-block" id="more-posts" v-on:click="morePosts">Load more posts</button> -->
    </div>
</template>

<script>

// import api from "../services/api.js"
import axios from 'axios'

export default {
    
  name: 'Hot',
//   async created () {
//       const { posts, nextPage } = await api.getPosts("hot", null, 30 , 30);

// console.log(posts);
// this.posts = posts;


// this.nextPage = nextPage;
//   },


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
          const selectedRegion = `&g=JP`

          url += selectedRegion;
        }


        if (page != null) {
            url += `&after=` + page
        }

        const  data  = await axios.get(url);
        const { children } = data.data.data;
        console.log(children)

        this.posts = children
        // console.log(this.posts);
        this.postsLoading = false;
    },
    
//     morePosts () {
//       window.onscroll = async () => {
//         let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
//         if (bottomOfWindow) {
//             console.log("bottom");
//             if (this.nextPage != null) {
//                 console.log(this.nextPage)
//                 const { posts, nextPage } = await api.getPosts("hot", this.nextPage, 30, 30)

//                 this.posts = this.posts.concat(posts);

//                 this.nextPage = nextPage;

//             }
//         }
//     }
// }
},

    mounted () {
        this.getPostsGlobal()
        // this.morePosts();
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