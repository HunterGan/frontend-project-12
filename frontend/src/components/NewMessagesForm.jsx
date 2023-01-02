import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useActions, useAuth } from '../hooks/index.js';

const NewMessagesForm = ({ messages }) => {
  const { channels, currentChannelId } = useSelector((state) => state.channelsReducer);
  /// console.log('NewMessagesForm', );
  const { sendMessage } = useActions();
  const inputRef = useRef();
  const { user } = useAuth();
  /// const [btnActive, setBtnActive] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, [channels, messages]);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object().shape({
      message: yup.string().trim().required(),
    }),
    onSubmit: async (value) => {
      console.log(value);
      const newMessage = {
        body: value?.message,
        channelId: currentChannelId,
        userName: user.username,
      };
      try {
        await sendMessage(newMessage);
        formik.resetForm();
      } catch (e) {
        console.log(e);
      }
      formik.setSubmitting(false);
    },
  });
  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2" noValidate>
        <InputGroup hasValidation={formik.isValid}>
          <Form.Control
            name="message"
            placeholder="translateNewMessage"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.message}
            ref={inputRef}
            disabled={formik.isSubmitting}
            required
          />
          <Button type="submit" variant="group-vertical" disabled={formik.isSubmitting || !formik.isValid}>
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">translateSendMessage</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default NewMessagesForm;
