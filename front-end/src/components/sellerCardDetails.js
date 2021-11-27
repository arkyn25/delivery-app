import React from 'react';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import api from '../services';

const tableHead = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];

const orderTable = 'seller_order_details__element-order-table-item-number-';
const nameTable = 'seller_order_details__element-order-table-name-';
const quantityTable = 'seller_order_details__element-order-table-quantity-';
const unitPriceTable = 'seller_order_details__element-order-table-unit-price-';
const subTotalTable = 'seller_order_details__element-order-table-sub-total-';

function sellerCardDetails(props) {
  const { salesInfo } = props;

  const productPrice = (price) => {
    const fixedPrice = Number.parseFloat(price).toFixed(2);
    const newPrice = fixedPrice.toString().replace('.', ',');
    return newPrice;
  };

  return (
    <table>
      <thead>
        <tr>
          {tableHead.map((item, index) => (
            <th key={ index }>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {salesInfo.products
          .map(({ name, price, SalesProducts: { quantity } }, index) => (
            <tr key={ index }>
              <td data-testid={ `${orderTable}${index}` }>{index + 1}</td>
              <td data-testid={ `${nameTable}${index}` }>{name}</td>
              <td data-testid={ `${quantityTable}${index}` }>{quantity}</td>
              <td data-testid={ `${unitPriceTable}${index}` }>{productPrice(price)}</td>
              <td data-testid={ `${subTotalTable}${index}` }>
                {productPrice((price * quantity).toFixed(2))}
              </td>
            </tr>
          ))}
        <tr>
          <td>
            Total: R$
            <span data-testid="seller_order_details__element-order-total-price">
              {productPrice(salesInfo.totalPrice)}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
sellerCardDetails.propTypes = {
  salesInfo: PropTypes.arrayOf(Object).isRequired,
};
export default sellerCardDetails;
