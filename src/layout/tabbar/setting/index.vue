<script setup lang="ts">
import fullScreen from '@/components/FullScreen.vue'
import useLayOutSettingStore from '@/stores/modules/setting';
import useUserStore from "@/stores/modules/user";
import {ArrowDown} from '@element-plus/icons-vue';
import {useRoute,useRouter} from "vue-router";

let $router = useRouter();
let $route = useRoute();
let layOutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
const updateRefresh = () => {
  layOutSettingStore.refsh = !layOutSettingStore.refsh;
}
const logout =  async () => {
  await userStore.logout();
  $router.push({path: '/login', query: {redirect: $route.path}});
}
</script>
<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
  <full-screen></full-screen>
  <el-button size="small" icon="Setting" circle></el-button>
  <img :src="userStore.avatar" style="width: 24px;height: 24px;margin:0px 10px;border-radius: 50%;">
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<style scoped lang="scss">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
