import api from '@/common/utils/axiosInstance';

export const getUserData = (email:String) => {
    const response = api.get('/api/user/'+email+'/').then(result => result.data)
    return response;
  };