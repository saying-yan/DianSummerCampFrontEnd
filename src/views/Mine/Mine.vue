<template>
  <div class="my">
  	<img src="../../assets/imges/my/My.png" width="100%">
	<el-button class="head-button" type="primary" round @click="toPage">登录</el-button>
	<div>
		Hey {{ $store.state.username }}
	</div>
	
	<router-view></router-view>
  </div>
</template>

<script>
export default {
	name:'Mine',
	data() {
		return {
		}
	},
	methods: {
		toPage() {
			this.$router.replace('/Mine/login')
		}
	}
}
</script>

<style>
	.head-button {
		position: absolute;
		top: 10px;
		right: 10px;
		width: 20vw;
	}
</style>
