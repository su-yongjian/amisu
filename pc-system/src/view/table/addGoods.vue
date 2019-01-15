<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="商品名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入商品名称"></Input>
        </FormItem>
        <FormItem label="商品价格" prop="shop_price">
            <Input v-model="formValidate.price" placeholder="请输入售价"></Input>
        </FormItem>

        <FormItem label="Desc" prop="商品描述">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入商品描述"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    name: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '商品名称不能为空', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '售价不能为空', trigger: 'blur' },
                        { type: 'string', message: '售价不能小于0', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入商品介绍', trigger: 'blur' },
                        { type: 'string', min: 10, message: '商品介绍不能少于10个字', trigger: 'blur' }
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
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

