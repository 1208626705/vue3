<script setup lang="ts">
import category from "@/components/Category/index.vue";
import useCategoryStore from "@/stores/modules/category";
import {onMounted, ref, watch} from "vue";
import {reqHasSpu} from "@/api/product/spu";
import {HasSpuResponseData, Records, SpuData} from "@/api/product/spu/type";
import spuForm from "@/views/product/spu/spuForm.vue";
import skuForm from "@/views/product/spu/skuForm.vue";

let categoryStore = useCategoryStore();
let pageNum = ref<number>(1);
let pageSize = ref<number>(9);
let total = ref<number>(0);
// 搞场景切换的 0显示默认显示spu 1添加修改spu 2添加修改sku
let scene = ref<number>(0);
let records = ref<Records>([]);
let spu = ref<SpuData>();

// 监听三级分类数据
watch(() => categoryStore.c3Id, () => {
  if (categoryStore.c3Id) {
    getReqHasSpu();
  }
})
const getReqHasSpu = async () => {
  const res: HasSpuResponseData = await reqHasSpu(pageNum.value, pageSize.value, categoryStore.c3Id);
  records.value = res.data.records
  total.value = res.data.total

}
const addSpu = () => {
  scene.value = 1
}
const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value = row;

}
// 自定义事件 子组件向父组件传参
const changeScene = (value: number) => {
  scene.value = value
}


</script>

<template>
  <div>
    <!--    三级联动-->
    <category></category>

    <el-card style="margin: 10px 0">
      <div v-if="scene == 0">
        <el-button type="primary" icon="Plus" @click="addSpu">添加SPU</el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column label="序号" align="center" type="index" width="80px" prop="id"></el-table-column>
          <el-table-column label="id" align="center" prop="tmId"></el-table-column>
          <el-table-column label="SPU名称" align="center" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" align="center" prop="description"></el-table-column>
          <el-table-column label="操作" align="center">
            <template #="{row,index}">
              <el-button type="primary" size="small" title="添加SKU" icon="Plus"></el-button>
              <el-button type="primary" size="small" title="修改SPU" icon="Edit" @click="updateSpu(row)"></el-button>
              <el-button type="primary" size="small" title="查看SKU" icon="View"></el-button>
              <el-button type="primary" size="small" title="删除SKU" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="pageNum"
            v-model:page-size="pageSize"
            :page-sizes="[3,6,9]"
            :small=false
            :disabled=false
            :background=true
            layout="prev, pager,next,jumper,->, total, sizes,"
            :total=total
            @size-change="getReqHasSpu"
            @current-change="getReqHasSpu"
        />
      </div>

      <!--      添加修改spu-->
      <spuForm v-else-if="scene == 1" @changeScene="changeScene" :spu="spu"></spuForm>
      <!--      添加修改sku-->
      <skuForm v-else></skuForm>

    </el-card>
  </div>


</template>

<style scoped>

</style>
