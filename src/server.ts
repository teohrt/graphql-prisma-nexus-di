import { ApolloServer } from 'apollo-server';
import container from './ioc/inversify.config';
import TYPES from './ioc/types';
import { SchemaService } from './graphql/schema';

const schemaService = container.get<SchemaService>(TYPES.SchemaService);
const schema = schemaService.getSchema();

new ApolloServer({ schema }).listen().then(({ url }) => {
  console.log(`Server is running on ${url}`);
});
