<template>
  <div class="navContainer">
    <button id="NavToggler" class="navToggler" ref="toggler">MENU</button>
    <nav ref="menu" class="navMenu" id="GlobalNav" aria-hidden="true">
      <global-menu-item
        v-for="item in menu"
        :key="item._uid"
        :item="item"
      ></global-menu-item>
    </nav>
  </div>
</template>

<style scoped>
  .navContainer {
    position: relative;
    height: 100%;
    padding-top: 5px;
    box-sizing: border-box;
  }

  .navToggler:before {
    font-weight: 900;
    font-family: "Font Awesome 5 Free";
    content: '\f0c9';
    display: block;
    font-size: 44px;
    line-height: 35px;
  }

  .navToggler,
  .navToggler:hover,
  .navToggler:active,
  .navToggler:visited {
    background: none;
    border: none;
    text-decoration: none;
    font-family: inherit;
    font-size: 18px;
    color: white;
    cursor: pointer;
    padding-top: 5px;
  }

  .navMenu {
    --nav-width: var(--size-8);
    position: absolute;
    display: block;
    box-sizing: border-box;
    top: 81px;
    right: 0;
    width: var(--nav-width);
    min-height: calc(100vh - 81px);
    background-color: var(--color-primary-base);
    transition: right 0.3s;
    transform: translateX(0);
    padding: 20px 0;
  }

  .navMenu[aria-hidden="true"] {
    --negative-width: calc(var(--nav-width) * -1);
    right: calc(var(--negative-width) - 20px);
  }
</style>

<script>
import {mapGetters} from 'vuex'
import {addAccessibilityRules} from '@thundersolutions/access'

export default {
  computed: mapGetters(['menu']),
  data() {
    return {
      hasLoaded: false,
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      const updatingContent = mutation.type === 'updateGlobalContent'
      if (updatingContent && !this.hasLoaded) {
        this.hasLoaded = true
      }
    })

    // add menu navigation functionality
    addAccessibilityRules({
      root: document.documentElement,
      methods: {
        toggleMenu({ toggleExpanded, toggleFocusTrap }, event) {
          event.preventDefault()
          event.stopPropagation()
          toggleExpanded('#NavToggler', '#GlobalNav')
          toggleFocusTrap('#GlobalNav')
          for (const subToggler of document.querySelectorAll('.navLink--hasChildren')) {
            if (subToggler.getAttribute('aria-expanded') === 'true') subToggler.setAttribute('aria-expanded', 'false')
            subToggler.parentElement.querySelector('.subNav').setAttribute('aria-hidden', 'true')
          }
        },
        toggleFromFirst({ toggleExpanded, toggleFocusTrap, focus }, event) {
          if (!event.shiftKey) return
          event.preventDefault()
          event.stopPropagation()
          toggleExpanded('#NavToggler', '#GlobalNav')
          toggleFocusTrap('#GlobalNav')
          focus('#NavToggler')
          for (const subToggler of document.querySelectorAll('.navLink--hasChildren')) {
            if (subToggler.getAttribute('aria-expanded') === 'true') subToggler.setAttribute('aria-expanded', 'false')
            subToggler.parentElement.querySelector('.subNav').setAttribute('aria-hidden', 'true')
          }
        },
        toggleAllMenus({ toggleExpanded, toggleFocusTrap }, event) {
          const toggler = document.querySelector('#NavToggler')
          if (toggler.getAttribute('aria-expanded') === 'false') return
          event.preventDefault()
          event.stopPropagation()
          toggleExpanded('#NavToggler', '#GlobalNav')
          toggleFocusTrap('#GlobalNav')
          for (const subToggler of document.querySelectorAll('.navLink--hasChildren')) {
            if (subToggler.getAttribute('aria-expanded') === 'true') subToggler.setAttribute('aria-expanded', 'false')
            subToggler.parentElement.querySelector('.subNav').setAttribute('aria-hidden', 'true')
          }
        },
        focusNext({ focus }) { setTimeout(() => focus('next'), 150) },
        focusToggler({ focus }) { focus('#NavToggler') },
      },
      rules: {
        '#NavToggler': {
          aria: {
            expanded: false,
            owns: 'GlobalNav',
          },
          keyboard: {
            ' ': ['toggleMenu', 'focusNext'],
            'Enter': ['toggleMenu', 'focusNext'],
          },
          mouse: {
            click: ['toggleMenu'],
          },
        },
        '#GlobalNav[aria-hidden="true"]': {
          attr: {
            inert: true,
          },
        },
        '#GlobalNav > .navItem:first-of-type': {
          keyboard: {
            Tab: ['toggleFromFirst'],
          },
        },
        '#GlobalNav > .navItem:last-of-type': {
          keyboard: {
            Tab: ['toggleMenu', 'focusToggler'],
          },
        },
        'body': {
          mouse: {
            click: ['toggleAllMenus'],
          },
        },
      },
    })
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        const {menu, toggler} = this.$refs
        toggler.setAttribute('aria-expanded', 'false')
        menu.setAttribute('aria-hidden', 'true')
      }
    },
  },
}
</script>