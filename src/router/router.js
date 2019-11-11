const _import = require('./_import_production')

import Layout from '@/views/layout'

const Login = _import('login')
const Home = _import('Home')

const InputIndex = _import('input/index')
const InputDetail = _import('input/detail')
const InputPoint = _import('input/point')
const OutputIndex = _import('output/index')
const OutputDetail = _import('output/detail')

export const loginRouter = {
    path: '/login',
    name: 'Login',
    component: Login,
}

// 继承layout父模版，并在左侧主导航显示的路由
export const appRouter = [{
    path: '/',
    name: 'index',
    component: Layout,
    redirect: '/home',
    children: [{
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
            title: '',
            icon: ''
        }
    }]
}, {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue')
}, {
    path: '/input',
    name: 'input',
    component: Layout,
    redirect: '/input/index',
    children: [{
        path: 'index',
        name: 'input_index',
        component: InputIndex,
        meta: {
            title: '',
            icon: ""
        }
    }]
}, {
    path: '/output',
    name: 'output',
    component: Layout,
    redirect: '/output/index',
    children: [{
        path: 'index',
        name: 'output_index',
        component: OutputIndex
    }]
}]

// 继承layout父模版，但不在左侧导航显示的路由
export const otherRouter = [{
    path: '/',
    name: 'otherRouter',
    component: Layout,
    redirect: '/home',
    children: [{
        path: '/output/detail/:id',
        name: 'output_detail',
        component: OutputDetail
    }, {
        path: '/input/detail/:id',
        name: 'input_detail',
        component: InputDetail
    }, {
        path: '/input/point/:id',
        name: 'input_point',
        component: InputPoint
    }]
}]

export const routers = [
    loginRouter,
    ...appRouter,
    ...otherRouter
]