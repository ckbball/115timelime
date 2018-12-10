<template>
  <div >
    <StandInPost v-if="this.getAllMyPosts.length == 0" @writePost="clickWriteButton()"/>
    <div class="posts" v-for="(p,n) in this.getAllMyPosts" :key="n">
          <post
            :post="p.data()"
          />
    </div>
</div>

</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    margin: 10px 0;
    width: 300px;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 100px;
    cursor: pointer;
  }
  .posts{
    position: relative;
    z-index: 2;
    width: 100%;
  }
</style>
