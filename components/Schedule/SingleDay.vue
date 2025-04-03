<template>
  <div
    class="schedule__container"
    v-if="day.times.length"
  >
    <table class="schedule__table">
      <thead>
        <th class="schedule__day">{{ day.name }}</th>
        <th
          class="schedule__name"
          v-for="time in day.times"
          :key="time._uid"
        >{{ time.event_name }}</th>
        <th class="schedule__picker">
          <select @change="toggleActive($event)">
            <option
              v-for="(time, timeIdx) in day.times"
              :key="time._uid"
              :value="timeIdx"
            >{{ time.event_name }}</option>
          </select>
        </th>
      </thead>
      <tbody>
        <tr
          class="schedule__row"
          v-for="(hour, hourIdx) in timeRange"
          :key="hourIdx"
        >
          <td class="schedule__time">{{ hour.text }}</td>
          <td
            class="schedule__event"
            v-for="(time, timeIdx) in day.times"
            :key="time._uid"
            :class="getActiveClass(timeIdx)"
          ><div
            v-editable="time"
            :class="getTimeBlockClass(time, hour)"
          >{{ getTimeRangeString(time, hour) }}</div></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

  .schedule__container {
    overflow: auto;
  }

  .schedule__container:not(:last-child) {
    margin-bottom: var(--size-4);
  }

  .schedule__day {
    font-family: 'Orbitron';
    width: 100px;
    height: var(--size-3);
  }

  .schedule__day {
    text-align: left;
  }

  .schedule__table {
    width: 100%;
    border-collapse: collapse;    
  }

  .schedule__row {
    background-color: var(--color-primary-alt-3);
    width: 100%;
    height: var(--size-3);
  }

  .schedule__row:nth-child(even) {
    background-color: transparent;
  }

  .schedule__name,
  .schedule__event:not(.active) {
    display: none;
  }

  .schedule__event {
    padding: 0;
    height: var(--size-3);
    position: relative;
    min-width: var(--size-7);
  }

  .schedule__timeBlock {
    background-color: var(--color-primary-base);
    width: 90%;
    height: var(--size-3);
    margin: 0 auto;
    color: var(--color-primary-contrast-base);
    text-align: center;
  }

  .schedule__timeBlock--start,
  .schedule__timeBlock--end {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .schedule__timeBlock--start { bottom: 0; }
  .schedule__timeBlock--end { top: 0; }
  .schedule__timeBlock--startAtQuarterTil,
  .schedule__timeBlock--endAtQuarterAfter { height: 25%; }
  .schedule__timeBlock--startAtQuarterAfter,
  .schedule__timeBlock--endAtQuarterTil { height: 75%; }
  .schedule__timeBlock--startAtHalfHour,
  .schedule__timeBlock--endAtHalfHour { height: 50%; }
  .schedule__timeBlock--endOnTheHour { height: 0; }

  @media (min-width: 660px) {
    .schedule__name,
    .schedule__event:not(.active) {
      display: table-cell;
    }

    .schedule__picker {
      display: none;
    }
  }
</style>

<script>

  export default {
    props: ['day'],
    data() {
      return {
        active: 0,
      }
    },
    methods: {
      
      getHoursOnly(times) {
        const get24Hour = (hour, amPm) => {
          return +(new Date(`01/01/2000 ${hour}:00 ${amPm.toUpperCase()}`)
            .toTimeString()
            .slice(0, 2))
        }
        return times.reduce((acc, time) => {
          const {start_am_pm, start_hour, end_am_pm, end_hour} = time
          const startHour = get24Hour(start_hour, start_am_pm)
          const _endHour = get24Hour(end_hour, end_am_pm)
          const endHour = _endHour < startHour ? _endHour + 24 : _endHour
          acc.push(startHour, endHour)
          return acc
        }, [])
      },

      getEarliestAndLatest(times) {
        const allHours = this.getHoursOnly(times)
        return {
          earliestHour: Math.min(...allHours),
          latestHour: Math.max(...allHours),
        }
      },

      checkIfInRange(time, hour) {
        const currentHour = hour.value
        const {earliestHour, latestHour} = this.getEarliestAndLatest([time])
        return currentHour >= earliestHour && currentHour <= latestHour
      },

      getTimeBlockClass(time, hour) {
        const {earliestHour, latestHour} = this.getEarliestAndLatest([time])
        const mainClass = 'schedule__timeBlock'
        const minuteMap = {
          '00': 'OnTheHour',
          '15': 'AtQuarterAfter',
          '30': 'AtHalfHour',
          '45': 'AtQuarterTil',
        }
        const startClass = `${mainClass}--start`
        const endClass = `${mainClass}--end`
        const startMinuteClass = `${startClass}${minuteMap[time.start_minute]}`
        const endMinuteClass = `${endClass}${minuteMap[time.end_minute]}`
        const modifierClass = 
          earliestHour === hour.value ? `${startClass} ${startMinuteClass}`
          : latestHour === hour.value ? `${endClass} ${endMinuteClass}` : ''
        const fullClass = `${mainClass} ${modifierClass}`
        return this.checkIfInRange(time, hour) ? fullClass : ''
      },

      getTimeRangeString(time, hour) {
        const currentHour = hour.value
        const {earliestHour, latestHour} = this.getEarliestAndLatest([time])
        const {start_hour, start_minute, start_am_pm, end_hour, end_minute, end_am_pm} = time
        return currentHour === earliestHour
          ? `${start_hour}:${start_minute}${start_am_pm} - ${end_hour}:${end_minute}${end_am_pm}`
          : ''
      },

      getActiveClass(idx) {
        return idx === this.active ? 'active' : ''
      },

      toggleActive(event) {
        this.active = Number(event.target.value)
      },
    },
    computed: {
      timeRange() {
        const times = this.$props.day.times || []
        const {earliestHour, latestHour} = this.getEarliestAndLatest(times)
        const range = []
        for (let i = earliestHour; i <= latestHour; i++) {
          const correctedHour = i === 0 || i === 24 ? 12 : i
          const hour = i > 12 && i < 24 ? i - 12 : i > 24 ? i - 24 : correctedHour
          const amPm = i >= 12 && i < 24 || i >= 36 ? 'pm' : 'am'
          range.push({
            text: `${hour}:00${amPm}`,
            value: i,
          })
        }
        return range
      },
    },
  }
</script>
