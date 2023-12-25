import request from '@/utils/request.js'

/**
 * @typedef {Object} Salary
 * @property {number} sbasic - Basic salary amount (double)
 * @property {number} stransport - Transport allowance amount (double)
 * @property {number} slunch - Lunch allowance amount (double)
 * @property {number} scommunicate - Communication allowance amount (double)
 * @property {number} spension - Pension contribution amount (double)
 * @property {number} smedical - Medical insurance amount (double)
 * @property {number} sunemployment - Unemployment insurance amount (double)
 * @property {string} sname - Name of the salary standard
 * @property {string} srecorder - Recorder's name
 * @property {string} srecordDate - Date and time of recording (format: date-time)
 * @property {string} smaker - Maker's name
 * @property {string} sstatus - Status of the salary standard
 * @property {number} sid - Salary standard ID (integer)
 */


// 修改薪资标准接口
export const editSalaryService = (salaryData) =>
  request.put('/api/v1/salary', salaryData)

// 新增薪资标准接口
export const addSalaryService = (salaryData) =>
  request.post('/api/v1/salary', salaryData)

// 根据薪资标准编号获取详细信息接口
export const getSalaryInfoService = (sID) =>
  request.get(`/api/v1/salary/${sID}`)

// 删除薪资标准接口
export const removeSalaryService = (sID) =>
  request.delete(`/api/v1/salary/${sID}`)

// 获取薪资标准列表接口
export const getSalaryListService = () =>
  request.get('/api/v1/salary/list')
