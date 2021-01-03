import 'reflect-metadata';
import { container } from 'tsyringe';
import { ApolloServer } from 'apollo-server';
import { SchemaService } from './graphql/schema';

const schemaService = container.resolve(SchemaService);
const schema = schemaService.getSchema();

new ApolloServer({ schema }).listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
