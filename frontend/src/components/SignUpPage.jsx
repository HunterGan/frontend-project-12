import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRollbar } from '@rollbar/react';
import routes from '../routes';
import { useAuth } from '../hooks/index.js';

const SignUpPage = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const rollbar = useRollbar();
  const [signUpFailed, setSignUpFailed] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim().min(3, 'userNameSize').max(20, 'userNameSize')
        .required('required'),
      password: yup.string().min(6, 'passwordSize').required('required'),
      confirmPassword: yup.string().required('required')
        .oneOf([yup.ref('password')], 'passwordMatch'),
    }),
    onSubmit: async (values) => {
      try {
        setSignUpFailed(false);
        const res = await axios.post(routes.signUpPath(), values);
        auth.logIn(res.data);
        navigate(routes.chat);
      } catch (e) {
        rollbar.error('SignUp error', e);
        formik.setSubmitting(false);
        if (!e.isAxiosError) {
          toast.error(t('error.unknownError'));
          return;
        }
        if (e.response.status === 409) {
          setSignUpFailed(true);
          inputRef.current.select();
          /// toast.error(t('signup.userExists'));
          /// navigate(routes.login);
        } else {
          toast.error(t('error.loadError'));
        }
      }
    },
  });
  const isInvalid = (field) => (formik.errors[field] && formik.touched[field]) || signUpFailed;
  return (
    <Container fluid className="h-100 my-4">
      <Row className="justify-content-center align-content-center h-100">
        <Col xxl={6} md={8} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Card.Img src="images/signUpImage.jpg" className="rounded-circle" alt={t('signup.registration')} />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('signup.registration')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={t('signup.userNameSize')}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={isInvalid('username')}
                    ref={inputRef}
                    required
                  />
                  <Form.Label htmlFor="username">{t('signup.userName')}</Form.Label>
                  <Form.Control.Feedback type="invalid" placement="right" tooltip>
                    {formik.errors.username && t(`signup.${formik.errors.username}`)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    aria-describedby="passwordHelpBlock"
                    placeholder={t('signup.passwordSize')}
                    name="password"
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    isInvalid={isInvalid('password')}
                    required
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" placement="right" tooltip>
                    {formik.errors.password && t(`signup.${formik.errors.password}`)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder={t('signup.passwordMatch')}
                    name="confirmPassword"
                    id="confirmPassword"
                    type="password"
                    autoComplete="confirmPassword"
                    isInvalid={isInvalid('confirmPassword')}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control.Feedback type="invalid" placement="right" tooltip>
                    {signUpFailed ? t('signup.userExists') : t(`signup.${formik.errors.confirmPassword}`)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100 mb-3">{t('signup.submit')}</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;
