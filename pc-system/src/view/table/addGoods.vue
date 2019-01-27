<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商品名称" prop="goods_name">
            <Input v-model="formValidate.goods_name" placeholder="请输入商品名称"/>
        </FormItem>
        <FormItem label="商品价格" prop="shops_price">
            <Input v-model="formValidate.shop_price" placeholder="请输入售价"/>
        </FormItem>

        <FormItem label="商品描述" prop="goods_desc">
            <Input v-model="formValidate.goods_desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入商品描述"/>>
        </FormItem>
        <FormItem label="商品库存" prop="goods_stock">
            <Input type="text" v-model="formValidate.goods_stock" placeholder="请输入商品库存"/>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
import {addGood}  from "@/axios/goodsAPI.js" ;
export default {
    data () {
        return {
            formValidate: {
                goods_name: '新建商品',
                goods_desc: '仅仅是拿来测试使用的',
                shop_price:'1.00',
                goods_stock:''
            },
            ruleValidate: {
                goods_name: [
                    { required: true, message: '商品名称不能为空', trigger: 'blur' }
                ],
                goods_stock: [
                   { validator: validateStock, trigger: 'blur' }
                ],
                shop_price: [
                    { required: true, message: '售价不能为空', trigger: 'blur' },
                    { type: 'string', message: '售价不能小于0', trigger: 'blur' }
                ],
                goods_desc: [
                    { required: true, message: '请输入商品介绍', trigger: 'blur' },
                    { type: 'string', min: 5, message: '商品介绍不能少于5个字', trigger: 'blur' }
                ]
            }
        };
        const validateStock =(rule, value, callback)=>{
          console.log(rule, value);

          if (!value) {
            return callback(new Error('Age cannot be empty'));
          }
      };
    },
    //在实例创建完成后被立即调用。el 属性目前不可见
    created() {
    //   console.log(this.$route.params.is_edit);

    },
    methods: {

      handleSubmit (name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                let data = this.formValidate
                addGood(data).then(res=>{
                  if(res.data.code==0){
                      console.log(res.data);
                      this.$Message.success('提交成功!');
                  }else{
                    this.$Message.error(res.data.msg);
                  }
                })
              } else {
                  this.$Message.error('提交失败');
              }
          })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      }
    }
}
</script>

