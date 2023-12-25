import request from '@/utils/request.js';
//https://www.freeimg.cn/api/v1

export const generateUploadTokensService = ({ num, seconds }) =>
  request.post('/images/tokens', { num, seconds });

export const uploadImageService = ({ file, token, permission, strategy_id, album_id, expired_at }) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('token', token);
  formData.append('permission', permission);
  formData.append('strategy_id', strategy_id);
  formData.append('album_id', album_id);
  formData.append('expired_at', expired_at);
  return request.post('/upload', formData, {
    headers: {
        'Authorization':'Bearer 58|vQd3PIUYEH4X2a02ryBr4TyXjcGOEPQiHP83Xw8v',
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get image list
export const getImageListService = ({ page, order, permission, album_id, q }) =>
  request.get('/images', { params: { page, order, permission, album_id, q } });

// Delete image
export const deleteImageService = (key) =>
  request.delete(`/images/${key}`);
