import axios from 'axios'
import {
  useUserStore
} from '@/stores'
import {
  ElMessage
} from 'element-plus'
import router from '@/router'
const baseURL = 'http://hrmsapi.sakta.top'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

instance.interceptors.request.use(
  (config) => {
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers['token'] = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 200) {
      return res
    }
    //如果返回的code == 500 且 msg 包含：token 无效，则提示登录失效
    if (
      res.data.code === 500 &&
      res.data.msg &&
      res.data.msg.includes('token 无效')
    ) {
      router.push('/login')
      ElMessage.warning('登录失效，请重新登录')
      return Promise.reject(res.data)
    }
    ElMessage.error(res.data.msg || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // TODO 5. 处理401错误
    if (err.response?.status === 401) {
      router.push('/login')
    }
    ElMessage.error(err.response.data.msg || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export {
  baseURL
}
