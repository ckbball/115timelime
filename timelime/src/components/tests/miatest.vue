



<template>
<div id="app">
    <button>
      <clipper-upload v-model="imgURL">upload image</clipper-upload>
    </button>
    <button @click="getResult">clip image</button>
    <clipper-basic class="my-clipper" ref="clipper" :src="imgURL" preview="my-preview">
        <div class="placeholder" slot="placeholder">No image</div>
    </clipper-basic>
    
</div></template>


<script>
/* How to use this page
1.	Create the .vue file for the component you are developing in the 	approprate location 
2. import the file the file
3. register the component in the components: { .... section
4. Now you can use the component in the <template> section and you'll be able to see in by going to this page
*/


import { clipperBasic, clipperPreview } from 'vuejs-clipper'

export default {
        data() {
          return {
            imgURL: '',
            resultURL: ''
          };
        },
        methods: {
            getResult: function () {
                const canvas = this.$refs.clipper.clip();//call component's clip method
                this.resultURL = canvas.toDataURL("image/jpg", 1);//canvas->image
                console.log(this.resultURL)
            }
        }
      }

      //  upload: function(e){
      //   if (e.target.files.length !== 0) {
      //     if(this.imgURL) URL.revokeObjectURL(this.imgURL)
      //     this.imgURL = window.URL.createObjectURL(e.target.files[0]);
      //   }
      // },

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .my-clipper {
        width: 100%;
        max-width: 700px;
    }

    .placeholder {
        text-align: center;
        padding: 20px;
        background-color: lightgray;
    }
</style>

