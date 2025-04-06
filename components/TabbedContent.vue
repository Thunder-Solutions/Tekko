<template>
  <div class="tabContainer">
    <nav class="navTabWrapper" ref="navTabWrapper">
      <div class="navTabContainer">
        <a
          class="navTab"
          v-for="tab in blok.tabs"
          :key="tab._uid"
          ref="navTabs"
          @click="toggleActiveTab"
          @keyup.escape="collapseAndFocusToggler"
        ><span class="navTabText">{{ tab.title }}</span></a>
      </div>
      <button
        class="tabToggler"
        ref="tabToggler"
        aria-haspopup="true"
        @click="toggleNavTabs"
        @keyup.enter="focusFirstItem"
        @keyup.space="focusFirstItem"
      >MORE </button>
    </nav>
    <section
      class="tab"
      v-for="tab in blok.tabs"
      :key="tab._uid"
      ref="tabs"
    >
      <div class="tabContent" v-editable="tab">
        <dynamic-title class="title">{{ tab.title }}</dynamic-title>
        <component
          :key="blok._uid"
          v-for="blok in tab.content"
          :blok="blok"
          :is="blok.component | dashify"
        ></component>
      </div>
    </section>
  </div>
</template>

<style scoped>

  .title {
    margin: 0;
    padding: var(--size-2) var(--size-2) 0;
  }

  .tabToggler {
    background-color: var(--color-primary-contrast-alt);
    background-image: linear-gradient(to bottom, var(--color-primary-accent), var(--color-primary-focus));
    border: 1px solid var(--color-primary-base);
    border-bottom: 0;
    color: var(--color-primary-contrast-base);
    display: block;
    font-weight: bold;
    padding: 0 var(--size-3);
    height: var(--size-4);
    line-height: var(--size-4);
    cursor: pointer;
    grid-area: toggler;
    position: relative;
  }

  .tabToggler::after {
    content: '\f103';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    display: inline-block;
    transition: transform 0.3s;
  }

  .tabToggler[aria-expanded="true"]::after {
    transform: rotate(180deg);
  }

  .tabToggler:not([aria-hidden="false"]) {
    display: none;
  }

  .tabContainer {
    padding: var(--size-4) var(--size-2) 0;
    max-width: var(--content-max-width);
    margin: 0 auto;
    position: relative;

    /* this fixes weird issue with children being 100% height relative to this */
    transform: translate(0);
  }

  .navTabWrapper {
    overflow: hidden;
  }

  .overflown {
    display: grid;
    grid-template-areas: 'tab toggler';
    grid-template-columns: 1fr auto;
  }

  .overflown .navTab:not(.active) {
    display: none;
  }

  .overflown[aria-hidden="false"] .navTabContainer {
    position: absolute;
    display: block;
    width: 50vw;
    height: 100%;
    overflow: auto;
    z-index: 5;
  }

  .overflown[aria-hidden="false"] .navTabContainer .navTab {
    display: block;
    width: 50vw;
    max-width: none;
  }

  .overflown[aria-hidden="false"] .navTabContainer .navTab::after {
    content: none;
  }

  .navTabContainer {
    width: 100%;
    display: flex;
    flex-basis: 20%;
    position: relative;
  }

  .navTab,
  .navTab:hover,
  .navTab:active,
  .navTab:visited {
    background-color: var(--section-theme-primary);
    color: var(--section-theme-secondary);
  }
  
  .navTab {
    --height: var(--size-4);
    padding: 0 var(--size-2);
    font-size: var(--size-3);
    display: inline-block;
    height: var(--height);
    position: relative;
    max-width: 50vw;
    box-sizing: border-box;
    transition: filter 0.3s;
  }

  .navTab:not(.active):not(:hover):not(:focus) {
    filter: brightness(40%);
  }

  .navTab:not(.active) {
    max-width: var(--size-7);
  }

  .navTabText {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    display: inline-block;
    line-height: var(--height);
  }

  .tab:not(.active) {
    display: none;
  }

  .tab::before {
    --offset: var(--size-7);
    display: block; 
    content: ''; 
    margin-top: calc(var(--offset) * -1); 
    height: var(--offset); 
    visibility: hidden; 
    pointer-events: none;
  }

  .tabContent {
    border: 1px solid var(--section-theme-primary);
    border-top-width: var(--size-1);
    padding-bottom: var(--size-4);
  }

  @media(min-width: 400px) {

    .navTab {
      margin-right: var(--height);
    }

    .navTab::after {
      content: '';
      display: block;
      height: var(--height);
      width: var(--height);
      border: calc(var(--height) / 2) solid var(--section-theme-primary);
      box-sizing: border-box;
      border-right-color: transparent;
      border-top-color: transparent;
      position: absolute;
      right: calc(var(--height) * -1);
      top: 0;
    }

  }

