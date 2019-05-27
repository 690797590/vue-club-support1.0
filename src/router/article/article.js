const Home = () => import(/* webpackChunkName: "group-article" */ '@/components/home');
const articleIndex = () => import(/* webpackChunkName: "group-article" */ '@/components/article/index');
const articleEdit = () => import(/* webpackChunkName: "group-article" */ '@/components/article/edit');

const routes = [
    {
        path: '/home',
        component: Home,
        meta:{
            truePath:'/article',
            hidden: false,
            title:'博客管理',
            iconClass:'el-icon-edit',
            leaf: false
        },
        children:[
            {
                path: '/article/index',
                component: articleIndex,
                meta: {
                    title: '博客信息管理',
                    keepAlive: true,
                    hidden: false,
                    leaf: true
                }
            },
            {
                path: '/article/edit',
                component: articleEdit,
                meta: {
                    title: '写博客',
                    keepAlive: false,
                    hidden: false,
                    leaf: true
                }
            },
            {
                path: '/article',
                meta: {
                    hidden: true,
                },
                redirect: '/article/index',
            },
        ]
    }
]

export default routes;