import Vue from 'vue'
import Vuex from 'vuex'

import Cookies from 'js-cookie'

import fetch from '../axios'
import qs from 'qs'

Vue.use(Vuex)

// 每页数据条数
const PAGE_ITEM = 10

import type from './mutation-type'

const store = {
  state: {
    user: {
      token: Cookies.get('token'),
      info: {
        phone: Cookies.get('phone') ? Cookies.get('phone') : '',
        password: ''
      }
    },
    carList: {
      list: [], // 存放汽车列表
      nowPage: 1, // 当前车列表页数
      totalPage: 1 // 列表总页数
    },
    idcardList: {
      list: [],
      nowPage: 1,
      totalPage: 1
    },
    orderList: {
      list: [],
      nowPage: 1,
      totalPage: 1
    },
    addCar: {
      isAdd: true,
      hasCarType: false,
      carType: ['SUV', '轿车']
    },
    carData: {
      brand: '',
      model: '',
      type: '',
      output: '',
      contoller: '',
      img: '',
      capacity: '',
      max: '',
      store_price: '',
      online_price: '',
      speed: '',
      fuel: '',
      abrasion: '',
      oil_box: ''
    },
    index: {
      totalUser: null,
      orderNum: null,
      orderPrice: null
    }
  },
  mutations: {
    [type.OPERATE_PAGE](state, { isJump, s, jumpPage }) {
      if (!isJump) {
        s == 1 ? state.carList.nowPage++ : state.carList.nowPage--
      } else {
        state.carList.nowPage = jumpPage
      }
    },

    [type.OPERATE_ADD](state, { isAdd, carInfo }) {
      state.addCar.isAdd = isAdd

      if (isAdd) {
        for (let i in state.carData) {
          state.carData[i] = ''
        }
      } else {
        for (let i in state.carData) {
          state.carData[i] = carInfo[i]
        }
      }
    },

    [type.UPDATE_MSG](state, { v, key, type }) {
      if (type == 'info') {
        state.user.info[key] = v
      } else if (type == 'carData') {
        state.carData[key] = v
      }
    },

    [type.UPDATE_CAR_LIST](state, { list, counter }) {
      state.carList.list = list
      state.carList.totalPage = counter
    },
    [type.UPDATE_IDCARD_LIST](state, { list, counter }) {
      state.idcardList.list = list
      state.idcardList.totalPage = counter
    },
    [type.UPDATE_ORDER_LIST](state, { list, counter }) {
      state.orderList.list = list
      state.orderList.totalPage = counter
    },
    [type.CLEAR_COOKIE](state) {
      state.user.token = ''
      state.user.info.phone = ''
    },

    [type.MODIFY_IMG](state, address) {
      state.carData.img = address
    },
    [type.INDEX_ADD](state, params) {
      state.index.totalUser = params.userNum
      state.index.orderNum = params.orderNum
      state.index.orderPrice = params.orderPrice
    }
  },
  actions: {
    [type.DELETE_CAR]({ state }, { id, index }) { // 删除汽车
      fetch.delete(`/admin/cars/${id}`).then(res => {
        state.carList.list.splice(index, 1)
        alert('删除成功')
      })
    },
    [type.PASS_IDCARD]({ state }, { id, index }) { // 通过审核
      fetch.put(`/admin/idcards/${id}/confirm`).then(res => {
        state.idcardList.list.splice(index, 1)
        alert('审核通过')
      })
    },
    [type.FAIL_IDCARD]({ state }, { id, index }) { // 拒绝通过审核
      fetch.put(`/admin/idcards/${id}/confuse`).then(res => {
        state.idcardList.list.splice(index, 1)
        alert('已拒绝')
      })
    },
    [type.PASS_ORDERS]({ state }, { id, index }) { // 通过审核
      fetch.put(`/admin/orders/${id}/confirm`).then(res => {
        state.orderList.list.splice(index, 1)
        alert('确认成功')
      })
    },

    [type.LOGIN]({ state }) { // 登录
      return new Promise((resolve, reject) => {
        fetch.post('admin/login', state.user.info).then(res => { // 登录
          res = res.data
          state.user.token = res.token
          for (let i in res.user) {
            state.user.info[i] = res.user[i]
          }
          Cookies.set('token', res.token, {
            expires: 1 / 24
          })
          Cookies.set('phone', res.user.phone, {
            expires: 1 / 24
          })
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    [type.PULL_IDCARD_LIST]({ state, commit }, paging) { // 拉取汽车信息
      commit('OPERATE_PAGE', paging)
      fetch.get(`/admin/idcards/?type=0`).then(res => {
        let d = res.data
        commit('UPDATE_IDCARD_LIST', {
          list: d.lists,
          counter: d.total
        })
      })
    },

    [type.PULL_ORDER_LIST_WAIT]({ state, commit }, paging) { // 拉取订单信息
      commit('OPERATE_PAGE', paging)
      fetch.get(`/admin/orders/?count=10&page=${state.orderList.nowPage}&type=预约中`).then(res => {
        let d = res.data
        console.log(d)
        commit('UPDATE_ORDER_LIST', {
          list: d.orders,
          counter: d.total
        })
      })
    },
    [type.PULL_ORDER_LIST_PRO]({ state, commit }, paging) { // 拉取订单信息
      commit('OPERATE_PAGE', paging)
      fetch.get(`/admin/orders/?count=10&page=${state.orderList.nowPage}&type=租赁中`).then(res => {
        let d = res.data
        commit('UPDATE_ORDER_LIST', {
          list: d.orders,
          counter: d.total
        })
      })
    },
    [type.PULL_ORDER_LIST_CANCLE]({ state, commit }, paging) { // 拉取订单信息
      commit('OPERATE_PAGE', paging)
      fetch.get(`/admin/orders/?count=10&page=${state.orderList.nowPage}&type=已取消`).then(res => {
        let d = res.data
        commit('UPDATE_ORDER_LIST', {
          list: d.orders,
          counter: d.total
        })
      })
    },

    [type.PULL_CAR_LIST]({ state, commit }, paging) { // 拉取汽车信息
      commit('OPERATE_PAGE', paging)
      fetch.get(`/admin/cars?count=10&page=${state.carList.nowPage}`).then(res => {
        let d = res.data
        console.log(d)
        commit('UPDATE_CAR_LIST', {
          list: d.cars,
          counter: d.total
        })
      })
    },

    [type.CAR_DETAIL]({ state, commit }, { _id, isAdd }) { // 汽车详情
      fetch.get(`/cars/${_id}`).then(res => {
        commit('OPERATE_ADD', {
          isAdd,
          carInfo: res.data
        })
      })
    },

    [type.QINIU_TOKEN]({ state }) { // 获取七牛token
      return new Promise((resolve, reject) => {
        fetch.get('/qiniu/token').then(res => {
          resolve(res.data)
        })
      })
    },

    [type.MODIFY_CAR]({ state }, { _id }) { // 修改汽车信息
      let temp = {}
      for (let i in state.carData) {
        if (i != _id) {
          temp[i] = state.carData[i]
        }
      }
      return new Promise((resolve, reject) => {
        fetch.put(`/admin/cars/${_id}`, state.carData).then(res => {
          resolve(res)
        })
      })
    },

    [type.ADD_CAR]({ state }) {
      return new Promise((resolve, reject) => {
        let temp = {}
        for (let i in state.carData) {
          if (i != '_id') {
            temp[i] = state.carData[i]
          }
        }
        fetch.post('/admin/cars', state.carData).then(res => {
          resolve(res)
        })
      })
    },
    [type.PULL_INDEX]({ state, commit }) {
      fetch.get(`/admin/index`).then(res => {
        commit('INDEX_ADD', res.data)
      })
    }

  }
}

export default new Vuex.Store(store)
