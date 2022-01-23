<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <CalendarMonthYearSelected />
      <CalendarMonthSelector />
    </div>
    <CalendarHeader />
    <ol class="days-grid">
      <CalendarMonthDay v-for="day in days" :day="day" :key="day.date" />
    </ol>
    <div class="text-center" v-if="offline">
      <v-snackbar v-model="snackbar" :color="color">
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    {{offline()}}
  </div>
</template>
<script>
const CalendarHeader = () => import("./CalendarHeader");
const CalendarMonthDay = () => import("./CalendarMonthDay");
const CalendarMonthYearSelected = () =>
  import("./CalendarMonthYearSelected.vue");
const CalendarMonthSelector = () => import("./CalendarMonthSelector.vue");

export default {
  name: "CalendarMonth",
  components: {
    CalendarHeader,
    CalendarMonthDay,
    CalendarMonthYearSelected,
    CalendarMonthSelector,
  },
  data() {
    return {
      listActualDates: [],
      calendar: [],
      snackbar: false,
      text: ``,
      color: ''
    };
  },
  created() {
    this.$store.dispatch("LoadCalendarWithReminder");
    // this.snackbar = true;
    if(this.$route.params && this.$route.params.snackbar){
      this.color = this.$route.params.color
      this.text = this.$route.params.text
      this.snackbar = this.$route.params.snackbar
    }
  },
  computed: {
    selectedDate() {
      return this.$store.getters.dateSelected;
    },
    days() {
      if (!this.$store.getters.forceUpdate) {
        return;
      }

      const { calendar, reminders } =
        this.$store.getters.getCalendarAndSelectedDate;

      calendar.map((x) => {
        x.reminders = reminders.filter((y) => y.date == x.date);
      });

      return [...calendar];
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
          isCurrentMonth:
            this.$dayjs().format("YYYY-MM") === previousDate.format("YYYY-MM"),
          isWeekend:
            previousDate.weekday() === 6 || previousDate.weekday() === 0
              ? true
              : false,
          first: index === 1 ? true : false,
        });
      }
      list.reverse();

      return list;
    },
    selectedMonth() {
      let list = [];
      let currentDate = this.$dayjs(this.selectedDate).set("date", 1);
      for (let index = 0; index < currentDate.daysInMonth(); index++) {
        let selectedDate = currentDate.add(index, "day");
        list.push({
          date: selectedDate.format("YYYY-MM-DD"),
          isSelectedMonth: true,
          isCurrentMonth:
            this.$dayjs().format("YYYY-MM") === selectedDate.format("YYYY-MM"),
          isWeekend:
            selectedDate.weekday() === 6 || selectedDate.weekday() === 0
              ? true
              : false,
        });
      }

      return list;
    },
    nextMonth() {
      let list = [];
      let currentDate = this.$dayjs(this.selectedDate).set(
        "date",
        this.$dayjs(this.selectedDate).daysInMonth()
      );
      for (let index = 1; index < 7 - currentDate.weekday(); index++) {
        let selectedDate = currentDate.add(index, "day");
        list.push({
          date: selectedDate.format("YYYY-MM-DD"),
          isSelectedMonth: false,
          isCurrentMonth:
            this.$dayjs().format("YYYY-MM") === selectedDate.format("YYYY-MM"),
          isWeekend:
            selectedDate.weekday() === 6 || selectedDate.weekday() === 0
              ? true
              : false,
        });
      }

      return list;
    },
  },
  methods: {
    offline(){
      if(this.$store.getters.offline){
        this.snackbar = this.$store.getters.offline
        this.text = 'Offline version'
        this.color = 'red'
      }
    }
  },
  watch: {

  },
};
</script>

<style scoped>
.calendar-month {
  position: relative;
  background-color: black;
  border: solid 2px black;
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
  border-top: solid 2px black;
}

.v-application ul,
.v-application ol {
  padding-left: 0px;
}
</style>