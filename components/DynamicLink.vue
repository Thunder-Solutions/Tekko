<template>
  <component
    class="link"
    :is="linkTag"
    :href="_href"
    :to="toLocation"
  ><slot></slot></component>
</template>

<style scoped>
  .link {
    cursor: pointer;
  }
</style>

<script>
export default {
  props: ['href'],
  computed: {
    _href() {
      const { href } = this.$props
      return /^\/|^[^\.]+:|^$/.test(href) ? href || '#' : `/${href}`
    },
    isLocal() {
      const { _href: href } = this
      const ignoreLink = !href || href === '#' || href.replace(/^\//, '') === this.$route.path.replace(/^\//, '')
      return ignoreLink ? false : !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')
    },
    linkTag() {
      return this.isLocal ? 'nuxt-link' : 'a'
    },
    toLocation() {
      return this.isLocal ? this._href : false
    },
  },
}
</script>
