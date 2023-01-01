import React, { useState } from 'react';
import {
  BrowserRouter as Router, Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import axios from 'axios';
/// import { useDispatch } from 'react-redux';
import { AuthContext } from '../contexts/index.js';
import { useAuth } from '../hooks/index.js';
import LoginPage from './LoginPage.jsx';
import PageNotFound from './PageNotFound.jsx';
import Chat from './Chat.jsx';
import Navigation from './Navigation.jsx';
import routes from '../routes';

const initialAuthState = () => {
  // @ts-ignore
  const localStorageData = JSON.parse(localStorage.getItem('userId'));
  return !!(localStorageData && localStorageData.token);
};

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
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
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getAuthHeader,
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
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const getStore = () => axios.get(routes.usersPath(), { headers: getAuthHeader() })
  .then((response) => console.log('response is: ', response))
  .catch((e) => console.log('error is: ', e))
  .finally(() => console.log('header is: ', getAuthHeader()));

const App = () => {
  const result = (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Router>
          <Navigation />
          <button type="button" onClick={() => getStore()}>getStore</button>
          <Routes>
            <Route path="/" element={(<RequireAuth><Chat /></RequireAuth>)} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
  return result;
};

export default App;
