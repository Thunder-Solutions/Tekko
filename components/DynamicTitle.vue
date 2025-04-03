<template>
  <component :is="headingLevel"><slot></slot></component>
</template>

<script>
  export default {
    methods: {
      getAllParentTitles(ctx) {
        const parent = ctx.$parent
        const parentTitles = parent ? this.getAllParentTitles(parent) : []
        const title = parent && parent.blok && parent.blok.title
        const allTitles = [...parentTitles]
        if (title) allTitles.push(title)
        return allTitles
      },
    },
    computed: {
      headingLevel() {
        const currentLevel = this.getAllParentTitles(this.$parent).length + 1
        return currentLevel > 6 ? 'h6'
          : currentLevel < 2 ? 'h2'
          : `h${currentLevel}`
      },
    },
  }
</script>