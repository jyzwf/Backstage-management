import Home from '@/pages/index'

export default{
  wait: {
    path: '/orders',
    component: Home,
    children: [
      {
        path: '',
        component(resolve) {
          require(['@/components/orderList'], resolve)
        }
      }
    ]
  }
}