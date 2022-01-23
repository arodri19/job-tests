import Vue from 'vue'
import Vuex from 'vuex'

import reminders from './modules/reminders'
import actions from './modules/actions'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules:{
    reminders
  }
})
