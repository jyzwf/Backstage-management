<template lang='jade'>
    #carList
        header
            h1.text-left 身份认证列表
            
        table.table.table-bordered.table-hover
            thead
                tr
                    th 序号
                    th 姓名
                    th 联系方式
                    th 正面
                    th 反面
                    th 当前状态
                    td 操作
            
            tbody
                tr(v-for='(c,index) in idcardList')
                    td {{(nowPage-1)*10+index+1}}
                    td {{c._userId.realname}}
                    td {{c._userId.phone}}
                    td
                        a(:href='c.img_front',target="_blank")
                            img(:src='c.img_front')
                    td
                        a(:href='c.img_back',target="_blank")
                            img(:src='c.img_back')
                    td(v-if='c.type === 0')
                        {{'待审核'}}
                    td(v-else-if='c.type === 1')
                        {{'通过'}}
                    td(v-else-if='c.type === 2')
                        {{'拒绝'}}
                    td
                        button.btn.btn-info.btn-xs.margin-right-4(@click='pass(c, index)', v-if='isLogin') 通过
                        button.btn.btn-danger.btn-xs(@click='fail(c, index)',v-if='isLogin') 拒绝
        
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
            return this.$store.state.idcardList.nowPage
        },
        idcardList() {
            return this.$store.state.idcardList.list
        },
        isLogin() {
            return this.$store.state.user.token
        }
    },
    methods: {
        pass(c, i) {
            if (this.isLogin && confirm('确认通过?')) {
                this.$store.dispatch('PASS_IDCARD', {
                    id: c._id,
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
        this.$store.dispatch('PULL_IDCARD_LIST', {
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

