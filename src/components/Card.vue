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
              <router-link to="/post">Read More</router-link>
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