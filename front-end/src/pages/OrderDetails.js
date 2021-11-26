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
