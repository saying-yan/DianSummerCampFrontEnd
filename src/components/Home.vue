<template>
	<div id="Home">
		<Carousel :sliders="sliders"></Carousel>
		<div class="home-mid-card">
			<div class="home-card" @click="toOrderPage">
				<img src="../assets/imges/home/home_icon_ziqu1.png"><br>
				<span class="card-title">门店自取</span><br>
				<span class="normal-text">下单免排队</span><br>
			</div>
			<div class="line"></div>
			<div class="home-card">
				<img src="../assets/imges/home/home_icon_waimai1.png"><br>
				<span class="card-title">外卖</span><br>
				<span class="normal-text">无接触派送，送喜到家</span><br>
			</div><br>
			<div class="line2"></div>
			<div class="card-bottom">
				<img src="../assets/imges/home/home_icon_qiye1.png" >
				<span class="left-text">好友拼单</span>
				<span class="right-text">拼单喝茶，分账更方便</span>
			</div>
		</div>
		
		<div class="cards">
			aaa
		</div>
	</div>
</template>

<script>
import Carousel from "./Carousel.vue"

export default {
	name: 'Home',
	data() {
		return {
			sliders: [
				require("../assets/imges/home/Carousel/1e8d24fc02f8457d8c819ee57a92e4d4.jpg"),
				require("../assets/imges/home/Carousel/3fae323602564363ae53b649d14b3df2.jpg"),
				require("../assets/imges/home/Carousel/9ab5ee6d6c1545429f968cbaa780f01b.jpg"),
				require("../assets/imges/home/Carousel/62e4ac115dfd44d3ac04315e5e32f44e.jpg"),
				require("../assets/imges/home/Carousel/f466315ce95e4f6cba0525df7b1eabb4.png")
			]
		}
	},
	methods:{
		toOrderPage() {
			this.$router.push('/Order')
		}
	},
	components: {
		Carousel,
	}
}
</script>

<style scoped>
	#Carousel{
	  left: 0;
	  width: 100vw;
	  height: 35vh;
	  text-align: center;
	}
	.home-mid-card {
		/* border: 1px solid #000000; */
		border-radius: 5px;
		margin-left: 5vw;
		margin-top: -10px;
		width: 90vw;
		height: 30vh;
		background-color: #fefefe;
		position: absolute;
		box-shadow:2px 2px 10px #909090;
	}
	.home-card {
		width: 49%;
		float:left;
	}
	.home-mid-card .line {
		position: relative;
		background:#000000;
		opacity: 0.1;
		width: 1px;
		height: 60%;
		float:left;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.home-mid-card .line2 {
		float: left;
		background: #000000;
		opacity: 0.1;
		height: 0.8px;
		width: 100%;
		margin-top: 0;
	}
	.home-card img {
		margin-top: 13%;
		width: 40%;
		margin-bottom: -5px;
	}
	.home-card .card-title{
		font-size: 15px;
		font-weight: 1000;
	}
	.home-card .normal-text{
		display: inline-block;
		font-size: 8px;
		transform: scale(0.85);
		font-weight: 350;
	}
	.card-bottom {
		margin-top: 10px;
		width: 100%;
		float: left;
		bottom: 0;
		height: 16%
	}
	.card-bottom * {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	.card-bottom img {
		float: left;
		margin-left: 18px;
		margin-right: 5px;
		height: 100%;
	}
	.card-bottom .left-text {
		float: left;
		display: inline-block;
		font-size: 14px;
	}
	.card-bottom .right-text {
		margin-right: 10px;
		float: right;
		font-size: 8px;
	}
	
	.cards {
		position: absolute;
		top: 65vh;
	}
</style>
