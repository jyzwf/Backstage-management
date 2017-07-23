<template lang='jade'>
    #main
        TopBar
        .container
            //- 下面是各个路由链接，在router->index配置好路由后，在这里进行导航
            .left_nav
                button.btn.btn-default.btn-xs(@click='orders') 订单管理
                button.btn.btn-default.btn-xs(@click='cars') 车辆管理
                button.btn.btn-default.btn-xs(@click='idcards') 身份认证管理
            .right_nav
                router-view
</template>

<style scoped lang='scss'>
.container {
    margin-bottom: 100px;

    .left_nav {
        position: fixed;
        left: 0;
        width: 200px;
        bottom: 0;
        top: 40px;
        padding-top: 20px;
        border-right: 1px solid gray;

        button {
            display: block;
            height: 48px;
            width: 100%;
            line-height: 48px;
            text-align: center;
            text-decoration: none;
            cursor: pointer;
            font-size: 14px;
            border-bottom: 1px solid gray;

            &:first-child {
                border-top: 1px solid gray;
            }

            &:hover {
                background: #5bc0de;
                color: #fff;
            }
        }
    }

    .right_nav {
        margin-left: 200px;
    }
}
</style>


<script>
import TopBar from '@/components/TopBar'

export default {
    components: {
        TopBar
    },
    methods: {
        orders(){
            this.$router.push({path: '/orders'})
        },
        cars() {
            this.$router.push({ path: '/' })
        },
        idcards() {
            this.$router.push({ path: '/idcards' })
        }
    }
}
</script>
