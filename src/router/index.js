import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Customers from '@/components/Customers'
import Locations from '@/components/Locations'
import Settings from '@/components/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/locations',
      name: 'Locations',
      component: Locations
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
