<template>
  <div class="mainBox">
    
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
  
</style>
<script>
export default {
  data() {
     return {
      
    }
  },
//	创建实例时就会触发
  created() {
    
  },
  mounted() {
    this.getData()
  },
//	检测视图值变化触发，有改变就会触发
  computed:{
    
  },
  methods:{
    getData() {
      this.$axios.get("https://www.easy-mock.com/mock/5b719015ebd4a208cce29b59/website/goodsList").then(res=>{
        console.log(res.data);
      })
    }
  },
  components: {
    
  },
}
</script>