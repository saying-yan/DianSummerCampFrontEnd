<template>
	<div id="app">
		<router-view></router-view>
		<BottomNav></BottomNav>
	</div>
</template>

<script>
	import BottomNav from './components/BottomNav.vue'

	export default {
		name: 'app',
		components: {
			BottomNav
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	body {
		margin: 0;
		background-color: #e9e9e9;
	}
</style>
