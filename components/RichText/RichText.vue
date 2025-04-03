<template>
  <div class="richText">
    <template v-for="(contentGroup, index) in doc.content">

      <rich-text-paragraph
        v-if="is('paragraph', contentGroup)"
        :key="index"
        :content="contentGroup.content"
      >
      </rich-text-paragraph>

      <rich-text-code
        v-if="is('code', contentGroup)"
        :key="index"
        :code-block="contentGroup"
      ></rich-text-code>

      <rich-text-list
        v-if="is('list', contentGroup)"
        :key="index"
        :list="contentGroup"
      ></rich-text-list>

      <rich-text-quote
        v-if="is('quote', contentGroup)"
        :key="index"
        :quote="contentGroup"
      ></rich-text-quote>

    </template>
  </div>
</template>

<script>
import RichTextParagraph from './RichTextParagraph.vue'
import RichTextList from './RichTextList.vue'
import RichTextCode from './RichTextCode.vue'
import RichTextQuote from './RichTextQuote.vue'

export default {
  components: { RichTextParagraph, RichTextList, RichTextCode, RichTextQuote },
  props: ['doc'],
  methods: {
    is(type, content) {
      const types = {
        paragraph: ['paragraph'],
        code: ['code_block'],
        quote: ['blockquote'],
        list: ['ordered_list', 'bullet_list'],
      }
      return !!types[type].includes(content.type)
    },
  },
}
</script>
