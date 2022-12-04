import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validateFunc = ({ username, password }) => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  return schema.validate({ username, password });
};

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const loginData = await validateFunc(values);
        console.log('LoginData: ', loginData);
      } catch (e) {
        console.log(e);
      }
    },
  });
  const result = (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="images/loginImage.jpeg" className="rounded-circle" alt="translateEnter" />
              </div>
              <form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">translate Войти</h1>
                <div className="form-floating mb-3">
                  <input
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="translateYourNickname"
                    autoComplete="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="username">translateВаш ник</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="translateПароль"
                    autoComplete="current-password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="password">translateПароль</label>
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
              </form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return result;
};

export default LoginPage;
