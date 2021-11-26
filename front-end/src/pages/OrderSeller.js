import React, { useState, useEffect } from 'react';
import api from '../services';
import NavBarSeller from '../components/navBarSeller';
import CardSellerOrder from '../components/cardSellerOrder';

function OrderClient() {
  const [sales, setSales] = useState([]);
  const seller = JSON.parse(localStorage.getItem('user'));
  const sellerId = seller.id;

  useEffect(() => {
    (async () => {
      const { data } = await api.getAllSalesBySellerId(sellerId);
      setSales(data);
    })();
  }, [sellerId]);

  return (
    <>
      <NavBarSeller />
      {sales.map((sale) => (<CardSellerOrder key={ sale.id } sale={ sale } />))}
      olá
    </>
  );
}

export default OrderClient;
