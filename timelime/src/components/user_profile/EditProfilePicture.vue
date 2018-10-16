<template lang="html">
  <div>
    <Button 
      :icon="this.icon"
      v-on:edit="toggle"
    ></Button>
    <sui-modal v-model="open">
      <sui-modal-header>{{Header}}</sui-modal-header>
      <sui-modal-content>
        <sui-modal-description>
            <sui-input 
            fluid
            v-model="text"
            />
        </sui-modal-description>
      </sui-modal-content>
      
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
import Button from '@/components/user_profile/Button'
export default {
  name: 'EditProfileInfo',
  data() {
    return { 
      icon: "photo",
      open: false,
      text: ""
    };
  },
  components: {
    "Button": Button,
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