const Home = () => import(/* webpackChunkName: "group-system" */ '@/components/home');
const systemPassword = () => import(/* webpackChunkName: "group-system" */ '@/components/system/password');

const routes = [
    {
        path: '/home',
        component: Home,
        meta:{
            truePath:'/system',
            hidden: false,
            title:'系统管理',
            iconClass:'el-icon-data-line',
            leaf: false
        },
        children:[
            {
                path: '/system/password',
                component: systemPassword,
                meta: {
                    title: '修改密码',
                    keepAlive: true,
                    hidden: false,
                    leaf: true
                },
            },
            {
                path: '/system',
                meta: {
                    hidden: true,
                },
                redirect: '/system/password',
            }
        ]
    }
]

export default routes;