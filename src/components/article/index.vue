<template>
    <el-container class="article-index">
        <el-main class="main">
            <!--tab start-->
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="全部文章" name="all">
                    <blogTable state="-1" :showEdit="false" :showDelete="false" :activeName="activeName"></blogTable>
                </el-tab-pane>
                <el-tab-pane label="已发表" name="post">
                    <blogTable state="0" :showEdit="true" :showDelete="true" :activeName="activeName"></blogTable>
                </el-tab-pane>
                <el-tab-pane label="草稿箱" name="draft">
                    <blogTable state="2" :showEdit="true" :showDelete="true" :activeName="activeName"></blogTable>
                </el-tab-pane>
                <el-tab-pane label="回收站" name="dustbin">
                    <blogTable state="1" :showEdit="false" :showDelete="true" :activeName="activeName"></blogTable>
                </el-tab-pane>
                <el-tab-pane label="博客管理" name="blogmana">
                    <blogTable state="3" :showEdit="false" :showDelete="true" :activeName="activeName"></blogTable>
                </el-tab-pane>
                <el-tab-pane label="博客配置" name="blogcfg">
                    <blogCfg></blogCfg>
                </el-tab-pane>

            </el-tabs>
            <!--tab end-->
        </el-main>
    </el-container>
</template>

<script>
    import blogCfg from './blogCfg';
    import blogTable from './blogTable';

    export default {
        name: "index",
        data() {
            return {
                activeName: "post"
            }
        },
        components: {
            blogCfg,
            blogTable
        }
    }
</script>

<style scoped lang="scss">

    .article-index > .main {
        display: flex;
        flex-direction: column;
        padding-left: 0px;
        background-color: #fff;
        padding-top: 0px;
    }
</style>