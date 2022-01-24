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
    };
  },
  created() {
    this.$store.dispatch("LoadCalendarWithReminder");
    if(this.$route.params && this.$route.params.text){
      this.$toast.success(this.$route.params.text);
      this.$route.params.text = null
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
  },
  methods: {
    offline(){
      if(this.$store.getters.offline){
        this.$store.dispatch("setOffline")
        this.$toast.error('Offline version');
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