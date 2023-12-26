import request from '@/utils/request.js'

/**
 * @typedef {Object} Position
 * @property {string} pname - Name of the position
 * @property {string} pcategory - Category of the position
 * @property {number} pid - Position ID (integer)
 */


// 修改职位接口
export const updatePositionService = (positionData) =>
  request.put('/api/v1/position/update', positionData)

// 新增职位接口
export const addPositionService = (positionData) =>
  request.post('/api/v1/position/add', positionData)

// 根据职位编号获取详细信息接口
export const getPositionInfoService = (pID) =>
  request.get(`/api/v1/position/${pID}`)

// 删除职位接口
export const removePositionService = (pID) =>
  request.delete(`/api/v1/position/delete/${pID}`)

// 获取职位列表接口
export const getPositionListService = () =>
  request.get('/api/v1/position/getAll')
