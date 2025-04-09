<template>
  <div class="image-wrapper" :class="bannerClass" v-editable="blok">
    <div class="image-container" :class="bannerClass">
      <img :alt="blok.alt" class="image" :class="bannerClass" :src="blok.image"/>
    </div>
  </div>
</template>

<style scoped>
  .title {
    margin: 0;
    font-size: var(--size-3);
  }

  .image-container {
    overflow: hidden;
    height: var(--size-8);
    max-width: var(--content-max-width);
    margin: 0 auto;
  }

  .image-wrapper.banner {
    padding-bottom: var(--size-1);
  }

  .image-container.banner {
    box-shadow: var(--size-1) var(--size-1) 0 var(--color-primary-base);
  }

  .image {
    height: 100%;
    width: 100%;
    object-fit: contain;
    object-position: top;
  }

  .image.banner {
    object-fit: cover;
  }

  .image-wrapper.full-width,
  .image-container.full-width,
  .image.full-width {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
    object-fit: cover;
  }

  .image-wrapper {
    padding: var(--size-2);
    padding-bottom: 0;
  }

  @media (min-width: 1200px) {
    .image-container {
      height: var(--size-9);
    }
  }
</style>

<script>
  export default {
    props: ['blok'],
    computed: {
      bannerClass() {
        const useAsBanner = this.$props.blok.use_as_banner
        const isFullWidth = this.$props.blok.full_width
        return (useAsBanner ? 'banner' : '') + (isFullWidth ? ' full-width' : '')
      },
    },
  }
</script>
