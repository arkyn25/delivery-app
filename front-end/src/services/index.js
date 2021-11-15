import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-type': 'application/json',
  },
});

// const loginApi = async (email, password) => ;
const create = (data) => api.post('/login', data);
const getAll = (data) => api.get('/login', data);

const getProducts = async () => {
  const { data } = await axios.get('http://localhost:3001/products');
  return data;
};

export default { create, getAll, getProducts };
