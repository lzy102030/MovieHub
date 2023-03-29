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
    //登录1
    {
        path: '/login1',
        name: 'Login1',
        component: () => import('@/views/login/Login1.vue')
    },
    {
        path: '/movie',
        name: 'Movie',
        component: () => import('@/views/movie/Movie.vue')
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
                path: 'about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
            },

        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