</style>

<script>
  
  const showDefaultTab = ({navTabs, tabs}) => {
    if (!navTabs) return

    const activeTabIdx = navTabs
      .findIndex(navTab => navTab.hash === location.hash)

    const idx = activeTabIdx !== -1 ? activeTabIdx : 0
    navTabs[idx].classList.add('active')
    tabs[idx].classList.add('active')
  }

  const getId = tab => {
    let count = 2
    const findUniqueId = id => {
      const existingId = !!document.querySelector(`#${id}`)
      const newId = existingId ? `${id}-${count++}` : id
      return existingId ? findUniqueId(newId) : newId
    }
    const id = tab.title.replace(/ |[^A-Za-z]/g, '-').toLowerCase()
    return findUniqueId(id)
  }

  export default {
    props: ['blok'],
    methods: {
      toggleActiveTab(event) {
        const {navTabs, tabs} = this.$refs
        const target = event.currentTarget
        navTabs.forEach((navTab, idx) => {
          const tab = tabs[idx]
          const addOrRemove = navTab === target ? 'add' : 'remove'
          tab.classList[addOrRemove]('active')
          navTab.classList[addOrRemove]('active')
        })
        this.toggleNavTabs(event, false)
      },
      toggleNavTabs(event, bool) {
        const {navTabWrapper, tabToggler} = this.$refs
        const expand = bool !== undefined ? bool : !this.navTabsExpanded
        this.navTabsExpanded = expand
        navTabWrapper.setAttribute('aria-hidden', String(!expand))
        tabToggler.setAttribute('aria-expanded', String(expand))
      },
      toggleOverflow() {
        const {navTabWrapper, tabToggler} = this.$refs
        tabToggler.setAttribute('aria-hidden', 'true')
        tabToggler.setAttribute('aria-expanded', 'false')
        navTabWrapper.classList.remove('overflown')
        navTabWrapper.setAttribute('aria-hidden', 'true')
        this.navTabsExpanded = false
        if (navTabWrapper.scrollWidth > navTabWrapper.clientWidth) {
          tabToggler.setAttribute('aria-hidden', 'false')
          navTabWrapper.classList.add('overflown')
        } else {
          navTabWrapper.setAttribute('aria-hidden', 'false')
        }
      },
      focusFirstItem(event) {
        this.toggleNavTabs(event, true)
        this.$refs.navTabs[0].focus()
      },
      collapseAndFocusToggler(event) {
        const {tabToggler, navTabWrapper} = this.$refs
        this.toggleNavTabs(event, false)
        tabToggler.focus()
      },
    },
    data() {
      return {
        navTabsExpanded: false,
      }
    },
    mounted() {
      const {navTabs, tabToggler} = this.$refs
      const tabEls = this.$refs.tabs
      const {tabs} = this.$props.blok
      tabs.forEach((tab, idx) => {
        const tabId = getId(tab)
        tabEls[idx].id = tabId
        navTabs[idx].href = `#${tabId}`
      })
      showDefaultTab(this.$refs)

      // collapse tabs into one button if overflown
      this.toggleOverflow()
      window.addEventListener('resize', this.toggleOverflow)
      
      // make sure it's toggled when it's revealed by collapsible content
      // TODO: maybe we can find a cleaner way to check when the content is being revealed
      window.addEventListener('click', ({target}) => {
        if (target === tabToggler) return
        this.toggleOverflow()
      })
    },
  }
</script>
