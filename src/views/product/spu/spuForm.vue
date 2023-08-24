<script setup lang="ts">
import {computed, nextTick, onMounted, ref} from "vue";
import {
  AllTradeMark, HasSaleAttr,
  HasSaleAttrResponseData, SaleAttr,
  SaleAttrResponseData, SpuData,
  SpuHasImg, SpuImg,
  Trademark
} from "@/api/product/spu/type";
import {reqAllSaleAttr, reqAllTradeMark, reqSpuHasSaleAttr, reqSpuImageList} from "@/api/product/spu";
import type {UploadProps} from "element-plus";
import {ElInput, ElMessage} from "element-plus";
import {Plus} from "@element-plus/icons-vue";

const emits = defineEmits(['changeScene']);
const props = defineProps(['spu']);
let allTradeMark = ref<Trademark>([]);
let imageList = ref<SpuImg>([]);
let saleAttr = ref<SaleAttr>([]);
let allSaleAttr = ref<HasSaleAttr>([]);
// 通知父组件切换场景
const cancel = () => {
  emits('changeScene', 0)
}
onMounted(() => {
  getReqAllTradeMark()
})
//用于展示 存储新的spu
let spuParams = ref<SpuData>({
  // category3Id: "",//收集三级分类的ID
  // spuName: "",//SPU的名字
  // description: "",//SPU的描述
  // tmId: '',//品牌的ID
  // spuImageList: [],
  // spuSaleAttrList: [],
});
const getReqAllTradeMark = async () => {
  spuParams.value = props.spu;
  // console.log(spuParams.value)
  // 获取全部的SPU的品牌的数据
  let res: AllTradeMark = await reqAllTradeMark();
  allTradeMark.value = res.data;
  //  获取某一个已有的SPU下全部商品的图片地址
  let resImageList: SpuHasImg = await reqSpuImageList(spuParams.value.id);
  imageList.value = resImageList.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  });
  //获取某一个已有的SPU拥有多少个销售属性
  let resSaleAttr: SaleAttrResponseData = await reqSpuHasSaleAttr(spuParams.value.id);
  saleAttr.value = resSaleAttr.data;
  let resAllSaleAttr: HasSaleAttrResponseData = await reqAllSaleAttr(spuParams.value.id);
  allSaleAttr.value = resAllSaleAttr.data
}
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove = () => {
  // 删除动画
}
// 照片墙预览图片
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
const handlerUpload = (file: any) => {
  if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif'|| file.type == 'image/jpg' ) {
    if (file.size / 1024 / 1024 < 20) {
      return true;
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件务必小于3M'
      })
      return false;
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必PNG|JPG|GIF'
    })
    return false;
  }
}
// 过滤出没有的
let unSelectSaleAttr = computed(()=>{
  // return allSaleAttr.value.filter(attr => saleAttr.value.some(saleAttr => saleAttr.name!= attr.name));
  //全部销售属性:颜色、版本、尺码
  //已有的销售属性:颜色、版本
  let unSelectArr = allSaleAttr.value.filter(item => {
    return saleAttr.value.every(item1 => {
      return item.name != item1.saleAttrName;
    });
  })
  return unSelectArr;
  // return allSaleAttr.value.filter(attr => !saleAttr.value.some(selectedAttr => selectedAttr.name === attr.name));



})
</script>

<template>
  <el-form label-width="120px">
    <el-form-item label="SPU名称：">
      <!--      eslint-disable-next-line vue/no-mutating-prop-->
      <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌：">
      <el-select placeholder="SPU品牌" v-model="spuParams.tmId">
        <el-option
            v-for="item in allTradeMark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述：">
      <el-input type="textarea" placeholder="请输入SPU描述" v-model="spuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU照片：">
      <el-upload v-model:file-list="imageList" action="/api/admin/product/fileUpload" list-type="picture-card"
                 :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
        <el-icon>
          <Plus/>
        </el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 500px; height: 500px"/>
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性：">
      <el-select placeholder="SPU销售属性">

                <el-option
                    v-for="item in unSelectSaleAttr"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 10px" icon="Plus">添加销售属性</el-button>
      <el-table border style=" margin: 10px 0" :data="saleAttr">
        <el-table-column label="序号" align="center" prop="id"></el-table-column>
        <el-table-column label="销售属性名称" align="center" prop="saleAttrName"></el-table-column>
        <el-table-column label="销售属性值" align="center">
          <template #="{row,index}">
            <el-tag
                style="margin:0 5px"
                v-for="tag in row.spuSaleAttrValueList"
                :key="tag.id"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-button type="primary"  @click="showInput" size="small"> + </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #="{row,index}">
            <el-button type="primary" icon="Delete" size="small" color="red" @click="saleAttr.splice(index,1)">删除</el-button>
          </template>

        </el-table-column>

      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>
