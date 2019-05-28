import notFound from '@/components/404'
import Home from '@/components/home'

/**
 * TODO 登陆相关路由
 * loginRouter
 **/
import loginRouter from './login/login';
import hotlinkRouter from './hotlink/hotlink';
import articleRouter from './article/article';
import classifyRouter from './classify/classify';
import commentRouter from './comment/comment';
import userRouter from './user/user';
import systemRouter from './system/system';

const normalRouter = [
    {
        path: '/',
        redirect: '/login',
        meta: {
            hidden: true
        }
    },
    {
        path: '/404',
        component: notFound,
        meta: {
            title: '404 Not Found',
            keepAlive: false,
            hidden: true
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            // title: '首页',
            keepAlive: false,
            hidden: true
        }
    },
]

const notFoundRouter = [{
    path: '*',
    redirect: {
        path: '/404'
    },
    meta: {
        title: '404 Not Found',
        keepAlive: false,
        hidden: true
    }
}]

// const routes = normalRouter.concat(loginRouter, notFoundRouter);
const routes = [...normalRouter, ...loginRouter, ...hotlinkRouter, ...notFoundRouter, ...articleRouter, ...classifyRouter, ...commentRouter, ...userRouter, ...systemRouter];
export default routes;