<template>
  <div v-editable="blok">
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
        const {blok} = this.$props

        // get dates
        const now = Date.now()
        const endDate = this.currentEndDate.fullDate
        const {start_showing, stop_showing, event_dates} = blok
        const eventEnd = endDate.getTime()
        const weekAfter = new Date(endDate)
        weekAfter.setDate(endDate.getDate() + 7)
        const customStart = DateParser(start_showing).fullDate
        const customEnd = DateParser(stop_showing).fullDate

        // options
        const usingEventDate = event_dates !== ''
        const isShowBeforeEvent = usingEventDate ? event_dates === 'show_before' : true
        const isShowBeforeWeekAfter = usingEventDate ? event_dates === 'show_before_following_week' : true
        const isShowAfterEvent = usingEventDate ? event_dates === 'show_after' : true
        const isShowBeforeCustom = stop_showing !== '' ? now <= customEnd : true
        const isShowAfterCustom = start_showing !== '' ? now >= customStart : true

        // conditions
        const isBeforeEvent = now < eventEnd
        const isBeforeWeekAfter = now < weekAfter
        const withinCustomTime = isShowBeforeCustom && isShowAfterCustom
        const withinEventTime =
          (isShowBeforeEvent && isBeforeEvent)
          || (isShowBeforeWeekAfter && isBeforeWeekAfter)
          || (isShowAfterEvent && !isBeforeEvent)
        const allShowOptions =
          this.checkStaging
          && !blok.manually_hide
          && withinCustomTime
          && withinEventTime
        
        return blok.force_show || allShowOptions 
      },
      checkStaging() {
        const {blok} = this.$props
        const hostIsStaging = this.host && (
          this.host.startsWith('tekko-staging')
          || this.host.startsWith('develop')
          || this.host.startsWith('localhost')
        )
        return blok.staging_only ? hostIsStaging : true
      },
      showMessage() {
        const {blok} = this.$props
        return !blok.disable_message && this.checkStaging
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
