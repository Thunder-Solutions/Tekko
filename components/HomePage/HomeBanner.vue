<template>
  <div class="homeBanner">
    <div class="taglineContainer">
      <h2 class="taglineTitle">The region’s premier <span>anime convention</span></h2>
      <p class="taglineDesc">gaming • music • fashion <span>• Japanese pop culture</span></p>
    </div>
  </div>
</template>

<style scoped>

  .homeBanner {
    --half-height: calc(var(--banner-height) / 2);
    --quarter-height: calc(var(--banner-height) / 4);
    background-color: var(--color-primary-base);
    height: var(--banner-height);
    width: 100%;
  }

  .taglineContainer {
    --size: 6vw;
    color: var(--color-primary-contrast-base);
    padding: var(--size-3) var(--size-2) 0;
    position: relative;
    text-align: center;
  }

  .taglineTitle {
    margin: 0;
    font-weight: normal;
    font-size: var(--size);
    line-height: var(--size);
  }

  .taglineDesc {
    margin: 0;
    font-size: calc(var(--size) * 0.45);
  }

  .taglineTitle span,
  .taglineDesc span {
    display: inline-block;
  }

  @media (max-width: 450px) {
    .homeBanner {
      height: var(--size-6);
    }
  }

  @media (min-width: 860px) {

    .taglineContainer {
      --size: var(--size-4);
      text-align: left;
    }

    .homeBanner {
      max-width: 650px;
    }

    .homeBanner::before {
      content: '';
      display: block;
      height: var(--half-height);
      width: var(--half-height);
      border: var(--quarter-height) solid var(--color-primary-base);
      border-right-color: transparent;
      border-top-color: transparent;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      transform: translateX(100%);
    }

    .homeBanner::after {
      background-color: var(--color-primary-base);
      content: '';
      display: block;
      height: var(--half-height);
      width: 100vw;
      position: absolute;
      bottom: 0;
      right: 0;
      transform: translateX(100%);
    }

  }

</style>

<script>
export default {
  props: ['image'],
}
</script>
