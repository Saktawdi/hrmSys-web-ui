import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/user/profile',
      children: [
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/sys/role',
          component:() => import('@/views/sys/RolePage.vue')
        },
        {
          path: '/sys/menu',
          component:() => import('@/views/sys/MenuPage.vue')
        },
        {
          path: '/sys/user',
          component:() => import('@/views/sys/UserPage.vue')
        },
        {
          path: '/employee/add',//档案登记
          component:() =>import('@/views/employee/EmployeeAddPage.vue')
        },
        {
          path: '/employee/info',//档案详情
          component:() =>import('@/views/employee/EmployeeInfo.vue')
        },
        {
          path: '/employee/manage',
          component:()=> import('@/views/employee/EmployeePage.vue')
        },
        {
          path: '/sys/menu',
          component: () => import('@/views/sys/MenuPage.vue')
        },
        {
          path: '/sys/user',
          component: () => import('@/views/sys/UserPage.vue')
        },
        {
          name:"AuthPage",
          path:"/sys/auth", // 权限分配
          component: ()=> import("@/views/sys/auth/AuthPage.vue")
        },
        {
          path: '/employee/add', //档案登记
          component: () => import('@/views/employee/EmployeeAddPage.vue')
        },
        {
          path: '/employee/review', //档案复核
          component: () => import('@/views/employee/EmployeeReviewPage.vue')
        },
        {
          path: '/employee/manage', //档案管理
          component: () => import('@/views/employee/EmployeePage.vue')
        },
        {
          path:"/institution", //机构管理
          component: () => import('@/views/institution/InstitutionPage.vue')
        },
        {
          path:"/position", //职位管理
          component: () => import('@/views/position/PositionPage.vue')
        },
        {
          path:"/salary",//薪酬管理
          component: () => import('@/views/salary/SalaryPage.vue')
        },
        {
          path:"/salary/send",//薪酬发放
          component: () => import('@/views/salary/SalarySendPage.vue')
        },
      ]
    }
  ]
})

//登录访问拦截

router.beforeEach((to) => {
  const useStore = useUserStore()
  if (!useStore.token && to.path !== '/login') return { path: '/login' }
  return true
})

export default router
