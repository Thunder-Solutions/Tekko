<template>
  <footer class="footer">
    <p class="socialMedia">
      <span class="socialPrompt">Follow us on social media!</span>
      <span class="socialWrapper">
        <a
          v-for="social in socialMedia"
          :key="social._uid"
          :href="'https://www.' + social.website + '.com/' + social.user_name"
          :class="'social social--' + social.website"
          :aria-label="social.user_name + ' on ' + social.website"
        ></a>
      </span>
    </p>
    <div class="sponsors">
      <h2 class="sponsorsTitle">Our Sponsors &amp; Partners:</h2>
      <div class="sponsorsContainer">
        <div class="sponsorsScroller" ref="sponsorsScroller">
          <component
            class="sponsor"
            :key="blok._uid"
            v-for="blok in sponsors"
            :blok="blok"
            :is="blok.component | dashify"
            @imgLoaded="cloneSponsors()"
          ></component>
        </div>
      </div>
    </div>
    <address class="location">{{ location }}</address>
    <div class="dates">
      <time :datetime="startDate">{{ startDateDisplay }}</time>
      &mdash;
      <time :datetime="endDate">{{ endDateDisplay }}</time>
    </div>
    <div class="map">
      <embed-code :embed="embeddedMap"></embed-code>
    </div>
    <global-feedback-forms></global-feedback-forms>
    <ul>
      <li 
          v-for="linkItem in footerLinks"
          class="footer__links"
          :key="linkItem._uid">
        <storyblok-link 
          :link="linkItem.link"
          v-editable="linkItem">
            {{ linkItem.text }}
        </storyblok-link>
      </li>
    </ul>
    <small class="copyright">&copy; Pittsburgh Japanese Culture Society, {{ year }}</small>
  </footer>
</template>

<style scoped>
  .footer {
    padding-top: var(--size-4);
    background-color: var(--color-primary-base);
    color: var(--color-primary-contrast-alt);
    text-align: center;
  }

  .sponsorsTitle {
    font-size: var(--size-2);
    margin: 0;
    padding-bottom: var(--size-1);
  }

  .sponsorsContainer {
    background-color: var(--color-primary-alt-2);
    padding-bottom: var(--size-2);
    opacity: 0.5;
    transition: opacity 0.3s;
    overflow: hidden;
    height: calc(var(--size-6) + var(--size-2));
    position: relative;
  }

  .sponsorsScroller {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    animation: marquee 60s linear infinite;
  }

  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }

  .sponsors:hover {
    opacity: 1;
  }

  .sponsor {
    filter: grayscale(100%) sepia(100%) hue-rotate(180deg);
    transition: filter 0.3s;
  }

  .sponsor:hover {
    filter: none;
  }

  .location,
  .dates {
    padding: var(--size-2) var(--size-3) 0;
    font-style: normal;
    font-size: var(--size-3);
  }

  .location {
    padding-top: var(--size-4);
  }

  .location::before,
  .dates::before {
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    padding-right: var(--size-1);
  }

  .location::before{
    content: '\f3c5';
  }

  .dates::before{
    content: '\f784';
  }

  .socialPrompt {
    display: block;
  }

  .socialMedia {
    margin: 0;
    padding: 0 var(--size-1) var(--size-3);
  }

  .socialWrapper {
    padding-left: var(--size-2);
    display: inline-block;
    vertical-align: middle;
  }

  .social {
    --size: var(--size-4);
    margin: var(--size-1);
    margin-bottom: 0;
    margin-left: 0;
    height: var(--size);
    width: var(--size);
    position: relative;
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }

  .social::before {
    height: var(--size);
    width: var(--size);
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    font-family: 'Font Awesome 5 Brands';
    font-size: var(--size);
    line-height: var(--size);
  }

  .social--facebook::before {
    content: '\f082';
  }
  
  .social--twitter::before {
    content: '\f081';
  }

  .social--instagram::before {
    content: '\f16d';
  }

  .map {
    height: var(--size-8);
    padding-top: var(--size-4);
  }

  .copyright {
    display: block;
    padding: var(--size-3);
  }

  .footer__links {
    display: inline-block;
    padding: var(--size-2) var(--size-2) var(--size-1);
    font-weight: bold;
  }

  .footer__links a {
    color: var(--color-primary-contrast-base);
    text-decoration: none;
  }

</style>

<script>
  import {mapGetters} from 'vuex'
  import GlobalFeedbackForms from './GlobalFeedbackForms.vue'

  export default {
    components: {GlobalFeedbackForms},
    computed: {
      ...mapGetters([
        'sponsors',
        'location',
        'socialMedia',
        'embeddedMap',
        'currentStartDate',
        'currentEndDate',
        'nextStartDate',
        'nextEndDate',
        'eventIsOver',
        'footerLinks'
      ]),
      startDate() {
        return this.eventIsOver ? this.nextStartDate.getISO() : this.currentStartDate.getISO()
      },
      endDate() {
        return this.eventIsOver ? this.nextEndDate.getISO() : this.currentEndDate.getISO()
      },
      startDateDisplay() {
        const date = this.eventIsOver ? this.nextStartDate : this.currentStartDate
        return `${date.getMonth()} ${date.getDay()}, ${date.getYear()}`
      },
      endDateDisplay() {
        const date = this.eventIsOver ? this.nextEndDate : this.currentEndDate
        return `${date.getMonth()} ${date.getDay()}, ${date.getYear()}`
      },
      year() {
        return new Date().getFullYear()
      },
    },
    data() {
      return {
        sponsorsLoaded: 0,
      }
    },
    methods: {
      cloneSponsors() {
        
        // don't do anything unless all sponsors are loaded
        this.sponsorsLoaded++
        const numOfSponsors = this.sponsors && this.sponsors.length
        const allSponsorsLoaded = this.sponsorsLoaded === numOfSponsors
        if (!allSponsorsLoaded) return

        // This chunk is strictly for visual effect, it should only render
        // on the client side to avoid SEO impact due to redundant content.

        // TODO: If we can achieve the infinitely scrolling effect without
        // duplicating the element, let's do that instead.
        const {sponsorsScroller} = this.$refs
        const clone = sponsorsScroller.cloneNode(true)
        const setWidth = () =>
          clone.style = `left: ${sponsorsScroller.clientWidth}px;`
        setWidth() // run once initially
        sponsorsScroller.parentElement.appendChild(clone)

        // resize the clone if the window is resized
        window.addEventListener('resize', setWidth)
      },
    },
  }
</script>