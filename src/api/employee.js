import request from '@/utils/request.js';

/**
 * @typedef {Object} Employee
 * @property {string} eethnic - Ethnicity of the employee
 * @property {number} eage - Age of the employee (integer)
 * @property {string} el1InstID - Level 1 institution ID of the employee
 * @property {string} el2InstID - Level 2 institution ID of the employee
 * @property {string} el3InstID - Level 3 institution ID of the employee
 * @property {string} epositionCategory - Position category of the employee
 * @property {string} epositionName - Position name of the employee
 * @property {string} ejobTitle - Job title of the employee
 * @property {string} ename - Name of the employee
 * @property {string} egender - Gender of the employee
 * @property {string} eemail - Email address of the employee
 * @property {string} efixedPhone - Fixed phone number of the employee
 * @property {string} ecellPhone - Cell phone number of the employee
 * @property {string} eqq - QQ number of the employee
 * @property {string} eaddress - Address of the employee
 * @property {string} epostcode - Postcode of the employee
 * @property {string} ebirthday - Birthday of the employee
 * @property {string} ebirthplace - Birthplace of the employee
 * @property {string} eavatar - Avatar URL of the employee
 * @property {string} eidcard - ID card number of the employee
 * @property {string} essc - Social security card number of the employee
 * @property {string} ecountry - Country of the employee
 * @property {string} ereligion - Religion of the employee
 * @property {string} epolitical - Political affiliation of the employee
 * @property {string} eeducation - Education level of the employee
 * @property {string} emajor - Major of the employee
 * @property {string} esalary - Salary of the employee
 * @property {string} ebankName - Bank name of the employee
 * @property {string} ebankAccount - Bank account number of the employee
 * @property {string} ehobby - Hobbies of the employee
 * @property {string} especicalty - Specialty of the employee
 * @property {string} eresume - Resume of the employee
 * @property {string} efamily - Family details of the employee
 * @property {string} eremarks - Remarks about the employee
 * @property {string} erecoders - Recorders of the employee
 * @property {string} erecodDate - Record date of the employee (date-time)
 * @property {string} estatus - Status of the employee
 * @property {string} eid - Employee ID
 */

// 修改档案接口
export const editEmployeeService = (employeeData) =>
  request.put('/api/v1/employee', employeeData);

// 新增档案接口
export const addEmployeeService = (employeeData) =>
  request.post('/api/v1/employee/add', employeeData);

// 根据档案编号获取详细信息接口
export const getEmployeeInfoService = (eID) =>
  request.get(`/api/v1/employee/${eID}`);

// 删除档案接口
export const removeEmployeeService = (eID) =>
  request.delete(`/api/v1/employee/${eID}`);

// 获取档案列表接口
export const getEmployeeListService = () =>
  request.get('/api/v1/employee/list');
