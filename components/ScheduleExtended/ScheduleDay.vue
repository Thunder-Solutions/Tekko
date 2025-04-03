<template>
  <div class="day">
    <dynamic-title class="title">{{ day.name }}</dynamic-title>
    <table class="scheduleTable">
      <thead>
        <tr>
          <td>
            <schedule-cell type="title"></schedule-cell>
          </td>
          <th
            scope="col"
            v-for="(place, placeIdx) in day.places"
            :key="placeIdx"
          >
            <schedule-cell type="title">{{ place.name }}</schedule-cell>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(time, timeIdx) in times"
          :key="timeIdx"
        >
          <th scope="row">
            <schedule-cell type="title">{{ time.displayTime }}</schedule-cell>
          </th>
          <td
            class="event"
            v-for="(place, placeIdx) in day.places"
            :let="event = getEvent(place, time)"
            :rowspan="event.span"
            :key="placeIdx"
          >
            <schedule-cell v-if="event.show">
              {{ event.name }}
            </schedule-cell>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.event {
  background-color: var(--color-primary-base);
}
</style>

<script>
import ScheduleCell from './ScheduleCell.vue'

export default {
  props: ['day'],
  components: { ScheduleCell },
  computed: {
    times() {
      const hoursSet = new Set()
      for (const place of this.day.places) {
        for (const event of place.events) {
          hoursSet.add(Number(event.start_hour))
          hoursSet.add(Number(event.end_hour))
        }
      }
      const min = Math.min(...hoursSet)
      const max = Math.max(...hoursSet)
      const arr = [...new Array(max - min)]
      const hours = []
      for (const idxKey in arr) {
        const idx = Number(idxKey)
        const hour = idx + min
        const displayHour = String(
          hour > 24 ? hour - 24
          : hour > 12 ? hour - 12
          : hour === 0 ? 12
          : hour)
        hours.push({ hour, displayHour })
      }
      const minutes = ['00', '30']
      const times = []
      for (const { hour, displayHour } of hours) {
        for (const minute of minutes) {
          const amPm = (hour < 12 || hour >= 24) ? 'AM' : 'PM'
          times.push({
            displayTime: `${displayHour}:${minute} ${amPm}`,
            hour,
            minute,
          })
        }
      }
      return times
    },
  },
  methods: {
    getEvent(place, time) {
      const hourStr = String(time.hour)
      const event = place.events.find(({ start_hour, start_minute }) =>
        start_hour ===  hourStr && start_minute === time.minute)
      if (!event) return { show: false }
      const min = Number(event.start_hour)
      const max = Number(event.end_hour)
      const span = (max - min) * 2
      return { ...event, span, show: true }
    },
  },
}
</script>