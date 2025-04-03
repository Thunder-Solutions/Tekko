<template>
  <div class="richText__list">
    <component class="list" :is="listType">
      <li v-for="item in list.content" :key="item._uid">
        <rich-text :doc="item"></rich-text>
      </li>
    </component>
  </div>
</template>

<style scoped>
  .list {
    margin: 0;
    text-align: left;
  }
</style>

<script>
export default {
  props: ['list'],
  computed: {
    listType() {
      return this.$props.list.type === 'ordered_list' ? 'ol' : 'ul'
    },
  },
}
</script>
