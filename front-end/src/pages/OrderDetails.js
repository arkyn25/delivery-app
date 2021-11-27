import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/navBar';
import OrderTable from '../components/orderTable';
import convertDate from '../services/convertDate';
import api from '../services';

export default function OrderDetails() {
  const [saleStatus, setSalesStatus] = useState('');
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
      setSalesInfo(data);
      setSalesStatus(data.status);
    })();
  }, [id]);

  const changeStatusOrder = async ({ target: { name } }) => {
    await api.updateSalesProductsbySaleId(salesInfo.id, name);
    setSalesStatus(name);
  };

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
        {saleStatus}
      </span>
      <button
        type="button"
        name="Entregue"
        disabled={ saleStatus !== 'Em Trânsito' }
        onClick={ changeStatusOrder }
        data-testid="customer_order_details__button-delivery-check"
      >
        marcar como entregue
      </button>
      <OrderTable salesInfo={ salesInfo } />
    </>
  );
}
