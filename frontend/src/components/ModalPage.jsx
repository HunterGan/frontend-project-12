import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
/// import _ from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { actions } from '../slices/modalsSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { useActions } from '../hooks/index.js';

const AddChannel = ({ handleClose }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channelsReducer);
  const { createChannel } = useActions();
  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: yup.object().shape({
      channel: yup.string().trim().required().notOneOf(channels.map((channel) => channel.name)),
    }),
    onSubmit: async (value) => {
      try {
        const res = await createChannel({ name: value.channel });
        dispatch(channelsActions.setActiveChannel(res.data));
        console.log('RESULT IS: ', res);
        handleClose();
      } catch (e) {
        console.log('ERRORORORORO is', e);
        formik.setSubmitting(false);
        console.log(e);
        inputRef.current.focus();
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
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              name="channel"
              id="channel"
            />
            <Form.Label className="visually-hidden" htmlFor="channel">TranslateChannel</Form.Label>
            <Form.Control.Feedback type="invalid">
              TranslateError
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={handleClose} className="me-2" type="button" variant="secondary">translateCancel</Button>
              <Button disabled={formik.isSubmitting} type="submit" variant="primary">translateCancel</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

const RemoveChannel = ({ handleClose, id }) => {
  const { removeChannel } = useActions();
  const handleRemove = async () => {
    try {
      await removeChannel({ id });
      handleClose();
    } catch (e) {
      console.log('removeChannelErrorIs', e);
    }
  };
  return (
    <>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>translateRemoveChannel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">translateSure?</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            translateCancel
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            translateDelete
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
const RenameChannel = ({ id, handleClose }) => {
  const inputRef = useRef();
  const { channels } = useSelector((state) => state.channelsReducer);
  const { renameChannel } = useActions();
  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: yup.object().shape({
      channel: yup.string().trim().required().notOneOf(channels.map((channel) => channel.name)),
    }),
    onSubmit: async (value) => {
      try {
        await renameChannel({ id, name: value.channel });
        handleClose();
      } catch (e) {
        formik.setSubmitting(false);
        console.log(e);
        inputRef.currentfocus();
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
              className="mb-2"
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              name="channel"
              id="channel"
            />
            <Form.Label className="visually-hidden" htmlFor="channel">TranslateChannel</Form.Label>
            <Form.Control.Feedback type="invalid">
              TranslateError
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button onClick={handleClose} className="me-2" type="button" variant="secondary">translateCancel</Button>
              <Button disabled={formik.isSubmitting} type="submit" variant="primary">translateCancel</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

const modals = {
  add: AddChannel,
  remove: RemoveChannel,
  rename: RenameChannel,
};

const ModalPage = () => {
  const dispatch = useDispatch();
  const { type, id, active } = useSelector((state) => state.modalsReducer);
  const handleClose = () => dispatch(actions.closeModal());
  const Component = modals[type];
  return (
    <Modal show={active}>
      {Component && <Component handleClose={handleClose} id={id} />}
    </Modal>
  );
};

export default ModalPage;
