<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商品名称" prop="good_name">
            <Input v-model="formValidate.good_name" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品价格" prop="shop_price">
            <Input v-model="formValidate.shop_price" placeholder="请输入售价"></Input>
        </FormItem>

        <FormItem label="商品描述" prop="good_desc">
            <Input v-model="formValidate.good_desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入商品描述"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
import {addGood}  from "@/axios/api.js" ;
export default {
    data () {
        return {
            formValidate: {
                good_name: '新建商品',
                good_desc: '仅仅是拿来测试使用的',
                shop_price:'1.00'
            },
            ruleValidate: {
                good_name: [
                    { required: true, message: '商品名称不能为空', trigger: 'blur' }
                ],
                shop_price: [
                    { required: true, message: '售价不能为空', trigger: 'blur' },
                    { type: 'string', message: '售价不能小于0', trigger: 'blur' }
                ],
                good_desc: [
                    { required: true, message: '请输入商品介绍', trigger: 'blur' },
                    { type: 'string', min: 5, message: '商品介绍不能少于5个字', trigger: 'blur' }
                ]
            }
        }
    },
    //在实例创建完成后被立即调用。el 属性目前不可见
    created() {
      console.log(this.$route.params.is_edit);

    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('提交失败');
                }
                let data = this.formValidate
                console.log(data);
                // this.$axios.post('http://localhost:3000/admin/addGood',{data:data}).then(res=>{
                //   console.log(res);

                // })

                addGood(data).then(res=>{
                  console.log(res);

                })

            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

