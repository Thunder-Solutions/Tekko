<template>
  <main class="page">

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P89FL35"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <splash-image class="titleContainer">
      <h1 class="title">{{ errorTitle }}</h1>
    </splash-image>
    <section class="mainContent">
      <p class="errorMsg">Well, this is embarrassing.  It looks like you broke the internet.  Try hitting the back button or go <nuxt-link to="/" class="error__link">home</nuxt-link> and we'll pretend this never happened.</p>
    </section>
  </main>
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
    padding-top: var(--size-6);
    font-size: var(--size-4);
    position: relative;
    z-index: 1;
    text-align: center;
    text-shadow: 0 0 var(--size-4) var(--color-primary-accent);
  }

  .mainContent {
    border-top: var(--size-1) solid var(--color-primary-base);
    padding: var(--size-2);
  }

  @media (min-width: 960px) {
    .title {
      font-size: var(--size-5);
    }
  }
</style>

<script>
  import SplashImage from '../components/SplashImage.vue'

  export default {
    props: ['error'],
    components: { SplashImage },
    computed: {
      errorTitle() {
        return this.$props.error.statusCode === 404 ? 'Page not found' : 'An error occurred'
      },
    },
  }
</script>