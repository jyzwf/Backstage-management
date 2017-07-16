<template lang="jade">
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
					.col-sm-10.col-sm-offset-2
						button.btn.btn-success.btn-block(@click='toLogin') 登录

</template>


<style lang="scss" scoped>
.login-panel {
	width: 400px;
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

<script type="text/javascript">

function isTel({ num }) {
	// if (!(/^1[3|4|5|7|8]\d{9}$/).test(num)) {	// 判断是否为手机号
	// 	alert('请输入正确的手机号');
	// 	return false
	// }
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

	computed: {
		userInfo() {
			return this.$store.state.user.info
		},
	},
	methods: {
		updateMessage(e, key) {	// 解决vuex与表单不同步问题
			this.$store.commit('UPDATE_MSG', {
				v: e.target.value,
				key,
				type: 'info',
			})
		},
		toLogin() {	// 登录
			if (!isEmpty({ num: this.userInfo.phone, msg: '手机号不能为空' }))
				return
			if (!isEmpty({ num: this.userInfo.password, msg: '密码不能为空' }))
				return
			if (!isTel({ num: this.userInfo.phone }))
				return

			this.$store.dispatch('LOGIN').then(res => {
				this.$router.push({ path: '/' })
			})
		}
	},
	mounted() {

	}
}
</script>