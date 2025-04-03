<template>
  <div class="noticeWrapper" v-editable="blok">
    <div class="noticeContainer">
      <div class="notice">
        <i class="icon fas fa-exclamation-circle"></i>
        <p class="text">{{ blok.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .noticeWrapper {
    padding: var(--size-4) var(--size-2) var(--size-2);
    text-align: center;
  }

  .noticeContainer {
    display: inline-block;
  }

  .notice {
    background-color: var(--color-notice-base);
    color: var(--color-notice-contrast-base);
    padding: var(--size-2) var(--size-4);
    padding-left: var(--size-3);
    border: 2px solid;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: var(--size-2);
    align-items: center;
    font-weight: bold;
  }

  .icon {
    font-size: var(--size-4);
  }

  @media (min-width: 600px) {
    .notice {
      grid-template-columns: auto 1fr;
    }
  }
</style>

<script>
  export default {
    props: ['blok'],
  }
</script>
