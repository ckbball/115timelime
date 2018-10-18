<template lang="html">
  <div>
    <ButtonColor 
      :icon="this.icon"
      v-on:clicked="toggle"
    ></ButtonColor>
    <sui-modal v-model="open">
      <sui-modal-header>{{Header}}</sui-modal-header>
      <sui-modal-actions>
        <sui-button negative @click.native="toggle">
          Cancel
        </sui-button>
        <sui-button positive @click.native="savePost">
          Save
        </sui-button>
      </sui-modal-actions>

    </sui-modal>
  </div>
</template>

<script>
import ButtonColor from '@/components/user_profile/ButtonColor'
export default {
  name: 'EditProfilePicture',
  data() {
    return { 
      icon: "photo",
      open: false,
      text: ""
    };
  },
  components: {
    "ButtonColor": ButtonColor,
  },
  props: {
    Header: String,
    Bio: String,
  },
  methods: {
    toggle() {
      this.open = !this.open;
      this.text = ""
    },
    savePost(){
      this.$emit("inputEvent", this.text)
      this.open = !this.open;
      this.text = ""
    },
  },
};
</script>

<style lang="css">
</style>