<template lang="html">
  <div>
    <sui-card class="raised">
      <router-link v-if="getUserInfo.uid" :to="{path: '/user/'+getUserInfo.uid}">
        <sui-image :src="getUserInfo.image" class=ProfilePicture />
      </router-link>
      <sui-card-content>
        <sui-card-header>{{this.userInfo.firstName}} {{this.userInfo.lastName}}</sui-card-header>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'HomeUserIcon',
  props: {
    userInfo: Object, 
    default: {
      firstName: "",
      lastName: "",
      image: ""
    }

  },
    computed: {
    ...mapGetters([
      'getUserInfo',
    ]),
  },
  components: {
  },
  data () {
    return {
      images: {
        user_lemon: require('@/assets/user_lemon.png')
      }
    }
  },
  methods: {
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
