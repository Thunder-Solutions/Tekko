<template>
  <p class="richText__paragraph">
    <template v-for="(inline, index) in content">

      <span
        class="richText__inline"
        v-if="!inline.marks"
        :key="index"
      >{{ inline.text }}</span>

      <template v-else>

        <dynamic-link
          v-if="getLinkHref(inline.marks)"
          :key="index"
          :href="getLinkHref(inline.marks)"
          class="richText__inline--link"
          :class="getMarkClassList(inline.marks)"
        >{{ inline.text }}</dynamic-link>

        <code
          v-if="isCode(inline.marks)"
          :key="index"
          :class="getMarkClassList(inline.marks)"
        >{{ inline.text }}</code>

        <span
          v-if="isPlain(inline.marks)"
          :key="index"
          :class="getMarkClassList(inline.marks)"
        >{{ inline.text }}</span>
        
      </template>

      <img
        :alt="inline.attrs.alt"
        :key="index"
        tabindex="-1"
        v-if="inline.type === 'image'"
        :src="inline.attrs.src"
        class="richText__image"
      />
    </template>
  </p>
</template>

<style scoped>

.richText__inline {
  font-size: 1rem;
  white-space: pre-wrap;
  line-height: 1.3em;
}

.richText__inline--link {
  border-bottom: 1px solid;
  padding-bottom: 3px;
  font-weight: bold;
  color: var(--section-theme-focus);
  transition: filter 0.3s;
  text-decoration: none;
}

.richText__inline--link:hover {
  border-bottom-width: 3px;
  filter: brightness(130%);
}

.richText__inline--bold {
  font-weight: bold;
}

.richText__inline--italic {
  font-style: italic;
}

.richText__inline--underline {
  text-decoration: underline;
}

.richText__inline--strike {
  text-decoration: line-through;
}

.richText__inline--code {
  display: inline-block;
  padding: 0 var(--size-1);
  background-color: var(--color-primary-base);
}

.richText__paragraph {
  margin: 0;
  padding-top: var(--size-2);
  font-size: 0;
}

.richText__image {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

.richText__image:focus {
  outline: 1px dotted rgba(0, 0, 0, 0.3);
  outline-offset: 0;
  box-shadow: none;
}
</style>

<script>
export default {
  props: ['content'],
  methods: {
    getLinkHref(marks) {
      const link = marks.find(mark => mark.type === 'link')
      return link ? link.attrs.href : null
    },
    getMarkClassList(marks) {
      return 'richText__inline ' + marks.reduce((classList, mark) => {
        classList.push(`richText__inline--${mark.type}`)
        return classList
      }, []).join(' ')
    },
    isCode(marks) {
      return marks.find(mark => mark.type === 'code')
    },
    isPlain(marks) {
      const isLink = marks.find(mark => mark.type === 'link')
      const isCode = marks.find(mark => mark.type === 'code')
      return !isLink && !isCode
    },
  },
}
</script>
