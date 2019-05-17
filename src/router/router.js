import notFound from '@/components/404.vue'

/**
 * TODO 登陆相关路由
 * loginRouter
 **/
import loginRouter from './login/login';

const normalRouter = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/404',
        component: notFound,
        meta: {
            title:'404 Not Found',
            keepAlive: false,
        }
    }
]

const notFoundRouter = [{
    path: '*',
    redirect: {
        path: '/404'
    },
    meta: {
        title: '404 Not Found',
        keepAlive: false,
    }
}]

// const routes = normalRouter.concat(loginRouter, notFoundRouter);
const routes = [...normalRouter, ...loginRouter, ...notFoundRouter];
export default routes;