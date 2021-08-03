<template>
  <div class="order-container">
	<div class="header">
		<!-- 搜索栏 begin -->
		<div class="search-box">
			<div class="search-input">
				<span>搜索</span>
			</div>
		</div>
		<!-- 搜索栏 end -->
		<div class="center">
			<div class="store">
				<div class="title">
					<i class="el-icon-star-off left-icon"></i>
					<div class="address">中心城店</div>
					<i class="el-icon-arrow-right right-icon"></i>
				</div>
				<!-- 选择自取/外卖 button begin -->
				<div class="switch-button">
					<button type="default" class="button" plain 
						:class="{active: orderType == 'takein'}">自取</button>
					<button type="default" class="button" plain
						:class="{active: orderType == 'takeout'}">外卖</button>
				</div>
				<!-- 选择自取/外卖 button end -->
			</div>
			<div class="location">
				距离您4.1km
			</div>
		</div>
	</div>
	
	<div class="main">
		<!-- 左侧菜单 begin -->
		<div class="menu-bar">
			<div class="wrapper">
				<el-scrollbar style="height:70vh;">
				<div class="menu-item" 
					@click="handleMenuSelected(category.id)"
					:class="{active: currentCategoryId == category.id}"
					v-for="(category, index) in categories"
					:key="index">
					<div class="menu-item-card">
						<img :src="currentCategoryId == category.id ? category.img_selected : category.img" v-show="category.img != ''"></img>
						<div class="title">
							{{ category.name }}
						</div>
					</div>
				</div>
				</el-scrollbar>
			</div>
		</div>
		<!-- 左侧菜单 end -->
		<!-- 右侧商品列表 begin -->
		<div class="product-section">
			<div class="wrapper">
				<!-- 两个轮播图 begin -->
				<el-scrollbar style="height: 70vh;" ref="scrollbar">
				<Carousel :sliders="ads1" widthString=-65></Carousel>
				<Carousel :sliders="ads2" widthString=-65></Carousel>
				<!-- 两个轮播图 end -->
				<div class="products-list"
					v-for="(category, index) in categories"
					:key="index"
					:id="`category-${category.id}`">
					<div class="category-name">{{ category.name }}</div>
					<div class="products">
						<div class="product" v-for="(product, index2) in category.product"
							:key="index2" @click="showProductDetailModal(product)"
							:id="`product-${product.id}`">
							<img :src="product.img" mode="widthFix" class="product-image">
							<div class="product-content">
								<div class="product-name">{{ product.name }}</div>
								<div class="product-intro">{{ product.intro }}</div>
								<div class="product-price">
									<span>￥{{ product.price }}</span>
									<i class="el-icon-circle-plus"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				</el-scrollbar>
			<!-- 商品详情 modal begin -->
			<ProductModal :product="product"
						:visible="productModalVisible" 
						@cancel="closeProductDetailModal" 
						@add-to-cart="handleAddToCartInModal" 
			></ProductModal>
			<!-- 商品详情 modal end -->
			<!-- 购物车栏 begin -->
			<!-- 购物车栏 end -->
			</div>
		</div>
	</div>
	
  </div>
</template>

<script>
import Carousel from "@/components/Carousel"
import ProductModal from "./components/ProductModal"

