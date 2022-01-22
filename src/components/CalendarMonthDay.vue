<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-selected': !day.isSelectedMonth,
      'calendar-day--today': isToday,
      'calendar-day--weekend': day.isWeekend,
    }"
  >
    <v-col cols="12">
      <span class="day-text" @click="$router.push({ name: 'Create', query: {date: day.date} })">{{
        label
      }}</span>
    </v-col>

    <v-col cols="12" class="pa-1" v-for="reminder in day.reminders" :key="reminder.title">
      <div class="chip" @click="$router.push({name: 'Edit', params: {reminder}})">
        <div class="chip-content">{{reminder.title}}</div>
        <div class="chip-head">C</div>
      </div>
    </v-col>
  </li>
</template>

<script>
export default {
  name: "CalendarMonthDayItem",

  props: {
    day: {
      type: Object,
      required: true,
    },

    isCurrentMonth: {
      type: Boolean,
      default: false,
    },

    isToday: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    label() {
      return this.$dayjs(this.day.date).format("D");
    },
  },
};
</script>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 14px;
  background-color: #fff;
  color: black;
  padding: 5px;
  /* display: flex; */
  justify-content: center;
  /* align-items: center; */
}

.calendar-day > span {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  font-weight: bold;
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

.calendar-day--weekend {
  background-color: var(--grey-100);
}
.day-text{
  cursor: pointer;
}

.chip {
  display: inline-flex;
  flex-direction: row;
  background-color: #e5e5e5;
  border: none;
  cursor: default;
  height: 18px;
  outline: none;
  padding: 0;
  font-size: 14px;
  font-color: #333333;
  font-family: "Open Sans", sans-serif;
  white-space: nowrap;
  align-items: center;
  border-radius: 16px;
  vertical-align: middle;
  text-decoration: none;
  justify-content: center;
  cursor: pointer;
}
.chip-head {
  display: flex;
  position: relative;
  overflow: hidden;
  background-color: #32c5d2;
  font-size: 1.25rem;
  flex-shrink: 0;
  align-items: center;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
  width: 18px;
  color: #fff;
  height: 18px;
  font-size: 12px;
  margin-right: -4px;
}
</style>