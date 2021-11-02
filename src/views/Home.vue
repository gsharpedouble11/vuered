<template>
  <div class="home">
   <Top />

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
import Top from '@/components/Top.vue'
import Post from '@/components/Post.vue'

export default {
  name: 'Home',
  components: {
    Top,
    Post
  }
}
</script>
