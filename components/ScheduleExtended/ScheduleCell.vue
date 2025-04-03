<template>
  <div :class="`cell cell--${type}`">
    <slot></slot>
  </div>
</template>

<style scoped>
.cell {
  color: var(--color-primary-contrast-base);
  min-height: 1em;
  padding: 1em;
}

.cell--empty {
  background-color: var(--color-primary-base-3);
}

.cell--title {
  background-color: var(--color-primary-base);
  font-weight: bold;
}

.cell--data {
  background-color: var(--color-primary-base);
}
</style>

<script>
export default {
  props: ['type'],
}
</script>
