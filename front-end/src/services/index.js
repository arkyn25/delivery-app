import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-type': 'application/json',
  },
});

const config = (token) => ({
  headers: {
    authorization: token,
  },
});

const setToken = (token) => {
  api.defaults.headers.common.authorization = token;
};

const create = (data) => api.post('/login', data);
const getAll = (data) => api.get('/login', data);

const getAllSales = (tokenLogin) => api.get('/sales', config(tokenLogin));

const createOrder = (order) => api
  .post('/customer/orders', order);

const getAllSalesProducts = () => api.get('/checkout');

const register = (data) => api.post('/register', data);

const getSellers = () => api.get('/sellers');

const createSalesProducts = (order) => api.post('/salesProducts', order);

export default {
  create,
  getAll,
  getAllSales,
  getAllSalesProducts,
  register,
  createOrder,
  setToken,
  getSellers,
  createSalesProducts,
};
