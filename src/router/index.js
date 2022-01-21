import Vue from 'vue'
import VueRouter from 'vue-router'
const CalendarMonthDaySelected = () => import('../components/CalendarMonthDaySelected.vue')
const Inicio = () => import('../components/Calendar.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Inicio
  },
  {
    path: '/create',
    name: 'Create',
    component: CalendarMonthDaySelected
  },
  {
    path: '/edit',
    name: 'Edit',
    component: CalendarMonthDaySelected
  }
]

const router = new VueRouter({
  routes
})

export default router
