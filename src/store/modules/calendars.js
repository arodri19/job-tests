import Vue from 'vue'
export default {
    state: {
        actualListCalendar: [],
        dateSelectedCalendar:''
    },
    mutations: {
        setActualListCalendar(state, actualListCalendar) {
            state.actualListCalendar = actualListCalendar
        },
        setDateSelectedCalendar(state, dateSelectedCalendar){
            state.dateSelectedCalendar = dateSelectedCalendar
        }
    },
    actions: {

        calendarList({ commit, getters }) {
            commit("setActualListCalendar", [...getters.previousMonth, ...getters.actualMonth, ...getters.nextMonth])
        },
        dateSelectedCalendar({commit}, dateSelectedCalendar){
            commit("setDateSelectedCalendar", dateSelectedCalendar)
        }
    },
    getters: {
        previousMonth(state) {
            let list = [];
            let currentDate = Vue.prototype.$dayjs(state.dateSelectedCalendar).set("date", 1);
            let index = 1;
            for (index; index <= currentDate.weekday(); index++) {
                let previousDate = currentDate.subtract(index, "day");
                list.push({
                    date: previousDate.format("YYYY-MM-DD"),
                    isSelectedMonth: false,
                    isCurrentMonth:
                        Vue.prototype.$dayjs().format("YYYY-MM") === previousDate.format("YYYY-MM"),
                    isWeekend:
                        previousDate.weekday() === 6 || previousDate.weekday() === 0
                            ? true
                            : false,
                    isToday: Vue.prototype.$dayjs().format("YYYY-MM-DD") === previousDate.format("YYYY-MM-DD")
                });
            }
            list.reverse();

            return list
        },
        actualMonth(state) {
            let list = [];
            let currentDate = Vue.prototype.$dayjs(state.dateSelectedCalendar).set("date", 1);
            for (let index = 0; index < currentDate.daysInMonth(); index++) {
                let selectedDate = currentDate.add(index, "day");
                list.push({
                    date: selectedDate.format("YYYY-MM-DD"),
                    isSelectedMonth: true,
                    isCurrentMonth:
                        Vue.prototype.$dayjs().format("YYYY-MM") === selectedDate.format("YYYY-MM"),
                    isWeekend:
                        selectedDate.weekday() === 6 || selectedDate.weekday() === 0
                            ? true
                            : false,
                    isToday: Vue.prototype.$dayjs().format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD")
                });
            }

            return list;
        },
        nextMonth(state) {
            let list = [];
            let currentDate = Vue.prototype.$dayjs(state.dateSelectedCalendar).set(
                "date",
                Vue.prototype.$dayjs(state.dateSelectedCalendar).daysInMonth()
            );
            for (let index = 1; index < 7 - currentDate.weekday(); index++) {
                let selectedDate = currentDate.add(index, "day");
                list.push({
                    date: selectedDate.format("YYYY-MM-DD"),
                    isSelectedMonth: false,
                    isCurrentMonth:
                        Vue.prototype.$dayjs().format("YYYY-MM") === selectedDate.format("YYYY-MM"),
                    isWeekend:
                        selectedDate.weekday() === 6 || selectedDate.weekday() === 0
                            ? true
                            : false,
                    isToday: Vue.prototype.$dayjs().format("YYYY-MM-DD") === selectedDate.format("YYYY-MM-DD")
                });
            }

            return list;
        },
        actualListCalendar(state) {
            return state.actualListCalendar
        },
    }
}