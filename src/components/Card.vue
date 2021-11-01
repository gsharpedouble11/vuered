<template>
    <div class="card-columns">
      <div class="card p-3"
        v-for="(post, index) in posts" v-bind:key="post.data.id + index">
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
</template>

<script>
    export default {
        
        name: 'Card',

        props: ['posts']

    }
</script>

<style lang="scss" scoped>

</style>