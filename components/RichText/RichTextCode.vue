<template>
  <pre class="prettyprint"><code
    v-for="(code, index) in codeBlock.content"
    :key="index"
    :class="codeBlock.attrs.class"
  >{{ code.text }}</code></pre>
</template>

<style scoped>
  pre {
    background-color: var(--color-primary-base);
    padding: 20px;
    margin: 0;
    box-sizing: border-box;
  }
</style>

<script>
export default {
  props: ['code-block'],
  mounted() {
    PR.prettyPrint()
  },
}
</script>
