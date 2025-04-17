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
  --section-theme-primary: var(--color-primary-base);
  --section-theme-secondary: var(--color-primary-contrast-alt);
  --section-theme-focus: var(--color-primary-focus);
  --size: var(--size-8);
  --offset: var(--size-4);
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
