<template>
  <div class="feedback">
    <p class="feedback__text">
      {{ websiteFeedbackBlurb }}
      You can track the progress of any open issues and feedback on our <nuxt-link to="/website" class="feedback__link">website page</nuxt-link>.
    </p>
    <div class="feedback__btnContainer">
      <button
        class="feedback__btn"
        @click="toggleForm('feedback', true)"
      >Give us feedback about the website</button>
      <button
        class="feedback__btn"
        @click="toggleForm('bug', true)"
      >Report an issue you found on the website</button>
    </div>
    <div
      class="feedback__form"
      :class="feedbackActiveClass"
    >
      <button
        class="feedback__closeBtn"
        @click="toggleForm('feedback', false)"
      >&times;</button>
      <embed-code :embed="embeddedFeedbackForm"></embed-code>
    </div>
    <div
      class="feedback__form"
      :class="bugActiveClass"
    >
      <button
        class="feedback__closeBtn"
        @click="toggleForm('bug', false)"
      >&times;</button>
      <embed-code :embed="embeddedBugForm"></embed-code>
    </div>
  </div>
</template>

<style scoped>
  .feedback__text {
    padding-top: var(--size-4);
    font-size: 0.8em;
  }

  .feedback__link {
    border-bottom: 1px solid;
    padding-bottom: 3px;
    font-weight: bold;
    color: var(--color-primary-accent);
    transition: filter 0.3s;
    text-decoration: none;
  }

  .feedback__link:hover {
    border-bottom-width: 3px;
    filter: brightness(130%);
  }

  .feedback__btnContainer {
    padding: var(--size-2);
    display: grid;
    grid-gap: var(--size-1);
    max-width: var(--content-max-width);
    margin: 0 auto;
  }

  .feedback__form {
    position: fixed;
    top: 3rem;
    left: 0;
    height: calc(100vh - 3rem);
    width: 100vw;
    padding-top: 80px;
    z-index: 5;
    background-color: var(--color-primary-base);
  }

  .feedback__btn {
    padding: var(--size-2);
    display: block;
    width: 100%;
    font-weight: bold;
    cursor: pointer;
  }

  .feedback__closeBtn {
    border-radius: 50%;
    font-size: var(--size-3);
    height: var(--size-4);
    width: var(--size-4);
    position: absolute;
    right: var(--size-4);
    top: var(--size-6);
    cursor: pointer;
    z-index: 5;
  }

  .hideForm {
    visibility: hidden;
  }

  @media (min-width: 700px) {
    .feedback__btnContainer {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>

<script>
  import {mapGetters} from 'vuex'
  
  export default {
    data() {
      return {
        feedbackFormActive: false,
        bugFormActive: false,
      }
    },
    methods: {
      toggleForm(name, bool) {
        this[`${name}FormActive`] = bool
      },
    },
    computed: {
      ...mapGetters([
        'websiteFeedbackBlurb',
        'embeddedFeedbackForm',
        'embeddedBugForm',
      ]),
      feedbackActiveClass() {
        return this.feedbackFormActive ? '' : 'hideForm'
      },
      bugActiveClass() {
        return this.bugFormActive ? '' : 'hideForm'
      },
    },
  }
</script>