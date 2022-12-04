import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; /// Route
import './index.css';
import reportWebVitals from './reportWebVitals';
import PageNotFound from './components/PageNotFound';
/// import App from './App';
import LoginPage from './components/LoginPage';
import DefaultLayout from './components/DefaultLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout><LoginPage /></DefaultLayout>, /// <PageNotFound />,
  },
  {
    path: '/login',
    element: <DefaultLayout><PageNotFound /></DefaultLayout>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
