<template>
    <sui-card class="raised" v-if="this.userInfo">
      <sui-image :src="userInfo.image" class=ProfilePicture />
      <sui-card-content>

        <sui-card-header>{{this.userInfo.firstName}} {{this.userInfo.lastName}}</sui-card-header>
        <sui-card-meta>Joined {{this.userInfo.joinedDate}}</sui-card-meta>
        <sui-card-description>{{this.userInfo.bio}}</sui-card-description>
      </sui-card-content>
    </sui-card>
</template>

<script>
export default {
  name: 'UserIcon',
  props: {
    userInfo: Object
  },
  data () {
    return {
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ProfilePicture{
  width: 300px;
  height: 300px;
  object-fit: cover;
}
.editInfo{
  z-index: 2;
  position: relative;
  margin-left: 134px;
  top: -5px;
}
.editImage{
  position: relative;
  margin-left: 51px;
  top: -5px;
  z-index: 2;
}
</style>
