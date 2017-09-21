<template lang="jade">
	.parent
		.panel.panel-info.login-panel
			.panel-heading.text-center 登录
			.panel-body
				.form-horizontal
					.form-group
						label.col-sm-2.control-label(for='login-name') 手机号
						.col-sm-10
							input.form-control#login-name(placeholder='请输入手机号',type='number',:value='userInfo.phone',@change='updateMessage($event,"phone")')
					.form-group
						label.col-sm-2.control-label(for='login-psd') 密码
						.col-sm-10
							input.form-control#login-psd(placeholder='请输入密码',type='password',:value='userInfo.password',@change='updateMessage($event,"password")')
					.form-group
						.col-sm-16.col-sm-offset-2
							<el-button type="success" @click='toLogin'>登录</el-button>
							<el-button type="info" @click='toRegister'>注册</el-button>

		<register :dialogFormVisible="showPop"></register>
</template>

<script type="text/javascript">
import register from '@/pages/register'
export default {
	data(){
		return {
			showPop: false
		}
	},
	computed: {
		userInfo() {
			return this.$store.state.user.info
		}
	},
	methods: {
		updateMessage (e, key) {	// 解决vuex与表单不同步问题
			this.$store.commit('UPDATE_MSG', {
				v: e.target.value,
				key,
				type: 'info',
			})
		},
		toLogin () {
			if (!isEmpty(this.userInfo.phone, this, '账号不能为空')) return
			if (!isEmpty(this.userInfo.password, this, '密码不能为空')) return

			if (!isTel(this.userInfo.phone))
				return

			this.$store.dispatch('LOGIN').then(res => {
				this.$router.push({ path: '/' })
			}).catch(err => {
				this.$notify.error({
					message: '账号或密码错误',
					duration: 1000
				})
			})
		},
		toRegister () {
			this.showPop = true
		}
	},
	components: {
		register
	},
	mounted () {
		this.showPop = false
	}
}

function isTel({ num }) {
	// if (!(/^1[3|4|5|7|8]\d{9}$/).test(num)) {	// 判断是否为手机号
	// 	alert('请输入正确的手机号');
	// 	return false
	// }
	return true
}

function isEmpty(num, self, msg) {
	if (num.trim() == '') {
		self.$notify({
			message: msg,
			type: 'warning'
		})
		return false
	}
	return true
}


</script>


<style lang="scss" scoped>
.parent{
	height: 1200px;
	width: 800px;
}

.panel{
	height: 1000px;
}

.form-group{
	margin-top: 50px;
}

.login-panel {
	width: 600px;
	height: 400px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);

	label {
		white-space: nowrap;
	}

	input[type=number] {
		-moz-appearance: textfield;
	}
	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
}
</style>