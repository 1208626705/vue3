<script setup lang="ts">
import {watch,ref,nextTick} from "vue";
import useLayOutSettingStore from "@/stores/modules/setting";
let layOutSettingStore = useLayOutSettingStore();
let flag = ref(true)
watch(()=>layOutSettingStore.refsh,()=>{
  // console.log(123)
  flag.value=false;
  nextTick(()=>{
    flag.value=true;
  })
})
</script>

<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all .3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
