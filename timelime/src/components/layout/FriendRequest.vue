<template>
	<sui-card class="uglyfoot">
	  <sui-card-content>
	    <sui-image 
	    src="https://images.pexels.com/photos/1466845/pexels-photo-1466845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
	    
	    class="squarePhoto"
	    />
	    <span class="username">Temporary Home</span>
<!-- 	    <span class="username">Name Name</span> -->
	    <sui-button id="togglee1" :disabled="answered" class="squareButton" icon="remove" size="tiny" @click="decline()"/> 
	     <!-- v-if="!answered" -->
	    <sui-button id="togglee2"  :disabled="answered" class="squareButton" icon="add user" color="olive" size="tiny" @click="accept()"> Add </sui-button>
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
export default {
	name: 'FriendRequest',
  		data () {
  			return {
	          accepted: false,
	          answered: false,
	          result: "",
	          color: "red"
		    };
    },
  //   props: {
  //   name: String,
  // 	accepted: Boolean,
  // },
  	methods: {
	    accept(){
	    	this.accepted = true
	    	// accepted = true
	    	this.answered = true
	    	this.result = "Accepted!"
	    },
	    decline(){
	    	this.accepted = false
	    	// accepted = false
	    	this.answered = true
	    	this.result = "Declined!"
		}
 	},
};
   
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
  display: this.added;
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
