<template>
	<div class="product-modal" :show="visible">
		<div class="header">
			<img :src="this.product.img" >
		</div>
		<el-scrollbar>
			<div class="title">{{ this.product.name }}</div>
			<span class="description-title">产品描述</span>
			<div class="description-msg">{{ this.product.description }}</div>
		</el-scrollbar>
		<div class="bottom" style="height: 100px;">
			<div class="price">￥{{ product.price }}</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ProductModal',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		product: {
			type:Object,
			default: {}
		}
	},
	mounted() {
		console.log('ok')
	}
}
</script>

<style scoped>
.product-modal .header {
	padding: 5px 6px;
}
</style>
