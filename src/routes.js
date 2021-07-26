import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./components/Home.vue"
import Order from "./components/Order.vue"
import Merchandise from "./components/Merchandise.vue"
import OrderSheet from "./components/OrderSheet.vue"
import Self from "./components/Self.vue"

Vue.use(VueRouter);

const router = new VueRouter({
	routes:[
		{
			path:"/", 
			name:"Home",
			component:Home,
		},
		{
			path:"/Order", 
			name:"Order",
			component:Order,
		},
		{
			path:"/Merchandise", 
			name:"Merchandise",
			component:Merchandise,
		},
		{
			path:"/OrderSheet", 
			name:"OrderSheet",
			component:OrderSheet,
		},
		{
			path:"/Self", 
			name:"Self",
			component:Self,
		}
	]
})

export default router
