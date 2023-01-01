import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { useAuth } from '../hooks/index.js';

const AuthButton = () => {
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

const Navigation = () => (
  <Navbar expand="lg" bg="white" className="shadow-sm">
    <Container>
      <Navbar.Brand as={Button} href="/">Hexlet Chat</Navbar.Brand>
      <AuthButton />
    </Container>
  </Navbar>
);

export default Navigation;
