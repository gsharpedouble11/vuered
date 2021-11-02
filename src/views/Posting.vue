<template>
  <div class="home">

    <Post
      title="A Test by John"
      author="John Waring"
      date="Sept 8th 2020"
      content="some basic content."
      :postData="$attrs.postData"
    />

  </div>
</template>

<script>
// @ is an alias to /src
import Post from '@/components/Post.vue'

export default {
  name: 'Posting',
  components: {
    Post
  },
  created () {
      console.log(this.$route.params.postid);

      // FUTURE GEORGE: THIS IS HOW TO ACCESS ROUTER PROPS DEFINED IN ROUTES SEE ROUTE INDEX
      console.log(this.$attrs)
  }
}
</script>
