<template>
  <div class="tabBox">
    <Button type="primary" @click="add">新增</Button>
    <Table :loading="loading" ref="selection" :columns="columns1" :data="data1"></Table>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
<script>
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
          key: "name"
        },
        {
          title: "商品价格",
          key: "age"
        },
        {
          title: "总库存",
          key: "address"
        },
        {
          title: "最后更新",
          key: "updateTime"
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
                      this.edit(params.index);
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
                      this.remove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03",
          updateTime:"2019-01-07"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01",
          updateTime:"2019-01-07"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02",
          updateTime:"2019-01-07"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04",
          updateTime:"2019-01-07"
        },

      ]
    };
  },
  //	创建实例时就会触发
  created() {},
  mounted() {},
  //	检测视图值变化触发，有改变就会触发
  computed: {},
  methods: {
    handleSelectAll(status) {
      console.log(status);

      this.$refs.selection.selectAll(status);
    },
    remove(index) {
      console.log(index);
    },
    edit(index) {
      console.log(index);
    },
    add(){
        console.log('新增');
        this.$router.push({
          name: 'AddGood', params: { is_edit: true }
        })
    }
  },
  components: {}
};
</script>
