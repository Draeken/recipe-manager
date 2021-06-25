// Import your own reducer
import store, { RootState, storeReducers } from '@recipes-manager/data-store/store';
import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

export interface RenderOption {
  preloadedState?: RootState;
  store?: typeof store;
}

const render = (
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({ reducer: storeReducers, preloadedState }),
    ...renderOptions
  }: RenderOption = {}
) => {
  const Wrapper: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
