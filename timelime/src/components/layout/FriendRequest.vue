<template>
	<sui-card class="uglyfoot">
	  <sui-card-content>
	    <sui-image 
	    :src="request.data().sender_image"
	    class="squarePhoto"
	    />
	    <span class="username">{{request.data().sender_name}}</span>
	    <sui-button id="togglee1" 
	    	:disabled="answered" 
	    	class="squareButton" 
	    	icon="remove" 
	    	size="tiny" 
	    	@click="respond('declined')"/> 

	    <sui-button id="togglee2"  
	    	:disabled="answered" 
	    	class="squareButton" 
	    	icon="add user" 
	    	color="olive" 
	    	size="tiny" 
	    	@click="respond('accepted')"
	    > Add </sui-button>

	    <span class="butthole">{{this.result}}</span>
	
	  </sui-card-content>
	</sui-card>

</template>

<script>
/*
	add new navbar items to data/ items
	item.content is what is displayed on the screen.
	item.route must correspond to route/index.js route name **case sensitive**
*/
import {mapActions, mapGetters} from 'vuex'
export default {
	name: 'FriendRequest',
  		data () {
  			return {
	          accepted: false,
	          answered: false,
	          result: "",
	          color: "red",
	          requester: {
					name: '',
					image: '',
					uid: '',
				},
		    };
    },
    props: {
	    request: {
	    	type: Object
	    }
  	},
  	methods: {
			...mapActions([
				'grabRequester', 
				'respondToRequest',
				'respondToFriendRequest'
			]),
			respond: function(response) {
				this.respondToFriendRequest({response: response, request: this.request})
			},

 	},
 	computed: {
 		...mapGetters(['getUserInfo'])
 	},
 	mounted () {

 	},
}
   
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uglyfoot {
  width: 400px
}
.username {
	font-weight: 210;
	font-size: 11pt;
	left: 7px;
	position: relative;
	/*
  	top: 17px;
  	right: 10px;
  	color: gray;*/
 }
.butthole {
	float: right;
	position: relative;
	font-weight: 100;
	font-size: 10pt;
  	top: 11px;
  	right: 5px;
  	color: gray;
/*	position: absolute;
	display: inline-block;
	float: right;*/
}
.dropdown_ul {
  right: 0;
}
.hide {
  /* display: this.added; */
}
.squareButton {
  float: right;
  position: relative;
  top: 5px;
  z-index: 2;
}
.squarePhoto {
  object-fit: cover;
  width: 40px;
  height: 40px;
}
</style>
