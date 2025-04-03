<template>
  <div v-editable="blok">
    <section class="ctaSection">
      <div class="ctaSection__container">
        <template v-for="action in blok.action">
          <blok-action class="ctaSection__action" :key="action._uid" :blok="action"></blok-action>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .ctaSection {
    --vertical-padding: var(--size-7);
    --thumbnail-offset: var(--size-4);
    --thumbnail-height: var(--size-8);
    --full-height: calc(var(--thumbnail-height) + var(--thumbnail-offset));
    position: relative;
    width: 100%;
    height: calc(var(--full-height) + (var(--vertical-padding) *2));
    z-index: 1;
    padding: var(--vertical-padding) var(--size-2);
    box-sizing: border-box;
  }

  .ctaSection::before {
    content: '';
    display: block;
    height: var(--size-7);
    width: 100%;
    background-color: var(--color-primary-base);
    position: absolute;
    top: var(--vertical-padding);
    left: 0;
  }

  .ctaSection__container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: var(--size-5);
    margin: 0 auto;
    width: 100%;
    max-width: var(--content-max-width);
  }

  @media (max-width: 960px) {
    .ctaSection {
      height: calc((var(--full-height) * 3) + (var(--vertical-padding) * 2));
      padding: var(--vertical-padding) 0;
    }

    .ctaSection__container {
      grid-template-columns: 1fr;
      grid-template-rows: var(--full-height) var(--full-height) var(--full-height);
    }

    .ctaSection__action::before {
      content: '';
      display: block;
      height: var(--size-7);
      width: 100%;
      background-color: var(--color-primary-base);
      position: absolute;
      top: 0;
      left: 0;
    }

    .ctaSection::before {
      display: none;
    }
  }
</style>

<script>
  export default {
    props: ['blok'],
  }
</script>
