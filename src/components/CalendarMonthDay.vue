<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-selected': !day.isSelectedMonth,
      'calendar-day--today': isToday,
      'calendar-day--weekend': day.isWeekend
    }"
  >
    <span class="day-text">{{ label }}</span>
  </li>
</template>

<script>
export default {
  name: "CalendarMonthDayItem",

  props: {
    day: {
      type: Object,
      required: true
    },

    isCurrentMonth: {
      type: Boolean,
      default: false
    },

    isToday: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    label() {
      return this.$dayjs(this.day.date).format("D");
    }
  }
};

</script>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.calendar-day > span {
  display: flex;
  justify-content: center;
  align-items: center;
  right: 2px;
  width: var(--day-label-size);
  height: var(--day-label-size);
}

.calendar-day--not-selected {
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}

.calendar-day--weekend{
 background-color: var(--grey-100);
}
</style>