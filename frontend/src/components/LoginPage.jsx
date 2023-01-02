import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import routes from '../routes';
import { useAuth } from '../hooks/index.js';

const LoginPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().required(),
      password: yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });
  const result = (
    <Container fluid className="h-100 my-4">
      <Row className="justify-content-center align-content-center h-100">
        <Col xxl={6} md={8} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Card.Img src="images/loginImage.jpeg" className="rounded-circle" alt="translateEnter" />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">translate Войти</h1>
                <FloatingLabel className="mb-3" label="username" controlId="username">
                  <Form.Control
                    placeholder="translateYourNickname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={auth.loggedIn}
                    ref={inputRef}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="password" controlId="password">
                  <Form.Control
                    placeholder="translateПароль"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={auth.loggedIn}
                    required
                  />
                  <Form.Control.Feedback type="invalid" tooltip>Please choose a username.</Form.Control.Feedback>
                </FloatingLabel>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">Войти</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  return result;
};

export default LoginPage;
