import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import Navigation from './Navigation.jsx';
import PageNotFound from './PageNotFound.jsx';
import SignUpPage from './SignUpPage.jsx';

const initialAuthState = () => {
  // @ts-ignore
  const localStorageData = JSON.parse(localStorage.getItem('user'));
  return (localStorageData && localStorageData.token) ? localStorageData : null;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialAuthState());
  const logIn = (u) => {
    localStorage.setItem('user', JSON.stringify(u));
    setUser(u);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(false);
  };
  const getAuthHeader = () => {
    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }
    return {};
  };
  /// const user = JSON.parse(localStorage.getItem('user'));
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      logIn, logOut, getAuthHeader, user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Router>
        <Navigation />
        <Routes>
          <Route path={routes.chat} element={(<RequireAuth><ChatPage /></RequireAuth>)} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.signup} element={<SignUpPage />} />
          <Route path={routes.pageNotFound} element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      limit={3}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </AuthProvider>
);

export default App;
