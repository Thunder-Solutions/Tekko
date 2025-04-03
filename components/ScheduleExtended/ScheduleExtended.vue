<template>
  <div class="schedule">
    <schedule-day
      v-for="(day, dayIdx) in blok.days"
      :key="dayIdx"
      :day="day"
    ></schedule-day>
  </div>
</template>

<script>
import ScheduleDay from './ScheduleDay.vue'

export default {
  props: ['blok'],
  components: { ScheduleDay },
}
</script>