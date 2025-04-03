<template>
  <blockquote class="richText__quote">
    <rich-text :doc="quote"></rich-text>
  </blockquote>
</template>

<style scoped>
  .richText__quote {
    border: 0 solid;
    border-radius: 5px;
    position: relative;
    margin: 0;
    margin-top: var(--size-4);
    padding: 0 var(--size-3) var(--size-2);
    background-color: var(--color-primary-alt-2);
    color: var(--color-primary-alt);
    font-style: italic;
    font-weight: normal;
  }

  .richText__quote::before,
  .richText__quote::after {
    position: absolute;
    font-size: 40px;
    top: 0;
  }

  .richText__quote::before {
    content: "\201c";
    left: 0;
  }

  .richText__quote::after {
    content: "\201d";
    right: 0;
    transform: translateX(-75%);
  }
</style>

<script>
export default {
  props: ['quote'],
}
</script>
