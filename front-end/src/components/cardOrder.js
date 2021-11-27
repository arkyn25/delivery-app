import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardOrder({ sale }) {
  const { id, totalPrice, sale_date: saleDate, status } = sale;

  const convertDate = (data) => {
    const date = new Date(data);
    const dia = date.getDate().toString();
    const zero = '0';
    let diaF = '';
    let mes = '';
    let mesF = '';
    let anoF = '';
    diaF = (dia.length === 1) ? zero + dia : dia;
    mes = (date.getMonth() + 1).toString();
    mesF = (mes.length === 1) ? zero + mes : mes;
    anoF = date.getFullYear();
    return `${diaF}/${mesF}/${anoF}`;
  };

  const convertPrice = (price) => price.replace('.', ',');

  return (
    <Link to={ `/customer/orders/${id}` } key={ id }>
      <h5 data-testid={ `customer_orders__element-order-id-${id}` }>{`Pedido ${id}`}</h5>
      <h1 data-testid={ `customer_orders__element-delivery-status-${id}` }>{status}</h1>
      <h3 data-testid={ `customer_orders__element-order-date-${id}` }>
        {convertDate(saleDate)}
      </h3>
      <h3 data-testid={ `customer_orders__element-card-price-${id}` }>
        { convertPrice(totalPrice) }
      </h3>
    </Link>
  );
}

CardOrder.propTypes = {
  sale: PropTypes.shape({
    status: PropTypes.string,
    sale_date: PropTypes.instanceOf(Date),
    totalPrice: PropTypes.number,
    id: PropTypes.number,
  }).isRequired,
};

export default CardOrder;
