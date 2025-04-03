<template>
  <article v-editable="blok" class="featuredContent">
    <div class="imageContainer">
      <img :src="blok.image" class="image" />
    </div>
    <div class="blurbContainer">
      <dynamic-title class="title">{{ blok.title }}</dynamic-title>
      <rich-text :doc="blok.blurb" class="blurb"></rich-text>
      <div class="callToAction" v-if="blok.call_to_action_text">
        <storyblok-link
          class="callToActionText"
          :link="blok.call_to_action_link"
        >{{ blok.call_to_action_text }}</storyblok-link>
      </div>
    </div>
  </article>
</template>

<style scoped>
  .featuredContent {
    display: grid;
    padding: var(--size-6) var(--size-3) 0;
    max-width: var(--content-max-width);
    margin: 0 auto;
  }

  .imageContainer {
    overflow: hidden;
    box-shadow: var(--size-1) var(--size-1) 0 var(--color-primary-base);
    height: 100%;
    max-height: var(--size-10);
  }

  .image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .blurbContainer {
    padding: var(--size-3);
    padding-bottom: 0;
  }

  .title {
    font-size: var(--size-4);
    margin: 0;
    padding-bottom: var(--size-2);
    border-bottom: 1px solid var(--color-primary-base);
  }

  .callToAction {
    display: block;
    padding-top: var(--size-4);
  }

  .callToActionText {
    font-family: 'Orbitron';
    display: inline-block;
    background-color: var(--color-primary-focus);
    color: var(--color-primary-contrast-base);
    padding: var(--size-1);
    box-shadow: 4px 4px 0 var(--color-primary-accent);
    text-decoration: none;
    letter-spacing: 0.1em;
    transition: filter 0.3s;
  }

  .callToActionText:hover {
    filter: brightness(1.5);
  }

  @media (max-width: 500px) {
    .title {
      font-size: var(--size-3);
    }

    .imageContainer {
      margin-right: var(--size-1);
    }

    .featuredContent {
      padding: var(--size-6) var(--size-1) 0;
    }

    .blurbContainer {
      padding: var(--size-3) var(--size-1);
    }
  }

  @media (min-width: 960px) {
    .featuredContent {
      grid-template-areas: "left right";
      grid-template-columns: 1fr 1fr;
    }

    :nth-of-type(even) > .featuredContent .imageContainer,
    .featuredContent:nth-of-type(even) .imageContainer {
      grid-area: right;
      box-shadow: calc(var(--size-1) * -1) var(--size-1) 0 var(--color-primary-base);
    }

    :nth-of-type(even) > .featuredContent .blurbContainer,
    .featuredContent:nth-of-type(even) .blurbContainer {
      text-align: right;
      justify-self: right;
    }

    .image {
      max-height: 100%;
      min-width: 100%;
    }

    .blurbContainer {
      max-width: 700px;
      padding-bottom: var(--size-3);
    }
  }

  @media (min-width: 1200px) {
    .featuredContent {
      grid-template-columns: 1fr 1.5fr;
    }

    :nth-of-type(even) > .featuredContent,
    .featuredContent:nth-of-type(even) {
      grid-template-columns: 1.5fr 1fr;
    }
  }
    
</style>

<script>
export default {
  props: ['blok'],
}
</script>
