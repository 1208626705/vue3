<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {reqAddOrUpdateTrademark, reqHasTrademark} from "@/api/product/trademark";
import {ResponseData} from "@/api/acl/menu/type";
import {TradeMarkResponseData} from "@/api/product/trademark/type";
import {ElMessage, UploadProps} from "element-plus";
import type {Trademark} from "@/api/product/spu/type";
import {Plus} from "@element-plus/icons-vue";
import {types} from "sass";
import String = types.String;
//多少页
const pageNo = ref<number>(1)
// 个数
const pageSize = ref<number>(3)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const total = ref<number>(0)

const small = ref(false)
const tableData = ref<TradeMarkResponseData>([])
let dialogFormVisible = ref<boolean>(false)
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})
let title = ref<string>();

// 请求数据方法
const getReqHasTrademark = async () => {
  const responseData = await reqHasTrademark(pageNo.value, pageSize.value);
  if (responseData.code == 200) {
    total.value = responseData.data.total
    tableData.value = responseData.data.records
  }
}
// 组件初始化
onMounted(async () => {
  await getReqHasTrademark();

})
//页码发生变化
const changePageNo = () => {
  getReqHasTrademark();
}
const sizeChange = () => {
  getReqHasTrademark();
}
// 点击添加品牌或者修改品牌按钮
const addTrademark = () => {
  title.value = "添加品牌"
  dialogFormVisible.value = true
  // 清空数据
  trademarkParams.tmName = '';
  trademarkParams.id = '';
  trademarkParams.logoUrl = '';
}
// 修改品牌按钮
const editTrademark = (row) => {
  title.value = "修改品牌"
  dialogFormVisible.value = true
  trademarkParams.logoUrl = row.logoUrl;
  trademarkParams.id = row.id;
  trademarkParams.tmName = row.tmName;
}
const deleteTrademark = (row) => {

}
// 取消按钮
const cancel = () => {
  dialogFormVisible.value = false
}
// 提交按钮
const confirm = async () => {
  // 取消这个框
  dialogFormVisible.value = false
  const result = await reqAddOrUpdateTrademark(trademarkParams);
  ElMessage.success(result.code.toString());
  getReqHasTrademark();


}


const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {

  trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
//  自定义校验规则
const validatorTmName = (rule:any,value:any,callBack:any) => {

  if(value.trim().length>=2){
    callBack()
  }else {
    callBack(new Error("品牌位数未大于2位"))
  }
}
const rules = {
  tmName: [
    { required: true,trigger: 'blur', validator:validatorTmName },
  ],
  logoUrl: []
}

</script>

<template>
  <el-card class="box-card">
    <!--添加品牌按钮-->
    <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
    <!--    数据详情-->
    <el-table :data="tableData" border style="width: 100%;margin: 10px 0;">
      <el-table-column prop="id" label="序号" width="100" align="center"/>
      <el-table-column label="品牌名称">
        <template #="{ row, $index }">
          {{ row.tmName }}
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row, $index }">
          <img :src=row.logoUrl style="width: 40px;height: 40px">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button type="primary" icon="Edit" @click="editTrademark(row)"></el-button>
          <el-button type="primary" icon="Delete" @click="deleteTrademark(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页器-->
    <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :small="small"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="total"
        @current-change="changePageNo"
        @size-change="sizeChange"
    />

  </el-card>
  <!--  对话框-->
  <!-- Form -->
  <el-dialog v-model="dialogFormVisible" :title="title">
    <el-form style="width: 80%" :model="trademarkParams" :rules="rules">
      <el-form-item label="品牌名称：" label-width="100px" prop="tmName">
        <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="LOGO：" label-width="100px" prop="logoUrl">
        <!--        上传组件-->
        <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>

        </el-upload>

      </el-form-item>


    </el-form>
    <!--    剧名插槽 footer-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">
          提交
        </el-button>
      </span>
    </template>


  </el-dialog>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
