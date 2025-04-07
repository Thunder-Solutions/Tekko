<template>
  <div v-editable="blok">
    <template v-if="blok.staging_only">
      <client-only>
        <template v-if="showContent">
          <component
            :key="blok._uid"
            v-for="blok in blok.content"
            :blok="blok"
            :is="blok.component | dashify"
          ></component>
        </template>
        <template v-else>
          <p
            class="expiredMessage"
            v-if="showMessage"
          >{{ expiredMessage }}</p>
        </template>
      </client-only>
    </template>
    <template v-else>
      <template v-if="showContent">
        <component
          :key="blok._uid"
          v-for="blok in blok.content"
          :blok="blok"
          :is="blok.component | dashify"
        ></component>
      </template>
      <template v-else>
        <p
          class="expiredMessage"
          v-if="showMessage"
        >{{ expiredMessage }}</p>
      </template>
    </template>
  </div>
</template>

<style scoped>
  .expiredMessage {
    margin: 0;
    padding: var(--size-4) var(--size-2) 0;
  }
</style>

<script>
  import DateParser from '~/assets/DateParser.js'
  import {mapGetters} from 'vuex'

  export default {
    props: ['blok'],
    computed: {
      ...mapGetters(['currentEndDate', 'currentStartDate', 'nextStartDate', 'host']),
      showContent() {
        try {
          const { blok } = this.$props

          // early returns
          if (blok.force_show) return true
          if (blok.staging_only && !this.hostIsStaging) return false
          if (blok.manually_hide) return false

          const { start_showing, stop_showing, event_dates } = blok
          const usingEventDate = event_dates !== ''
          const usingCustomDate = start_showing !== '' || stop_showing !== ''

          // skip if no dates
          if (!usingEventDate && !usingCustomDate) return true

          // can't use both event dates and custom dates
          if (usingCustomDate) {
            const customStart = DateParser(start_showing).fullDate
            const customEnd = DateParser(stop_showing).fullDate
            const isShowBeforeCustom = stop_showing !== '' ? now <= customEnd : true
            const isShowAfterCustom = start_showing !== '' ? now >= customStart : true
            const withinCustomTime = isShowBeforeCustom && isShowAfterCustom
            return withinCustomTime
          }

          // event dates
          const now = Date.now()
          const endDate = this.currentEndDate.fullDate
          const weekAfter = new Date(endDate)
          weekAfter.setDate(endDate.getDate() + 7)

          return (event_dates === 'show_before' && now <= endDate.getTime())
            || (event_dates === 'show_before_following_week' && now < weekAfter.getTime())
            || (event_dates === 'show_after' && now > endDate.getTime())
        } catch (e) {
          console.error('Error in conditional content:', e)
          return false
        }
      },
      hostIsStaging() {
        return this.host !== 'tekko.us'
      },
      showMessage() {
        const {blok} = this.$props
        return !blok.disable_message && this.hostIsStaging
      },
      expiredMessage() {
        const customMessage = this.$props.blok.expired_message
        const lastYear = this.currentStartDate.getYear()
        const nextYear = this.nextStartDate.getYear()
        return customMessage && customMessage.length
          ? customMessage
          : `Thank you for attending Tekko ${lastYear}, come back later to see more updates for Tekko ${nextYear}!`
      },
    },
  }
</script>
