import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import routes from '../routes';
import { useAuth } from '../hooks/index.js';

const SignUpPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [signUpFailed, setSignUpFailed] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim().min(3).max(20)
        .required(),
      password: yup.string().min(6).required(),
      confirmPassword: yup.string().min(6).required()
        .oneOf([yup.ref('password')], 'Your passwords do not match.'),
    }),
    onSubmit: async (values) => {
      try {
        setSignUpFailed(false);
        const res = await axios.post(routes.signUpPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setSignUpFailed(true);
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
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Card.Img src="images/signUpImage.jpg" className="rounded-circle" alt="translateEnter" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">translateRegistration</h1>
                <FloatingLabel className="mb-3" label="translateUserName">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder="translateOt 3 do 20 simolov"
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={(formik.errors.username && formik.touched.username) || signUpFailed}
                    ref={inputRef}
                    required
                  />
                  {formik.errors.username && (
                    <Form.Control.Feedback type="invalid" placement="right" tooltip>
                      translateUserNameError
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="translatePassword">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    aria-describedby="passwordHelpBlock"
                    placeholder="translateNe menee 6 simvolov"
                    name="password"
                    id="password"
                    type="password"
                    autoComplete="password"
                    isInvalid={(formik.errors.password && formik.touched.password) || signUpFailed}
                    required
                  />
                  {formik.errors.password && (
                    <Form.Control.Feedback type="invalid" placement="right" tooltip>
                      translatePasswordError
                    </Form.Control.Feedback>
                  )}
                </FloatingLabel>
                <FloatingLabel className="mb-4" label="translateconfirmPassword">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder="translateNe menee 6 simvolov"
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword)
                      || signUpFailed}
                    required
                  />
                  <Form.Control.Feedback type="invalid" placement="right" tooltip>
                    {signUpFailed ? 'translateUserExists' : formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">translateRegister</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
  return result;
};

export default SignUpPage;
