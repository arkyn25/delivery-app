import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard(props) {
  const { product: { id, name, price, urlImage }, setChanges } = props;

  const actualQuantity = (produto) => {
    const item = JSON.parse(localStorage.getItem('products'));
    if (item[produto]) return item[produto].quant;
    return 0;
  };
  const [quantity, setQuantity] = useState(actualQuantity(name));

  const setProducts = (quant, produto) => {
    const total = quant * price;
    const getProduct = JSON.parse(localStorage.getItem('products'));
    const currProds = { ...getProduct,
      [produto]: { name: produto, total, price, quant } };

    localStorage.setItem('products', JSON.stringify(currProds));
  };

  const deleteProduct = () => {
    const getProduct = JSON.parse(localStorage.getItem('products')) || {};
    if (quantity < 2) {
      delete getProduct[name];
      localStorage.setItem('products', JSON.stringify(getProduct));
    }
  };
  const alterValue = (quanty, prodName) => {
    if (quanty < 1) {
      deleteProduct();
      quanty = 0;
    }
    const prodQuantity = Number(quanty);
    setQuantity(prodQuantity);
    setProducts(prodQuantity, prodName);
    setChanges(`${id}-${quanty + 1}`);
  };

  const addItem = () => {
    const itemQuanty = Number(quantity);
    setQuantity(itemQuanty + 1);
    setProducts(itemQuanty + 1, name);
    setChanges(`${id}-${quantity + 1}`);
  };

  const removeItem = () => {
    const itemQuantity = Number(quantity);
    if (quantity >= 1) {
      setQuantity(itemQuantity - 1);
      setProducts(itemQuantity - 1, name);
      setChanges(`${id}-${quantity + 1}`);
    }
    // deleteProduct();
  };

  return (
    <div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {parseFloat(price).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
      <img
        width="100px"
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <input
        type="number"
        min="0"
        value={ quantity }
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ (event) => alterValue(event.target.value, name) }

      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ removeItem }
      >
        -
      </button>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ addItem }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
  }).isRequired,
};

ProductCard.propTypes = {
  setChanges: PropTypes.func.isRequired,
};

export default ProductCard;
