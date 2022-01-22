import Vue from 'vue'
import VueRouter from 'vue-router'
const CalendarMonthDayCreate = () => import('../components/CalendarMonthDayCreate.vue')
const CalendarMonthDayEdit = () => import('../components/CalendarMonthDayEdit.vue')
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
    component: CalendarMonthDayCreate
  },
  {
    path: '/edit',
    name: 'Edit',
    component: CalendarMonthDayEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
