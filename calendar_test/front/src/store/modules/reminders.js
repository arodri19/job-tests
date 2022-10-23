import Vue from 'vue'
export default {
    state: {
        reminders: [],
        dateSelected: '',
        uniqueCode: 1,
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
            commit('setDateSelectedCalendar', dateSelected)
        },
        LoadCalendarWithReminder(context) {
            context.dispatch("calendarList");
            let calendar = context.getters.actualListCalendar
            context.dispatch("loadData", { listDates: calendar, firstDate: calendar[0], lastDate: calendar[calendar.length - 1], vm: Vue.prototype });
        },
        setOffline({ commit }) {
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
        forceUpdate(state) {
            return state.forceUpdate
        },
        offline(state) {
            return state.offline
        }
    }
}