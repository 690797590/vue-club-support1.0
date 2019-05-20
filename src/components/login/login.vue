<template>
    <el-form ref="loginForm" :model="loginInfo" :rules="rules" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
        <h3 class="login_title">系统登录</h3>
        <el-form-item prop="userName">
            <el-input type="text" v-model="loginInfo.userName" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="loginInfo.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
        <el-form-item style="width: 100%">
            <el-button type="primary" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import {APIlogin} from '@/utils/api/login/login'

    export default {
        data() {
            return {
                rules: {
                    userName: [{required: true, message: '请输入用户名', trigger: ['blur', 'change']}],
                    password: [{required: true, message: '请输入密码', trigger: ['blur', 'change']}]
                },
                checked: true,
                loginInfo: {
                    userName: 'adu',
                    password: 'djg19950413'
                },
                loading: false
            }
        },
        methods: {
            submitClick() {
                var _this = this;
                _this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        _this.login();
                    } else {
                        _this.$message.error("您填写的信息有误请检查后再试！");
                        return false;
                    }
                });
            },
            login() {
                var _this = this;
                this.loading = true;
                APIlogin({
                    userName: this.loginInfo.userName,
                    password: this.loginInfo.password
                }).then(res => {
                    _this.loading = false;
                    console.log("登录信息>>>>>>", res)
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 0) {
                            _this.$router.replace({path: '/home'});
                        } else {
                            _this.$message.error(data.msg);
                        }
                    } else {
                        //失败
                        _this.$message.error(res.data.msg);
                    }
                }).catch(res => {
                    _this.loading = false;
                    _this.$message.error("系统错误请稍后再试⊙﹏⊙∥!");

                });
            }
        }
    }
</script>
<style scoped>
    .login-container {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .login_remember {
        margin: 0px 0px 35px 0px;
        text-align: left;
    }
</style>
