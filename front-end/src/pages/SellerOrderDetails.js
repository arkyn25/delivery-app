import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navBar';
import convertDate from '../services/convertDate';
import api from '../services';
import SellerCardDetails from '../components/sellerCardDetails';

export default function SellerOrderDetails() {
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
      <span data-testid="seller_order_details__element-order-details-label-order-id">
        { salesInfo.id }
      </span>
      <span data-testid="seller_order_details__element-order-details-label-order-date">
        { convertDate(salesInfo.sale_date) }
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {salesInfo.status}
      </span>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
      >
        PREPARAR PEDIDO
      </button>
      <button
        type="button"
        disabled
        data-testid="seller_order_details__button-dispatch-check"
      >
        SAIU PARA ENTREGA
      </button>
      <SellerCardDetails salesInfo={ salesInfo } />
    </>
  );
}
