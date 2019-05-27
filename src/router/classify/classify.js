const Home = () => import(/* webpackChunkName: "group-classify" */ '@/components/home');
const classifyList = () => import(/* webpackChunkName: "group-classify" */ '@/components/classify/list');

const routes = [
    {
        path: '/home',
        component: Home,
        meta:{
            truePath:'/classify',
            hidden: false,
            title:'博客类别管理',
            iconClass:'el-icon-guide',
            leaf: false
        },
        children:[
            {
                path: '/classify/list',
                component: classifyList,
                meta: {
                    title: '博客类别信息管理',
                    keepAlive: true,
                    hidden: false,
                    leaf: true
                },
            },
            {
                path: '/classify',
                meta: {
                    hidden: true,
                },
                redirect: '/classify/list',
            }
        ]
    }
]

export default routes;