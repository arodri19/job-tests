import Vue from 'vue'
export default {
    state: {
        reminders: [],
        dateSelected: '',
        uniqueCode: 1,
        actualListCalendar: [],
        forceUpdate: true,
        offline: false
    },
    mutations: {
        setReminders(state, reminders) {
            state.reminders = reminders
        },
        setDateSelected(state, dateSelected) {
            state.dateSelected = dateSelected
        },
        setUniqueCode(state) {
            state.uniqueCode += 1
        },
        setActualListCalendar(state, actualListCalendar) {
            state.actualListCalendar = actualListCalendar
        },
        setForceUpdate(state) {
            state.forceUpdate = !state.forceUpdate
        },
        setOffline(state) {
            state.offline = !state.offline
        }
    },
    actions: {
        createReminder({ commit }, reminder) {
            commit('setReminders', reminder)
            commit('setUniqueCode')
        },
        ChangeDateSelected({ commit }, dateSelected) {
            commit('setDateSelected', dateSelected)
        },
        calendarList({ commit, getters }) {
            commit("setActualListCalendar", [...getters.previousMonth, ...getters.actualMonth, ...getters.nextMonth])
        },
        LoadCalendarWithReminder(context) {
            context.dispatch("calendarList");
            let calendar = context.getters.actualListCalendar
            context.dispatch("loadData", { listDates: calendar, firstDate: calendar[0], lastDate: calendar[calendar.length - 1], vm: Vue.prototype });
            console.log(context)
        },
        setOffline({commit}){
            commit("setOffline")
        }
    },
    getters: {
        reminders(state) {
            return state.reminders
        },
        dateSelected(state) {
            return state.dateSelected
        },
        todayDate() {
            return Vue.prototype.$dayjs().format("YYYY-MM-DD")
        },
        uniqueCode(state) {
            return state.uniqueCode
        },
        actualListCalendar(state) {
            return state.actualListCalendar
        },
        getCalendarAndSelectedDate(state) {
            return { calendar: state.actualListCalendar, reminders: state.reminders }
        },
        previousMonth(state) {
            let list = [];
            let currentDate = Vue.prototype.$dayjs(state.dateSelected).set("date", 1);
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
                    first: index === 1 ? true : false,
                });
            }
            list.reverse();

            return list
        },
        actualMonth(state) {
            let list = [];
            let currentDate = Vue.prototype.$dayjs(state.dateSelected).set("date", 1);
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
                });
            }

            return list;
        },
        nextMonth(state) {
            let list = [];
            let currentDate = Vue.prototype.$dayjs(state.dateSelected).set(
                "date",
                Vue.prototype.$dayjs(state.dateSelected).daysInMonth()
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
                });
            }

            return list;
        },
        forceUpdate(state) {
            return state.forceUpdate
        },
        offline(state) {
            return state.offline
        }
    }
}