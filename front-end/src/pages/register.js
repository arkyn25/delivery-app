import React, { useEffect, useState } from 'react';
import Joi from 'joi';
import { useValidator } from 'react-joi';
import api from '../services';
import userLogin from '../services/authLogin';

export default function Register() {
  const TWELVE = 12;
  const SIX = 6;
  const { state, setData, validate } = useValidator({
    initialData: {
      name: null,
      email: null,
      password: null,
    },
    schema: Joi.object({
      name: Joi.string().min(TWELVE).required(),
      email: Joi.string()
        .email({
          tlds: { allow: false },
        }).required(),
      password: Joi.string().min(SIX).required(),
    }),
    explicitCheck: {
      name: true,
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

  const updateName = (e) => {
    e.persist();
    setData((old) => ({
      ...old,
      name: e.target.value,
    }));
  };

  const updateEmail = (e) => {
    e.persist();

    setData((old) => ({
      ...old,
      email: e.target.value,
    }));
  };

  const updatePassword = (e) => {
    e.persist();

    setData((old) => ({
      ...old,
      password: e.target.value,
    }));
  };

  const userRegister = async () => {
    const info = state.$data;
    await api.register(info);
    // return window.location.replace('/customer/products');
  };

  return (
    <>
      <h2>REGISTRO</h2>

      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            name="name"
            data-testid="common_register__input-name"
            onChange={ updateName }
          />
        </label>
        <br />
        {state.$errors.name.map((data) => data.$message).join(',')}
        <br />

        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            data-testid="common_register__input-email"
            onChange={ updateEmail }
          />
        </label>
        <br />
        {state.$errors.email.map((data) => data.$message).join(',')}
        <br />

        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            data-testid="common_register__input-password"
            onChange={ updatePassword }
          />
        </label>
        <br />
        {state.$errors.password.map((data) => data.$message).join(',')}
        <br />
      </form>

      <button
        type="submit"
        name="registerButton"
        data-testid="common_register__button-register"
        disabled={ isDisabled }
        onClick={ async () => {
          validate();
          await userRegister();
          await userLogin(state, setIsErr);
        } }
      >
        CADASTRAR

      </button>

      <p
        data-testid="common_register__element-invalid_register"
      >
        {isErr && <p>Erro: Email já cadastrado </p>}

      </p>
    </>
  );
}
