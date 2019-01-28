<template>
  <div class="tabBox">
    <Button type="primary" @click="add">新增</Button>
    <Table :loading="loading" ref="selection" :columns="columns1" :data="list"></Table>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<script>
import {tableList,deleteGoods}  from "@/axios/goodsAPI.js" ;
export default {
  name: "tableList",
  data() {
    return {
      loading: false,
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "商品名称",
          key: "goods_name"
        },
        {
          title: "商品价格",
          key: "shop_price"
        },
        {
          title: "商品库存",
          key: "goods_stock"
        },
        {
          title: "最后更新",
          key: "update_time"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row.goods_id);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index,params.row.goods_id);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      list: []
    };
  },
  //	创建实例时就会触发
  created() {
    this.getList();
    // let da = new Date(1548063383140);
    // console.log(da.toLocaleDateString().replace(/\//g, "-") + " " + da.toTimeString().substr(0, 8));

  },
  mounted() {},
  //	检测视图值变化触发，有改变就会触发
  computed: {},
  methods: {
    getList(){
      tableList().then(res=>{
        if(res.status==200&&res.data.code==0){
          this.list = res.data.results;
        }
      })
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    remove(index,id) {
      deleteGoods({goods_id:id}).then(res=>{
        if(res.status==200&&res.data.code==0){
          this.$Message.success('删除成功!');
          this.getList();
        }else{
          this.$Message.error(res.data.msg);
        }
      })
    },
    edit(goods_id) {
        this.$router.push({
          path: '/addGoods', query: { is_edit: true ,goods_id:goods_id}
        })
    },
    add(){
        console.log('新增');
        this.$router.push({
          path: '/addGoods', query: { is_edit: false }
        })
    }
  },
  components: {}
};
</script>
