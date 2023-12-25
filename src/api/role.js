import request from '@/utils/request.js'

// 更新角色接口
export const updateRoleService = ({ rname, rcode, rid }) =>
  request.put('/api/v1/role/update', {
    rname,
    rcode,
    rid
  })

// 添加角色接口
export const addRoleService = ({ rname, rcode }) =>
  request.post('/api/v1/role/add', {
    rname,
    rcode
  })

// 获取角色接口
export const getRoleService = (rID) =>
  request.get(`/api/v1/role/get/${rID}`)

// 获取所有角色接口
export const getAllRolesService = () =>
  request.get('/api/v1/role/all')

// 删除角色接口
export const deleteRoleService = (rID) =>
  request.delete(`/api/v1/role/delete/${rID}`)
