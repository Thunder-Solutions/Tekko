<template>
  <div v-editable="blok">
    <component
      :key="blok._uid"
      v-for="blok in blok.components"
      :blok="blok"
      :is="blok.component | dashify"
    ></component>
  </div>
</template>

<script>
  export default {
    props: ['blok'],
  }
</script>
