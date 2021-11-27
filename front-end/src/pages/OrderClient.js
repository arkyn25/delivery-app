import React, { useEffect, useState } from 'react';
import api from '../services';
import NavBar from '../components/navBar';
import CardOrder from '../components/cardOrder';

function OrderClient() {
  const [sales, setSales] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const tokenUser = user.token;

  useEffect(() => {
    (async () => {
      const { data } = await api.getAllSales(tokenUser);
      setSales(data);
    })();
  }, [tokenUser]);

  return (
    <>
      <NavBar />
      {sales.map((sale) => (<CardOrder key={ sale.id } sale={ sale } />))}
    </>
  );
}

export default OrderClient;
