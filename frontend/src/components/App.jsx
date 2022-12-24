import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, useLocation, Navigate, Link,
} from 'react-router-dom';
import { Button, Navbar, Container } from 'react-bootstrap';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import LoginPage from './LoginPage.jsx';
import PageNotFound from './PageNotFound.jsx';
import Chat from './Chat.jsx';

const initialAuthState = () => {
  const localStorageData = JSON.parse(localStorage.getItem('userId'));
  console.log('fdfdfdf', (localStorageData && localStorageData.token));
  return (localStorageData && localStorageData.token);
};

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(initialAuthState());
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthButton = () => {
  const auth = useAuth();
  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : null
  );
};

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = ({ children }) => {
  const result = (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Router>
          <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <Container>
              <Navbar.Brand as={Link} href="/">Hexlet Chat</Navbar.Brand>
              <Navbar.Brand as={Button} onClick={() => console.log(localStorage.getItem('userId'))}>
                Show localStorage
              </Navbar.Brand>
              <AuthButton />
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={(<RequireAuth><Chat /></RequireAuth>)} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
        {children}
      </div>
    </AuthProvider>
  );
  return result;
};

export default App;
