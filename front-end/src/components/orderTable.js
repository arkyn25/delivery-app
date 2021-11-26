import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services';

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
  const [productsOrder, setProductsOrder] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const products = await api.getAllSalesProductsbySaleId(id);
      console.log(`Produtos${products}`);
      setProductsOrder(products);
    })();
  }, [id]);
  console.log(`Estou aqui ${productsOrder}`);
  const productPrice = (price) => {
    const fixedPrice = Number.parseFloat(price).toFixed(2);
    const newPrice = fixedPrice.toString().replace('.', ',');
    return newPrice;
  };

  const returnTotal = () => Object.values(productsOrder).reduce((acc, { total }) => {
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
        {productsOrder.map(({ price, quant, name, total }, index) => (
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
