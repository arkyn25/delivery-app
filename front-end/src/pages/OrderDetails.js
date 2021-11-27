import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navBar';
import OrderTable from '../components/orderTable';
import convertDate from '../services/convertDate';
import api from '../services';

export default function OrderDetails() {
  const [salesInfo, setSalesInfo] = useState(
    {
      id: 0,
      totalPrice: '',
      sale_date: '',
      status: '',
      products: [
        {
          name: '',
          price: '',
          SalesProducts: {
            quantity: 0,
          },
        },
      ],
      seller: {
        name: '',
      },
    },
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await api.getAllSalesProductsbySaleId(id);
      console.log(data, 'data');
      setSalesInfo(data);
    })();
  }, [id]);

  return (
    <>
      <NavBar />
      <p>Detalhe do pedido</p>
      <span data-testid="customer_order_details__element-order-details-label-order-id">
        { salesInfo.id }
      </span>
      <span data-testid="customer_order_details__element-order-details-label-seller-name">
        { salesInfo.seller.name }
      </span>
      <span data-testid="customer_order_details__element-order-details-label-order-date">
        { convertDate(salesInfo.sale_date) }
        {/* {console.log(sale, 'sale ----')} */}
      </span>
      <span
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        Status do pedido
        {salesInfo.status}
      </span>
      <button
        type="button"
        disabled
        data-testid="customer_order_details__button-delivery-check"
      >
        marcar como entregue
      </button>
      <OrderTable salesInfo={ salesInfo } />
    </>
  );
}
