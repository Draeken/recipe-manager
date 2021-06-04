import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { initializeFirebaseApp } from '@recipes-manager/data-auth';
import { useAppDispatch } from '@recipes-manager/data-store/hooks';
import store from '@recipes-manager/data-store/store';
import { authChange } from '@recipes-manager/data-store/user-slice';
import { ThemeContext } from '@recipes-manager/ui';
import { pipe } from '@recipes-manager/util';
import { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
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

const sanitizeFirebaseUser = (user) => {
  if (!user) {
    return {};
  }
  const { displayName, email, photoURL, uid, accessToken } = user;
  return { displayName, email, photoURL, uid, accessToken };
};

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app">
      <Provider store={store}>
        <StoreConsumer>
          <ThemeContext.Provider value={theme}>
            <Component {...pageProps} />
          </ThemeContext.Provider>
        </StoreConsumer>
      </Provider>
    </div>
  );
}

export default CustomApp;
