<template>
    <el-container class="home_container">
        <el-header>
            <div class="home_title">杜老师博客管理平台</div>
            <div class="home_userinfoContainer">
                <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link home_userinfo">
    {{currentUserName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="sysMsg">系统消息</el-dropdown-item>
                        <el-dropdown-item command="MyArticle">我的文章</el-dropdown-item>
                        <el-dropdown-item command="MyHome">个人主页</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside width="230px">
                <el-menu
                        unique-opened
                        :default-active="this.$route.path"
                        class="el-menu-vertical-demo" style="background-color: #ECECEC" router>
                    <template v-for="(itemlv1,indexlv1) in this.$router.options.routes" v-if="!itemlv1.meta.hidden">
                        <el-submenu :index="itemlv1.meta.truePath" v-if="!itemlv1.meta.leaf" :key="itemlv1.path+indexlv1">
                            <template slot="title">
                                <i :class="itemlv1.meta.iconClass"></i>
                                <span>{{itemlv1.meta.title}}</span>
                            </template>

                            <template v-for="itemlv2 in itemlv1.children" v-if="!itemlv2.meta.hidden">
                                <el-submenu :index="itemlv2.path" v-if="!itemlv2.meta.leaf" :key="itemlv2.path">
                                    <template slot="title">
                                        <span>{{itemlv2.meta.title}}</span>
                                    </template>
                                    <template v-for="itemlv3 in itemlv2.children" v-if="!itemlv3.meta.hidden">
                                        <el-submenu :index="itemlv3.path" v-if="!itemlv3.meta.leaf" :key="itemlv3.path">
                                            <template slot="title">
                                                <span>{{itemlv3.meta.title}}</span>
                                            </template>
                                            <template v-for="itemlv4 in itemlv3.children" v-if="!itemlv4.meta.hidden">
                                                <el-submenu :index="itemlv4.path" v-if="!itemlv4.meta.leaf" :key="itemlv4.path">
                                                    <template slot="title">
                                                        <span>{{itemlv4.meta.title}}</span>
                                                    </template>
                                                    <template v-for="itemlv5 in itemlv4.children" v-if="!itemlv5.meta.hidden">
                                                        <el-menu-item
                                                                v-if="itemlv5.meta.leaf"
                                                                :index="itemlv5.path"
                                                                :key="itemlv5.path"
                                                        >{{itemlv5.meta.title}}</el-menu-item>
                                                    </template>
                                                </el-submenu>
                                                <el-menu-item
                                                        v-if="itemlv4.meta.leaf"
                                                        :index="itemlv4.path"
                                                        :key="itemlv4.path"
                                                >{{itemlv4.meta.title}}</el-menu-item>
                                            </template>
                                        </el-submenu>
                                        <el-menu-item
                                                v-if="itemlv3.meta.leaf"
                                                :index="itemlv3.path"
                                                :key="itemlv3.path"
                                        >{{itemlv3.meta.title}}</el-menu-item>
                                    </template>
                                </el-submenu>
                                <el-menu-item
                                        v-if="itemlv2.meta.leaf"
                                        :index="itemlv2.path"
                                        :key="itemlv2.path"
                                >{{itemlv2.meta.title}}</el-menu-item>
                            </template>

                        </el-submenu>
                        <template v-if="itemlv1.meta.leaf">
                            <el-menu-item :index="itemlv1.path" :key="itemlv1.path">
                                <i :class="itemlv1.meta.iconClass"></i>
                                <span slot="title">{{itemlv1.meta.title}}</span>
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
                    </el-breadcrumb>
                    <keep-alive>
                        <router-view v-if="this.$route.meta.keepAlive"></router-view>
                    </keep-alive>
                    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
    import {APIlogoute} from '@/utils/api/login/login'

    export default {
        data() {
            return {
                currentUserName: '游客'
            }
        },
        mounted: function () {
            this.showWelcome();
            console.log(this.$router.options.routes)
        },
        methods: {
            showWelcome() {
                /**
                 * 显示欢迎语
                 **/
                let _this = this,
                    welcomeFlag = _this.$Utils.getCache('welcome');
                if (!welcomeFlag) {
                    _this.$alert(_this.currentUserName + '，欢迎回来!', 'Welcome Back', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                    _this.$Utils.setCache('welcome', true);
                }

            },
            handleCommand(command) {
                let _this = this;
                if (command == 'logout') {
                    _this.$confirm('注销登录吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(function () {
                        APIlogoute({}).then(res => {
                            console.log("退出登录信息>>>>>>", res)
                            if (res.status == 200) {
                                let data = res.data;
                                if (data.code == 0) {
                                    _this.currentUserName = '游客';
                                    _this.$Utils.removeCache('welcome');
                                    _this.$router.replace({path: '/'});
                                } else {
                                    _this.$message.error(data.msg);
                                }
                            } else {
                                //失败
                                _this.$message.error(res.data.msg);
                            }
                        }).catch(res => {
                            _this.$message.error(res.data.msg);
                        })
                    }, function () {
                        //取消
                    })
                }
            }
        },

    }
</script>
<style scoped>
    .home_container {
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
    }

    .el-header {
        background-color: #ff6700;
        color: #333;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .el-aside {
        background-color: #ECECEC;
    }

    .el-main {
        background-color: #fff;
        color: #000;
        text-align: center;
    }

    .home_title {
        color: #fff;
        font-size: 22px;
        display: inline;
    }

    .home_userinfo {
        color: #fff;
        cursor: pointer;
    }

    .home_userinfoContainer {
        display: inline;
        margin-right: 20px;
    }
    .el-menu-vertical-demo {
        text-align: left;
    }
</style>
