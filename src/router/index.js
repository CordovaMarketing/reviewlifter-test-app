import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard'
import Customers from '@/components/customers/ViewCustomers'
import Locations from '@/components/locations/Locations'
import AddCustomers from '@/components/customers/AddCustomers'
import SubUsers from '@/components/subusers/SubUsers'
import Billing from '@/components/billing/ChoosePlan'
import Settings from '@/components/settings/Settings'

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
    },
    {
      path: '/addcustomers',
      name: 'AddCustomers',
      component: AddCustomers
    },
    {
      path: '/subusers',
      name: 'SubUsers',
      component: SubUsers
    },
    {
      path: '/plan',
      name: 'ChoosePlan',
      component: Billing
    }
  ]
})
