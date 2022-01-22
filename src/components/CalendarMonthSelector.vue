<template>
  <div>
    <v-row>
      <v-text-field type="month" lang="en-US" v-model="monthYearSelected" />
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
  computed: {
    dateSelected() {
      return this.$store.getters.dateSelected;
    },
  },
  data: () => ({
    monthYearSelected: "",
  }),
  methods: {
    monthYearSelectedPrevious() {
      this.$store.dispatch(
        "ChangeDateSelected",
        this.$dayjs(this.dateSelected).subtract(1, "month").format("YYYY-MM-DD")
      );
    },
    monthYearSelectedToday() {
      this.$store.dispatch("ChangeDateSelected", this.$store.getters.todayDate);
    },
    monthYearSelectedNext() {
      this.$store.dispatch(
        "ChangeDateSelected",
        this.$dayjs(this.dateSelected).add(1, "month").format("YYYY-MM-DD")
      );
    },
    monthYearSelectedMonthPicker() {
      this.$store.dispatch(
        "ChangeDateSelected",
        this.$dayjs(`${this.monthYearSelected}-01`).format("YYYY-MM-DD")
      );
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