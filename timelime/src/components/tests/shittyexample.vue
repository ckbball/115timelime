<template>
  <div >
  <input v-model="review">
  </input>
  <button v-on="submit">
    submit
  </button>

  </div>
</template>

<script>
export default {
  name: 'ShittyExample',
  data () {
    return {
      reviews: [],
    }
  }, 
  methods: {
    submit() {
      db.collection('movies').add({
        review: this.review,
        title: this.title,
      })
      .then(docRef => {
        db.collection('movies').doc(docRef.id).update({selfID: docRef.id})
      })
      .catch(err => {
        console.log(err)
      })
    },
    getreviews () {
      db.collection('movies').where('title', '==', 'jurrassic park').get()
      .then((snapshot) => {
        snapshot.docs.forEach(doc => {
          this.rewiews.push(doc.review)
        })
      })
      .catch()
    },
    deletemovie() {
      db.collection('movies').doc('docid').deleted()
    },


    
  },

  created() {
    this.getreviews()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
