import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import './styles/app.scss';

render(
  <App />,
  document.getElementById('root'),
);
