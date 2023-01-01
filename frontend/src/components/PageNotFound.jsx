import React from 'react';
import { Image } from 'react-bootstrap';

const PageNotFound = () => (
  <div className="text-center">
    <Image fluid alt="notFound.header" className="h-25" src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" />
    <h1 className="h4 text-muted">
      notFound.header
    </h1>
    <p className="text-muted">
      notFound.message
      <a href="/">notFound.linkText</a>
    </p>
  </div>
);

export default PageNotFound;
