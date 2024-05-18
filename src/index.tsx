import './assets/styles/index.scss';

import React from 'react';
import { IntlProvider } from 'react-intl';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/core/redux/store';
import App from '@/app';

import messages from './locales/uk';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <IntlProvider messages={messages} locale="uk" >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </IntlProvider>
  </Provider>,
);
