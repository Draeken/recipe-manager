import GCloudDS from '@google-cloud/datastore';
import { context, DatastoreSource, typeDefs } from '@recipes-manager-api/feature-graphql';
import { ApolloServer } from 'apollo-server-micro';

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }];
    },
    languages(_, __, { dataSources }) {
      return dataSources.store.getAll();
    },
  },
  Mutation: {
    addLanguage: async (_, { name }: { name: string }, { dataSources }) => {
      return dataSources.store.addLanguage(name);
    },
  },
};

const datastore = new GCloudDS.Datastore();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: context({ store: datastore }),
  dataSources: () => ({
    store: new DatastoreSource({ store: datastore }),
  }),
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
