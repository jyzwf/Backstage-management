<template lang='jade'>
    body
        div.top
            p 后台数据更新于:
            p {{date}}
        div.box
            div
                p 当前总用户数
            p {{index.totalUser}}
        div.box
            div
                p 当前订单总数
            p {{index.orderNum}}
        div.box
            div
                p 订单总价值
            p {{index.orderPrice}}


</template>

<script>
import moment from 'moment'

moment.locale('zh-cn');
export default {
    data() {
        return {
            date: moment().format('YYYY MMMM Do')
        }
    },
    mounted() {
        this.$store.dispatch('PULL_INDEX')
    },
    computed:{
        index(){
            return this.$store.state.index
        }
    }
}
</script>

<style scoped lang="scss">
$border:#ddd;
body {
    margin-top: 40px;
    position: fixed;
    left: 18%;
    .top {
        float: left;
        margin-left: 10px;
        p {
            text-align: left;
            font-size: 18px
        }
    }
    .box {
        float: left;
        margin-left: 40px;
        border: grey 1px solid;
        height: 100px;
        width: 180px;
        margin-top: 170px;
        div {
            height: 40px;
            border-bottom: grey 1px solid;
            p {
                height: 40px;
                line-height: 40px;
                font-size: 14px;
            }
        }
        p {
            height: 60px;
            line-height: 60px;
            font-size: 18px;
        }
    }
}
</style>


