import React, { useState, useEffect } from 'react';

// import api from '../services/index';

const tableHead = [
  'Item',
  'Descrição',
  'Quantidade',
  'Valor Unitário',
  'Sub-total',
  'Remover Item',
];
const orderTable = 'customer_checkout__element-order-table-item-number-';
const nameTable = 'customer_checkout__element-order-table-name-';
const quantityTable = 'customer_checkout__element-order-table-quantity-';
const unitPriceTable = 'customer_checkout__element-order-table-unit-price-';
const subTotalTable = 'customer_checkout__element-order-table-sub-total-';

function OrderTable() {
  const [salesDetails, setSalesDetails] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/customer/orders/:id');
      const prods = await response.json();
      setSalesDetails(prods);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  // useEffect(() => {
  //   api().then(({ data }) => {
  //     setSalesDetails(data);
  //   });
  // }, []);
  const productPrice = (price) => {
    const min = 3;
    const newPrice = price.toString().replace('.', ',');
    if (newPrice.length === min) return `${newPrice}0`;
    return newPrice;
  };

  const returnTotal = () => Object.values(salesDetails).reduce((acc, { total }) => {
    acc += total; return acc;
  }, 0);

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
        {salesDetails.map(({ price, quant, name, total }, index) => (
          <tr key={ index }>
            <td data-testid={ `${orderTable}${index}` }>{index + 1}</td>
            <td data-testid={ `${nameTable}${index}` }>{name}</td>
            <td data-testid={ `${quantityTable}${index}` }>{quant}</td>
            <td data-testid={ `${unitPriceTable}${index}` }>{productPrice(price)}</td>
            <td
              data-testid={ `${subTotalTable}${index}` }
            >
              {productPrice(total.toFixed(2))}
            </td>
          </tr>
        ))}
        <tr data-testid="customer_checkout__element-order-total-price">
          <td>
            Total: R$
            {productPrice(returnTotal().toFixed(2))}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default OrderTable;
