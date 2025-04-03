<template>
  <div class="imageWrapper" :class="bannerClass" v-editable="blok">
    <div class="imageContainer" :class="bannerClass">
      <img :alt="blok.alt" class="image" :class="bannerClass" :src="blok.image"/>
    </div>
  </div>
</template>

<style scoped>
  .title {
    margin: 0;
    font-size: var(--size-3);
  }

  .imageContainer {
    overflow: hidden;
    height: var(--size-8);
    max-width: var(--content-max-width);
    margin: 0 auto;
  }

  .imageWrapper.banner {
    padding-bottom: var(--size-1);
  }

  .imageContainer.banner {
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

  .imageWrapper {
    padding: var(--size-2);
    padding-bottom: 0;
  }

  @media (min-width: 1200px) {
    .imageContainer {
      height: var(--size-9);
    }
  }
</style>

<script>
  export default {
    props: ['blok'],
    computed: {
      bannerClass() {
        return this.$props.blok.use_as_banner ? 'banner' : ''
      },
    },
  }
</script>
