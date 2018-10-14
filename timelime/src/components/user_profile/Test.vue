<template lang="html">
  <div>

<sui-card>
      <sui-image src="https://images.pexels.com/photos/1466845/pexels-photo-1466845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
      <sui-card-content>
        <sui-card-header>Kristy</sui-card-header>
        <sui-card-meta>Joined in 2013</sui-card-meta>
        <sui-card-description>Kristy is an art director living in New York.</sui-card-description>
      </sui-card-content>
      <button class="anyName">yooo</button>
      <sui-card-content extra>
        <sui-icon name="user" />
        22 Friends</sui-card-content>
    </sui-card>


  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.anyName{
  position: relative;
  max-width: 50px;
  margin-left: 100px;
  top: -500px;
  z-index: 2;
  background-color:blue;
}
</style>
