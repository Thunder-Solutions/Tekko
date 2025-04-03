<template>
  <global-transition>
    <component
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      :is="story.content.component | dashify"
    ></component>
  </global-transition>
</template>

<script>
  import GlobalTransition, {transition} from '../components/Global/GlobalTransition.vue'

  export default {
    components: {GlobalTransition},
    transition,
    head() {
      return {
        title: `Tekko | ${this.story.content.title || 'The region\'s premier anime convention'}`,
      }
    },
    data() {
      return {
        story: { content: {} },
      }
    },
    methods: {
      refresh() {

        // without the timeout, some required properties may not be populated yet
        setTimeout(() => { this.$nuxt.refresh() })
      },
    },
    mounted() {
      this.$storybridge.on(['input', 'published', 'change'], event => {
        const {action, slugChanged, story} = event
        if (action !== 'input' && !slugChanged) return window.location.reload()
        if (story.id === this.story.id) this.story.content = story.content
      })

      // refresh client-side to avoid unwanted server caching
      this.refresh()
    },
    async asyncData(context) {
      const windowExists = typeof window !== 'undefined'
      const {localStorage, location, parent} = (windowExists ? window : {})

      const isDraftMode =
        context.query._storyblok
        || context.isDev
        || windowExists && localStorage.getItem('_storyblok_draft_mode')

      if (isDraftMode && windowExists) {
        localStorage.setItem('_storyblok_draft_mode', '1')
        if (location === parent.location) localStorage.removeItem('_storyblok_draft_mode')
      }

      // Load the JSON from the API
      const api = context.app.$storyapi
      const path = context.route.path === '/' ? 'home' : context.route.path.replace(/^\//, '')
      const version = 'published'

      // initialize state
      const {req} = context
      context.store.commit('setHost', req ? req.headers : windowExists ? window.location : '')
      await context.store.dispatch('loadGlobalContent')

      return api.get(`cdn/stories/${path}`, {version})
        .then(res => res.data)
        .catch(res => {
          const {data, status} = (res.response || {})
          console.error(data || res)
          context.error({
            statusCode: status || 404,
            message: data || 'Failed to receive content from api',
          })
        })
    },
  }
</script>
