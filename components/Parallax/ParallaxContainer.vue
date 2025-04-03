<template>
  <div
    class="parallaxContainer"
    ref="container"
  >
    <slot></slot>
    <parallax-layer
      ref="layers"
      v-for="(layer, index) in layers"
      :key="index"
      :src="layer.src"
      :layer="layer.layer"
      :customClass="layer.customClass"
    ></parallax-layer>
  </div>
</template>

<style scoped>
  .parallaxContainer {
    --height: 100%;
    height: var(--height);
    display: block;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }
</style>

<script>
  import {sniffBrowser} from '~/assets/browserSniffer.js'

  export default {
    props: ['layers'],
    data() {
      return {
        isAnimating: false,
        prevTime: Date.now() - 1000,
        initialized: false,
      }
    },
    methods: {
      scrollCallback() {
        const {layers} = this.$refs
        const {isSafari} = sniffBrowser()
        layers.forEach((layer, idx) => {
          const el = layers[idx].$el
          const offset = Math.floor(this.getParallaxOffset(el))
          if (isSafari ? !this.initialized : true)
            el.style.top = `-${offset}px`
        })
        setTimeout(() => this.isAnimating = false, 0)
        this.initialized = true
      },
      getOffsetValues(parallax) {
        const {container} = this.$refs
        const {
          bottom: containerBottom,
          height: containerHeight,
        } = container.getBoundingClientRect()
        const {
          height: parallaxHeight,
        } = parallax.getBoundingClientRect()
        const windowTop = Math.round(window.scrollY)
        const windowHeight = window.innerHeight
        return {
          windowBottom: windowTop + windowHeight,
          maxOffset: parallaxHeight - containerHeight,
          fullHeight: containerHeight + windowHeight,
          staticBottom: (windowTop - containerBottom) + windowHeight,
        }
      },
      getParallaxOffset(parallax) {

        // Get values
        const {
          windowBottom,
          maxOffset,
          fullHeight,
          staticBottom,
        } = this.getOffsetValues(parallax)

        // calculations
        const clamp = (val, min, max) => Math.min(Math.max(val, min), max)
        const percent = clamp((windowBottom - staticBottom) / fullHeight, 0, 1)
        return maxOffset - (percent * maxOffset)
      },
      resetHeight() {
        const {container} = this.$refs
        container.setAttribute('style', '')
        const containerHeight = container.offsetHeight ||
          container.parentElement.offsetHeight ||
          300
        container.setAttribute('style', `--height: ${containerHeight}px;`)
      },
      asyncResetScroll() {
        if (this.isAnimating) return
        this.isAnimating = true
        setTimeout(() => requestAnimationFrame(this.scrollCallback), 0)
      },
    },
    mounted() {
      const {container} = this.$refs
      this.resetHeight()
      this.asyncResetScroll()
      window.addEventListener('resize', this.resetHeight)
      window.addEventListener('resize', this.asyncResetScroll)
      window.addEventListener('scroll', this.asyncResetScroll)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resetHeight)
      window.removeEventListener('resize', this.asyncResetScroll)
      window.removeEventListener('scroll', this.asyncResetScroll)
    },
  }
</script>
