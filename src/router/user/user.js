const Home = () => import(/* webpackChunkName: "group-user" */ '@/components/home');
const userIndex = () => import(/* webpackChunkName: "group-user" */ '@/components/user/index');
const userEdit = () => import(/* webpackChunkName: "group-user" */ '@/components/user/edit');

const routes = [
    {
        path: '/home',
        component: Home,
        meta:{
            truePath:'/user',
            hidden: false,
            title:'用户管理',
            iconClass:'el-icon-user',
            leaf: false
        },
        children:[
            {
                path: '/user/index',
                component: userIndex,
                meta: {
                    title: '修改个人信息',
                    keepAlive: true,
                    hidden: false,
                    leaf: true
                }
            },
            {
                path: '/user/edit',
                component: userEdit,
                meta: {
                    title: '个人信息编辑',
                    keepAlive: false,
                    hidden: false,
                    leaf: true
                }
            },
            {
                path: '/user',
                meta: {
                    hidden: true,
                },
                redirect: '/user/index',
            },
        ]
    }
]

export default routes;