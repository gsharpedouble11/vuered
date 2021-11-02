<template>
  <div class="home">

    <Post
      title="A Test by John"
      author="John Waring"
      date="Sept 8th 2020"
      content="some basic content."
    />

    <Post
      title="Another by John"
      author="John Waring"
      date="Oct 24th 2021"
      content="Differnt basic content."
      optionalContent="Some additional content which is optional."
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
  }
}
</script>
