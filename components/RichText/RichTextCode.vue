<template>
  <pre class="prettyprint"><code
    v-for="(code, index) in codeBlock.content"
    :key="id + '_' + index"
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
import { randomUUID } from '~/utilities'
export default {
  props: ['code-block'],
  computed: {
    id() {
      return randomUUID()
    },
  },
  mounted() {
    PR.prettyPrint()
  },
}
</script>
