<template>
  <div class="day-of-week">
    <div class="day" v-for="weekday in weekdays" :key="weekday">{{ weekday }}</div>
  </div>
</template>

<script>
const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default {
  name: "CalendarWeekdays",

  computed: {
    weekdays() {
      return WEEKDAYS;
    },
  },
};
</script>

<style scoped>
.day-of-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: lightgreen;
}

.day-of-week > * {
  text-align: center;
}
</style>