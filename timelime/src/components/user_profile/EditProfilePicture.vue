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
export default {
  name: 'EditProfilePicture',
  data() {
    return { 
      icon: "photo",
    };
  },
  components: {
    "ButtonColor": ButtonColor,
  },
  methods: {
    open() {
      this.$emit("editPhoto")
    },
  },
};
</script>

<style lang="css">
</style>