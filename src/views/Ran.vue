<template>
  <div class="home">
   <Random /> 
  </div>
</template>

<script>
// @ is an alias to /src
import Random from '@/components/Random.vue'

export default {
  name: 'Ran',
  components: {
    Random
  }
}
</script>
