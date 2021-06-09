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
  fetch(input, init).then((res) => res.json());

export const fetcherGraphQL = (query: string, headersInit?: HeadersInit) =>
  getJWT()
    .then((jwt) => {
      const headers: any = {
        'Content-type': 'application/json',
        ...headersInit,
      };
      if (jwt) {
        headers['Authorization'] = `Bearer ${jwt}`;
      }
      return fetch('/api/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({ query }),
      });
    })
    .then((res) => res.json())
    .then((json) => json.data);
