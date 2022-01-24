<template>
  <div>
    <v-row>
      <v-text-field type="month" lang="en-US" v-model="monthYear" />
      <v-btn class="ma-2 pa-1 text-format" @click="monthYearSelectedMonthPicker"
        >change</v-btn
      >
    </v-row>
    <div class="calendar-date-selector">
      <span @click="monthYearSelectedPrevious" class="pr-2">Previous</span>
      <span @click="monthYearSelectedToday" class="pr-2">Today</span>
      <span @click="monthYearSelectedNext" class="pr-2">Next</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-parsing-error */
export default {
  name: "CalendarMonthSelector",
  computed: {
    dateSelected() {
      return this.$store.getters.dateSelected;
    },
    nextMonth() {
      return this.$dayjs(this.dateSelected)
        .add(1, "month")
        .format("YYYY-MM-DD");
    },
    previousMonth() {
      return this.$dayjs(this.dateSelected)
        .subtract(1, "month")
        .format("YYYY-MM-DD");
    },
    monthYearSelected() {
      return this.$dayjs(`${this.monthYear}-01`).format("YYYY-MM-DD");
    },
    todayDate() {
      return this.$store.getters.todayDate;
    },
  },
  data: () => ({
    monthYear: "",
  }),
  methods: {
    monthYearSelectedPrevious() {
      this.dispatchDateSelected(this.previousMonth);
    },
    monthYearSelectedToday() {
      this.dispatchDateSelected(this.todayDate);
    },
    monthYearSelectedNext() {
      this.dispatchDateSelected(this.nextMonth);
    },
    monthYearSelectedMonthPicker() {
      this.dispatchDateSelected(this.monthYearSelected);
    },
    dispatchDateSelected(date) {
      this.$store.dispatch("ChangeDateSelected", date);
      this.$store.dispatch("LoadCalendarWithReminder");
    },
  },
};
</script>

<style>
.text-format {
  font-size: 10px !important;
}
.calendar-date-selector {
  display: flex;
  justify-content: space-between;
  width: 80px;
  color: var(--grey-800);
}

.calendar-date-selector > * {
  cursor: pointer;
  user-select: none;
}
</style>