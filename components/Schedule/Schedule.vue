<template>
  <div v-editable="blok" class="schedule">
    <single-day
      v-for="(day, dayIdx) in days"
      :key="dayIdx"
      :day="day"
    ></single-day>
  </div>
</template>

<style scoped>
  .schedule {
    padding: var(--size-2);
  }
</style>

<script>
  import SingleDay from './SingleDay.vue'

  export default {
    props: ['blok'],
    components: { SingleDay },
    data() {
      return {
        days: [
          {name: 'Monday', times: [], active: 0},
          {name: 'Tuesday', times: [], active: 0},
          {name: 'Wednesday', times: [], active: 0},
          {name: 'Thursday', times: [], active: 0},
          {name: 'Friday', times: [], active: 0},
          {name: 'Saturday', times: [], active: 0},
          {name: 'Sunday', times: [], active: 0},
        ],
      }
    },
    created() {
      this.days.forEach((day, idx) => {
        const times = this.$props.blok.times || []
        this.days[idx].times = times.filter(t => t.day === day.name.toLowerCase())
      })
    },
  }
</script>
