<template>
    <el-row v-loading="loading">
        <el-col :span="24">
            <div style="text-align: left;">
                <el-button type="text" icon="el-icon-back" @click="goBack" style="padding-bottom: 0px;">返回</el-button>
            </div>
        </el-col>
        <el-col :span="24">
            <div>
                <div><h3 style="margin-top: 0px;margin-bottom: 0px">{{article.title}}</h3></div>
                <div style="width: 100%;margin-top: 5px;display: flex;justify-content: flex-end;align-items: center">
                    <div style="display: inline; color: #20a0ff;margin-left: 50px;margin-right:20px;font-size: 12px;">
                        {{article.nickname}}
                    </div>
                    <span class="subtitle">浏览 {{article.clickHit==null?0:article.clickHit}}</span>
                    <span class="subtitle">回复 {{article.replyHit==null?0:article.replyHit}}</span>
                    <span class="subtitle"> {{article.releaseDate | formatDateTime}}</span>
                    <el-tag type="success" size="small"
                            style="margin-left: 8px">{{article.typeName}}
                    </el-tag>
                    <span style="margin:0px 50px 0px 0px"></span>
                </div>
            </div>
        </el-col>
        <el-col>
            <div style="text-align: left" v-html="article.content">
            </div>
        </el-col>
    </el-row>
</template>
<script>
    import {APIblogListById} from '@/utils/api/article/article'

    export default {
        name: "detail",
        data() {
            return {
                article: {},
                loading: false,
                activeName: ''
            }
        },
        mounted: function () {
            const id = this.$route.query.id;
            this.getBlogDetail(id);
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            getBlogDetail(id) {
                /**
                 * 获取博客详情
                 **/
                let _this = this;
                _this.loading = true;
                APIblogListById({
                    id: id
                }).then(res => {
                    _this.loading = false;
                    console.log("博客详情信息>>>>>>", res)
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 0) {
                            _this.article = data.data;
                        } else {
                            _this.$message.error(data.msg);
                        }
                    } else {
                        //失败
                        _this.$message.error(res.data.msg);
                    }
                }).catch(res => {
                    _this.loading = false;
                    _this.$message({type: 'error', message: '系统错误请稍后再试⊙﹏⊙∥!'});
                })
            }
        }
    }
</script>
<style lang="scss">
    .subtitle {
        color: #20a0ff;
        margin-right: 20px;
        font-size: 12px;
    }
</style>
