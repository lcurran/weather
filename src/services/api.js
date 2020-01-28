import { create } from 'apisauce';
const api = create({
  baseURL: 'http://localhost:3001'
});

const createUser = payload => {
  return api.post('/api/users', payload).then(res => res);
};

export { createUser };
