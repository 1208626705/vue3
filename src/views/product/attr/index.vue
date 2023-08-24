<script setup lang="ts">
import category from "@/components/Category/index.vue"
import useCategoryStore from '@/stores/modules/category';
import {reactive, ref, watch} from "vue";
import {reqAddOrUpdateAttr, reqAttr, reqC3, reqRemoveAttr} from "@/api/product/attr";
import type {AttrResponseData, Attr} from "@/api/product/attr/type";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const $router = useRouter();
let categoryStore = useCategoryStore();
let attrArr = ref<Attr[]>([]);
// 场景显示
let scene = ref<number>(1);
// 监听三级联动
watch(() => categoryStore.c3Id, () => {
  if (categoryStore.c3Id) {
    getReqAttr()
  }


})
// 获取属性值方法
const getReqAttr = async () => {
  const {c1Id, c2Id, c3Id} = categoryStore;
  // console.log(c1Id, c2Id, c3Id)
  const res: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id);
  // console.log(res)
  attrArr.value = res.data;
}
//收集新增的属性的数据
let attrParams = reactive<Attr>({
  attrName: "",//新增的属性的名字
  attrValueList: [//新增的属性值数组
  ],
  categoryId: '',//三级分类的ID
  categoryLevel: 3,//代表的是三级分类
})
// 添加属性
const addAttr = () => {
  scene.value = 0;
  attrParams.attrName='';
  attrParams.categoryId=categoryStore.c3Id;
  attrParams.attrValueList=[];

}
// 修改属性
const updateAttr = (row:Attr) => {
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
  reqAddOrUpdateAttr(attrParams);
  scene.value = 0;

}
const deleteAttr = (row:Attr) => {
  reqRemoveAttr(row.id)
  getReqAttr();

}
const cancle = () => {

  scene.value = 1;

}
const addAttrValue = () => {
  // attrParams.categoryId=categoryStore.c3Id
  attrParams.attrValueList.push({
    valueName:""
  })
}

// 保存按钮
const save =async () => {
  // 发送请求
  let res = await reqAddOrUpdateAttr(attrParams);
  if(res.code==200){
    // 场景切换
    scene.value=1;
   ElMessage({
     type:'success',
     message:attrParams.id?"修改成功":"添加成功"

   })

    getReqAttr();
  }

}


</script>

<template>
  <!--  上面的三级菜单-->
  <el-card>
    <category :scene=" scene"></category>
  </el-card>

  <!--  下面的卡片-->
  <el-card style="margin: 10px 0">
    <div v-show="scene == 1">
      <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">添加属性
      </el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column label="序号" align="center" width="80px" prop="id">

        </el-table-column>
        <el-table-column label="属性名称" align="center" width="200px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称" align="center">
          <template #="{row,$index}">
            <el-tag style="margin: 5px" v-for="(item,index) in row.attrValueList" :key="index">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
          <template #="{ row, $index }">
            <el-button type="primary" icon="Edit" @click="updateAttr(row)"></el-button>
            <el-button type="primary" icon="Delete" @click="deleteAttr(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-show="scene == 0">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性值" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button :disabled="!attrParams.attrName" type="primary" icon="Plus" @click="addAttrValue">添加属性值
      </el-button>
      <el-button type="primary" @click="cancle"> 取消</el-button>
      <el-table border style="margin: 10px 0px" :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" ></el-table-column>
        <el-table-column label="属性值">
          <template #="{row,$index}">
            <el-input placeholder="请输入属性值名称" v-model="row.valueName"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{row,index}">
            <el-button type="primary" size="small" icon="Delete"
                       @click="attrParams.attrValueList.splice(index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" icon="Plus" @click="save">保存</el-button>
      <el-button type="primary" @click="cancle"> 取消</el-button>
    </div>
  </el-card>

</template>

<style scoped lang="scss">


</style>
