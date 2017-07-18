import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://118.190.45.22/', // 基础url,
  transformRequest: [function (data) {
    return qs.stringify(data)
  }]
})

// request 拦截器
service.interceptors.request.use(config => {
  // config.headers['Content-Type'] = "application/json"
  if (store.state.user.token && store.state.user.info.phone) {
    config.headers['token'] = store.state.user.token
    config.headers['phone'] = store.state.user.info.phone
  }

  return config
}, err => {
  console.log(err)
  Promise.reject(err)
})

// service.interceptors.response.use(res=>{

// })

export default service
