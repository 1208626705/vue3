// 创建用户相关的仓库
import {defineStore} from "pinia";
import {reqLogin, reqUserInfo,reqLogout} from "@/api/user";
import type { loginResponseData} from "@/api/user/type";
import {constantRoute} from "@/router/router";
import type {UserState} from "@/stores/modules/type";

const useUserStore = defineStore("User", {
    // 小仓库存储数据的地方
    state: (): UserState => {
        return {
            token: localStorage.getItem("token"),
            menuRouters: constantRoute, // 仓库生成菜单
            username: '',
            avatar: "",
        }
    },
    // 异步逻辑
    actions: {
        // 用户登录
        async userLogin(data: loginResponseData) {
            const result: loginResponseData = await reqLogin(data);
            if (result.code == 200) {
                this.token = result.data
                localStorage.setItem("token", result.data )
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 获取用户数据
        async userInfo() {
            const result: any = await reqUserInfo();
            // console.log(result)
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message))
            }

        },
        async logout() {

            const result = await reqLogout();
            this.username = '';
            this.avatar = '';
            // this.menuRouters = [];
            this.token = '';

            localStorage.removeItem("token");


        },

    },

    getters: {}

})
export default useUserStore;
