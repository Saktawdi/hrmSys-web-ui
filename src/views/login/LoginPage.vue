<script setup>
import { userLoginService } from '@/api/user.js'
import { User, Lock } from '@element-plus/icons-vue'
// import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const form = ref()
const formModel = ref({
  uid: '',
  upassword: ''
})
//1.非空校验 message消息提示，trigger为触发校验的时机
//2.长度校验，min：xx,max:xx
//3.正则校验 \S 非空字符
//4.rule 当前校验规则的相关信息
//value当前校验表单元素目前的表单值
//callback 无论成功还是失败 都需要callback 回调
//  -callback（）校验成功
//  -callback（new error(错误信息)） 校验失败
const rules = {
  uid: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 12, message: '用户名必须是1-12位的字符', trigger: 'blur' }
  ],

  upassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是 6-15位 的非空字符',
      trigger: 'blur'
    }
  ]
}

const userStore = useUserStore()
const router = useRouter()

const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.data)
  ElMessage.success('登陆成功')
  router.push('/')
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
      >
        <el-form-item>
          <h1>登录</h1>
          <h3>----人力资源管理系统</h3>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.uid"
            :prefix-icon="User"
            placeholder="请输入工号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="upassword">
          <el-input
            v-model="formModel.upassword"
            name="upassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <!-- <el-checkbox>记住我</el-checkbox> -->
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background: url('@/assets/login.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
