import api from '.';

const redirect = ({ role }) => {
  if (!role) role = 'customer';
  switch (role) {
  case 'administrator': return window.location.replace('/admin/manage');
  case 'customer': return window.location.replace('/customer/products');
  case 'seller': return window.location.replace('/seller/orders');
  default:
    break;
  }
};

const userLogin = async (state, setIsErr) => {
  try {
    const user = state.$data;
    const { data } = await api.create(user);
    localStorage.setItem('user', JSON.stringify(
      {
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
        id: data.data.id,
        token: data.token },
    ));
    localStorage.setItem('products', JSON.stringify());
    redirect(data.data);
  } catch (error) {
    setIsErr(true);
  }
};

export default userLogin;
