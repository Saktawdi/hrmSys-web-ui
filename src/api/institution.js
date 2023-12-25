import request from '@/utils/request.js'

/**
<<<<<<< HEAD
 * @typedef {Object} Institution
 * @property {string} iname - Institution name
 * @property {string} ilevel - Institution level
 * @property {string} iparent - Parent institution ID
 * @property {string} iid - Institution ID
 */

// 修改机构接口
export const updateInstitutionService = (institutionData) =>
  request.put('/api/v1/institution/update', institutionData);

// 新增机构接口
export const addInstitutionService = (institutionData) =>
  request.post('/api/v1/institution/add', institutionData);

// 根据机构编号判断是否为父类接口
export const isParentService = (iID) =>
  request.get(`/api/v1/institution/isParent/${iID}`);

// 根据父类ID获取机构详细信息接口
export const getInstitutionByiParentService = (iParent) =>
  request.get(`/api/v1/institution/getByParent/${iParent}`);

// 根据等级和父类ID获取机构详细信息接口
export const getInstitutionByLevelAndParentService = (iLevel, iParent) =>
  request.get(`/api/v1/institution/getByLevelAndParent/${iLevel}/${iParent}`);

// 根据等级获取机构详细信息接口
export const getInstitutionByLevelService = (iLevel) =>
  request.get(`/api/v1/institution/getByLevel/${iLevel}`);

// 获取机构列表接口
export const getAllInstitutionsService = () =>
  request.get('/api/v1/institution/getAll');

// 根据机构编号获取详细信息接口
export const getInstitutionService = (iID) =>
  request.get(`/api/v1/institution/get/${iID}`);

// 删除机构接口
export const deleteInstitutionService = (iID) =>
  request.delete(`/api/v1/institution/delete/${iID}`);