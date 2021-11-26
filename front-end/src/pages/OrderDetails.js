import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import api from '../services';

export default function OrderDetails() {
  const [productsOrder, setProductsOrder] = useState([]);
  // const [idUrl, setIdUrl] = useState('');
  // const getSaleId = () => {
  // setIdUrl(url[url.length - 1]);
  // const url = useLocation().pathname.split('/');
  //   return saleId;
  const { id } = useParams();
  // };
  useEffect(() => {
    (async () => {
      console.log(id);
      const products = await api.getAllSalesProductsbySaleId(id);
      setProductsOrder(products);
    })();
  }, [id]);
  return (
    <div>
      {/* { console.log(url)} */}
      hello galera
      {/* {productsOrder.map((value) => console.log(value))} */}
      {console.log(productsOrder)}
      {/* {console.log(id)} */}
      {/* {console.log(saleId)} */}
    </div>
  );
}
// OrderDetails.propTypes = {
//   totalPrice: PropTypes.number.isRequired,
// };
