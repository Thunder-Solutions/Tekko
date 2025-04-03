<template>
  <storyblok-link :link="blok.link" class="cta" v-editable="blok">
    <div class="cta__container" :style="'--bg-img: url(' + blok.image + ');'">
      <dynamic-title class="cta__title">{{blok.title}}</dynamic-title>
      <div class="cta__thumbnail">
        <p class="cta__desc">{{blok.description}}</p>
      </div>
    </div>
  </storyblok-link>
</template>

<style scoped>

  .cta {
    width: 100%;
    position: relative;
  }

  .cta,
  .cta:hover,
  .cta:active,
  .cta:visited {
    color: var(--color-primary-base);
    text-decoration: none;
  }

  .cta__title {
    text-align: right;
    position: relative;
    margin: 0 auto;
    padding: var(--size-2);
    width: 100%;
    max-width: var(--size-8);
    background-color: var(--color-primary-contrast-alt);
    z-index: 2;
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 30% 100%);
    font-weight: bold;
  }

  .cta__desc {
    position: absolute;
    bottom: 0;
    left: 0;
    color: var(--color-primary-contrast-base);
    background-color: var(--color-primary-base-3);
    width: 100%;
    height: var(--size-5);
    margin-bottom: 0;
    padding: var(--size-1);
    padding-right: 15%;
    box-sizing: border-box;
    overflow: hidden;
  }

  .cta__thumbnail,
  .cta__container::after {
    height: var(--thumbnail-height);
    position: absolute;
    width: 100%;
    max-width: var(--size-8);
    margin: auto;
    right: 0;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 75%,
      75% 100%,
      0 100%
    );
    transition: all 0.3s;
  }

  .cta__thumbnail {
    background-image: var(--bg-img);
    background-size: cover;
    top: var(--thumbnail-offset);
    left: 0;
    z-index: 1;
  }

  .cta__container::after {
    content: '';
    background-color: var(--color-primary-base-2);
    top: calc(var(--size-1) + var(--thumbnail-offset));
    left: var(--size-1);
  }

  .cta__container:hover .cta__thumbnail,
  .cta__container:hover::after {
    padding: var(--size-1);
  }

  .cta__container:hover .cta__thumbnail {
    filter: brightness(1.5);
  }
</style>

<script>
  export default {
    props: ['blok'],
  }
</script>
