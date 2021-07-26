<template>
	<div class="navbar">
		<div class="navbar-box" v-for="page in pages" :key="page.id" @click="choosePage(page.id)">
		<router-link :to="page.url">
			<img :src="$route.path == page.url ? page.imgChosenUrl : page.imgUrl"><br>
			<span>{{page.text}}</span>
		</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "BottomNav",
		data() {
			return {
				chosenPage: 0,
				pages: [
					{
						id: 0,
						name: 'Home',
						text: '首页',
						url: '/',
						imgUrl: require('../assets/imges/BottomNav/home.png'),
						imgChosenUrl: require('../assets/imges/BottomNav/home_selected.png')
					},
					{
						id: 1,
						name: 'Order',
						text: '点单',
						url: '/Order',
						imgUrl: require('../assets/imges/BottomNav/index.png'),
						imgChosenUrl: require('../assets/imges/BottomNav/index_selected.png')
					},
					{
						id: 2,
						name: 'Merchandise',
						text: '百货',
						url: '/Merchandise',
						imgUrl: require('../assets/imges/BottomNav/mart.png'),
						imgChosenUrl: require('../assets/imges/BottomNav/mart_selected.png')
					},
					{
						id: 3,
						name: 'OrderSheet',
						text: '订单',
						url: '/OrderSheet',
						imgUrl: require('../assets/imges/BottomNav/order.png'),
						imgChosenUrl: require('../assets/imges/BottomNav/order_selected.png')
					},
					{
						id: 4,
						name: 'Self',
						text: '我的',
						url: '/Self',
						imgUrl: require('../assets/imges/BottomNav/my.png'),
						imgChosenUrl: require('../assets/imges/BottomNav/my_selected.png')
					}
				]
			}
		},
		methods: {
			choosePage: function(id) {
				this.chosenPage = id
			}
		}
	}
</script>

<style scoped>
	.navbar {
		position: fixed;
		background: #f5f5f5;
		height: 10vh;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		z-index: 999;
	}

	.navbar-box {
		width: 20vw;
		text-align: center;
	}

	.navbar-box img {
		margin-top: 5px;
		height: 60%;
		margin-bottom: -8px;
	}

	.navbar-box span {
		text-decoration: none;
		position: relative;
		font-size: 12px;
		color: #272822;
	}
	
	.navbar-box a {
		text-decoration: none;
	}
</style>
