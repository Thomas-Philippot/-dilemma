<template>
  <h1>Une game commence {{ slug }}</h1>
</template>

<script>
export default {
  name: 'Slug',
  data () {
    return {
      slug: this.$route.params.slug
    }
  }
}
</script>

<style scoped>

</style>
