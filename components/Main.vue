<template>
  <main v-editable="blok">
    <component
      :key="blok._uid"
      v-for="blok in blok.content"
      :blok="blok"
      :is="blok.component | dashify"
    ></component>
  </main>
</template>

<style scoped>
main {
  display: grid;
  border-top: var(--size-2) solid var(--color-primary-base);
}
</style>

<script>
export default {
  props: ['blok'],
  mounted() {
    console.log(this.blok)
  },
}
</script>
