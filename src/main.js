import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueToast from 'vue-toast-notification';
// Import one of the available themes
import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import './plugins/axios'
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import store from './store/index'
import router from './router'

dayjs.extend(weekday)
dayjs.extend(weekOfYear)
Vue.prototype.$dayjs = dayjs

Vue.config.productionTip = false

Vue.use(VueToast)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
