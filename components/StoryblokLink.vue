<template>
  <dynamic-link :href="href">
    <slot></slot>
  </dynamic-link>
</template>

<script>
export default {
  props: ['link'],
  computed: {
    href() {
      const link = this.$props.link
      return link.cached_url || link.url
    },
  },
}
</script>
