import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRollbar } from '@rollbar/react';
import { useSelector } from 'react-redux';
import { useActions, useAuth } from '../hooks/index.js';

const NewMessagesForm = ({ messages }) => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.channelsReducer);
  const { sendMessage } = useActions();
  const inputRef = useRef();
  const { user } = useAuth();
  const rollbar = useRollbar();
  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, messages]);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object().shape({
      message: yup.string().trim().required('messageRequired'),
    }),
    onSubmit: async (value) => {
      formik.setSubmitting(true);
      const newMessage = {
        body: value?.message,
        channelId: currentChannelId,
        userName: user.username,
      };
      try {
        await sendMessage(newMessage);
        formik.resetForm();
      } catch (e) {
        rollbar.error('NewMessage error', e);
      }
      formik.setSubmitting(false);
      inputRef.current.focus();
    },
  });
  const isInvalid = !(formik.dirty && formik.isValid);
  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate>
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          name="message"
          type="text"
          placeholder={t('messages.enterMessage')}
          aria-label={t('messages.newMessage')}
          onChange={formik.handleChange}
          value={formik.values.message}
          ref={inputRef}
          disabled={formik.isSubmitting}
        />
        <Button type="submit" variant="group-vertical" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">{t('messages.submit')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessagesForm;
