<template>
  <rich-text class="content" :doc="blok.content" v-editable="blok"></rich-text>
</template>

<style scoped>
  .content {
    padding: var(--size-2) var(--size-4) 0;
    width: 100%;
    box-sizing: border-box;
    max-width: var(--content-max-width);
    margin: 0 auto;
  }

  @media (max-width: 500px) {
    .content {
      padding: 0 var(--size-2);
    }
  }
</style>

<script>
  export default {
    props: ['blok'],
  }
</script>
