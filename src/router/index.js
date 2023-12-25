import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
          path: '/salary/add', //薪酬登记
          component: () => import('@/views/salary/SalaryRegister.vue')
        },
        {
          path: '/salary/review', //薪酬复核
          component: () => import('@/views/salary/SalaryReview.vue')
        },
        {
          path: '/salary/pay', //薪酬发放
          component: () => import('@/views/salary/SalaryPay.vue')
        },
        {
          path: '/salary/paydetail', //薪酬发放明细
          component: () => import('@/views/salary/SalaryPayDetail.vue')
        }
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
