import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useActions, useAuth } from '../hooks/index.js';

const NewMessagesForm = ({ messages }) => {
  const { currentChannelId } = useSelector((state) => state.channelsReducer);
  /// console.log('NewMessagesForm', );
  const { sendMessage } = useActions();
  const inputRef = useRef();
  const { user } = useAuth();
  /// const [btnActive, setBtnActive] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, messages]);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object().shape({
      message: yup.string().trim().required(),
    }),
    onSubmit: async (value) => {
      formik.setSubmitting(true);
      console.log('Formik isSubmitting 1', formik.isSubmitting);
      const newMessage = {
        body: value?.message,
        channelId: currentChannelId,
        userName: user.username,
      };
      try {
        console.log('Formik isSubmitting 2', formik.isSubmitting);
        await sendMessage(newMessage);
        formik.resetForm();
        console.log('Formik isSubmitting 3', formik.isSubmitting);
      } catch (e) {
        console.log(e);
        console.log('Formik isSubmitting 5', formik.isSubmitting);
      }
      formik.setSubmitting(false);
      inputRef.current.focus();
      console.log('Formik isSubmitting 6', formik.isSubmitting);
    },
  });
  /// const sole = true;
  const isInvalid = !formik.dirty || !formik.isValid;
  console.log('FFFFFFFFFFFFFFFFFF isSubmitting', formik.isSubmitting);
  return (
    <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate>
      <InputGroup hasValidation={isInvalid}>
        <Form.Control
          name="message"
          type="text"
          placeholder="translateNewMessage"
          aria-label="translateNewMessage"
          onChange={formik.handleChange}
          value={formik.values.message}
          ref={inputRef}
          disabled={formik.isSubmitting}
        />
        <Button type="submit" variant="group-vertical" disabled={isInvalid}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">translateSendMessage</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default NewMessagesForm;
