import {createRouter, createWebHashHistory} from 'vue-router'
import {constantRoute} from "@/router/router";

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes: constantRoute,
    scrollBehavior(){
        return {
            left:0,
            top:0
        }
    }
})

export default router
