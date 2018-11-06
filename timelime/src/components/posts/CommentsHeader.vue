<template>
    <sui-table-header-cell>
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="4">
                    3 Comments
                </sui-grid-column>
                <sui-grid-column :width="12" textAlign="right">
                    <a @click="emitVisiblity">
                        <p>{{text}}</p>
                    </a>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-table-header-cell>
</template>

<script>
export default {
  name: 'CommentsHeader',
  components: {
  },
  props: { 
      visible: Boolean,
      default: false,
  },
  data () {
    return {
        text: 'Show All'
    }
  }, 
  methods: {
      emitVisiblity: function() {
          this.$emit('toggleVisiblity')
      }
  },
  watch: {
      visible: function(){
          if (this.visible == true) {
              this.text = 'Hide'
          }
          if (this.visible == false) {
              this.text = 'Show More'
          }
      }
  }

  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
