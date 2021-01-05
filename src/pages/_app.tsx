import { useEffect } from 'react';
import { Provider } from 'react-redux'

import store from '../store'
import { globalStyles } from '../shared/styles';

const useSameClientHeight = () => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const height = `${document.documentElement.clientHeight}px`;
      document.body.style.height = height;
    }
  }, []);
};

const App = ({ Component, pageProps }) => {
  useSameClientHeight();
  return (
    <Provider store={store}>
      {globalStyles}
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
