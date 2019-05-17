import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import './utils/filter_utils.js'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios

/**
 * TODO 设置路由
 **/
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {x: 0, y: to.meta.savedPosition || 0}
        }
    }
})

/**
 * TODO 修改页面标题
 **/
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})

/**
 * TODO 初始化Vue实例
 **/
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
