// 顶部栏
<template lang='jade'>
    #topBar
        span.logo 飞源租车
        #adminer
            img#avator.radius(src="../../assets/logo.jpg")
            button.btn.btn-default.btn-xs(@click='logout',v-if='isLogin') 退出
            button.btn.btn-info.btn-xs(@click='login',v-if='!isLogin') 登录
</template>

<style scoped lang='scss'>
#topBar {
    position: fixed;
    display: flex;
    height: 48px;
    padding: 0 2rem;
    left: 0;
    top: 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: gray 1px solid;
    background: #fff;
    z-index: 9;

    * {
        font-size: 1.8rem;
    }
}

#avator {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 2rem;
    border: 1px solid gray;
}
</style>


<script>
import Cookie from 'js-cookie'
export default {
    computed: {
        isLogin() {
            return this.$store.state.user.token
        }
    },
    methods: {
        logout() {
            Cookie.remove('token')
            Cookie.remove('phone')
            this.$store.commit('CLEAR_COOKIE')
            this.$router.push({ name: 'login' })
        },
        login() {
            this.$router.push({ name: 'login' })
        }
    }
}
</script>


