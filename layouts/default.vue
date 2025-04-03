<template>
  <div>

    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P89FL35"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->

    <global-header></global-header>
    <nuxt/>
    <global-footer></global-footer>
  </div>
</template>

<style>

  :root {
    /* MAIN THEME COLOR VARIATIONS */
    /* for details on this naming convention, refer to https://codepen.io/Jon-DeWitt/full/GexYag */
    --color-primary-base: rgba(12, 20, 53, 0.9);
    --color-primary-base-2: #172040;
    --color-primary-base-3: rgba(12, 20, 53, 0.5);
    --color-primary-base-4: #3f4869;
    --color-primary-alt: #0f1319;
    --color-primary-alt-2: #70809c;
    --color-primary-alt-3: #a2adc0;
    --color-primary-accent: #5799ae;
    --color-primary-focus: #0024bd;
    --color-primary-contrast-base: #fff;
    --color-primary-contrast-alt: #b3bccc;

    /* NOTICE COLOR VARIATIONS */
    --color-notice-base: #c2c1b7;
    --color-notice-contrast-base: #7d581c;

    /* size-1 is the base size, everything else uses the golden ratio */
    --size-1: 8px;
    --size-2: calc(var(--size-1) + var(--size-1)); /** 16 */
    --size-3: calc(var(--size-1) + var(--size-2)); /** 24 */
    --size-4: calc(var(--size-2) + var(--size-3)); /** 40 */
    --size-5: calc(var(--size-3) + var(--size-4)); /** 64 */
    --size-6: calc(var(--size-4) + var(--size-5)); /** 104 */
    --size-7: calc(var(--size-5) + var(--size-6)); /** 168 */
    --size-8: calc(var(--size-6) + var(--size-7)); /** 272 */
    --size-9: calc(var(--size-7) + var(--size-8)); /** 440 */
    --size-10: calc(var(--size-8) + var(--size-9)); /** 712 */

    --content-max-width: 1200px;
  }

  html,
  body {
    font-family: 'Jura';
    font-size: var(--size-2);
    margin: 0;
    height: 100vh;
    width: 100vw;
    background-color: var(--color-primary-contrast-alt);
  }

  html {
    overflow: hidden;
  }

  body {
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  h1, h2, h3, h4, h5, h6,
  button {
    font-family: "Orbitron";
    font-weight: normal;
  }

  h1 {
    font-weight: bold;
  }

  :focus {
    outline: 1px solid white;
    outline-offset: -2px;
    box-shadow: 0 0 var(--size-1) var(--color-primary-base);
  }

  .screen-reader {
    border: 0;
    clip: rect(1px 1px 1px 1px);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

</style>

<script>
  import GlobalHeader from '../components/Global/GlobalHeader.vue'
  import GlobalFooter from '../components/Global/GlobalFooter.vue'

  export default {
    components: { GlobalHeader, GlobalFooter },
  }
</script>
