import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/// import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { actions } from '../slices/modalsSlice.js';
import { useActions } from '../hooks/index.js';

const AddChannel = ({ handleClose }) => {
  const inputRef = useRef();
  const { channels } = useSelector((state) => state.channelsReducer);
  const { createChannel } = useActions();
  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: yup.object().shape({
      channel: yup.string().trim().required().notOneOf(channels),
    }),
    onSubmit: async (value) => {
      console.log('value is', value);
      try {
        console.log('here1');
        await createChannel({ name: value.channel });
        console.log('here2');
        handleClose();
        console.log('here3');
      } catch (e) {
        console.log('here3 ERRROE', e);
      }
      /// formik.setSubmitting(false);
    },
  });
  return (
    <>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>translateAddChannel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              name="channel"
              id="channel"
            />
            <label className="visually-hidden" htmlFor="channel">TranslateChannel</label>
            <Form.Control.Feedback type="invalid">
              TranslateError
            </Form.Control.Feedback>
          </FormGroup>
          <Button type="submit" className="btn-primary mt-2" value="submit" />
        </Form>
      </Modal.Body>
    </>
  );
};
const removeChannel = () => { };
const renameChannel = () => { };

const modals = {
  openAdding: AddChannel,
  removeChannel,
  renameChannel,
};

const ModalPage = () => {
  console.log('Modal1');
  const dispatch = useDispatch();
  const { type, id, active } = useSelector((state) => state.modalsReducer);
  console.log('Modal2');
  const handleClose = () => dispatch(actions.closeModal());
  const Component = modals[type];
  console.log('Modal3', active);
  return (
    <Modal show={active}>
      {Component && <Component handleClose={handleClose} id={id} />}
    </Modal>
  );
};

export default ModalPage;
