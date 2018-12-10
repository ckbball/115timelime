<template>
  <div class="post">
    <input v-model="textPost" placeholder="When time gives you limes...">
    <button v-on:click="submit">Squeeze!</button>
  

  <div v-for="(post, n) in posts" :key="n">

      <sui-card>
        <sui-card-content>
          <sui-card-header>Post
            <sui-icon class="right floated" size="small" name="like" />
            <sui-icon class="right floated" size="small" name="star" />
          </sui-card-header>
          <p>Here goes the post text</p>

          {{ post.text }}
        </sui-card-content>
        <sui-card-content extra>
          <span>
            <sui-icon name="heart" /> Like
          </span>
          <span slot="right">
            <sui-icon name="star" /> Favorite
          </span>
        </sui-card-content>
      </sui-card>

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
</style>
