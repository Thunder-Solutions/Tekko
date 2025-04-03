<template>
  <div v-editable="blok">
    <main class="page">
      <splash-image class="splashContent" :full="true">
        <div class="titleContainer">
          <h1 class="title">Tekko</h1>
          <span class="titleYear">{{ year }}</span>
        </div>
        <home-banner class="banner" :image="blok.banner_image"></home-banner>
      </splash-image>
      <section class="mainContent">
        <component :key="blok._uid" v-for="blok in blok.content" :blok="blok" :is="blok.component | dashify"></component>
      </section>
    </main>
  </div>
</template>

<style scoped>
  .page {
    min-height: 100vh;
    background-color: var(--color-primary-contrast-alt);
    color: var(--color-primary-alt);
    font-size: var(--size-2);
  }

  .titleContainer {
    --size: var(--size-5);
    padding-top: 50vh;
    color: var(--color-primary-base);
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    line-height: calc(var(--size) * 0.7);
  }

  .title {
    display: inline;
    margin: 0;
    font-size: var(--size);
    line-height: inherit;
    text-transform: uppercase;
  }

  .titleYear {
    display: block;
    font-family: 'Orbitron';
    font-size: calc(var(--size) * 1.2);
    line-height: inherit;
  }

  .splashContent {
    box-sizing: border-box;
    height: 100vh;
    min-height: var(--size-9);
    position: relative;
    z-index: 1;
  }

  .banner {
    --banner-height: var(--size-7);
    position: absolute;
    bottom: 0;
    width: 100vw;
  }

  @media (max-width: 400px) {

    .titleContainer {
      --size: 20vw;
    }

  }

  @media (min-width: 860px) {

    .titleContainer {
      --size: 11vw;
      padding-top: 35vh;
      padding-left: 5vw;
      text-align: left;
    }

  }

  @media (min-width: 960px) {

    .titleContainer {
      --size: 7.5vw;
      padding-left: 10vw;
    }

  }

  @media (min-width: 1200px) {

    .titleContainer {
      --size: var(--size-6);
      padding-left: 10vw;
    }

  }

  @media (max-height: 600px) {
    .titleContainer {
      padding-top: var(--size-6);
    }
  }
</style>

<script>
import HomeBanner from './HomeBanner.vue'
import SplashImage from '../SplashImage.vue'
import {mapGetters} from 'vuex'

export default {
  components: { HomeBanner, SplashImage },
  props: ['blok'],
  computed: {
    ...mapGetters(['currentStartDate', 'nextStartDate', 'eventIsOver', 'splashImage']),
    year() { return this.eventIsOver ? this.nextStartDate.getYear() : this.currentStartDate.getYear() },
  },
}
</script>