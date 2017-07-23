<template lang='jade'>
    #main
        TopBar
        .container
            //- 下面是各个路由链接，在router->index配置好路由后，在这里进行导航
            .left_nav
                button.btn.btn-default(@click='index', v-bind:class='{active: isIndex}') 首页
                button.btn.btn-default(@click='orders', v-bind:class='{active: isActive1}') 订单管理
                button.btn.btn-default(@click='cars', v-bind:class='{active: isActive2}') 车辆管理
                button.btn.btn-default(@click='idcards', v-bind:class='{active: isActive3}') 身份认证管理
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
        background: #4682B4;
        padding-top: 20px;
        border-right: 1px solid gray;

        button {
            background: #4682B4;
            display: block;
            height: 48px;
            width: 100%;
            text-align: center;
            text-decoration: none;
            border-radius: 0;
            cursor: pointer;
            font-size: 16px;
            border: none;
            &:hover {
                color: #ffffff;
            }
        }
    }

    .right_nav {
        margin-left: 200px;
    }
    .active {
        color: #ffffff;
    }
}
</style>


<script>
import TopBar from '@/components/TopBar'

export default {
    data() {
        return {
            isActive1: false,
            isActive2: false,
            isActive3: false,
            isIndex: true
        }
    },
    components: {
        TopBar
    },
    methods: {
        index() {
            this.$router.push({ path: '/' })
            this.isIndex = true
            this.isActive1 = false
            this.isActive2 = false
            this.isActive3 = false
        },
        orders() {
            this.$router.push({ path: '/orders' })
            this.isIndex = false
            this.isActive1 = true
            this.isActive2 = false
            this.isActive3 = false
        },
        cars() {
            this.$router.push({ path: '/cars' })
            this.isIndex = false
            this.isActive1 = false
            this.isActive2 = true
            this.isActive3 = false
        },
        idcards() {
            this.$router.push({ path: '/idcards' })
            this.isIndex = false
            this.isActive1 = false
            this.isActive2 = false
            this.isActive3 = true
        }
    }
}
</script>
