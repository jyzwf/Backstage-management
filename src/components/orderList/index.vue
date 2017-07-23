<template lang='jade'>
    #carList
        header
            h1 订单列表
        
        ul.nav.nav-pills
            li.active(role='presentation')
                a(href='#') 预约中
            |   
            li(role='presentation')
                a(href='#') 进行中
            |   
            li(role='presentation')
                a(href='#') 已取消


            
        table.table.table-bordered.table-hover
            thead
                tr
                    th 序号
                    th 真实姓名
                    th 联系方式
                    th 车型
                    th 是否实名
                    th 金额
                    th 当前状态
                    td 操作
            
            tbody
                tr(v-for='(order,index) in orderList')
                    td {{(nowPage - 1) * 10 + index + 1}}
                    td {{order._userId.realname}}
                    td {{order._userId.phone}}
                    td {{order._carId.brand}}{{order._carId.model}}
                    td(v-if='order._userId.isChecked === true')
                        {{'已实名'}}
                    td(v-else)
                        {{'未实名'}}
                    td {{order.price}}
                    td {{order.type}}
                    td
                        button.btn.btn-info.btn-xs.margin-right-4(@click='pass(order, index)', v-if='isLogin') 确认订单
        
</template>

<script>
export default {
    data() {
        return {
            jumpPage: 1
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
            this.$router.push({ name: 'carDetail', params: { carId: info._id } })
        },
        fail(c, i) {
            if (this.isLogin && confirm('确认拒绝?')) {
                this.$store.dispatch('FAIL_IDCARD', {
                    id: c._id,
                    index: i
                })
            }
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
</style>

