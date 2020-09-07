import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path: '*',
        component: () => import('@/views/404.vue')
    },
    {
        path: '/index.html',
        redirect: '/home'
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/home.vue')
    },
    {
        path: '/project/:project',
        component: () => import('@/views/project/main.vue'),
        children: [
            {
                path: '/',
                name: 'project.overview',
                component: () => import('@/views/project/overview.vue')
            },
            {
                path: 'specs/:id',
                name: 'project.specs',
                component: () => import('@/views/project/specs.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
