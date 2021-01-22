import type { AppProps } from 'next/app';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { theme } from '../shared/styles';
import store from '../store';

const useSameClientHeight = () => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const height = `${document.documentElement.clientHeight}px`;
      document.body.style.height = height;
    }
  }, []);
};

const App = ({ Component, pageProps }: AppProps) => {
  useSameClientHeight();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      (jssStyles.parentElement as Element).removeChild(jssStyles);
    }
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
