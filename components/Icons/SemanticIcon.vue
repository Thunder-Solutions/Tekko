<template>
  <span>
    <span
      class="icon"
      aria-hidden="true"
      :class="config.class"
      :title="config.altText"
    ></span>
    <span class="screen-reader">{{config.altText}}</span>
  </span>
</template>

<style scoped>
  

  .icon::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    display: inline-block;
    font-size: 25px;
  }

  .icon--checked {
    color: var(--color-primary-base);
  }

  .icon--checked::before {
    content: "\f058";
  }

  .icon--unchecked {
    color: var(--color-primary-alt-2);
    opacity: 0;
  }
  
  .icon--unchecked::before {
    content: "\f057";
  }
</style>

<script>

  /**
   * Component for creating accessible semantic icons with Font Awesome.
  * props: ['config']
  * @class {string} CSS class representative of FA's unicode
  * @altText {string} Altnerative text for title, arias, screen readers
  * @color {string} String representation of color (hex, rbg, etc)
  * @fontSize {string} e.g. '16' String representation of number for icon's font size
  */

  export default {
    props: ['config'],
  }
</script>
