import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    users: [User!]!
    languages: [Language!]!
    classes(lang: String!): [Class!]!
  }
  type Mutation {
    addLanguage(name: String): AddLanguageMutationResponse
  }
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
  type AddLanguageMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    language: Language!
  }
  type Language {
    id: ID
    name: String
  }
  type User {
    name: String
  }
  type Class {
    parents: [ID!]!
    children: [ID!]!
    names: [String!]!
    desc: [String!]!
    " How to express dynamic key like 'en', 'fr' ? -> use parameter" 
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }];
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
