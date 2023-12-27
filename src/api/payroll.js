import request from '@/utils/request.js'

// 新增薪酬发放单接口
export const addPayrollService = (payrollData) =>
  request.post('/api/v1/salary/addPayroll', { ...payrollData });

// 获取薪酬发放单接口
export const getStaticPayrollsService = () =>
  request.get('/api/v1/salary/getStaticPayrolls');

// 获取薪酬发放单接口
export const getAllPayrollsService = () =>
  request.get('/api/v1/salary/getAllPayrolls');

// 获取薪酬明细列表接口
export const getPayslipsService = (L3InstID) =>
request.get(`/api/v1/salary/getPayslips/${L3InstID}`);

// 更新奖金接口
export const updateBonusesService = (bonuses) =>
  request.put('/api/v1/bonus/updateBonus', {...bonuses});

// 获取payRoll ID删除发放接口
export const deleteStaticPayrollService = (pID) =>
request.delete(`/api/v1/salary/deleteStaticPayroll/${pID}`);

// 根据pid修改pstatus发放状态
export const updateStaticPayrollByID = (pID,pStatus) =>
request.put(`api/v1/salary/updateStaticPayrollByID/${pID}/${pStatus}`);
