import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { fetcherToJson } from '@recipes-manager/data-auth';

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
    fetch: fetcherToJson,
  }),
  cache: new InMemoryCache(),
});
