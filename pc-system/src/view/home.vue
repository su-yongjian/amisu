<template>
    <div class="mainBox">
        <table-lists></table-lists>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    
</style>
<script>
import {tableList}  from "../axios/goodsAPI.js" ;
import tableLists  from "@/view/table/table"
export default {
    components: {
        tableLists
    },
    data() {
       return {
            
        }
    },
//	创建实例时就会触发
    created() {
        
    },
    mounted() {
        // this.getData()
    },
//	检测视图值变化触发，有改变就会触发
    computed:{
        
    },
    methods:{
        getData(){
            tableList().then(res=>{
                console.log(res);
                
            })
        }
    }
}
</script>