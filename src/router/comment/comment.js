const Home = () => import(/* webpackChunkName: "group-comment" */ '@/components/home');
const commentIndex = () => import(/* webpackChunkName: "group-comment" */ '@/components/comment/index');
const commentEdit = () => import(/* webpackChunkName: "group-comment" */ '@/components/comment/edit');

const routes = [
    {
        path: '/home',
        component: Home,
        meta:{
            truePath:'/comment',
            hidden: false,
            title:'评论管理',
            iconClass:'el-icon-chat-line-round',
            leaf: false
        },
        children:[
            {
                path: '/comment/index',
                component: commentIndex,
                meta: {
                    title: '评论审核',
                    keepAlive: true,
                    hidden: false,
                    leaf: true
                }
            },
            {
                path: '/comment/edit',
                component: commentEdit,
                meta: {
                    title: '评论信息管理',
                    keepAlive: false,
                    hidden: false,
                    leaf: true
                }
            },
            {
                path: '/comment',
                meta: {
                    hidden: true,
                },
                redirect: '/comment/index',
            },
        ]
    }
]

export default routes;