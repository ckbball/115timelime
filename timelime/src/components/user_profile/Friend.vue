<template>
	<sui-card class="friendItem">
	  <sui-card-content>
	    <sui-image 
	    :src="image"
	    class="squarePhoto" />
	    <span class="username">{{name}}</span>
	  </sui-card-content>
	</sui-card>
</template>

<script>
/*
	add new navbar items to data/ items
	item.content is what is displayed on the screen.
	item.route must correspond to route/index.js route name **case sensitive**
*/
export default {
	name: 'Friend',
  		data () {
  			return {
		    };
    },
    props: {
	    name: String,
	    image: String,
  	},
  	methods: {

 	},
};
   
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.friendItem {
  width: 600px
}
.username {
	font-weight: 210;
	font-size: 13pt;
	left: 40px;
	position: relative;
	/*
  	top: 17px;
  	right: 10px;
  	color: gray;*/
 }
.squarePhoto {
  object-fit: cover;
  width: 40px;
  height: 40px;
}
</style>
