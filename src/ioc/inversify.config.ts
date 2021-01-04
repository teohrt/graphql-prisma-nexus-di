import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from './types';
import { Prisma } from '../db/prisma';
import QueryService from '../graphql/resolvers/query';
import MutationService from '../graphql/resolvers/mutation';
import { SchemaService } from '../graphql/schema';

const container = new Container();
container.bind<Prisma>(TYPES.Prisma).to(Prisma);
container.bind<QueryService>(TYPES.QueryService).to(QueryService);
container.bind<MutationService>(TYPES.MutationService).to(MutationService);
container.bind<SchemaService>(TYPES.SchemaService).to(SchemaService);

export default container;
