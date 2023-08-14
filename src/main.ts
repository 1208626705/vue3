
import { createApp } from 'vue'
//引入仓库
import pinia from "@/stores";

import App from './App.vue'
import router from '@/router/index'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
// import dotenv from 'dotenv'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './permisstion';

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue';



// 从.env加载环境变量
// dotenv.config();
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.mount('#app')
