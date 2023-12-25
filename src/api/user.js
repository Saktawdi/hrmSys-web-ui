import request from '@/utils/request.js'

//登录接口
export const userLoginService = ({ uid, upassword }) =>
  request.post('/api/v1/user/login', {
    uid,
    upassword
  })

//退出接口
export const userLogoutService = ({}) => request.post('/api/v1/user/logout')

// 注册接口
export const userRegisterService = ({ uid, upassword, uname }) =>
  request.post('/api/v1/user/register', {
    uid,
    upassword,
    uname
  })

// 更新用户接口
export const updateUserProfileService = ({ uid, upassword, uname }) =>
  request.put('/api/v1/user/update', {
    uid,
    upassword,
    uname
  })

// 获取所有用户接口
export const getAllUsersService = () => request.get('/api/v1/user/getAll')

// 获取所有登录会话接口
export const getAllLoginSessionsService = () =>
  request.get('/api/v1/user/getAllLoginSession')

// 删除用户接口
export const deleteUserByIdService = (id) =>
  request.delete(`/api/v1/user/delete/${id}`)

// 根据用户名获取用户接口
export const getUserByNameService = (name) =>
  request.get(`/api/v1/user/getByName/${name}`)

// 根据用户ID获取用户接口
export const getUserByIdService = (id) => request.get(`/api/v1/user/get/${id}`)

// 获取当前用户角色接口
export const getCurrentUserRoleService = () =>
  request.get('/api/v1/user/getRole')

// 获取当前用户权限接口
export const getCurrentUserPermissionService = () =>
  request.get('/api/v1/user/getPermission')

// 获取当前用户信息接口
export const getCurrentUserInfoService = () =>
  request.get('/api/v1/user/getUserInfo')
