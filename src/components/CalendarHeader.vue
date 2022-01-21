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
  
  padding-bottom: 0px;
  padding-top: 0px;
}

.day-of-week > * {
  text-align: center;
  font-weight: bold;
}

.day{
  border-left: 0px;
  border-bottom: 0px;
  border-top: black 1px solid;
  border-right: black 1px solid;
}
</style>