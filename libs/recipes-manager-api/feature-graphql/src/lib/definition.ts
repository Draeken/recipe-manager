import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    users: [User!]!
    languages: [Language!]!
    language(id: ID): Language!
    classes(lang: String!): [Class!]!
  }
  type Mutation {
    addLanguage(name: String): AddLanguageMutationResponse
  }
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String
  }
  type AddLanguageMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String
    language: Language
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
  }
  type Specific {
    desc: String!
  }
`;
// How to express dynamic key like 'en', 'fr' ? -> use parameter
