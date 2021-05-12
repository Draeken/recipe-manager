import store from '@recipes-manager/data-store/store';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default CustomApp;
