import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>{t('navigation.logOut')}</Button>
      : null
  );
};

const Navigation = () => {
  const { t } = useTranslation();
  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} href="/">{t('navigation.homeLink')}</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Navigation;
