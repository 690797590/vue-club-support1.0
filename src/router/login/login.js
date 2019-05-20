// import Login from '@/components/login/login'
const Login = () => import(/* webpackChunkName: "group-login" */ '@/components/login/login');

const routes = [
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
            keepAlive: false,
            hidden: true,
        }
    }
]

export default routes;