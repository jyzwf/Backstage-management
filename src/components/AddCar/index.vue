<template lang='jade'>
    #addCar
        header
            h2 {{title}} <router-link class='btn btn-link pull-right btn-sm' :to="{name:'carList'}">返回</router-link>
        form.form-horizontal
            .form-group
                label.col-sm-2.control-label <span class='must'>*</span>品牌
                .col-sm-10
                    input.form-control(:value='carData.brand',@change='updateMessage($event,"brand")')

            .form-group
                label.col-sm-2.control-label 型号
                .col-sm-10
                    input.form-control(:value='carData.model',@change='updateMessage($event,"model")')
            .form-group
                label.col-sm-2.control-label 车型
                .col-sm-10
                    select.form-control(:value='carData.type',@change='updateMessage($event,"type")')
                        option(value='',seleted disabled) 请选择车型
                        option(:value='t',v-for='t in aboutAdd.carType') {{t}}
            .form-group
                label.col-sm-2.control-label 排量
                .col-sm-10
                    input.form-control(:value='carData.output',@change='updateMessage($event,"output")')
            
            .form-group
                label.col-sm-2.control-label 驾驶方式
                .col-sm-10
                    input.form-control(:value='carData.contoller',@change='updateMessage($event,"contoller")')

            .form-group
                label.col-sm-2.control-label 容坐量
                .col-sm-10
                    input.form-control(:value='carData.capacity',@change='updateMessage($event,"capacity")')

            .form-group
                label.col-sm-2.control-label 燃油方式
                .col-sm-10
                    input.form-control(:value='carData.fuel',@change='updateMessage($event,"fuel")')

            .form-group
                label.col-sm-2.control-label 时速
                .col-sm-10
                    input.form-control(:value='carData.speed',@change='updateMessage($event,"speed")')

            .form-group
                label.col-sm-2.control-label 油耗
                .col-sm-10
                    input.form-control(:value='carData.abrasion',@change='updateMessage($event,"abrasion")')

            .form-group
                label.col-sm-2.control-label 邮箱容积
                .col-sm-10
                    input.form-control(:value='carData.oil_box',@change='updateMessage($event,"oil_box")')

            .form-group
                label.col-sm-2.control-label <span class='must'>*</span>总量
                .col-sm-10
                    input.form-control(:value='carData.max',@change='updateMessage($event,"max")')

            .form-group
                label.col-sm-2.control-label <span class='must'>*</span>门店价
                .col-sm-10
                    input.form-control(type='number',:value='carData.store_price',@change='updateMessage($event,"store_price")')

            .form-group
                label.col-sm-2.control-label <span class='must'>*</span>线上价
                .col-sm-10
                    input.form-control(type='number',:value='carData.online_price',@change='updateMessage($event,"online_price")')

            .form-group
                label.col-sm-2.control-label <span class='must'>*</span>图片
                .col-sm-10
                    #car_img
                        #showImg.margin-right-16
                            .mask.size(v-show='carData.img')
                                span 修改
                            img.size(:src='carData.img',v-if='carData.img')
                        a(:href='carData.img',v-show='carData.img',target="_blank") 查看大图

            .form-group
                .col-sm-2.pull-right
                    button.btn.btn-success(type='button',v-if='aboutAdd.isAdd',@click='addCar') 添加
                    button.btn.btn-default(type='button',v-if='!aboutAdd.isAdd',@click='changeCar') 修改


                

</template>


<style scoped lang='scss'>
.size {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.positionCenter {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
}

.must {
    color: red;
    font-size: 14px;
}

#car_img {
    text-align: left;
}

#showImg {
    width: 100px;
    height: 100px;
    position: relative;
    border: 1px solid gray;
    display: inline-block;
    overflow: hidden;
    box-sizing: content-box;
    cursor: pointer;
    user-select: none;

    &:after,
    &:before {
        content: "";
        background: gray;
        @extend .positionCenter
    }

    &:before {
        width: 40px;
        height: 2px;
    }

    &:after {
        width: 2px;
        height: 40px;
    }

    .mask {
        z-index: 100;
        top: -100%;
        transition: .4s linear all;
        background: rgba(0, 0, 0, .5);
        span {
            @extend .positionCenter;
            color: #fff;
            font-size: 20px;
        }
    }

    &:hover {
        .mask {
            top: 0;
        }
    }

    img {
        z-index: 99
    }
}
</style>


<script>

function isTel({ num, msg }) {
    if (!(/^[0-9]+$/).test(num)) {	// 判断是否为数字
        alert(msg);
        return false
    }
    return true
}

function isEmpty({ num, msg }) {	// 判断是否为空
    if (num.trim() == '') {
        alert(msg);
        return false
    }
    return true
}


export default {
    data() {
        return {
            // imgCover: ''
        }
    },
    computed: {
        aboutAdd() {
            return this.$store.state.addCar
        },
        carData() {
            return this.$store.state.carData
        },
        title() {
            return this.$route.name == 'carDetail' ? '车辆信息详情' : '增加车辆'
        },
        isLogin() {
            return this.$store.state.user.token
        }
    },
    methods: {
        addCar() {
            this.$store.dispatch('ADD_CAR').then(res => {
                this.$router.push({ name: 'carList' })
            })
        },
        changeCar() {
            this.$store.dispatch('MODIFY_CAR', {
                _id: this.$route.params.carId
            }).then(res => {
                this.$router.push({ name: 'carList' })
            })
        },
        updateMessage(e, key) {	// 解决vuex与表单不同步问题
            this.$store.commit('UPDATE_MSG', {
                v: e.target.value,
                key,
                type: 'carData'
            })
        },
    },
    mounted() {
        if (!this.isLogin) {
            this.$router.push({ name: 'login' });
            return;
        }
        this.$store.dispatch('CAR_TYPE').then(res => {
            if (this.$route.name == 'carDetail') {

                this.$store.dispatch('CAR_DETAIL', {
                    _id: this.$route.params.carId,
                    isAdd: false
                })
            }
        })

    }
}
</script>
