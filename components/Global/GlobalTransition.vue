<template>
  <div class="mainContainer mainContainer--animating" ref="mainContainer">
    <slot></slot>
  </div>
</template>

<style scoped>

  .mainContainer {
    position: relative;
  }

  .mainContainer::before,
  .mainContainer::after {
    --teeth-size: 30px;
    --teeth-dbl: calc(var(--teeth-size) * 2);
    --open: calc((50vw + var(--teeth-size)) * -1);
    content: '';
    display: block;
    height: 100vh;
    width: calc(50vw + var(--teeth-size));
    position: fixed;
    top: 0;
    background-image: url('/metal-texture.jpg');
    background-size: cover;
    box-sizing: border-box;
    border-right: var(--teeth-dbl) outset rgba(0, 0, 0, 0.15);
    clip-path: polygon(
      0 0,
      calc(100% - var(--teeth-size)) 0,
      calc(100% - var(--teeth-size)) 20%,
      calc(100% - var(--teeth-dbl)) calc(20% + var(--teeth-size)),
      calc(100% - var(--teeth-dbl)) calc(40% - var(--teeth-size)),
      calc(100% - var(--teeth-size)) 40%,
      calc(100% - var(--teeth-size)) 60%,
      100% calc(60% + var(--teeth-size)),
      100% calc(80% - var(--teeth-size)),
      calc(100% - var(--teeth-size)) 80%,
      calc(100% - var(--teeth-size)) 100%,
      0 100%
    );
    z-index: 11;
  }

  .mainContainer::before {
    left: var(--open);
    content: 'loading...';
    padding: 80vh 0 0 var(--size-4);
    font-size: 7vw;
    color: rgba(255, 255, 255, 0.4);
    animation: blink 1s infinite;
  }

  @keyframes blink {
    50% { color: rgba(255, 255, 255, 0.1); }
  }

  .mainContainer::after {
    right: var(--open);
    transform: rotate(180deg);
  }

  .mainContainer--animating::before {
    transition: left 0.3s;
  }

  .mainContainer--animating::after {
    transition: right 0.3s;
  }

  .mainContainer--enter-active::after,
  .mainContainer--leave-active::after {
    right: 0;
  }

  .mainContainer--leave-active::before,
  .mainContainer--enter-active::before {
    left: 0;
  }
  
</style>

<script>
  export const transition = {
    name: 'mainContainer-',
    duration: 300,
    beforeLeave(el) {
      el.classList.add('mainContainer--animating')
    },
    afterEnter(el) {
      document.activeElement.blur()
      setTimeout(() => el.classList.remove('mainContainer--animating'), 300)
    },
  }

  export default {
    mounted () {
      const {mainContainer} = this.$refs
      for (const subToggler of document.querySelectorAll('.navLink--hasChildren')) {
        if (subToggler.ariaExpanded === 'true') subToggler.setAttribute('aria-expanded', 'false')
        subToggler.parentElement.querySelector('.subNav').setAttribute('aria-hidden', 'true')
      }
      document.body.style.scrollBehavior = 'auto'
      document.body.scrollTop = 0
      if (location.hash !== '') {
        document.querySelector(`:not([aria-hidden]) ${location.hash}`)
      }
      document.body.style.scrollBehavior = ''
      setTimeout(() => {
        mainContainer.classList.remove('mainContainer--animating')
      }, 600)
    },
  }
</script>
