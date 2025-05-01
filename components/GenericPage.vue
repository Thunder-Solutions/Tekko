<template>
  <div v-editable="blok">
    <div class="page">
      <splash-image class="titleContainer" :custom="blok.customImage">
        <h1 class="title">{{ blok.title }}</h1>
      </splash-image>
      <div class="mainContent">
        <component :key="blok._uid" v-for="blok in blok.content" :blok="blok" :is="blok.component | dashify"></component>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .page {
    min-height: 100vh;
  }

  .titleContainer {
    color: var(--color-primary-alt);
    height: var(--size-8);
    position: relative;
    z-index: 1;
  }

  .title {
    color: var(--color-primary-base);
    margin: 0;
    padding-top: var(--size-7);
    font-size: var(--size-4);
    position: relative;
    z-index: 1;
    text-align: center;
    text-shadow: 0 0 var(--size-4) var(--color-primary-accent);
  }

  @media (min-width: 960px) {
    .title {
      font-size: var(--size-5);
    }
  }
  
</style>

<script>
import SplashImage from './SplashImage.vue'
import {mapGetters} from 'vuex'

export default {
  props: ['blok'],
  components: { SplashImage },
  computed: {
    ...mapGetters(['splashImage']),
    parallaxLayers() {
      return [{src: this.splashImage, layer: 2}]
    },
  },
}
</script>
