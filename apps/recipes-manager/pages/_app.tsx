import store from '@recipes-manager/data-store/store';
import { ThemeContext } from '@recipes-manager/ui';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import './styles.css';
import { theme } from './theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Provider store={store}>
        <ThemeContext.Provider value={theme}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </Provider>
    </div>
  );
}

export default CustomApp;
