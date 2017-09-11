<template lang='jade'>
    #carList
        header
            h1.text-left 订单列表
        
        ul#select.nav.nav-pills
            li(role='presentation', v-bind:class='{active: isActive1}')
                a(@click='get_wait()', v-if='isLogin') 预约中
            |   
            li(role='presentation', v-bind:class='{active: isActive2}')
                a(@click='get_pro()', v-if='isLogin') 进行中
            |   
            li(role='presentation', v-bind:class='{active: isActive3}')
                a(@click='get_cancle()', v-if='isLogin') 已取消


            
        table.table.table-bordered.table-hover
            thead
                tr
                    th 序号
                    th 用户名                    
                    th 真实姓名
                    th 联系方式
                    th 车型
                    th 是否实名
                    th 金额
                    th 是否支付
                    th 下单时间
                    th 当前状态
                    td(v-if = 'isShow') 操作
            
            tbody
                tr(v-for='(order,index) in orderList')
                    td {{(nowPage - 1) * 10 + index + 1}}
                    td(v-if= 'order._userId')
                      {{order._userId.nickname}}
                    td(v-else)
                        {{''}}
                    td(v-if= 'order._userId')
                      {{order._userId.realname}}
                    td(v-else)
                        {{''}}
                    td(v-if= 'order._userId')
                      {{order._userId.phone}}
                    td(v-else)
                        {{''}}
                    td {{order._carId.brand}}{{order._carId.model}}
                    td(v-if='order._userId && order._userId.isChecked === true')
                        {{'已实名'}}
                    td(v-else)
                        {{'未实名'}}
                    td {{order.price}}
                    td(v-if='order.isPayed === true')
                        {{'已支付'}}
                    td(v-else)
                        {{'未支付'}}
                    td {{date_format(order.created_time)}}
                    td {{order.type}}
                    div.btn(v-if='isShow')
                        td
                            button.btn.btn-info.btn-xs.margin-right-4(@click='pass(order, index)', v-if='isLogin') 确认订单
        
</template>

<script>
import moment from 'moment'
moment.locale('zh-cn')
export default {
    data() {
        return {
            jumpPage: 1,
            isActive1: true,
            isActive2: false,
            isActive3: false,
            isShow: true
        }
    },
    computed: {
        nowPage() {
            return this.$store.state.orderList.nowPage
        },
        orderList() {
            return this.$store.state.orderList.list
        },
        isLogin() {
            return this.$store.state.user.token
        }
    },
    methods: {
        pass(order, i) {
            if (this.isLogin && confirm('确认订单?')) {
                this.$store.dispatch('PASS_ORDERS', {
                    id: order._id,
                    index: i
                })
            }
        },
        fail(c, i) {
            if (this.isLogin && confirm('确认拒绝?')) {
                this.$store.dispatch('FAIL_IDCARD', {
                    id: c._id,
                    index: i
                })
            }
        },
        get_pro() {
            this.$store.dispatch('PULL_ORDER_LIST_PRO', {
                isJump: true,
                jumpPage: 1
            })
            this.isActive1 = false
            this.isActive2 = true
            this.isActive3 = false
            this.isShow = false
        },
        get_wait() {
            this.$store.dispatch('PULL_ORDER_LIST_WAIT', {
                isJump: true,
                jumpPage: 1
            })
            this.isActive1 = true
            this.isActive2 = false
            this.isActive3 = false
            this.isShow = true
        },
        get_cancle() {
            this.$store.dispatch('PULL_ORDER_LIST_CANCLE', {
                isJump: true,
                jumpPage: 1
            })
            this.isActive1 = false
            this.isActive2 = false
            this.isActive3 = true
            this.isShow = false
        },
        date_format(params) {
            return moment(params).format('YYYY-MM-D hh:mm:ss')
        }
    },
    mounted() {
        this.$store.dispatch('PULL_ORDER_LIST_WAIT', {
            isJump: true,
            jumpPage: 1
        })
    }
}
</script>


<style scoped lang='scss'>
$border:#ddd;

img {
    width: 24px;
    height: 24px;
}

a {
    display: inline-block;
    width: 100%;
    height: 100%;
}

h1 {
    margin-bottom: 35px;
}

#select {
    margin-bottom: 20px
}
</style>

