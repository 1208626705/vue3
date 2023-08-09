// 创建用户相关的仓库
import {defineStore} from "pinia";
import {reqLogin} from "@/api/user";
import type {LoginFormData, loginResponseData} from "@/api/user/type";
import {constantRoute} from "@/router/router";
import type {UserState} from "@/stores/modules/type";

const useUserStore = defineStore("User", {
    // 小仓库存储数据的地方
    state: ():UserState => {
        return {
            token: localStorage.getItem("token"),
            menuRouters:constantRoute, // 仓库生成菜单
        }
    },
    // 异步逻辑
    actions: {
        async userLogin(data: LoginFormData) {
            const result:loginResponseData = await reqLogin(data);
            if (result.code == 200) {
                this.token = result.data.token
                localStorage.setItem("token",result.data.token)
            }else {
                return  Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters: {}

})
export default useUserStore;
