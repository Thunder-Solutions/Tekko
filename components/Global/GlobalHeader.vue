<template>
  <header class="header">
    <div class="alert" v-if="globalAlert.content[0].content" @click="toggleAlertExpanded">
      <i class="alertIcon fas fa-info-circle"></i>
      <rich-text class="alertText" :class="alertClass" :doc="globalAlert"></rich-text>
    </div>
    <div class="headerGrid">
      <div class="headerGroup">
        <div class="registerContainer">
          <span class="registerBanner" ref="registerBanner">
            <nuxt-link class="registerLink" to="/registration" >REGISTER NOW</nuxt-link>
          </span>
        </div>
      </div>
      <div class="headerGroup"></div>
      <div class="headerGroup">
        <div class="logoContainer">
          <nuxt-link to="/"><img alt="Tekko" class="logo" :src="logo"/></nuxt-link>
        </div>
        <time :datetime="datetime" class="dateContainer">
          <span class="monthDays">{{ dateRange }}</span>
          <span class="year">{{ year }}</span>
        </time>
        <global-menu></global-menu>
      </div>
    </div>
  </header>
</template>

<style>
  .header {
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 10;
    transition: top 1s;
    font-family: 'Share Tech', sans-serif;
    color: var(--color-primary-contrast-base);
    overflow: hidden;
    scrollbar-gutter: stable;
  }

  .header * { pointer-events: auto; }

  .headerGrid {
    display: grid;
    grid-template-columns: 200px 1fr 350px;
  }

  .alert {
    align-items: center;
    background-color: var(--color-notice-base);
    color: var(--color-notice-contrast-base);
    display: grid;
    gap: 1rem;
    grid-template-columns: auto auto;
    padding: var(--size-2);
    font-family: 'Jura';
    text-align: center;
  }

  .alertIcon { justify-self: right; }
  .alertText {
    cursor: pointer;
    position: relative;
    justify-self: left;
  }

  .alertText > * {
    box-sizing: border-box;
    height: 1.2rem;
    overflow: hidden;
  }

  .alertText:not(.alertText--expanded)::after {
    padding-left: 0.5rem;
    background-color: var(--color-notice-base);
    content: '... show full notice';
    position: absolute;
    font-weight: bold;
    top: 0;
    right: 0;
  }

  .alertText--expanded > * {
    overflow: visible;
    height: auto;
  }
  .alert > .alertText > .richText__paragraph {
    padding-top: 0;
  }

  .headerGroup {
    background-color: var(--color-primary-base);
    height: 80px;
  }

  .headerGroup:nth-child(3) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 10px;
    align-items: center;
    text-align: center;
  }

  .registerBanner {
    display: inline-block;
    position: relative;
    font-size: 20px;
    margin-top: 20px;
    z-index: 1;
    left: -100%;
  }
  
  .registerBanner--in {
    animation: slidein 2s;
    left: -12px;
  }

  .registerLink,
  .registerLink:hover,
  .registerLink:active,
  .registerLink:visited {
    background-color: var(--color-primary-focus);
    color: var(--color-primary-contrast-base);
    transition: filter 0.3s;
  }

  .registerLink:hover {
    filter: brightness(1.5);
  }

  .registerLink {
    box-shadow: 3px 2px 0 var(--color-primary-accent);
    text-decoration: none;
    text-align: right;
    padding: 3px 20px 3px 50px;
    display: block;
  }

  @keyframes slidein {
    0% { left: -100%; }
    50% { left: -2px; }
    100% { left: -12px; }
  }

  .logo {
    height: 50px;
    width: 100%;
    object-fit: contain;
  }

  .dateContainer {
    height: 100%;
    padding-top: 10px;
  }
    
  .monthDays,
  .year {
    display: block;
  }

  .monthDays {
    white-space: nowrap;
    font-size: 16px;
  }

  .year {
    font-size: 40px;
  }

  @media (max-width: 600px) {
    .headerGrid {
      grid-template-columns: minmax(0, 1fr) 0 minmax(0, 2fr);
    }
    .registerLink {
      padding: 0.5rem 0.5rem 0.4rem 1.2rem;
      font-size: 1rem;
    }
  }

  @media (min-width: 860px) {

    .headerGroup:nth-child(2) {
      height: 30px;
      position: relative;
    }

    .headerGroup:nth-child(2):before,
    .headerGroup:nth-child(2):after {
      --size: 35px;
      content: '';
      box-sizing: border-box;
      border: var(--size) solid transparent;
      display: block;
      height: var(--size);
      width: var(--size);
      position: absolute;
      top: -5px;
      transform: rotate(45deg);
    }

    .headerGroup:nth-child(2):before {
      border-right-color: var(--color-primary-base);
      left: -35px;
    }

    .headerGroup:nth-child(2):after {
      border-bottom-color: var(--color-primary-base);
      right: -35px;
    }
    
  }
</style>

<script>
import GlobalMenu from './GlobalMenu.vue'
import {sniffBrowser} from '~/assets/browserSniffer.js'
import {mapGetters} from 'vuex'
import RichText from '../RichText/RichText.vue'

export default {
  data() {
    return {
      isSafari: false,
      alertExpanded: false,
    }
  },
  components: { GlobalMenu, RichText },
  computed: {
    ...mapGetters([
      'logo',
      'currentStartDate',
      'currentEndDate',
      'nextStartDate',
      'nextEndDate',
      'eventIsOver',
      'globalAlert',
    ]),
    alertClass() {
      return this.alertExpanded ? 'alertText--expanded' : ''
    },
    datetime() {
      return this.eventIsOver ? this.nextStartDate.getISO() : this.currentStartDate.getISO()
    },
    year() {
      return this.eventIsOver ? this.nextStartDate.getYear() : this.currentStartDate.getYear() 
    },
    dateRange() {
      const startDateState = this.eventIsOver ? this.nextStartDate : this.currentStartDate
      const endDateState = this.eventIsOver ? this.nextEndDate : this.currentEndDate
      const startMonth = startDateState.getMonth()
      const endMonth = endDateState.getMonth()
      const startDay = startDateState.getDay()
      const endDay = endDateState.getDay()
      const startDate = `${startMonth.slice(0, 3)} ${startDay}`
      const endDate = startMonth === endMonth
        ? endDay
        : `${endMonth.slice(0, 3)} ${endDay}`
      return `${startDate} - ${endDate}`
    },
  },
  methods: {
    toggleAlertExpanded() {
      this.alertExpanded = !this.alertExpanded
      console.log('worked')
    },
  },
  mounted() {
    this.$refs.registerBanner.classList.add('registerBanner--in')
    this.isSafari = sniffBrowser().isSafari
  },
}
</script>