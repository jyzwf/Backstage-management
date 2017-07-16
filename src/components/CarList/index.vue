<template lang='jade'>
    #carList
        header
            h1 汽车列表 <button class='btn btn-info pull-right btn-sm' @click='toAdd'>添加</button>
            
        table.table.table-bordered.table-hover
            thead
                tr
                    th 序号
                    th 车名
                    th 图片
                    th 门店价
                    th 线上价
                    td 操作
            
            tbody
                tr(v-for='(c,index) in carList')
                    td {{(nowPage-1)*10+index+1}}
                    td {{c.brand}}
                    td
                        a(:href='c.img',target="_blank")
                            img(:src='c.img')
                        
                    td {{c.store_price}}
                    td {{c.online_price}}
                    td
                        button.btn.btn-info.btn-xs.margin-right-4(@click='toDetail(c)') 详情
                        button.btn.btn-danger.btn-xs(@click='delCar(c,index)',v-if='isLogin') 删除
        
        Pagination
</template>

<script>
import Pagination from '@/components/Pagination'

export default {
    data() {
        return {
            jumpPage: 1
        }
    },
    computed: {
        nowPage() {
            return this.$store.state.carList.nowPage
        },
        carList() {
            return this.$store.state.carList.list
        },
        isLogin() {
            return this.$store.state.user.token
        }
    },
    components: {
        Pagination
    },
    methods: {
        toAdd() {
            this.$store.commit('OPERATE_ADD', {
                isAdd: true
            })
            this.$router.push({ name: 'addCar' })
        },
        toDetail(info) {
            this.$router.push({ name: 'carDetail', params: { carId: info._id } })
        },
        delCar(c, i) {

            if (this.isLogin && confirm('你确定要删除此条信息吗?')) {
                this.$store.dispatch('DELETE_CAR', {
                    id: c._id,
                    index: i
                })
            }
        }
    },
    mounted() {
        this.$store.dispatch('PULL_CAR_LIST', {
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

