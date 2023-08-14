<script setup lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";
import {useRoute} from 'vue-router';
import useLayOutSettingStore from '@/stores/modules/setting';
//获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore();

let $route = useRoute();
const changeIcon = () => {
  //图标进行切换
  LayOutSettingStore.fold = !LayOutSettingStore.fold
}


</script>
<template>
  <el-icon @click = "changeIcon" style="margin-right: 10px">
    <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>


<!--    面包屑-->
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item,index) in  $route.matched" :key="index">
        <!--        名字-->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span class="title">{{ item.meta.title }}</span>

      </el-breadcrumb-item>
    </el-breadcrumb>
</template>


<style scoped lang="scss">
.title{
  margin-left: 5px;
}
</style>
