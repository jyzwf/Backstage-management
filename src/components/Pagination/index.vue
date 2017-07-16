<template lang='jade'>
	nav#pagination
		span.page_nav.margin-right-16(v-show='nowPage>1',@click='togglePage(0)') 上一页
		strong {{nowPage}}
		span.desc / {{totalPage}}
		span.page_nav.margin-right-16.margin-left-16(v-show='nowPage<totalPage',@click='togglePage(1)') 下一页
		input.margin-right-16(type="number",v-model='jumpPage',min=1)
		button.btn.btn-default.btn-sm(@click='jump') 跳转
</template>


<style lang="scss" scoped>
$border:#ddd;
* {
	user-select: none
}

#pagination {
	text-align: right
}

.page_nav {
	cursor: pointer;
	border: 1px solid $border;
	padding: 4px 12px;
	border-radius: 20px;
}

strong {
	font-size: 25px;
	margin-right: 6px
}

.desc {
	font-size: 16px;
	letter-spacing: 2px;
}

input {
	width: 66px;
	font-size: 15px;
	padding: 4px 8px;
	margin-left: 10px;
	outline: none;
	border: 1px solid $border;
	border-radius: 4px;
}
</style>

<script type="text/javascript">

export default {
	// props: {
	// 	allPage: {
	// 		type: Number,
	// 		default: 1
	// 	}
	// },
	data() {
		return {
			jumpPage: 1,
			// nowPage: 1
		}
	},
	computed: {
		nowPage() {
			return this.$store.state.carList.nowPage
		},
		totalPage() {
			return this.$store.state.carList.totalPage
		}
	},
	watch: {
		jumpPage(val) {
			if (val > this.totalPage) {
				this.jumpPage = this.totalPage;
			}
		}
	},
	methods: {
		togglePage(state) {
			this.$store.dispatch('PULL_CAR_LIST', {
				isJump: false,
				s: state
			});
		},
		jump() {
			if (this.jumpPage < 1) {
				this.jumpPage = 1
			}
			this.$store.dispatch('PULL_CAR_LIST', {
				isJump: true,
				jumpPage: this.jumpPage
			});
		}
	}
}
</script>