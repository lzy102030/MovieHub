import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import Layout from "@/views/Layout";

Vue.use(VueRouter)

const routes = [
    //登录
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue')
    },
    {
        path: '/movie',
        name: 'Movie',
        component: () => import('@/views/movie/Movie.vue')
    },
    {
        path: '/searchResult',
        name: 'SearchResult',
        component: () => import('@/views/movie/SearchResult.vue')
    },
    //主页
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/home/HomeView.vue'),
            },
            {
                path: 'category',
                name: 'category',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/movie/Category.vue')
            },
            // {
            //     path: 'searchResult',
            //     name: 'searchResult',
            //     // route level code-splitting
            //     // this generates a separate chunk (about.[hash].js) for this route
            //     // which is lazy-loaded when the route is visited.
            //     component: () => import(/* webpackChunkName: "about" */ '../views/movie/SearchResult.vue')
            // },
        ]
    },
    //个人中心
    {
        path: '/personal',
        name: 'Personal',
        component: () => import("@/views/user/UserInfo.vue"),
        children: [
            {
                path: '/personal/info',
                name: 'Info',
                component: () => import("@/views/user/Info.vue")
            },
            {
                path: '/personal/modify-password',
                name: 'ModifyPassword',
                component: () => import("@/views/user/ModifyPassword.vue")
            },
            {
                path: '/personal/mycollect',
                name: 'MyCollect',
                component: () => import("@/views/user/MyCollect.vue")
            },
            {
                path: '/personal/myHistory',
                name: 'MyHistory',
                component: () => import("@/views/user/History.vue")
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
