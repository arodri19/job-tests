<template>
  <div class="calendar-month">
    <div class="calendar-month-header"></div>
    <CalendarHeader />
    <ol class="days-grid">
      <CalendarMonthDay v-for="day in days" :day="day" :key="day.date" />
    </ol>
  </div>
</template>
<script>
const CalendarHeader = () => import("./CalendarHeader");
const CalendarMonthDay = () => import("./CalendarMonthDay");

export default {
  name: "CalendarMonth",
  components: {
    CalendarHeader,
    CalendarMonthDay,
  },
  data() {
    return {
      selectedDate: "2021-09-02",
    };
  },
  computed: {
    days() {
      return [...this.previousMonth, ...this.selectedMonth, ...this.nextMonth];      
    },
    previousMonth() {
      let list = [];
      let currentDate = this.$dayjs(this.selectedDate).set("date", 1);
      let index = 1;
      for (index; index <= currentDate.weekday(); index++) {
        let previousDate = currentDate.subtract(index, "day");
        list.push({
          date: previousDate.format("YYYY-MM-DD"),
          isSelectedMonth: false,
          isCurrentMonth: this.$dayjs().format("YYYY-MM") === previousDate.format("YYYY-MM"),
          isWeekend: previousDate.weekday() === 6 || previousDate.weekday() === 0 ? true : false,
        });
      }
      list.reverse();
      return list;
    },
    selectedMonth() {
      let list = [];
      let currentDate = this.$dayjs(this.selectedDate).set("date", 1);
      for (let index = 0; index < currentDate.daysInMonth(); index++) {
        let selectedDate = currentDate.add(index, 'day');  
        list.push({
          date: selectedDate.format("YYYY-MM-DD"),
          isSelectedMonth: true,
          isCurrentMonth: this.$dayjs().format("YYYY-MM") === selectedDate.format("YYYY-MM"),
          isWeekend: selectedDate.weekday() === 6 || selectedDate.weekday() === 0 ? true : false,
        });
      }
      return list;
    },
    nextMonth() {
      let list = [];
      let currentDate = this.$dayjs(this.selectedDate).set("date", this.$dayjs(this.selectedDate).daysInMonth());
      for (let index = 1; index < 7 - currentDate.weekday(); index++) {
        let selectedDate = currentDate.add(index, 'day');  
        list.push({
          date: selectedDate.format("YYYY-MM-DD"),
          isSelectedMonth: false,
          isCurrentMonth: this.$dayjs().format("YYYY-MM") === selectedDate.format("YYYY-MM"),
          isWeekend: selectedDate.weekday() === 6 || selectedDate.weekday() === 0 ? true : false,
        });
      }
      return list;
    },
  },
  methods: {
    
  },
};
</script>

<style scoped>
.calendar-month {
  position: relative;
  background-color: var(--grey-200);
  border: solid 1px var(--grey-300);
}

.day-of-week {
  color: var(--grey-800);
  font-size: 18px;
  background-color: #fff;
  padding-bottom: 5px;
  padding-top: 10px;
}

.day-of-week,
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
  text-align: center;
}

.days-grid {
  height: 100%;
  position: relative;
  grid-column-gap: var(--grid-gap);
  grid-row-gap: var(--grid-gap);
  border-top: solid 1px var(--grey-200);
}

.v-application ul,
.v-application ol {
  padding-left: 0px;
}
</style>