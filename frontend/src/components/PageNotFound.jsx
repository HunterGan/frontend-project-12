import React from 'react';
import { Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import routes from '../routes';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <Image fluid alt={t('page404.header')} className="h-25" src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" />
      <h1 className="h4 text-muted">
        {t('page404.header')}
      </h1>
      <p className="text-muted">
        {t('page404.message')}
        <Link to={routes.chat}>{t('page404.messageMainPage')}</Link>
      </p>
    </div>
  );
};
export default PageNotFound;
