<template>
  <div>
    <v-text-field type="month" lang="en-US" @blur="monthYearSelectedMonthPicker"/>
    <div class="calendar-date-selector">
        
      <span @click="monthYearSelectedPrevious" class="pr-2">Previous</span>
      <span @click="monthYearSelectedToday" class="pr-2" >Today</span>
      <span @click="monthYearSelectedNext" class="pr-2">Next</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-parsing-error */
export default {
    props:["actualDate"],
    methods:{
        monthYearSelectedPrevious(){
            let dateSelected = this.$dayjs(this.actualDate).subtract(1, 'month').format("YYYY-MM-DD");
            this.$emit("dateSelected",dateSelected)
        },
        monthYearSelectedToday(){
            let dateSelected = this.$dayjs().format("YYYY-MM-DD");
            this.$emit("dateSelected",dateSelected)
        },
        monthYearSelectedNext(){
            let dateSelected = this.$dayjs(this.actualDate).add(1, 'month').format("YYYY-MM-DD");
            this.$emit("dateSelected",dateSelected)
        },
        monthYearSelectedMonthPicker(value,event){
            console.log(event)
            let dateSelected = this.$dayjs(`${value}-01`).add(1, 'month').format("YYYY-MM-DD");
            this.$emit("dateSelected",dateSelected)
        }
    }
};
</script>

<style>
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