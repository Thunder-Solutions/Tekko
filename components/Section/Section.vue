<template>
  <section v-editable="blok" class="section" :class="sectionClass" :style="sectionStyle" :id="id">
    <div class="container">
      <dynamic-title class="title">{{ blok.title }}</dynamic-title>
      <div class="content" :class="contentClass">
        <component :key="blok._uid" v-for="blok in blok.content" :blok="blok" :is="blok.component | dashify"></component>
      </div>
    </div>
  </section>
</template>

<style scoped>

  .section {
    padding-bottom: var(--size-7);
  }

  .title {
    margin: 0;
  }

  .section--normal {
    --section-theme-primary: var(--color-primary-base);
    --section-theme-secondary: var(--color-primary-contrast-alt);
    --section-theme-focus: var(--color-primary-focus);
    --size: var(--size-8);
    --offset: var(--size-4);
  }

  .section--normal::before {
    content: '';
    margin-top: -80px;
    height: 80px;
    width: 1px;
    display: block;
  }

  .content--normal {
    margin-top: calc(var(--size) - var(--offset));
    position: relative;
  }

  .content--normal::before {
    content: '';
    display: block;
    position: absolute;
    top: calc(var(--size) * -1);
    left: 0;
    height: var(--size);
    width: 100%;
    z-index: 0;
    background-image: var(--section-background);
    background-size: cover;
    background-position: center 20%;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      45% 100%,
      calc(45% - 40px) calc(100% - 40px),
      0 calc(100% - 40px)
    );
  }

  .section--normal .title {
    padding: var(--size-1) var(--size-3);
    background-color: var(--color-primary-base);
    color: var(--color-primary-contrast-base);
    font-weight: normal;
    font-size: var(--size-3);
    position: relative;
    z-index: 1;
  }

  /* NESTED SECTIONS */
  .section .section--normal {
    padding: var(--size-4) var(--size-2) 0;
    max-width: var(--content-max-width);
    margin: 0 auto;
  }

  .section .section--normal .title {
    padding: 0;
    border-bottom: 1px solid;
    background-color: transparent;
    color: var(--color-primary-base);
    font-size: var(--size-3); 
  }

  @media (min-width: 960px) {
    .section--normal {
      --offset: var(--size-5);
    }

    .section--normal .title {
      --size: var(--size-5);
      box-sizing: border-box;
      display: inline-block;
      font-size: var(--size-4);
      position: relative;
      height: var(--size);
    }

    .section--normal .title::before {
      top: 50%;
      left: 100%;
      width: calc(var(--size) / 2);
      height: calc(var(--size) / 2);
      border: calc(var(--size) / 4) solid var(--color-primary-base);
      border-right-color: transparent;
      border-bottom-color: transparent;
      box-sizing: border-box;
    }

    .section--normal .title::before,
    .section--normal .title::after {      
      content: '';
      display: block;
      position: absolute;
    }

    .section--normal .title::after {
      background-color: var(--color-primary-base);
      top: 0;
      left: 100%;
      height: 50%;
      width: 100vw;
    }

    /* NESTED SECTIONS */

    .section .section--normal .title {
      display: block;
      height: auto;
    }

    .section .section--normal .title::before,
    .section .section--normal .title::after {
      display: none;
    }

  }
</style>

<style scoped src="./full_backdrop.css"></style>
<style scoped src="./full_backdrop_light.css"></style>

<script>
  export default {
    props: ['blok'],
    computed: {
      id() {
        return this.$props.blok.title
          .replace(/[^a-zA-Z ]/g, '') // strip special characters
          .replace(/ /g, '-') // replace spaces with dashes
          .toLowerCase() // convert everything to lower case
      },
      sectionClass() {
        return `section--${this.$props.blok.section_type || 'normal'}`
      },
      sectionStyle() {
        return `--section-background: url(${this.$props.blok.background_image || '/tekkobot-final.jpg'});`
      },
      contentClass() {
        return this.$props.blok.background_image
          ? `content--${this.$props.blok.section_type || 'normal'}`
          : ''
      },
    },
  }
</script>
