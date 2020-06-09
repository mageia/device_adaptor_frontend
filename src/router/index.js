import Vue from 'vue'
import Router from 'vue-router'
import {
    routers
} from './router'
import {
    getToken
} from '@/utils/auth'
Vue.use(Router)

const router = new Router({
    routes: routers,
})

router.beforeEach((to, from, next) => {
    const whiteList = ['/login']
    if (getToken()) {
        if (to.name === 'Login') {
            next({
                path: '/'
            })
        } else {
            next()
        }
    } else {
        // debugger
        // console.log(to)
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
