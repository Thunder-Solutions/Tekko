<template>
  <span class="navItem" :id="itemId">
    <storyblok-link class="navLink" :class="hasSubmenuClass" :id="hasSubmenu ? `${itemId}-SubNavToggler` : ''" :link="item.link">{{ item.text }}</storyblok-link>
    <span class="subNav" v-if="hasSubmenu" :id="`${itemId}-SubNav`" aria-hidden="true">
      <global-menu-item
        v-for="subItem in item.submenu"
        :key="subItem._uid"
        :item="subItem"
      ></global-menu-item>
    </span>
  </span>
</template>

<style scoped>
  .navLink,
  .navLink:visited {
    color: var(--color-primary-contrast-base);
    display: block;
    text-decoration: none;
    font-size: var(--size-2);
    padding: var(--size-1);
    transition: background-color 0.3s;
  }

  .navLink:hover,
  .navLink:active {
    background-color: var(--color-primary-base);
  }

  .navLink[aria-haspopup="true"]:before {
    font-weight: 900;
    font-family: "Font Awesome 5 Free";
    content: '\f104 ';
    display: inline-block;
    padding-right: 5px;
  }

  .navLink--hasChildren:before {
    font-weight: 900;
    font-family: 'Font Awesome 5 Free';
    content: "\f104 ";
    display: inline-block;
    padding-right: 5px;
  }

  .subNav {
    background-color: var(--color-primary-base);
    box-sizing: border-box;
    position: absolute;
    right: calc(-100% - 20px);
    top: 0;
    width: var(--size-8);
    overflow-y: auto;
    height: 100%;
    padding: var(--size-2) 0;
    transition: right 0.3s;
  }

  .subNav[aria-hidden="false"] {
    right: calc(100% + 1px);
    display: block;
  }

  @media (max-width: 700px) {
    .subNav[aria-hidden="false"] {
      right: 33%;
    }
  }
</style>

<script>
import {addAccessibilityRules} from '@thundersolutions/access'

export default {
  props: ['item'],
  data() {
    const item = this.$props.item
    const submenu = item.submenu
    return {
      hasSubmenu: submenu && submenu.length,
      itemId: `NavItem-${item.text.replace(/[^a-z0-9]/gi, '')}`,
    }
  },
  mounted() {
    const id = this.itemId
    const togglerId = `#${id}-SubNavToggler`
    const navId = `#${id}-SubNav`
    addAccessibilityRules({
      root: document.querySelector(`#${id}`),
      methods: {
        toggleSubMenu({ toggleExpanded, toggleFocusTrap }, event) {
          event.preventDefault()
          event.stopPropagation()
          for (const subToggler of document.querySelectorAll('.navLink--hasChildren')) {
            if (subToggler === event.currentTarget) continue
            if (subToggler.getAttribute('aria-expanded') === 'true') subToggler.setAttribute('aria-expanded', 'false')
            subToggler.parentElement.querySelector('.subNav').setAttribute('aria-hidden', 'true')
          }
          toggleExpanded(togglerId, navId)
        },
        toggleFromFirst({ toggleExpanded, toggleFocusTrap, focus }, event) {
          if (!event.shiftKey) return
          event.preventDefault()
          event.stopPropagation()
          toggleExpanded(togglerId, navId)
          focus(togglerId)
        },
        focusNext({ focus }) { setTimeout(() => focus('next'), 150) },
        focusToggler({ focus }) { focus(togglerId) },
      },
      rules: {
        [togglerId]: {
          keyboard: {
            ' ': ['toggleSubMenu', 'focusNext'],
            'Enter': ['toggleMenu', 'focusNext'],
          },
          mouse: {
            click: ['toggleSubMenu'],
          },
        },
        [`${navId}[aria-hidden="true"]`]: {
          attr: {
            inert: true,
          },
        },
        [`${navId} > .navItem:first-of-type`]: {
          keyboard: {
            Tab: ['toggleFromFirst'],
          },
        },
        [`${navId} > .navItem:last-of-type`]: {
          keyboard: {
            Tab: ['toggleSubMenu', 'focusToggler'],
          },
        },
      },
    })
  },
  computed: {
    hasSubmenuClass() {
      return this.hasSubmenu ? 'navLink--hasChildren' : ''
    },
  },
}
</script>