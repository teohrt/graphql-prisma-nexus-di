const { ApolloServer } = require('apollo-server');
const { Prisma } = require('prisma-binding');
const { importSchema } = require('graphql-import');

const typeDefs = importSchema('./schema.graphql');
const Query = require('./query');
const Mutation = require('./mutation');

const db = Prisma({
  typeDefs: './generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Mutation,
    Query
  },
  context: ({ req }) => ({
    ...req,
    db
  })
});

server.listen().then(({ url }) =>
  console.log(`Server is running on ${url}`)
);
