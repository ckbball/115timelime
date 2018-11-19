<template>



<sui-card class="uglyfoot">
    <sui-card-content>

        <sui-image 
        src="https://cdn.drawception.com/images/panels/2012/5-2/yD3XfXms5g-2.png"
        class="squarePhoto"
        />

        <span class="username" >{{notification.content}}</span>
    </sui-card-content>
</sui-card>

</template>

<script> 
import { mapActions } from 'vuex'
export default {
    name: 'NotificationItem',
    components: {
    },
    props: {
        notification: {
            type: Object
        }
    },
    data () {
        return{
    
        }
    },
    methods: {
        ...mapActions([
        ])
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
/*  position: absolute;
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