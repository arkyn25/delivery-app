import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProdCartButton({ totalPrice }) {
  const navigate = useNavigate();

  const productPrice = (price) => {
    const fixedPrice = Number.parseFloat(price).toFixed(2);
    const newPrice = fixedPrice.toString().replace('.', ',');
    return newPrice;
  };

  return (
    <div>
      <button
        type="button"
        disabled={ parseInt(totalPrice, 10) === 0 }
        onClick={ () => navigate('/customer/checkout') }
        data-testid="customer_products__button-cart"

      >
        Ver Carrinho:  R$
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { productPrice(totalPrice)}
        </span>
      </button>
    </div>
  );
}

ProdCartButton.propTypes = {
  totalPrice: PropTypes.number.isRequired,
};

export default ProdCartButton;
