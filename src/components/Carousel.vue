<template>
<div id="Carousel">
	<div class="window">
		<ul class="container" :style="containerStyle">
			<li>
				<img :src="sliders[sliders.length - 1]" alt="">
			</li>
			<li v-for="(item, index) in sliders" :key="index">
				<img :src="item" alt="">
			</li>
			<li>
				<img :src="sliders[0]" alt="">
			</li>
		</ul>
		<ul class="dots">
			<li v-for="(dot, index) in sliders" :key="index" 
			:class="{dotted: index == (currentIndex - 1)}"
			@click="jump(index+1)">
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	name: 'Carousel',
	props: {
		sliders: {
			type:Array
		},
		widthString: {
			type:String
		}
	},
	data() {
		return {
			currentIndex: 1,
			distance: 0,
			transitionEnd : true,
			imgNum: 0
		}
	},
	computed:{
		containerStyle() {
			return {
				transform: `translate3d(${this.distance}vw, 0, 0)`
			}
		}
	},
	methods:{
		move(num=1, direction) {
			if (!this.transitionEnd) return
			this.transitionEnd = false
			this.currentIndex -= num * direction
			if (this.currentIndex > this.imgNum) 
				this.currentIndex = 1
			else if (this.currentIndex < 1) 
				this.currentIndex = this.imgNum
			
			var desDistance = this.distance + (-direction) * this.width * num;
			this.animate(desDistance, direction, num)
		},
		animate(distance, direction, speed) {
			if ((direction === -1 && distance < this.distance) || (direction === 1 && distance > this.distance)) {
				this.distance += 5 * direction * speed
				setTimeout(()=>{
					this.animate(distance, direction, speed)
				}, 20)
			} else {
				if (distance < this.sliders.length * (this.width))
					this.distance = this.width
				else if (this.distance > this.width)
					this.distance = this.sliders.length * (this.width)
				this.transitionEnd = true
			}
		},
		play() {
			if (this.timer) {
				window.clearInterval(this.timer)
				this.timer = null
			}
			this.timer = window.setInterval(() => {
				this.move(1, -1)
			}, 4000)
		},
		stop() {
			window.clearInterval(this.timer)
			this.timer = null
		},
		jump(index) {
			this.stop()
			if (index == this.currentIndex) {
				this.play();
				return
			}
			var direction = index - this.currentIndex > 0 ? -1 : 1;
			var num = Math.abs(index - this.currentIndex)
			// console.log('[jump]this.move(' + String(num) + ', ' + String(direction) + ')')
			this.move(num, direction)
			this.play();
		}
	},
	mounted: function() {
		this.width = Number(this.widthString)
		this.distance = Number(this.widthString)
		console.log(this.sliders)
		this.imgNum = this.sliders.length
		this.play()
		window.onblur = function() { this.stop() }.bind(this)
		window.onfocus = function() { this.play() }.bind(this)
	}
}
</script>

<style scoped>
 	*{
	  box-sizing: border-box;
	  margin:0;
	  padding:0;
	}
	ol,ul{
	  list-style: none;
	}
	#Carousel .window{
	  position:relative;
	  width: 100%;
	  height: 100%;
 	  margin:0 auto;
	  overflow:hidden;
	}
	#Carousel .container{
	  display:flex;
	  position:absolute;
	}
	#Carousel .container img {
		width: 100vw;
	}
	img{
	  user-select: none;
	}
	#Carousel .dots{
	    position:absolute;
	    bottom:10px;
	    left:50%;
	    transform:translateX(-50%);
	  }
	#Carousel .dots li{
	  display:inline-block;
	  width:8px;
	  height:8px;
	  margin:0 3px;
	  /* border:1px solid white; */
	  border-radius:50%;
	  background-color: #000000;
	  opacity: 0.5;
	  cursor:pointer;
	}
	#Carousel .dots .dotted{
	  opacity: 1;
	}
</style>
