<template lang="html">
  <div>
    <ButtonColor 
      :icon="this.icon"
      v-on:clicked="open"
    ></ButtonColor>
  </div>
</template>


<script>
import ButtonColor from '@/components/user_profile/ButtonColor'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'EditProfileInfo',
  data() {
    return { 
      icon: "write",
      // open: false,
      // text: "",
      // maxlength: 200,
      // newBio: this.Bio
    };
  },
  // computed: {
  //   textRemaining: function(){
  //       return 200 - this.newBio.length
  //     },
  //   ...mapGetters(['getUser'])
  // },
  components: {
    "ButtonColor": ButtonColor,
  },
  // props: {
  //   Header: String,
  //   Bio: String,
  //   Prexisting: String,
  // },
  methods: {
    open() {
      this.$emit("editBio")
    },
    // savePost(){
    //   this.$emit("inputEvent", this.newBio)
    //   this.open = !this.open;
    //   this.text = ""
    // },
    // calculateRemaining() {
    //   console.log("fuck u")
    //   // this.remaining = this.maxlength - val.value.length;
    // },
    // ...mapMutations(['setUser']),
  },
};
</script>

<style scoped>
.fucku{
  width: 100%;
  height: 100%
}
</style>