export default {
	name: 'Order',
	components: {
		Carousel,
		ProductModal
	},
	data() {
		return {
			categories: [],
			currentCategoryId: 0,
			productsScrollTop: 0,
			orderType: 'takein',
			ads1: [
				"https://go.cdn.heytea.com/storage/ad/2020/05/28/752a5519e89541bd8417614c599cf8c3.jpg",
				"https://go.cdn.heytea.com/storage/ad/2020/05/24/38b7f686cf10449c85b0f5489d5d958e.jpg",
				"https://go.cdn.heytea.com/storage/ad/2020/05/21/2315beb5105944e8b795c5c0084ec99f.jpg",
				"https://go.cdn.heytea.com/storage/ad/2020/05/21/b88c6780a73249b0b0166784917a5046.jpg"
			],
			ads2: [
				"https://go.cdn.heytea.com/storage/ad/2020/05/21/acfc6504f3074cf6b730f516adc558f6.jpg",
				"https://go.cdn.heytea.com/storage/ad/2020/04/26/2373600789c64752b2415293877ead40.jpg",
				"https://go.cdn.heytea.com/storage/ad/2020/04/22/515df8c726e740089ae4c55582b4ce09.jpg",
				"https://go.cdn.heytea.com/storage/ad/2020/04/14/d0e51cb22c0a437293c0e6a879b59c7d.jpg"
			],
			productsScrollTop: 0,
			product: {},
			productModalVisible: false,
		}
	},
	methods: {
		setTop() {
			this.categories.forEach(item => {
				item.top = document.getElementById(`category-${item.id}`).offsetTop
			})
		},
		handleMenuSelected(id) {
			let scrollTop = document.getElementById(`category-${id}`).offsetTop
			this.$refs.scrollbar.wrap.scrollTop = scrollTop
		},
		handleScroll() {
			if (typeof(this.$refs.scrollbar) == "undefined") return;
			let scrollTop = Math.round(this.$refs.scrollbar.wrap.scrollTop)
			for (var i = this.categories.length - 1; i >= 0; i--) {
				var category = this.categories[i]
				if (category.top <= scrollTop) {
					this.currentCategoryId = category.id
					// console.log(`active: ${category.name}`)
					break;
				}
			}
		},
		showProductDetailModal(product) {
			console.log(product)
			this.product = product
			this.productModalVisible = true
		},
		handleAddToCartInModal(product) {
			this.handleAddToCart(product)
			this.closeProductDetailModal()
		},
		closeProductDetailModal() {
			this.productModalVisible = false
			this.product = {}
		},
	},
	mounted() {
		this.$store.dispatch('getProductListInfo')
			.then(res => {
				this.categories = res
				console.log(res)
				this.currentCategoryId = this.categories.length && this.categories[0].id
				this.$nextTick(() => this.setTop())
				window.addEventListener('scroll', this.handleScroll, true)
				this.product = this.categories[0].product[0]
			})
	},
	
}
</script>
<style>
.order-container {
	background-color: $bg-color-white;
	display: flex;
	flex-direction: column;
}
.search-box {
	height: 40px;
	padding: 8px 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.search-input {
	height: 30px;
	width: 100%;
	background-color: #f7f7f7;
	font-size: $font-size-base;
	border-radius: 50rem !important;
	display: flex;
	justify-content: center;
	align-items: center;
}

.center {
	height: 50px;
	padding: 0 30px 10px;
	display: flex;
	flex-direction: column;
}
.store {
	display: flex;
	align-items: center;
}
.store .title {
	flex: 1;
	display: flex;
	font-size: 18px;
	color: #343434;
	font-weight: bold;
	overflow: hidden;
}
.store .address {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.store .left-icon {
	flex-shrink: 0;
	margin: 4px;
	width: 16px;
}
.store .right-icon {
	flex-shrink: 0;
	margin: 4px;
	width: 16px;
}
.store .switch-button {
	display: flex;
	align-items: stretch;
	border-radius: 50rem !important;
	padding: 4px;
	border: 1px solid #000000;
}
.store .switch-button .button {
	height: 100%;
	width: 50%;
	border-radius: 50rem !important;
	border: 0 !important;
	font-size: 12px !important;
}
.store .switch-button .active {
	background-color: #343434;
	color: #ffffff !important;
	transition: all 0.3s;
}
.header .location {
	display: flex;
	font-size: 13px;
	color: #393939
}
.main {
	flex: 1;
	display: flex;
	overflow: hidden;
}
.main .menu-bar {
	width: 30vw;
	background-color: #f6f6f6;
}
.menu-bar wrapper {
	height: auto;
}
.menu-bar .menu-item {
	padding: 10px 0;
	margin: 0 auto;
	display: flex
}

.menu-item img {
	width: 15px;
	height: 15px;
}
.menu-item-card {
	display: flex;
	margin: 0 auto;
}
.menu-bar .active {
	background-color: #ffffff;
	font-weight: 500 !important;
	border-left: 2px solid #ffaa00;
}

.product-section {
	flex: 1;
	width: 70vw;
}
.product-section #Carousel{
  left: 0;
  width: 65vw;
  height: 23vh;
  text-align: center;
}
.product-section #Carousel .container img {
	width: 65vw;
	height: 23vh;
}
#Carousel {
	margin: 0 auto 10px;
}

.product-section {
	flex: 1;
}
.product-section .wrapper{
	padding: 0 5px;
}
.products-list .category-name{
	padding: 5px 0;
	font-size: 8px;
	color: #6a6a6a;
	text-align:left;
}
.products-list .products {
	display: flex;
	flex-direction: column;
}
.products-list .product {
	display: flex;
	margin-bottom: 30px;
	align-items: center;
	text-align: left;
}
.products-list .product img {
	width: 100px;
	height: 80px;
	object-fit: cover;
}
.products-list .product .product-name {
	font-size: 15px;
	color: #000000;
}
.products-list .product .product-intro {
	width: 120%;
	font-size: 6px;
	color: #000000;
	-webkit-transform-origin-x: 0;
	-webkit-transform: scale(0.8)
}
.products-list .product-price {
	font-weight: bold;
	align-items: center;
}
.products-list .product-price i{
	height: 1px;
}
</style>
