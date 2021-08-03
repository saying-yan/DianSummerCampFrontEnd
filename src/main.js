import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import store from './store/index.js'
import './plugins/element.js'


Vue.config.productionTip = false


new Vue({
	router: router,
	store: store,
	render: h  => h(App),
}).$mount('#app')

