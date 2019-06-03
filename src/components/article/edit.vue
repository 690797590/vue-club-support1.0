<template>
    <el-container v-loading="loading" class="article-edit">
        <el-header class="header">
            <el-select v-model="article.cid" placeholder="请选择文章栏目" style="width: 150px;">
                <el-option
                        v-for="item in categories"
                        :key="item.id"
                        :label="item.typeName"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-input v-model="article.title" placeholder="请输入标题..." style="width: 400px;margin-left: 10px"></el-input>
            <el-input v-model="article.keyWord" placeholder="请输入关键字...（多个关键字中间用空格隔开）"
                      style="width: 400px;margin-left: 10px"></el-input>
        </el-header>
        <div class="summary">
            <el-input :autosize="{ minRows: 3, maxRows: 6}" type="textarea" v-model="article.summary"
                      placeholder="请输入摘要..." style="width: 560px;"></el-input>
        </div>
        <el-main class="main">
            <div id="editor">
                <mavon-editor style="height: 100%;width: 100%;" ref=md @imgAdd="imgAdd"
                              @imgDel="imgDel" v-model="article.mdContent"></mavon-editor>
            </div>
            <div style="display: flex;align-items: center;margin-top: 15px;justify-content: flex-end">
                <el-button @click="cancelEdit" v-if="from!=undefined">放弃修改</el-button>
                <template v-if="from==undefined || from=='draft'">
                    <el-button @click="saveBlog(2)">保存到草稿箱</el-button>
                    <el-button type="primary" @click="saveBlog(0)">发表文章</el-button>
                </template>
                <template v-else="from==post">
                    <el-button type="primary" @click="saveBlog(0)">保存修改</el-button>
                </template>
            </div>
        </el-main>
    </el-container>

</template>

<script>
    import {APIblogTypeList} from '@/utils/api/classify/classify';
    import {APIblogSave, APIblogListById} from '@/utils/api/article/article';
    import {mavonEditor} from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'

    export default {
        name: "edit",
        components: {
            mavonEditor
        },
        data() {
            return {
                id: '', //博客ID
                categories: [],
                tagInputVisible: false,
                tagValue: '',
                loading: false,
                from: '',
                article: {
                    id: '-1',
                    title: '',
                    mdContent: '',
                    cid: '',
                    summary: '',//副标题
                    keyWord: '',//关键字
                }
            }
        },
        mounted() {
            let from = this.$route.query.from;
            this.from = from;
            this.getCategories();
            this.getBlogInfo();
        },
        methods: {
            getCategories() {
                console.log(123)
                let _this = this;
                _this.loading = true;
                APIblogTypeList({
                    page: 1,
                    pageSize: 100
                }).then(res => {
                    _this.loading = false;
                    console.log("分类信息>>>>>>", res)
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 0) {
                            _this.categories = data.data.list;
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
            },
            getBlogInfo() {
                /**
                 * 获取编辑博客信息
                 **/
                let _this = this;
                if (_this.from != null && _this.from != '' && _this.from != undefined) {
                    let id = this.$route.query.id;
                    this.id = id;
                    this.loading = true;
                    APIblogListById({
                        id: _this.id
                    }).then(res => {
                        _this.loading = false;
                        console.log("所编辑的博客信息>>>>>>", res)
                        if (res.status == 200) {
                            let data = res.data;
                            if (data.code == 0) {
                                _this.article.title = data.data.title;
                                _this.article.summary = data.data.summary;
                                _this.article.mdContent = data.data.mdContent||data.data.content;
                                _this.article.keyWord = data.data.keyWord;
                                _this.article.cid = data.data.typeId;
                            } else {
                                _this.$message.error(data.msg);
                            }
                        } else {
                            _this.$message({type: 'error', message: '页面加载失败!'})
                        }
                    }, res => {
                        _this.loading = false;
                        _this.$message({type: 'error', message: '页面加载失败!'})
                    })
                }
            },
            cancelEdit() {
                /**
                 * 取消编辑
                 **/
                this.$router.go(-1)
            },
            saveBlog(state) {
                if (!(this.$Utils.isNotNullORBlank(this.article.title, this.article.summary, this.article.mdContent, this.article.cid, this.article.keyWord))) {
                    this.$message({type: 'error', message: '数据不能为空!'});
                    return;
                }
                var _this = this;
                _this.loading = true;

                APIblogSave({
                    title: _this.article.title,
                    summary: _this.article.summary,
                    mdContent: _this.article.mdContent,
                    htmlContent: _this.$refs.md.d_render,
                    typeId: _this.article.cid,
                    keyWord: _this.article.keyWord,
                    state: state,
                    contentNoTag: ''
                }).then(res => {
                    _this.loading = false;
                    console.log("保存博客信息>>>>>>", res)
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 0) {
                            // _this.article.id = resp.data.msg;
                            _this.$message({type: 'success', message: state == 2 ? '保存成功!' : '发布成功!'});
                            // window.bus.$emit('blogTableReload')

                            if (state == 0) {
                                _this.$router.replace({path: '/article/index'});
                            }
                        } else {
                            _this.$message.error(data.msg);
                        }
                    } else {
                        //失败
                        _this.$message.error(res.data.msg);
                    }
                }).catch(res => {
                    _this.loading = false;
                    _this.$message({type: 'error', message: state == 2 ? '保存草稿失败!' : '博客发布失败!'});

                })
            },
            imgAdd(pos, $file) {

            },
            imgDel(pos) {

            },
            handleClose(tag) {
            },
        }
    }
</script>

<style lang="scss" scoped>
    .article-edit > .main > #editor {
        width: 100%;
        height: 450px;
        text-align: left;
    }

    .article-edit > .header {
        background-color: #ececec;
        padding-top: 10px;
        padding-left: 5px;
        display: flex;
        justify-content: flex-start;
    }

    .article-edit > .main {
        /*justify-content: flex-start;*/
        display: flex;
        flex-direction: column;
        padding-left: 5px;
        background-color: #ececec;
        padding-top: 0px;
    }

    .summary {
        padding-left: 5px;
        text-align: left;
        background-color: #ececec;
        padding-bottom: 10px;
    }

</style>