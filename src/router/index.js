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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CalendarMonthDaySelected
  }
]

const router = new VueRouter({
  routes
})

export default router
