import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import store from './store'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
