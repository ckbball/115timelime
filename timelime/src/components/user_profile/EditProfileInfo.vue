<template lang="html">
  <div>
    <sui-button @click.native="toggle">Show Modal</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>{{Header}}</sui-modal-header>
      <sui-modal-content image>
        <sui-modal-description>
          <sui-header>Name</sui-header>
            <sui-input/>
          <sui-header>Bio</sui-header>
            <sui-input/>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button negative @click.native="toggle">
          Cancel
        </sui-button>
        <sui-button positive @click.native="toggle">
          Save
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
export default {
  name: 'EditProfileInfo',
  data() {
    return { 
      open: false,
      Header: "",
      Data: "butthole", 
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="css">
</style>