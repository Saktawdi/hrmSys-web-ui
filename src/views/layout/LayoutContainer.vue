<script setup>
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import { ElMessage, ElMessageBox } from 'element-plus'
const userStore = useUserStore()
const router = useRouter()
onMounted(() => {
  // userStore.user.user_pic = "https://www.freeimg.cn/i/2023/12/27/658befd25c2f8.png"
})

const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('你确认要退出吗', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userStore.removeToken()
    userStore.removeUser()
    userStore.removeUserPermission()
    router.push('/login')
  } else {
    router.push(`/user/${key}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo">HRMS</div>
      <el-menu active-text-color="#ffd04b" background-color="#232323" :default-active="$route.path" text-color="#fff"
        router>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/sys">
          <template #title>
            <el-icon>
              <Lock />
            </el-icon>
            <span>系统设置</span>
          </template>
          <el-menu-item index="/sys/role">
            <el-icon>
              <Connection />
            </el-icon>
            <span>角色管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/menu">
            <el-icon>
              <Operation />
            </el-icon>
            <span>菜单管理</span>
          </el-menu-item>
          <el-menu-item index="/sys/user">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/employee">
          <template #title>
            <el-icon>
              <Avatar />
            </el-icon>
            <span>人事档案</span>
          </template>
          <el-menu-item index="/employee/add">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>档案登记</span>
          </el-menu-item>
          <el-menu-item index="/employee/manage">
            <el-icon>
              <FolderOpened />
            </el-icon>
            <span>档案管理</span>
          </el-menu-item>
          <el-menu-item index="/employee/review">
            <el-icon><Select /></el-icon>
            <span>档案复核</span>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/salary">
          <template #title>
            <el-icon><GoldMedal /></el-icon>
            <span>薪酬管理</span>
          </template>
          <el-menu-item index="/salary">
            <el-icon><Histogram /></el-icon>
            <span>薪酬标准</span>
          </el-menu-item>
          <el-menu-item index="/salary/send">
            <el-icon><Finished /></el-icon>
            <span>薪酬发放</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item index="/position">
          <el-icon><Coordinate /></el-icon>
            <span>职位管理</span>
          </el-menu-item>
          <el-menu-item index="/institution">
            <el-icon><OfficeBuilding /></el-icon>
            <span>机构管理</span>
          </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          用户名：<strong>{{
            userStore.user.uname
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.user_pic || avatar" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">基本资料</el-dropdown-item>
              <!-- <el-dropdown-item command="avatar" :icon="Crop"
                >更换头像</el-dropdown-item
              > -->
              <!-- <el-dropdown-item command="password" :icon="EditPen"
                >重置密码</el-dropdown-item
              > -->
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <el-footer>HRMS</el-footer> -->
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
/* LOGO样式 */
.el-aside__logo {
  font-family: 'Helvetica', Arial, sans-serif;
  font-size: 36px;
  font-weight: bold;
  color: rgb(104, 102, 238);
  text-shadow: 2px 2px 2px rgb(85, 85, 85);
  /* 文本阴影效果 */
  text-align: center;
  /* 文本居中 */
}

.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      // background: url('@/assets/logo.jpg') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
