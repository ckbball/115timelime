<template lang="html">
  <div>
    <ButtonColor 
      :icon="this.icon"
      v-on:clicked="open"
    ></ButtonColor>
  </div>
</template>


<script>
// import ButtonColor from '@/components/user_profile/ButtonColor'
// import {mapGetters, mapMutations} from 'vuex'
// export default {
//   name: 'EditProfileInfo',
//   data() {
//     return { 
//       icon: "write",
//     };
//   },

//   components: {
//     "ButtonColor": ButtonColor,
//   },

//   methods: {
//     open() {
//       this.$emit("editBio")
//     },
//   },
// };
</script>

<style scoped>
.fucku{
  width: 100%;
  height: 100%
}
</style>