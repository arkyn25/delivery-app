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

const orderTable = 'customer_order_details__element-order-table-item-number-';
const nameTable = 'customer_order_details__element-order-table-name-';
const quantityTable = 'customer_order_details__element-order-table-quantity-';
// const unitPriceTable = 'customer_checkout__element-order-table-unit-price-';
const subTotalTable = 'customer_order_details__element-order-table-sub-total-';

function OrderTable(props) {
  // const [productsOrder, setProductsOrder] = useState([]);
  const { salesInfo } = props;
  // const { id } = useParams();

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await api.getAllSalesProductsbySaleId(id);
  //     setProductsOrder(data);
  //   })();
  // }, [id]);
  const productPrice = (price) => {
    const fixedPrice = Number.parseFloat(price).toFixed(2);
    const newPrice = fixedPrice.toString().replace('.', ',');
    return newPrice;
  };

  // const returnTotal = () => Object.values(productsOrder)
  //   .reduce((acc, { products: { price }, quantity }) => {
  //     acc += (price * quantity); return acc;
  //   }, 0);

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
              <td data-testid={ `${subTotalTable}${index}` }>{productPrice(price)}</td>
              <td>
                {productPrice((price * quantity).toFixed(2))}
              </td>
            </tr>
          ))}
        {/* {console.log(productsOrder)} */}
        <tr>
          <td>
            Total: R$
            <span data-testid="customer_order_details__element-order-total-price">
              {productPrice(salesInfo.totalPrice)}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
OrderTable.propTypes = {
  salesInfo: PropTypes.arrayOf(Object).isRequired,
};
export default OrderTable;
