import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import { useValidator } from 'react-joi';
import { Link } from 'react-router-dom';
import NotFound from '../components/notFound';
import userLogin from '../services/authLogin';

export default function Login() {
  const SIX = 6;
  const { state, setData, setExplicitField, validate } = useValidator({
    initialData: {
      email: null,
      password: null,
    },
    schema: Joi.object({
      email: Joi.string()
        .email({
          tlds: { allow: false },
        }),
      password: Joi.string().min(SIX).required(),
    }),
    explicitCheck: {
      email: true,
      password: true,
    },
  });

  const [isDisabled, setIsDisable] = useState(true);
  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    const disabled = state.$all_source_errors.length !== 0;
    setIsDisable(disabled);
  }, [state]);

  const updateEmail = (e) => {
    e.persist();
    setData((old) => ({
      ...old,
      email: e.target.value,
    }));
  };

  const updatePassword = (e) => {
  // react < v17
    e.persist();

    setData((old) => ({
      ...old,
      password: e.target.value,
    }));
  };

  const userAlreadyLogin = () => {
    const tokenUser = JSON.parse(localStorage.getItem('user'));

    if (!tokenUser) {
      return false;
    }

    window.location.replace('/customer/products');
  };

  const renderLoginPage = () => (
    <>
      <form>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            data-testid="common_login__input-email"
            onChange={ updateEmail }
            onBlur={ () => setExplicitField('email', true) }
          />
        </label>
        <br />
        {state.$errors.email.map((data) => data.$message).join(',')}
        <br />

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            name="password"
            data-testid="common_login__input-password"
            onChange={ updatePassword }
            onBlur={ () => setExplicitField('password', true) }
          />
        </label>
        <br />
        <br />
      </form>

      <button
        type="submit"
        name="loginButton"
        data-testid="common_login__button-login"
        disabled={ isDisabled }
        onClick={ async () => { validate(); await userLogin(state, setIsErr); } }
      >
        Login

      </button>

      <Link to="/register">
        <button
          type="button"
          name="noAccount"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta

        </button>
      </Link>

      {isErr && <NotFound />}
    </>
  );

  return (
    <main>
      { !userAlreadyLogin() && renderLoginPage()}
    </main>
  );
}
