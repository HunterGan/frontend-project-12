import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button, Navbar, Container, Dropdown,
} from 'react-bootstrap';
import { Gear } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    auth.user
      ? <Button className="btn-block mx-2" onClick={auth.logOut}>{t('navigation.logOut')}</Button>
      : null
  );
};
const SettingsButton = () => {
  const auth = useAuth();
  console.log('auth', auth);
  return (
    <Dropdown className="btn-block mx-2">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <Gear size={20} />
        Настройки
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">tema</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-2">cenzura</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-3">nastroiki accouna</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-3">exit</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const Navigation = () => {
  const { t } = useTranslation();
  /// const auth = useAuth();
  const isSettingsMenuActive = false;
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('navigation.homeLink')}</Navbar.Brand>
        <div className="d-flex flex-row">
          {isSettingsMenuActive && <SettingsButton />}
          <AuthButton />
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;
