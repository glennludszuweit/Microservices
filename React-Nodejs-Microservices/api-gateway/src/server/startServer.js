import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import coockieParser from 'cookie-parser';

import accessEnv from '#root/helpers/accessEnv';
import formatGraphqlErrors from '#root/helpers/formatGraphqlErrors';

import resolvers from '#root/graphql/resolvers';
import typeDefs from '#root/graphql/typeDefs';

const PORT = accessEnv('PORT', 7000);

const apolloServer = new ApolloServer({
  formatError: formatGraphqlErrors,
  resolvers,
  typeDefs,
});

const app = express();

app.use(coockieParser());

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
  })
);

apolloServer.applyMiddleware({
  app,
  cors: false,
  path: '/graphql',
});

app.listen(PORT, '0.0.0.0', () => {
  console.info(`API gateway listening on ${PORT}`);
});
