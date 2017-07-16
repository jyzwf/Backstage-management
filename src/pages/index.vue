<template lang='jade'>
    #main
        TopBar
        .container
            //- 下面是各个路由链接，在router->index配置好路由后，在这里进行导航
            .left_nav
                a 首页
                a 第二页
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
        padding-top: 50px;
        border-right: 1px solid gray;

        a {
            display: block;
            height: 48px;
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
    }
}
</script>
