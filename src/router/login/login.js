// import Login from '@/components/login/login'
const Login = () => import(/* webpackChunkName: "group-login" */ '@/components/login/login');

const routes = [
    {
        path: '/login',
        component: Login,
        hidden: true,
        meta: {
            title: '登录',
            keepAlive: false,
        }
    }
]

export default routes;