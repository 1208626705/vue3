<script setup lang="ts">
import {onMounted, ref} from "vue";
import useCategoryStore from '@/stores/modules/category';
let categoryStore = useCategoryStore();
// 初始化
onMounted(() => {
  getC1();

})
defineProps(['scene'])


// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getC1() {
  categoryStore.getC1()

}

const handler1 = () => {
  categoryStore.getC2();
  categoryStore.c2Id='';
  categoryStore.c3Id='';
  categoryStore.c3Arr=[];
}
const handler2 = () => {
  categoryStore.getC3();
  categoryStore.c3Id='';
}

</script>

<template>
  <el-form :inline="true">
    <el-form-item label="一级菜单">
      <el-select
          v-model="categoryStore.c1Id"
          placeholder="请选择"
          @change="handler1"
          :disabled="scene==0"
      >
        <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"

        />
      </el-select>
    </el-form-item>
    <el-form-item label="二级菜单">
      <el-select
          v-model="categoryStore.c2Id"
          placeholder="请选择"
          @change="handler2"
          :disabled="scene==0"
      >
        <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
        />
      </el-select>

    </el-form-item>
    <el-form-item label="三级菜单">
      <el-select
          v-model="categoryStore.c3Id"
          placeholder="请选择"
          :disabled="scene==0"
      >
        <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
