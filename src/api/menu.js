import request from '@/utils/request.js'

// 更新菜单接口
export const updateMenuService = ({ id, parentId, sort, mname, mcode }) =>
  request.put('/api/v1/menu/update', {
    id,
    parentId,
    sort,
    mname,
    mcode
  })

// 添加菜单接口
export const addMenuService = ({ parentId, sort, mname, mcode }) =>
  request.post('/api/v1/menu/add', {
    parentId,
    sort,
    mname,
    mcode
  })

// 获取菜单接口
export const getMenuService = (id) => request.get(`/api/v1/menu/get/${id}`)

// 获取所有菜单接口
export const getAllMenusService = () => request.get('/api/v1/menu/all')

// 删除菜单接口
export const deleteMenuService = (id) =>
  request.delete(`/api/v1/menu/delete/${id}`)
