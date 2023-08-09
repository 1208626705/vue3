<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form ref="ruleFormRef" class="login_form"   :size="formSize" :model="loginFrom" :rules="rules">
          <h1>hello</h1>
          <h2>欢迎来到tan学习</h2>
          <!-- 第一行-->
          <el-form-item prop="username">
            <el-input

                type="text"
                :prefix-icon="User"
                v-model="loginFrom.username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginFrom.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading=loading class="login_btn" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>
<script setup lang="ts">
import {User, Lock} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import useUserStore from "@/stores/modules/user";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";
import {getTime} from "@/utils/time";
import type {LoginFormData, loginResponseData} from "@/api/user/type";

let useStore = useUserStore();
let $router = useRouter();
const formSize = ref('default')

// 表单数据
let loginFrom = reactive<LoginFormData>({
  username: 'admin',
  password: '111111'
})

let loading = ref(false)
// eslint-disable-next-line no-import-assign
const login = async () => {
  loading.value = true;

  try {
    await useStore.userLogin(loginFrom);
    $router.push("/home")
    ElNotification({
      type: "success",
      message: "登录成功",
      title: `Hi,${getTime()}好`
    })
  } catch (e) {
    ElNotification({
      type: "error",
      message: (e as Error).message,
    })

  }
  loading.value = false
}

//定义表单校验需要配置对象
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rules = reactive({

  username: [
    {required: true, message: '账号长度至少3位', min:3, trigger: 'change'}
  ],
  password: [
    {required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change'}
  ]
})

</script>



<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;

    h1 {
      font-size: 40px;
      color: white;
    }

    h2 {
      font-size: 20px;
      color: white;
    }

    .login_btn {
      width: 100%;
    }


  }
}
</style>
