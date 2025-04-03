<template>
  <div class="switch">
    <input class="switch__checkbox" type="checkbox" :name="name" :id="id || name" :checked="checked" @change="notifyParent" />
    <label class="switch__label" :for="id">
      <slot></slot>
    </label>
  </div>
</template>

<style scoped>
.switch {
  --size: 2rem;
  --radius: calc(var(--size) / 2);
  --width: calc(var(--size) * 2);
  --border-width: 0.1rem;
  --top-offset: var(--border-width);
  --left-offset: var(--border-width);
  --active-transform: translateX(calc(100% - var(--border-width)));
  --bg-color: var(--color-primary-alt-2);
  --color: var(--color-primary-base-4);
  padding: 1rem 0.5rem;
}
.switch__checkbox {
  display: none;
}
.switch__label {
  align-items: center;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  position: relative;
}
.switch__label:before,
.switch__label:after {
  content: '';
  display: block;
  height: var(--size);
  border-radius: var(--radius);
}
.switch__label:before {
  width: var(--width);
  background-color: var(--bg-color);
  border: var(--border-width) solid var(--color);
}
.switch__label:after {
  background-color: var(--color);
  width: var(--size);
  border: 0 solid;
  position: absolute;
  top: var(--top-offset);
  left: var(--left-offset);
  transition: transform 0.2s;
}
.switch__checkbox:checked + .switch__label:after {
  transform: var(--active-transform);
}
</style>

<script>
export default {
  props: ['name', 'id', 'checked'],
  methods: {
    notifyParent(event) {
      this.$emit('change', event)
    },
  },
}
</script>