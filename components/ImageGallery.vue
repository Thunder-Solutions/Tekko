<template>
  <div
    v-editable="blok"
    class="imageGallery"
  >
    <div class="previews" :class="previewsTheaterClass">
      <button
        class="closeBtn"
        :class="closeTheaterClass"
        @click="toggleTheaterMode(false)"
      >&times;</button>
      <img
        class="previews__image"
        v-for="(img, imgIdx) in blok.images"
        :class="getActiveClass(imgIdx)"
        :key="img._uid"
        :src="img.image"
        @click="toggleTheaterMode(true)"
      />
    </div>
    <div class="thumbnails" :class="thumbnailsTheaterClass">
      <img
        class="thumbnails__image"
        v-for="(img, imgIdx) in blok.images"
        :class="getActiveClass(imgIdx)"
        :key="img._uid"
        :src="img.image"
        :alt="img.alt"
        tabindex="0"
        @click="toggleActive(imgIdx)"
        @keydown.enter="toggleActive(imgIdx)"
        @keydown.esc="toggleTheaterMode(false)"
      />
    </div>
  </div>
</template>

<style scoped>
  .imageGallery {
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
    box-sizing: border-box;
    padding: var(--size-2);
  }

  .previews,
  .thumbnails {
    transition: all 0.3s;
  }

  .previews {
    height: var(--size-8);
  }

  .previews:not(.previews--theater) {
    cursor: zoom-in;
  }

  .previews.previews--theater {
    position: fixed;
    top: 0;
    left: 0;
    height: calc(100vh - var(--size-6));
    width: 100vw;
    background-color: var(--color-primary-base);
    z-index: 5;
  }

  .previews__image:not(.active) {
    display: none;
  }

  .previews__image {
    object-fit: cover;
    object-position: top;
    height: 100%;
    width: 100%;
  }

  .previews--theater .previews__image {
    object-fit: contain;
    height: auto;
    width: auto;
    max-width: 100%;
    max-height: calc(100% - 160px);
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .thumbnails {
    overflow: auto;
    white-space: nowrap;
    background-color: var(--color-primary-alt);
  }

  .thumbnails.thumbnails--theater {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    z-index: 6;
  }

  .thumbnails__image {
    object-fit: cover;
    object-position: top;
    height: var(--size-6);
    width: var(--size-7);
    cursor: pointer;
    box-sizing: border-box;
    transition: filter 0.3s;
  }

  .thumbnails__image:not(:last-child) {
    margin: 5px 5px 0 0;
  }

  .thumbnails__image.active {
    border: 1px solid var(--color-primary-focus);
  }

  .thumbnails__image:focus,
  .thumbnails__image:hover {
    border: 1px solid var(--color-primary-focus);
    filter: brightness(1.5);
  }

  .hideCloseBtn {
    display: none;
  }

  .closeBtn {
    border: 0 solid;
    background-color: var(--color-primary-contrast-base);
    color: var(--color-primary-base);
    border-radius: 50%;
    position: absolute;
    top: var(--size-6);
    right: var(--size-4);
    font-size: var(--size-3);
    height: var(--size-4);
    width: var(--size-4);
    text-align: center;
    line-height: var(--size-4);
    cursor: pointer;
    z-index: 2;
  }

  @media (min-width: 660px) {
    .imageGallery {
      max-width: 50vw;
    }

    .previews {
      height: var(--size-9);
    }
  }
</style>

<script>
  export default {
    props: ['blok'],
    data() {
      return {
        active: 0,
        theater: false,
      }
    },
    methods: {
      getActiveClass(idx) {
        return this.active === idx ? 'active' : ''
      },

      toggleActive(idx) {
        this.active = idx
      },

      // TODO: we should really trap the focus in this component while theater mode is active
      toggleTheaterMode(bool) {
        this.theater = bool
      },
    },
    computed: {
      closeTheaterClass() {
        return this.theater ? '' : 'hideCloseBtn'
      },

      previewsTheaterClass() {
        return this.theater ? 'previews--theater' : ''
      },
      
      thumbnailsTheaterClass() {
        return this.theater ? 'thumbnails--theater' : ''
      },
    },
  }
</script>
