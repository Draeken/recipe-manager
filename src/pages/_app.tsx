import { useEffect } from 'react';
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
    <>
      {globalStyles}
      <Component {...pageProps} />
    </>
  );
};

export default App;
