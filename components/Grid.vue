<template>
  <div class="grid" :class="gridClass" v-editable="blok">
    <component :key="blok._uid" v-for="blok in blok.content" :blok="blok" :is="blok.component | dashify"></component>
  </div>
</template>

<style scoped>
  .grid--full,
  .grid--one,
  .grid--two,
  .grid--three {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: var(--size-4);
    max-width: var(--content-max-width);
    margin: 0 auto;
  }

  @media (min-width: 660px) {
    .grid--full,
    .grid--two,
    .grid--three {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 960px) {
    .grid--full,
    .grid--three {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 1200px) {
    .grid--full {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
</style>

<script>
  export default {
    props: ['blok'],
    computed: {
      gridClass() {
        const len = this.$props.blok.content.length 
        return len >= 4 ? 'grid--full'
             : len === 3 ? 'grid--three'
             : len === 2 ? 'grid--two'
             : 'grid--one'
      },
    },
  }
</script>
