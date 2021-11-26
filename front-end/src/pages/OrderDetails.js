<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import api from '../services';

export default function OrderDetails() {
  const [productsOrder, setProductsOrder] = useState([]);
  // const [idUrl, setIdUrl] = useState('');
  // const getSaleId = () => {
  // setIdUrl(url[url.length - 1]);
  // const url = useLocation().pathname.split('/');
  //   return saleId;
  const { id } = useParams();
  // };
  useEffect(() => {
    (async () => {
      console.log(id);
      const products = await api.getAllSalesProductsbySaleId(id);
      setProductsOrder(products);
    })();
  }, [id]);
  return (
    <div>
      {/* { console.log(url)} */}
      hello galera
      {/* {productsOrder.map((value) => console.log(value))} */}
      {console.log(productsOrder)}
      {/* {console.log(id)} */}
      {/* {console.log(saleId)} */}
    </div>
  );
}
// OrderDetails.propTypes = {
//   totalPrice: PropTypes.number.isRequired,
// };
=======

import React from 'react';
import NavBar from '../components/navBar';
import OrderTable from '../components/orderTable';

export default function OrderDetails() {

  return (
    <>
      <NavBar />

      <p>Detalhe do pedido</p>
      <span data-testid="customer_order_details__element-order-details-label-order-id">
        id
      </span>
      <span data-testid="customer_order_details__element-order-details-label-seller-name">
        Pessoa vendedora
      </span>
      <span data-testid="customer_order_details__element-order-details-label-order-date">
        data da venda
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        status do pedido
      </span>
      <span data-testid="customer_order_details__button-delivery-check">
        botao marcar como entregue
      </span>
      <OrderTable />
    </>
  );
}
>>>>>>> dd4a7a99be1c13207fc41302b84dcaf09cb71a99
