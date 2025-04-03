<template>
  <storyblok-link
    class="businessLogoLink"
    :link="blok.link"
    v-editable="blok"
  >
    <img
      class="businessLogoImage"
      :class="fullClass"
      :alt="blok.business_name"
      :src="blok.logo"
      @load="$emit('imgLoaded')"
    />
  </storyblok-link>
</template>

<style scoped>
  .businessLogoLink {
    display: block;
    text-align: center;
    padding: var(--size-2);
    padding-bottom: 0;
  }

  .businessLogoLink:hover {
    filter: none;
  }

  .businessLogoImage {
    object-fit: contain;
    max-height: var(--size-6);
    max-width: var(--size-8);
    vertical-align: middle;
  }

  .businessLogoImage--fullSize {
    max-height: var(--size-8);
    max-width: 100%;
  }

  @media (min-width: 660px) {
    .businessLogoImage--fullSize {
      max-height: 100%;
    }
  }

</style>

<script>
  export default {
    props: ['blok'],
    computed: {
      fullClass() {
        return this.$props.blok.full_size ? 'businessLogoImage--fullSize' : ''
      },
    },
  }
</script>
