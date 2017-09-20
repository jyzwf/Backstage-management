import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/index'

import orders from './orders'

Vue.use(Router)

const body = {
  routes: [
    {
      path: '/',
      component: Home,
      name: 'index',
      meta: { requiresAuth: true },
      children: [{
        path: '',
        component (resolve) {
          require(['@/components'], resolve)
        }
      }]
    },
    {
      path: '/cars',
      component: Home,
      name: 'cars',
      children: [{
        path: '',
        name: 'carList',
        component (resolve) {
          require(['@/components/CarList'], resolve)
        }
      }, {
        path: 'addCar',
        name: 'addCar',
        meta: { requiresAuth: true },
        component (resolve) {
          require(['@/components/AddCar'], resolve)
        }
      }, {
        path: 'carDetail/:carId',
        name: 'carDetail',
        meta: { requiresAuth: true },
        component (resolve) {
          require(['@/components/AddCar'], resolve)
        }
      }]
    },
    {
      path: '/login',
      name: 'login',
      component (resolve) {
        require(['@/pages/login'], resolve)
      }
    },
    {
      path: '/idcards',
      name: 'idcards',
      meta: { requiresAuth: true },
      component: Home,
      children: [
        {
          path: '',
          component (resolve) {
            require(['@/components/idcardList'], resolve)
          }
        }
      ]
    },
    orders.wait
  ]
}

export default new Router(body)
