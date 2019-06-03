<template>
    <div class="blog-table">
        <!--search start-->
        <div style="display: flex;justify-content: flex-start">
            <el-input
                    placeholder="通过标题搜索该分类下的博客..."
                    prefix-icon="el-icon-search"
                    v-model="searchStr" style="width: 400px" size="mini">
            </el-input>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 3px" @click="searchClick">搜索
            </el-button>
        </div>
        <!--search end-->
        <!--table start-->
        <el-table
                ref="multipleTable"
                :data="articles"
                tooltip-effect="dark"
                style="width: 100%;overflow-x: hidden; overflow-y: hidden;"
                max-height="390"
                @selection-change="handleSelectionChange" v-loading="loading">
            <el-table-column
                    type="selection"
                    width="35" align="left" v-if="showEdit || showDelete">
            </el-table-column>
            <el-table-column
                    label="标题"
                    align="left">
                <template slot-scope="scope"><span class="article-title" @click="itemClick(scope.row)">{{ scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="最近编辑时间" width="140" align="left">
                <template slot-scope="scope">{{ scope.row.releaseDate | formatDateTime}}</template>
            </el-table-column>
            <el-table-column
                    prop="nickname"
                    label="作者"
                    width="120" align="left">
            </el-table-column>
            <el-table-column
                    prop="typeName"
                    label="所属分类"
                    width="120" align="left">
            </el-table-column>
            <el-table-column width="160" label="操作" align="left" v-if="showEdit || showDelete">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)" v-if="showEdit">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)" v-if="showDelete">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--table end-->
        <!--footer start-->
        <div class="footer">
            <el-button type="danger" size="mini" style="margin: 0px;" v-show="this.articles.length>0 && showDelete"
                       :disabled="this.selItems.length==0" @click="deleteMany">批量删除
            </el-button>
            <span></span>
            <el-pagination
                    background
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="totalCount" @current-change="currentChange" v-show="this.articles.length>0">
            </el-pagination>
        </div>
        <!--footer end-->
    </div>
</template>

<script>
    import {APIblogList, APIblogDelete} from '@/utils/api/article/article'

    export default {
        name: "blogTable",
        props: ['state', 'showEdit', 'showDelete', 'activeName'],
        data() {
            return {
                searchStr: '', //搜索关键词
                articles: [], //博客列表数据
                selItems: [], //
                loading: false,
                currentPage: 1,
                totalCount: -1,
                pageSize: 6,
                dustbinData: []
            }
        },
        mounted() {
            this.loading = true;
            this.loadBlogs(1, this.pageSize);
            this.loading = false;
        },
        methods: {
            searchClick() {
                /**
                 * 搜索点击
                 **/
            },
            deleteMany() {
                /**
                 * 批量删除
                 **/
            },
            currentChange(currentPage) {
                /**
                 * 翻页
                 **/
                this.currentPage = currentPage;
                this.loading = true;
                this.loadBlogs(this.currentPage, this.pageSize);
            },
            handleSelectionChange(val) {
                this.selItems = val;
            },
            itemClick(row) {
                /**
                 * 查看博客详情
                 **/
                this.$router.push({path: '/article/detail', query: {id: row.id}})
            },
            handleEdit(index, row) {
                /**
                 * 编辑博客
                 **/
                this.$router.push({path: '/article/edit', query: {from: this.activeName, id: row.id}});
            },
            handleDelete(index, row) {
                /**
                 * 删除博客
                 **/
                this.dustbinData.push(row.id);
                this.deleteToDustBin(row.state);
            },
            deleteToDustBin(state) {
                /**
                 * 添加至回收站
                 **/
            },
            loadBlogs(page, count) {
                /**
                 * 加载博客数据
                 **/
                var _this = this;
                APIblogList({
                    page: _this.currentPage,
                    pageSize: _this.pageSize,
                    searchStr: _this.searchStr,
                    state: _this.state
                }).then(res => {
                    _this.loading = false;
                    console.log("列表信息>>>>>>", res)
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 0) {
                            _this.articles = data.data.list;
                            _this.totalCount = data.data.total;
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

<style scoped lang="scss">
    .blog-table {
        .article-title {
            color: #409eff;
            cursor: pointer
        }

        .footer {
            display: flex;
            box-sizing: content-box;
            padding-top: 10px;
            padding-bottom: 0px;
            margin-bottom: 0px;
            justify-content: space-between;
        }
    }
</style>