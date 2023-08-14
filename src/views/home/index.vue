<script setup lang="ts">
// 组件挂载
import {onMounted} from "vue";
import useUserStore from "@/stores/modules/user";
import {reqUserInfo} from "@/api/user";
import {HomeFilled} from "@element-plus/icons-vue";

let userStore = useUserStore();
// onMounted( async () => {
//   await userStore.userInfo();
// })
</script>

<template>
  home
</template>

<style scoped>

</style>
