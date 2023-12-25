import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }

    const removeToken = () => {
      token.value = ''
    }

    const user = ref({})

    const getUser = async () => {
      return user.value
    }

    const setUser = (obj) => {
      user.value = obj
    }

    const removeUser = () => {
      user.value = ''
    }

    //存储用户权限信息
    const auth = ref({})

    const getUserPermission = async () => {
      return auth.value;
    }

    const setUserPermission = (obj) => {
      auth.value = obj
    }

    const removeUserPermission = async () => {
      auth.value = ''
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
      removeUser,
      auth,
      setUserPermission,
      getUserPermission,
      removeUserPermission
    }
  },
  {
    persist: true
  }
)
