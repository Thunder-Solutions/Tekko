<template>
  <div class="contentWrapper" v-editable="blok">
    <div class="contentContainer">
      <div class="toggleButtonWrapper">
        <button
          aria-haspopup="true"
          class="toggleButton"
          :class="toggleButtonClass"
          @click="toggleExpanded"
        ><span
          class="toggleButtonText"
        >{{ expandCollapseText }}</span></button>
      </div>
      <div
        :inert="fullyCollapsed"
        class="collapsible"
        :class="collapsibleClass"
      >
        <component
          :key="blok._uid"
          v-for="blok in blok.content"
          :blok="blok"
          :is="blok.component | dashify"
        ></component>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .contentWrapper {
    padding: var(--size-4) 0 0;
  }

  .contentContainer {
    padding: var(--size-2) 0;
    border: 0 dotted;
    border-top-width: 1px;
    border-bottom-width: 1px;
  }

  .toggleButtonWrapper {
    text-align: right;
  }

  .toggleButton {
    font-family: 'Jura';
    background-color: transparent;
    border: 0;
    border-right: 8px double;
    color: var(--section-theme-primary);
    cursor: pointer;
    font-size: 0;
    font-weight: normal;
    padding: var(--size-2);
    transition: all 0.3s;
    z-index: 1;
    position: relative;
    text-align: right;
    margin-right: var(--size-1);
  }

  .toggleButtonText {
    display: inline-block;
    vertical-align: middle;
    font-size: var(--size-3);
    padding-right: var(--size-2);
    max-width: 50vw;
  }

  .toggleButton:focus {
    outline: 1px dotted var(--color-primary-base);
    box-shadow: none;
  }

  .toggleButton:hover {
    color: var(--color-primary-focus);
    padding-right: var(--size-3);
  }

  .toggleButton::after {
    content: '\f100';
    display: inline-block;
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    font-size: var(--size-2);
    transition: all 0.3s;
    text-align: center;
    vertical-align: middle;
    background-color: var(--section-theme-primary);
    color: var(--section-theme-secondary);
    height: var(--size-3);
    width: var(--size-3);
    line-height: var(--size-3);
    border: 0 solid;
    border-radius: 50%;
  }

  .toggleButton:hover::after {
    background-color: var(--color-primary-focus);
  }

  .toggleButton--expanded::after {
    transform: rotate(180deg);
  }

  .collapsible {
    transform: translateX(100vw);
    transition: all 0.3s;
  }

  .collapsible--expanded {
    transform: translateX(0);
    opacity: 1;
  }

  .collapsible--collapsed {
    position: absolute;
    opacity: 0;
  }

  .collapsible[inert] {
    display: none;
  }

  @media (min-width: 700px) {
    .toggleButtonText {
      max-width: none;
    }

    .contentWrapper {
      padding: var(--size-4) var(--size-2) 0;
    }
  }

  @media (min-width: 1200px) {
    .toggleButtonText {
      max-width: none;
    }

    .contentWrapper {
      padding: var(--size-4) var(--size-4) 0;
    }
  }
</style>

<script>
  export default {
    props: ['blok'],
    data() {
      return {
        expanded: false,
        fullyCollapsed: true,
      }
    },
    computed: {
      expandCollapseText() {
        const {expand_text, collapse_text} = this.$props.blok
        return this.expanded ? collapse_text : expand_text
      },
      toggleButtonClass() {
        return this.expanded ? 'toggleButton--expanded' : 'toggleButton--collapsed'
      },
      collapsibleClass() {
        return this.expanded ? 'collapsible--expanded' : 'collapsible--collapsed'
      },
    },
    methods: {
      toggleExpanded() {
        this.fullyCollapsed = false
        requestAnimationFrame(() => {
          this.expanded = !this.expanded
          if (!this.expanded) setTimeout(() => this.fullyCollapsed = true, 500)
        })
      },
    },
  }
</script>
