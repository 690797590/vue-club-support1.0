<template>
    <el-card style="width: 500px" v-loading="loading">
        <div style="text-align: left">
            <el-form :rules="rules" :model="emailValidateForm" label-position="top" ref="emailValidateForm"
                     style="color:#20a0ff;font-size: 14px;">
                <el-form-item
                        prop="email"
                        label="开启博客评论通知">
                    <el-input type="email" v-model.email="emailValidateForm.email" auto-complete="off"
                              style="width: 300px"
                              placeholder="请输入邮箱地址..." size="mini"></el-input>
                    <el-button style="margin-left: 5px" type="primary" @click="submitForm('emailValidateForm')"
                               size="mini">确定
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "blogCfg",
        data() {
            let validatePassEmail = (rule, value, callback) => {
                const emailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                if (!value) {
                    return
                } else if (!emailReg.test(value)) {
                    callback(new Error('邮箱地址格式不正确'));
                } else {
                    callback();
                }
            }
            return {
                emailValidateForm: {
                    email: ''
                },
                rules: {
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: ['blur', 'change']},
                        {validator: validatePassEmail, trigger: ['blur', 'change']}
                    ]
                },
                loading: false
            }
        },
        mounted() {

        },
        methods: {
            getEmailInfo() {
                /**
                 * 获取邮箱信息
                 **/
            },
            updateEmailInfo() {
                /**
                 * 更新邮箱信息
                 **/

            },
            submitForm(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.loading = true;
                        _this.$message({type: 'success', message: '更新成功!'});
                        _this.loading = false;
                    } else {
                        _this.$message({type: 'error', message: '请检查邮箱格式是否正确!'});
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>