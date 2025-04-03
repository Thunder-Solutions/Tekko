<template>
  <embed-code
    class="storyblokEmbed"
    v-editable="blok"
    :embed="blok.embed_code"
    :use-embed-height="blok.use_embed_height"
    :use-embed-width="blok.use_embed_width"
    @hasLoaded="hasLoaded"
  ></embed-code>
</template>

<style scoped>
  .storyblokEmbed {
    padding: var(--size-4) 0 0;
    box-sizing: border-box;
  }
</style>

<script>
  export default {
    props: ['blok'],
    computed: {
      getEmbedIsVisible() {
        return this.embedIsVisible
      },
    },
    data() {
      return {
        embedIsVisible: true,
      }
    },
    methods: {
      hasLoaded(event) {
        this.$emit('hasLoaded', event)
      },
    },
  }
</script>
