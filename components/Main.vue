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
  --section-theme-primary: var(--color-primary-base);
  --section-theme-secondary: var(--color-primary-contrast-alt);
  --section-theme-focus: var(--color-primary-focus);
  --size: var(--size-8);
  --offset: var(--size-4);

  display: grid;
  border-top: var(--size-2) solid var(--color-primary-base);
  padding-bottom: var(--size-7);
}
main :deep(.section--normal) {
  padding: var(--size-4) var(--size-2) 0;
  max-width: var(--content-max-width);
  margin: 0 auto;
}
main :deep(.section--normal .title) {
  padding: 0;
  border-bottom: 1px solid;
  background-color: transparent;
  color: var(--color-primary-base);
  font-size: var(--size-3); 
}

@media (min-width: 960px) {
  main :deep(.section--normal .title) {
    display: block;
    height: auto;
  }
  main :deep(.section--normal .title::before),
  main :deep(.section--normal .title::after) {
    display: none;
  }
}
</style>

<script>
export default {
  props: ['blok'],
}
</script>
