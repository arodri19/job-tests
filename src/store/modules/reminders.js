import Vue from 'vue'
export default {
    state: {
        reminders: [],
        dateSelected: '',
        uniqueCode: 1
    },
    mutations:{
        setReminders(state,reminders){
            state.reminders = reminders
        },
        setDateSelected(state, dateSelected){
            state.dateSelected = dateSelected
        },
        setUniqueCode(state){
            state.uniqueCode += 1
        },
    },
    actions: {
        // eslint-disable-next-line
        createReminder({commit}, reminder){
            commit('setReminders',reminder)
            commit('setUniqueCode')
        },
        ChangeDateSelected({commit}, dateSelected){
            commit('setDateSelected', dateSelected)
        },
    },
    getters: {
        reminders(state){
            return state.reminders
        },
        dateSelected(state){
            return state.dateSelected
        },
        todayDate(){
            return Vue.prototype.$dayjs().format("YYYY-MM-DD")
        },
        uniqueCode(state){
            return state.uniqueCode
        }
    }
}