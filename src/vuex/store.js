import Vue from 'vue'
import Vuex from 'vuex'

import Cookies from 'js-cookie'

import fetch from '../axios'
import qs from 'qs'

Vue.use(Vuex)

// 每页数据条数
const PAGE_ITEM = 10;

import {
    OPERATE_PAGE,
    OPERATE_ADD,
    DELETE_CAR,
    LOGIN,
    UPDATE_MSG,
    LOGOUT,
    PULL_CAR_LIST,
    CAR_DETAIL,
    ADD_CAR,
    QINIU_TOKEN,
    UPDATE_CAR_LIST,
    MODIFY_CAR,
    CLEAR_COOKIE,
    MODIFY_IMG
} from './mutation-type'

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
            list: [],     // 存放汽车列表
            nowPage: 1,  // 当前车列表页数
            totalPage: 1     // 列表总页数
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
        }
    },
    mutations: {
        [OPERATE_PAGE](state, { isJump, s, jumpPage }) {
            if (!isJump) {
                s == 1 ? state.carList.nowPage++ : state.carList.nowPage--;
            } else {
                state.carList.nowPage = jumpPage
            }
        },

        [OPERATE_ADD](state, { isAdd, carInfo }) {
            state.addCar.isAdd = isAdd;

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

        [UPDATE_MSG](state, { v, key, type }) {
            if (type == 'info') {
                state.user.info[key] = v
            } else if (type == 'carData') {
                state.carData[key] = v
            }
        },

        [UPDATE_CAR_LIST](state, { list, counter }) {
            state.carList.list = list
            state.carList.totalPage = counter
        },

        [CLEAR_COOKIE](state) {
            state.user.token = '';
            state.user.info.phone = ''
        },

        [MODIFY_IMG](state,address){
            state.carData.img = address;
        }
    },
    actions: {
        [DELETE_CAR]({ state }, { id, index }) {    // 删除汽车
            fetch.delete(`/admin/cars/${id}`).then(res => {
                state.carList.list.splice(index, 1)
                alert('删除成功')
            })
        },

        [LOGIN]({ state }) {      // 登录
            return new Promise((resolve, reject) => {
                fetch.post('admin/login', state.user.info).then(res => {  // 登录
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

        [PULL_CAR_LIST]({ state, commit }, paging) {    // 拉取汽车信息
            commit('OPERATE_PAGE', paging)
            fetch.get(`/admin/cars?count=10&page=${state.carList.nowPage}`).then(res => {
                let d = res.data
                commit('UPDATE_CAR_LIST', {
                    list: d.cars,
                    counter: d.total
                })
            })
        },

        [CAR_DETAIL]({ state, commit }, { _id, isAdd }) {  // 汽车详情
            fetch.get(`/cars/${_id}`).then(res => {
                commit('OPERATE_ADD', {
                    isAdd,
                    carInfo: res.data
                })
            })
        },

        [QINIU_TOKEN]({ state }) {     // 获取七牛token
            return new Promise((resolve, reject) => {
                fetch.get('/qiniu/token').then(res => {
                    resolve(res.data)
                })
            })

        },

        [MODIFY_CAR]({ state }, { _id }) {  // 修改汽车信息
            let temp = {};
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

        [ADD_CAR]({ state }) {
            return new Promise((resolve, reject) => {
                let temp = {};
                for (let i in state.carData) {
                    if (i != '_id') {
                        temp[i] = state.carData[i]
                    }
                }
                fetch.post('/admin/cars', state.carData).then(res => {
                    resolve(res)
                })
            })
        }


    }
}

export default new Vuex.Store(store)