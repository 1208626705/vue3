<script setup lang="ts">
import category from "@/components/Category/index.vue"
import useCategoryStore from '@/stores/modules/category';
let categoryStore = useCategoryStore();
</script>

<template>
<!--  上面的三级菜单-->
<el-card >
  <category></category>

</el-card>
<!--  下面的卡片-->
<el-card  style="margin: 10px 0">
  <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id">添加属性</el-button>
  <el-table border  style="margin: 10px 0">
    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
    <el-table-column label="属性名称"  align="center" width="200px"></el-table-column>
    <el-table-column label="属性值名称" align="center" ></el-table-column>
    <el-table-column label="操作" align="center" width="200px"></el-table-column>
  </el-table>
</el-card>
</template>

<style scoped lang="scss">


</style>
