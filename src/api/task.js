import request from '@/utils/request.js'
// 关闭每周定时任务接口
export const StopTaskService = (key) =>
  request.put(`/api/v1/task/stop/${key}`);

// 开启每周定时任务接口
export const StartTaskService = (key) =>
  request.put(`/api/v1/task/start/${key}`);

// 获取固定任务开关状态接口
export const getAllTasksService = () =>
  request.get('/api/v1/task/getAll');



// 获取定时任务记录
export const getAllRecoder = () =>
  request.get('/api/v1/sended/all');

// 获取定时任务记录
export const updateRecoder = (pID) =>
  request.put(`/api/v1/sended/updata/${pID}`);