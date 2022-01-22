import Vue from 'vue'
import Vuex from 'vuex'

import reminders from './modules/reminders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    reminders
  }
})
