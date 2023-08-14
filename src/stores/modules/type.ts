import type {RouteRecordRaw} from "vue-router";

export interface UserState{
    token:string|null,
    menuRouters:RouteRecordRaw[]|null,
    username:string|null,
    avatar:string|null,
}
