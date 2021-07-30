import { ApolloProvider } from '@apollo/client';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeFirebaseApp } from '@recipes-manager/data-auth';
import { apolloClient } from '@recipes-manager/data-graphql';
import { useAppDispatch } from '@recipes-manager/data-store/hooks';
import store from '@recipes-manager/data-store/store';
import { authChange, UserDTO } from '@recipes-manager/data-store/user-slice';
import { ThemeContext } from '@recipes-manager/ui';
import { pipe } from '@recipes-manager/util';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Workbox } from 'workbox-window';
import { theme } from '../theme';
import './styles.css';

const StoreConsumer = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const firebaseApp = initializeFirebaseApp();
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, pipe(sanitizeFirebaseUser, authChange, dispatch), (err) =>
      console.error('auth error', err)
    );
  }, []);
  return children;
};

const sanitizeFirebaseUser = (user): UserDTO => {
  if (!user) {
    return {} as UserDTO;
  }
  const { displayName, email, photoURL, uid, accessToken } = user;
  return { displayName, email, photoURL, uid, accessToken };
};

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('sw.js', { scope: '/', type: 'module' });
      wb.register();
    }
  }, []);
  return (
    <div className="app">
      <Provider store={store}>
        <StoreConsumer>
          <ApolloProvider client={apolloClient}>
            <ThemeContext.Provider value={theme}>
              <Component {...pageProps} />
            </ThemeContext.Provider>
          </ApolloProvider>
        </StoreConsumer>
      </Provider>
    </div>
  );
}

export default CustomApp;
