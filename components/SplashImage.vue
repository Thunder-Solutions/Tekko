<template>
  <div class="splashContainer">

    <parallax-container
      class="parallaxContainer"
      :class="parallaxClass"
      :layers="parallaxLayers"
    >
      <slot></slot>
    </parallax-container>

  </div>
</template>

<style>
  .parallaxContainer {
    height: inherit;
  }

  .parallaxContainer--normal::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--color-primary-contrast-alt);
    opacity: 0.85;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
  }

  .parallaxContainer--normal > .parallaxLayer.full,
  .parallaxContainer--full > .parallaxLayer.normal {
    display: none;
  }

  .parallaxContainer--full > .parallaxLayer.splashGear {
    background-size: 70%;
    background-position: 50vw;
    background-repeat: no-repeat;
  }

  .parallaxContainer--full > .parallaxLayer.splashGearForeground {
    clip-path: circle(24.8vw at 50vw);
    left: 34.4vw;
    width: 100vw;
    margin-top: 0.1vh;
    z-index: -1;
    background-size: 100%;
  }

</style>

<script>
  import {mapGetters} from 'vuex'
  import {sniffBrowser} from '~/assets/browserSniffer.js'

  export default {
    props: ['full', 'custom'],
    methods: {
      setView() {
        this.isDesktop = window.innerWidth > 860
      },
    },
    data() {
      return {
        isDesktop: false,
        browserIsSupported: false,
      }
    },
    computed: {
      ...mapGetters(['splashImage']),
      parallaxClass() {
        return this.isDesktop && this.$props.full && this.browserIsSupported
          ? 'parallaxContainer--full' : 'parallaxContainer--normal'
      },
      parallaxLayers() {
        return [
          {src: this.splashImage || '/tekkobot-final.jpg', layer: 4, customClass: 'splashGearForeground full'},
          {src: '/1x/splash-gear-8.png', layer: 4, customClass: 'splashGear full'},
          {src: '/1x/splash-backdrop-8.png', layer: 2, customClass: 'full'},
          {src: this.$props.custom?.filename || this.splashImage || '/tekkobot-final.jpg', layer: 2, customClass: 'normal'},
        ]
      },
    },
    mounted() {
      this.setView()
      window.addEventListener('resize', this.setView)
      window.addEventListener('orientationchange', this.setView)

      // TODO: Let's see if we can avoid sniffing the user agent.
      const { isSafari, isEdge } = sniffBrowser()
      this.browserIsSupported = !isEdge
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.setView)
      window.removeEventListener('orientationchange', this.setView)
    },
  }
</script>
