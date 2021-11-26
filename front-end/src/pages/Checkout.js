import React from 'react';
import { useEffect, useState } from 'react/cjs/react.development';
// import api from '../services';
import DetailsAddress from '../components/detailsAddress';

const orderTable = 'customer_checkout__element-order-table-item-number-';
const nameTable = 'customer_checkout__element-order-table-name-';
const quantityTable = 'customer_checkout__element-order-table-quantity-';
const unitPriceTable = 'customer_checkout__element-order-table-unit-price-';
const subTotalTable = 'customer_checkout__element-order-table-sub-total-';
const removeTable = 'customer_checkout__element-order-table-remove-';
export default function Checkout() {
  const [salesProducts, setSalesProducts] = useState([]);
  const [updateItens, setUpdateItens] = useState();
  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem('products'));
    setSalesProducts(cartProducts);
  }, []);
  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem('products'));
    setSalesProducts(cartProducts);
  }, [updateItens]);

  const productPrice = (price) => {
    const min = 3;
    const newPrice = price.toString().replace('.', ',');
    if (newPrice.length === min) return `${newPrice}0`;
    return newPrice;
  };
  const returnTotal = () => Object.values(salesProducts).reduce((acc, { total }) => {
    acc += total; return acc;
  }, 0);

  const removeItem = (name) => {
    delete salesProducts[name];
    setUpdateItens(salesProducts);
    localStorage.setItem('products', JSON.stringify(salesProducts));
  };
  return (
    <>
      <div>
        <span>Item</span>
        <span>Descrição</span>
        <span>Quantidade</span>
        <span>Valor Unitario</span>
        <span>Sub-total</span>
        <span>Remover Item</span>
      </div>

      {Object.values(salesProducts).map(({ price, quant, name, total }, index) => (
        <div key={ index }>
          <span data-testid={ `${orderTable}${index}` }>{index + 1}</span>
          <span data-testid={ `${nameTable}${index}` }>{name}</span>
          <span data-testid={ `${quantityTable}${index}` }>{quant}</span>
          <span data-testid={ `${unitPriceTable}${index}` }>{productPrice(price)}</span>
          <span
            data-testid={ `${subTotalTable}${index}` }
          >
            {productPrice(total.toFixed(2))}
          </span>
          <span>
            <button
              type="button"
              onClick={ () => removeItem(name) }
              data-testid={ `${removeTable}${index}` }
            >
              Remover
            </button>
          </span>
        </div>
      ))}
      <p data-testid="customer_checkout__element-order-total-price">
        total=
        <span>
          {productPrice(returnTotal().toFixed(2))}
        </span>
      </p>
      <DetailsAddress
        totalPrice={ returnTotal().toFixed(2) }
        salesProducts={ salesProducts }
      />
    </>
  );
}
