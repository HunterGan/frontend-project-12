import React from 'react';
import Navigation from './Navigation.jsx';

const DefaultLayout = ({ children }) => {
  const result = (
    <div className="d-flex flex-column h-100">
      <Navigation />
      {children}
    </div>
  );
  return result;
};

export default DefaultLayout;
