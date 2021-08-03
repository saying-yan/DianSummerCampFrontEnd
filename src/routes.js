import Vue from "vue";
import VueRouter from "vue-router";

import Home from "./views/Home/Home.vue"
import Order from "./views/Order/Order.vue"
import Merchandise from "./views/Mart/Mart.vue"
import OrderSheet from "./views/OrderSheet/OrderSheet.vue"
import Mine from "./views/Mine/Mine.vue"
import Login from "./views/Mine/Login.vue"
import Register from "./views/Mine/Register.vue"

Vue.use(VueRouter);

const router = new VueRouter({
	routes:[
		{
			path:"/", 
			name:"Home",
			component:Home,
			meta: {
				login_required: false
			}
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
			meta: {
				login_required: false
			}
		},
		{
			path:"/OrderSheet", 
			name:"OrderSheet",
			component:OrderSheet,
			meta: {
				login_required: true
			}
		},
		{
			path:"/Mine", 
			name:"Mine",
			component:Mine,
			meta: {
				login_required: false
			},
			children: [
				{
					path: 'login', 
					component:Login,
					meta: {
						login_required: false
					}
				},
				{
					path: 'Register',
					component:Register,
					meta: {
						login_required: false
					}
				}
			]
		}
	]
})

router.beforeEach((to, from, next) => {
	let islogin = localStorage.getItem("islogin");
	islogin = Boolean(Number(islogin));
	console.log('islogin: ' + String(islogin))
	if (to.matched.some(function (item) {
		return item.meta.login_required
	})) {
		console.log('login')
		next('/login')
	} else {
		next()
	}
})


export default router
