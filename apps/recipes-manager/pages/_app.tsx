import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeFirebaseApp } from '@recipes-manager/data-auth';
import store from '@recipes-manager/data-store/store';
import { ThemeContext } from '@recipes-manager/ui';
import { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { theme } from '../theme';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const firebaseApp = initializeFirebaseApp();
  const auth = getAuth(firebaseApp);
  onAuthStateChanged(
    auth,
    (user) => {
      console.log('auth change', user);
    },
    (err) => {
      console.error('auth error', err);
    }
  );
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
