<!-- Copy and paste this code as a quick way to create a new component -->
<template>
  <div v-editable="blok">
    <component
      :key="blok._uid"
      v-for="blok in blok.content"
      :blok="blok"
      :is="blok.component | dashify"
    ></component>
  </div>
</template>

<style scoped>

</style>

<script>
  export default {
    props: ['blok'],
  }
</script>
