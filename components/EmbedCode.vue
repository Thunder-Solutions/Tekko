<template>
  <div class="embed" ref="embed"></div>
</template>

<style scoped>
  .embed {
    height: 100%;
    max-width: 100vw;
    text-align: center;
    position: relative;
    z-index: 1;
  }
</style>

<script>
  export default {
    props: ['embed', 'use-embed-height',  'use-embed-width'],
    data() {
      return {
        originalWidth: 0,
      }
    },
    methods: {
      // resize an iframe to fill its container, and again when resizing window
      resizeIFrame() {
        const embedEl = this.$refs.embed
        const {useEmbedHeight, useEmbedWidth} = this.$props
        const iframe = embedEl && embedEl.querySelector('iframe')
        if (!iframe) return
        iframe.width = this.originalWidth
        requestAnimationFrame(() => {
          iframe.onload = this.hasLoaded
          const iframeExceedsEmbed =
            embedEl.clientWidth < iframe.clientWidth ||
            this.originalWidth > iframe.clientWidth

          // add/remove event listeners with a timeout for debouncing
          window.removeEventListener('resize', this.resizeIFrame)
          setTimeout(() => {
            if (useEmbedHeight === false) {
              iframe.height = 0
              iframe.height = embedEl.clientHeight
            }
            if (useEmbedWidth === false || iframeExceedsEmbed) {
              iframe.width = 0
              iframe.width = embedEl.clientWidth
            }
            window.addEventListener('resize', this.resizeIFrame)
          }, 100)
        })
      },
      updateEmbedCode() {
        const embedEl = this.$refs.embed
        const hasContent = embedEl.innerHTML.trim() !== ''
        if (!hasContent) embedEl.innerHTML = this.$props.embed

        this.resizeIFrame() // run once initially

        // make sure it's resized when it's revealed by collapsible content
        // TODO: maybe we can find a cleaner way to check when the content is being revealed
        window.addEventListener('click', this.resizeIFrame)
      },
      hasLoaded(event) {
        this.$emit('hasLoaded', event)
      },
    },
    watch: {
      embed() {
        this.updateEmbedCode()
      },
    },
    mounted() {
      const {embed} = this.$props
      const widthAttr = embed.match(/width="[^"]+"/g) || ['']
      this.originalWidth = +widthAttr[0].replace(/[^0-9]/g, '')
      this.updateEmbedCode()
    },
    destroyed() {
      window.removeEventListener('resize', this.resizeIFrame)
      window.removeEventListener('click', this.resizeIFrame)
    },
  }
</script>
