import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { fetcherGraphQL } from '@recipes-manager/data-auth';

export const apolloClient = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  link: new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
    fetch: fetcherGraphQL,
  }),
  cache: new InMemoryCache(),
});
