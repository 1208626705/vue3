<script setup lang="ts">


import Logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import Main from "@/layout/main/index.vue";
import Tabbar from "@/layout/tabbar/index.vue";
import useUserStore from "@/stores/modules/user";
import useLayOutSettingStore from "@/stores/modules/setting";

let userStore = useUserStore();
// eslint-disable-next-line no-import-assign,no-redeclare
let layOutSettingStore: any = useLayOutSettingStore();
import {useRoute} from 'vue-router';

let $route = useRoute();

</script>

<template>


  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{fold:!!layOutSettingStore.fold}">
      <!--      logo-->
      <Logo></Logo>
      <!--       滚动条-->
      <el-scrollbar class="scrollbar">
        <!--       滚动组件-->
        <el-menu class="el-menu" text-color="white" background-color="#001529" :collapse="layOutSettingStore.fold">
          <Menu :menuList="userStore.menuRouters"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{fold:!!layOutSettingStore.fold}">
      <Tabbar></Tabbar>
    </div>
    <!-- 内容展示区域 -->
    <div class="layout_main" :class="{fold:!!layOutSettingStore.fold}">
      <!--      router-view-->
      <Main></Main>
    </div>
  </div>

</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;
    &.fold {
      width: $base-menu-min-width;
      //left: $base-menu-min-width;
    }
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {

        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }

  }
}

</style>
