import api from '@/common/utils/axiosInstance';
import { useEffect } from 'react';

const Example = () => {
  useEffect(() => {
    api
      .get('/api/user/all')
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <p>Hello, world!</p>
    </div>
  );
};

export default Example;
