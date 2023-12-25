import request from '@/utils/request.js';

/**
 * @typedef {Object} MenuRole
 * @property {number} id - Menu role ID (integer)
 * @property {number} rid - Role ID (integer)
 * @property {number} mid - Menu ID (integer)
 */

/**
 * @typedef {Object} UserRole
 * @property {number} id - Row ID (integer)
 * @property {number} rid - Role ID (integer)
 * @property {string} uid - User ID
 */

// 修改用户角色接口
export const updateRoleService = (userRoleData) =>
  request.put('/api/v1/auth/role/update', userRoleData);

// 修改角色菜单接口
export const updateMenuService = (menuRoleData) =>
  request.put('/api/v1/auth/menu/update', menuRoleData);

// 给用户分配角色接口
export const addRoleService = (rID, uID) =>
  request.post(`/api/v1/auth/role/add/${rID}/${uID}`);

// 给角色分配菜单接口
export const addMenuService = (rID, mID) =>
  request.post(`/api/v1/auth/menu/add/${rID}/${mID}`);

// 获取角色分配到的所有用户接口
export const getAllRolesService = (rID) =>
  request.get(`/api/v1/auth/role/all/${rID}`);

// 获取角色分配到的所有菜单接口
export const getAllMenusService = (rID) =>
  request.get(`/api/v1/auth/menu/all/${rID}`);

// 删除用户角色接口
export const deleteRoleService = (rID, uID) =>
  request.delete(`/api/v1/auth/role/delete/${rID}/${uID}`);

// 删除角色菜单接口
export const deleteMenuService = (id) =>
  request.delete(`/api/v1/auth/menu/delete/${id}`);
