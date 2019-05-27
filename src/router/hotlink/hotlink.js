const Home = () => import(/* webpackChunkName: "group-hotlink" */ '@/components/home');
const hotlinkIndex = () => import(/* webpackChunkName: "group-hotlink" */ '@/components/hotlink/index');
const hotlinkEdit = () => import(/* webpackChunkName: "group-hotlink" */ '@/components/hotlink/edit');

const routes = [
    {
        path: '/home',
        component: Home,
        meta:{
            truePath:'/hotlink',
            hidden: false,
            title:'友情链接',
            iconClass:'el-icon-paperclip',
            leaf: false
        },
        children:[
            {
                path: '/hotlink/index',
                component: hotlinkIndex,
                meta: {
                    title: '友情链接管理',
                    keepAlive: true,
                    hidden: false,
                    leaf: true
                }
            },
            {
                path: '/hotlink/edit',
                component: hotlinkEdit,
                meta: {
                    title: '友情链接编辑',
                    keepAlive: false,
                    hidden: false,
                    leaf: true
                }
            },
            {
                path: '/hotlink',
                meta: {
                    hidden: true,
                },
                redirect: '/hotlink/index',
            },
        ]
    }
]

export default routes;