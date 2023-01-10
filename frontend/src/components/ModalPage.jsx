import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Modal, FormGroup, FormControl, Form, Button,
} from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';
import { actions } from '../slices/modalsSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { useActions } from '../hooks/index.js';

const AddChannel = ({ handleClose }) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channelsReducer);
  const { createChannel } = useActions();
  const rollbar = useRollbar();
  const formik = useFormik({
    initialValues: {
      channel: '',
    },
    validationSchema: yup.object().shape({
      channel: yup.string().trim().required('required').min(3, 'channelSize')
        .notOneOf(channels.map((channel) => channel.name), 'unique'),
    }),
    onSubmit: async (value) => {
      try {
        const res = await createChannel({ name: value.channel });
        toast.success(t('modal.channelAdded'));
        dispatch(channelsActions.setActiveChannel(res.data));
        handleClose();
      } catch (e) {
        rollbar.error('Modal add channel error', e);
        formik.setSubmitting(false);
        inputRef.current.focus();
      }
    },
  });
  return (
    <>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              className="mb-2"
              ref={inputRef}
              isInvalid={(formik.errors.channel && formik.touched.channel)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              name="channel"
              id="channel"
            />
            <Form.Label className="visually-hidden" htmlFor="channel">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(`modal.${formik.errors.channel}`)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button disabled={formik.isSubmitting} onClick={handleClose} className="me-2" type="button" variant="secondary">{t('modal.cancel')}</Button>
              <Button disabled={formik.isSubmitting} type="submit" variant="primary">{t('modal.submit')}</Button>
            </div>
          </FormGroup>
        </Form>
      </Modal.Body>
    </>
  );
};

const RemoveChannel = ({ handleClose, id }) => {
  const { removeChannel } = useActions();
  const { t } = useTranslation();
  const rollbar = useRollbar();
  const [disabled, setDisabled] = useState(false);
  const handleRemove = async () => {
    try {
      setDisabled(true);
      await removeChannel({ id });
      toast.success(t('modal.channelRemoved'));
      handleClose();
    } catch (e) {
      rollbar.error('Modal remove channel error', e);
      setDisabled(false);
    }
  };
  return (
    <>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={disabled}
          >
            {t('modal.cancel')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={disabled}
          >
            {t('modal.delete')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};
const RenameChannel = ({ id, handleClose }) => {
  const inputRef = useRef();
  const rollbar = useRollbar();
  const { channels } = useSelector((state) => state.channelsReducer);
  const currentChannel = channels.find((channel) => channel.id === id);
  const { renameChannel } = useActions();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      channel: currentChannel.name,
    },
    validationSchema: yup.object().shape({
      channel: yup.string().trim().required('required').min(3, 'channelSize')
        .notOneOf(channels.map((channel) => channel.name), 'unique'),
    }),
    onSubmit: async (value) => {
      try {
        await renameChannel({ id, name: value.channel });
        toast.success(t('modal.channelRenamed'));
        handleClose();
      } catch (e) {
        rollbar.error('Modal rename channel error', e);
        formik.setSubmitting(false);
        inputRef.current.focus();
      }
    },
  });
  return (
    <>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              className="mb-2"
              ref={inputRef}
              isInvalid={(formik.errors.channel && formik.touched.channel)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channel}
              name="channel"
              id="channel"
            />
            <Form.Label className="visually-hidden" htmlFor="channel">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {t(`modal.${formik.errors.channel}`)}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button disabled={formik.isSubmitting} onClick={handleClose} className="me-2" type="button" variant="secondary">{t('modal.cancel')}</Button>
              <Button disabled={formik.isSubmitting} type="submit" variant="primary">{t('modal.submit')}</Button>
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
