<template lang="html">
  <div>
    <ButtonColor 
      :icon="this.icon"
      v-on:clicked="toggle"
    ></ButtonColor>
    <sui-modal v-model="open">
      <sui-modal-header>{{Header}}</sui-modal-header>
      <sui-modal-content>

        <sui-modal-description>
          <textarea 
            v-model="newBio"  class="fucku" maxlength="200"/>
        </sui-modal-description>
      </sui-modal-content>
        
      <sui-modal-actions>
        Characters remaining: {{textRemaining}}
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
  name: 'EditProfileInfo',
  data() {
    return { 
      icon: "write",
      open: false,
      text: "",
      maxlength: 200,
      newBio: this.Bio
    };
  },
  computed: {
    textRemaining: function(){
        return 200 - this.newBio.length
      },
  },
  components: {
    "ButtonColor": ButtonColor,
  },
  props: {
    Header: String,
    Bio: String,
    Prexisting: String,
  },
  methods: {
    toggle() {
      this.open = !this.open;
      this.text = ""
    },
    savePost(){
      this.$emit("inputEvent", this.newBio)
      this.open = !this.open;
      this.text = ""
    },
    calculateRemaining() {
      console.log("fuck u")
      // this.remaining = this.maxlength - val.value.length;
    },
  },
};
</script>

<style scoped>
.fucku{
  width: 100%;
  height: 100%
}
</style>