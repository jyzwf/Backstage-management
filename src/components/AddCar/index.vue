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
                    input.form-control(:value='carData.type',@change='updateMessage($event,"type")')

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
                        #showImg.margin-right-16(:class='{modifyImg:carData.img}')
                            #pickfiles.mask.size
                                span(v-show='carData.img') 修改
                            img.size(:src='carData.img',v-if='carData.img')
                        a(:href='carData.img',v-show='carData.img',target="_blank") 查看大图

            .form-group
                .col-sm-2.pull-right
                    button.btn.btn-success(type='button',v-if='aboutAdd.isAdd',@click='addCar') 添加
                    button.btn.btn-default(type='button',v-if='!aboutAdd.isAdd',@click='changeCar') 修改


                

</template>

<style scoped lang='scss'>
@import './addCar'
</style>


<script>

function isTel({ num, msg }) {
    if (!(/^[0-9]+$/).test(num)) {	// 判断是否为数字
        alert(msg);
        return false
    }
    return true
}

function isEmpty(num, msg) {	// 判断是否为空
    if ((/^\s*$/).test(num)) {
        alert(msg);
        return true
    }
    return false
}

export default {
    data() {
        return {
            uploader: null,
            uploaderToken: ''
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
            if (this.validTest()) {
                this.$store.dispatch('ADD_CAR').then(res => {
                    this.$router.push({ name: 'carList' })
                })
            }

        },
        changeCar() {
            if (this.validTest()) {
                this.$store.dispatch('MODIFY_CAR', {
                    _id: this.$route.params.carId
                }).then(res => {
                    this.$router.push({ name: 'carList' })
                })
            }
        },

        validTest() {
            let testAry = [
                { key: this.carData.brand, msg: '品牌不能为空' },
                { key: this.carData.max, msg: '总量不能为空' },
                { key: this.carData.store_price, msg: '门店价不能为空' },
                { key: this.carData.online_price, msg: '线上价为空' },
                { key: this.carData.img, msg: '图片不能为空' },
            ]
            for (let i = 0; i < testAry.length; i++) {
                if (isEmpty(testAry[i].key, testAry[i].msg)) {
                    return false;
                }
            }

            return true
        },
        updateMessage(e, key) {	// 解决vuex与表单不同步问题
            this.$store.commit('UPDATE_MSG', {
                v: e.target.value,
                key,
                type: 'carData'
            })
        },
        uploader_img() {			//七牛上传图片配置
            let _this = this;
            this.uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',
                browse_button: 'pickfiles',
                uptoken: _this.uploaderToken,
                domain: 'qiniu.xtongtong.com',
                get_new_uptoken: false,
                container: 'showImg',
                max_file_size: '100mb',
                flash_swf_url: 'http://cdn.staticfile.org/Plupload/2.1.1/Moxie.swf',
                max_retries: 3,
                dragdrop: false,
                chunk_size: '4mb',
                auto_start: true,
                unique_names: false,
                save_key: false,
                multi_selection: false,
                init: {
                    'FileUploaded': function (up, file, info) {

                        let formatInfo = JSON.parse(info);
                        // // _this.uploaderFiles.push(formatInfo.key);
                        // // 插入图片
                        // _this.noticeWords = ['上', '传', '成', '功'];
                        // _this.showNotice = false;
                        // _this.insertImg(formatInfo.key);

                        _this.$store.commit('MODIFY_IMG', `http://ordbfbebw.bkt.clouddn.com/${formatInfo.key}`)


                    },
                    'UploadComplete': function () {
                    }
                }
            });
        },
    },
    mounted() {
        if (!this.isLogin) {
            this.$router.push({ name: 'login' });
            return;
        }

        // 
        this.$store.dispatch('QINIU_TOKEN').then(res => {
            this.uploaderToken = res;
            this.uploader_img();

        })

        if (this.$route.name == 'carDetail') {

            this.$store.dispatch('CAR_DETAIL', {
                _id: this.$route.params.carId,
                isAdd: false
            })
        }

    }
}
</script>
