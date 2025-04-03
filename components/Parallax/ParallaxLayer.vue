<template>
  <div
    class="parallaxLayer"
    ref="layer"
    :style="cssVars"
    :class="customClass || ''"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
  .parallaxLayer {
    height: var(--container-height);
    background-image: var(--img-url);
    background-position: center center;
    background-size: cover;
    display: block;
    position: absolute;
    will-change: top;
    -webkit-perspective: 1;
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    transform: translate3d(0, 0, 0);
    top: 0;
    left: 0;
    right: 0;
    z-index: var(--layer-index);
  }
</style>

<script>
  export default {
    props: ['src', 'layer', 'customClass'],
    data() {
      return {
        containerHeight: 300,
        layerIndex: -1,
        cssVars: '',
      }
    },
    methods: {
      resetCssVars() {
        return `
          --container-height: ${this.containerHeight}px;
          --img-url: url(${this.$props.src});
          --layer-index: ${this.layerIndex};
        `
      },
    },
    watch: {
      src() {
        this.cssVars = this.resetCssVars()
      },
    },
    mounted() {

      // constants
      const DEFAULT_LAYER = 2
      const MIN_LAYER = 1
      const MAX_LAYER = 5
      const NEGATION = MAX_LAYER + 1

      // determine layer z-index from the number passed to the `layer` attribute
      const layerElement = this.$refs.layer
      const layerAttr = Number(this.$props.layer) || DEFAULT_LAYER
      const min = layerAttr >= MIN_LAYER ? layerAttr : MIN_LAYER
      const layer = layerAttr <= MAX_LAYER ? min : MAX_LAYER
      this.containerHeight = layerElement.parentElement.offsetHeight * layer
      this.layerIndex = layer - NEGATION
      this.cssVars = this.resetCssVars()
    },
  }
</script>
