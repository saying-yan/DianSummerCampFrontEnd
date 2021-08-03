<template>
  <div class="my">
  	<img src="../../assets/imges/my/My.png" width="100%">
	<el-button class="head-button" type="primary" round @click="toPage">登录</el-button>
	<el-button class="head-button" type="primary" round @click="logout" 
		v-if="isLogin">退出</el-button>
	<div class="my-info" v-if="isLogin">
		Hey {{ this.$store.state.username }}
	</div>
	
	<router-view></router-view>
  </div>
</template>

<script>
export default {
	name:'Mine',
	data() {
		return {
			isLogin: false
		}
	},
	methods: {
		toPage() {
			this.$router.replace('/Mine/login')
		},
		logout() {
			localStorage.removeItem('islogin')
			localStorage.removeItem('token')
			this.isLogin = false
		}
	},
	mounted() {
		if (localStorage.getItem('islogin') != null) {
			this.isLogin = Boolean(Number(localStorage.getItem('islogin')))
		}
	},
	updated() {
	    if (localStorage.getItem('islogin') != null) {
	    	this.isLogin = Boolean(Number(localStorage.getItem('islogin')))
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
