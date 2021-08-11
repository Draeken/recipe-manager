import { getAuth } from '@firebase/auth';
import { initializeFirebaseApp } from './initFirebase';

const getJWT = () => {
  const currentUser = getAuth(initializeFirebaseApp()).currentUser;
  if (!currentUser) {
    return Promise.resolve('');
  }
  return currentUser.getIdToken();
};

export const fetcherToJson = (input: RequestInfo, init?: RequestInit) =>
  getJWT()
    .then((jwt) => {
      const headers: any = {
        'Content-type': 'application/json',
        ...init?.headers,
      };
      if (jwt) {
        headers['Authorization'] = `Bearer ${jwt}`;
      }
      return fetch(input, init);
    })
    .then((res) => res.json());

export const fetcherGraphQL = (input: RequestInfo, init?: RequestInit) =>
  getJWT().then((jwt) => {
    const headers: any = {
      'Content-type': 'application/json',
      ...init?.headers,
    };
    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }
    return fetch(input, init);
  });
