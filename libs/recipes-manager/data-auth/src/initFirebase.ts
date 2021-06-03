import { getApps, initializeApp } from 'firebase/app';

export const firebaseConfig = {
  apiKey: 'AIzaSyCq2bhakerLCWGvfXZI7Lu4dFRBy2g3YUc',
  authDomain: 'recipe-and-products-manager.firebaseapp.com',
  projectId: 'recipe-and-products-manager',
  storageBucket: 'recipe-and-products-manager.appspot.com',
  messagingSenderId: '438881489651',
  appId: '1:438881489651:web:5ffd4621ad9c3a1175dd86',
};

export const initializeFirebaseApp = () => {
  const firebaseApp = getApps()[0] || initializeApp(firebaseConfig);
  return firebaseApp;
};
