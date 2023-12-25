<script setup>
import { ref } from 'vue'
import { getCurrentUserInfoService, getCurrentUserRoleService, getCurrentUserPermissionService } from '../../api/user'
import { useUserStore } from '@/stores'
import { RefreshRight } from '@element-plus/icons-vue'

const userInfo = ref({})
const userStore = useUserStore()
const auth = ref({})

const getUserInfo = async () => {
  const res = await getCurrentUserInfoService()
  userInfo.value = res.data.data
  userStore.setUser(res.data.data)
}

const getUserPermission = async (key) => {
  const res1 = await getCurrentUserRoleService()
  const res2 = await getCurrentUserPermissionService()
  auth.value.role = res1.data.data
  auth.value.permission = res2.data.data
  userStore.setUserPermission(auth.value)
  if (key === 1) ElMessage.success("刷新角色权限成功")
}

if (!userStore.user) {
  getUserInfo()
} else {
  userInfo.value = userStore.user
}
if (!userStore.auth) {
  getUserPermission()
} else {
  auth.value = userStore.auth
}
</script>

<template>
  <page-container title="个人信息">
    <el-card class="box-card">
      工号：<el-tag type="success">{{ userInfo.uid }}</el-tag>
    </el-card>
    <el-card class="box-card">
      昵称：<el-tag type="success">{{ userInfo.uname }}</el-tag>
    </el-card>
    <el-card class="box-card">
      角色：<el-tag type="success">{{ auth.role }}</el-tag>
      <el-button type="success" :icon="RefreshRight" @click="getUserPermission(1)" circle />
    </el-card>
  </page-container>
</template>


<style lang="scss" scoped>
.box-card {
  margin: 5px;
}
</style>
