<template>
  <div class="thunderEventsContainer" v-editable="blok">
    <client-only>
      <div class="thunderEvents-new" :class="newVersionClass">
        <thunder-events class="thunderEvents"></thunder-events>
      </div>
    </client-only>
  </div>
</template>

<style scoped>
.thunderEvents-new--inactive,
.thunderEvents-old--inactive {
  display: none;
}
.thunderEventsContainer {
  padding: 2rem 1rem;
  margin: 0 auto;
}
.thunderEvents-notice {
  display: block;
  padding: 0.5rem;
  margin: 1rem 0;
  background-color: var(--color-notice-base);
  color: var(--color-notice-contrast-base);
}
.thunderEvents {
  --font: Orbitron, sans-serif;
  --font-secondary: Jura, sans-serif;
  --font-size: 0.5rem;
  --color-primary: var(--color-primary-alt-3);
  --color-primary-contrast: var(--color-primary-alt);
  --color-secondary: var(--color-primary-base-4);
  --color-secondary-contrast: var(--color-primary-contrast-base);
  --color-tertiary: var(--color-primary-base-2);
  --color-tertiary-contrast: var(--color-primary-contrast-base);
}
</style>

<script>
import {mapGetters} from 'vuex'

const transformEventData = (blok) => ({
  events: blok.events.map(event => ({
    id: +event.id,
    name: event.name,
    location: event.location,
    start: new Date(event.start),
    end: new Date(event.end),
    description: event.description,
    host: event.host,
    category: event.category,
  })),
  locations: blok.locations.map(({ location }) => location),
  rollOverTime: blok.rollOverTime,
  floorPlan: {
    title: blok.title,
    imageSrc: blok.image.filename,
    dimensions: {
      height: +blok.height,
      width: +blok.width,
    },
    clickableAreas: blok.clickableAreas.map(area => ({
      alt: area.alt,
      coords: area.coords.split(',').map(Number),
      href: area.href,
      location: area.location,
      shape: area.shape,
    })),
  },
})

const getBlokFromStory = (story) => {
  const findInContent = (content) => {
    if (content.content) return findInContent(content.content)
    if (Array.isArray(content)) {
      for (const blok of content) {
        if (blok.component === 'Thunder Events') return blok
        if (blok.content) {
          const childBlok = findInContent(blok.content)
          if (childBlok) return childBlok
        }
      }
    }
  }
  return findInContent(story.content)
}

export default {
  props: ['blok'],
  data() {
    return {
      newVersion: true,
      guide: transformEventData(this.$props.blok),
    }
  },
  computed: {
    oldVersionClass() {
      return this.newVersion ? 'thunderEvents-old--inactive' : ''
    },
    newVersionClass() {
      return this.newVersion ? '' : 'thunderEvents-new--inactive'
    },
    ...mapGetters(['storyblokApi']),
  },
  methods: {
    toggleVersion() {
      this.newVersion = !this.newVersion
    },
  },
  mounted() {

    // only register/init the element once
    const ProgramGuideNative = customElements.get('thunder-events')
    if (!ProgramGuideNative) customElements.define('thunder-events', ThunderEvents.Components.ProgramGuideNative)

    // const ProgramGuideNativeOld = customElements.get('thunder-events-old')
    // if (!ProgramGuideNativeOld) customElements.define('thunder-events-old', ThunderEventsOld.Components.ProgramGuideNative)

    /*this.$storyapi.get('cdn/stories/schedule', { version: 'published' }).then(res => res.data).then(({ story }) => {
      const blok = getBlokFromStory(story)
      const guide = transformEventData(blok)

      ThunderEvents.init(async () => ({ guide }))
      ThunderEventsOld.init(async () => ({ guide }))
    })*/
    fetch('https://thunder-events-server.vercel.app/api/event?id=1&cache_bust=' + crypto.randomUUID()).then(res => res.json()).then((data) => {
      const mappedData = {
        events: data?.programming?.map(activity => ({
          id: activity.id,
          name: activity.name,
          location: activity.location?.name ?? '(No location provided)',
          start: new Date(activity.startTime),
          end: new Date(activity.endTime),
          description: activity.description,
          host: activity.host?.name ?? '(No host provided)',
          category: activity.category?.name ?? '(No category provided)',
        })) ?? [],
        locations: data?.locations?.map((location) => location.name) ?? [],
        rollOverTime: data?.rollOverTime?.slice(0, 5) ?? '00:00',
        floorPlan: {
          title: data?.floorPlan?.name ?? 'Floor Plan',
          imageSrc: data.floorPlan?.image?.url ?? '',
          dimensions: {
            height: data?.floorPlan?.height ?? 0,
            width: data?.floorPlan?.width ?? 0,
          },
          clickableAreas: data.floorPlan.clickableAreas ?? [],
        },
      }
      console.log(data)
      console.log(mappedData)
      ThunderEvents.init(async () => ({ guide: mappedData }))
    })
  },
}
</script>
