<template>
  <div>
    <h1>{{ dateSelected }}</h1>
  </div>
</template>

<script>
export default {
  name: "CalendarMonthYearSelected",
  date() {
    return {};
  },
  computed: {
    dateSelected() {
      let selectedDate = this.$store.getters.dateSelected;
      return this.$dayjs(selectedDate).format("MMMM - YYYY");
    },
  },
};
</script>

<style>
</style>