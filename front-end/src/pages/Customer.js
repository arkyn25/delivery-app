import React, { useState, useEffect } from 'react';
import NavBar from '../components/navBar';
import ProdCartButton from '../components/prodCartButton';
import ProductCard from '../components/productCard';
import api from '../services';

export default function Customer() {
  const [products, setProducts] = useState([]);
  const [changes, setChanges] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await api.getAllProducts();
      setProducts(data);
    })();
    localStorage.setItem('products', JSON.stringify({}));
  }, []);

  useEffect(() => {
    const cartProds = JSON.parse(localStorage.getItem('products'));
    const actualPrice = Object.entries(cartProds)
      .reduce((acc, curr) => acc + curr[1].total, 0).toFixed(2);
    setTotalPrice(actualPrice);
  }, [changes]);

  return (
    <div>
      <NavBar />
      <div>
        { products ? products.map((item) => (
          <ProductCard
            key={ item.id }
            product={ item }
            setChanges={ setChanges }
          />
        )) : <h1>loading</h1>}
        <ProdCartButton totalPrice={ +totalPrice } />
      </div>
    </div>
  );
}
