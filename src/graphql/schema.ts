import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { makeSchema, objectType } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { NexusGraphQLSchema } from 'nexus/dist/definitions/_types';
import { IResolverService } from './resolvers/resolver';
import TYPES from '../ioc/types';

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.posts({
      pagination: false,
    });
  },
});

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.content();
    t.model.published();
    t.model.author();
    t.model.authorId();
  },
});

export interface ISchemaService {
  getSchema(): NexusGraphQLSchema
}

@injectable()
export class SchemaService {
  private mutationService: IResolverService;

  private queryService: IResolverService;

  constructor(
  @inject(TYPES.MutationService) ms: IResolverService,
    @inject(TYPES.QueryService) qs: IResolverService,
  ) {
    this.mutationService = ms;
    this.queryService = qs;
  }

  public getSchema(): NexusGraphQLSchema {
    return makeSchema({
      types: [this.queryService.getResolvers(), this.mutationService.getResolvers(), Post, User],
      plugins: [nexusPrisma({ experimentalCRUD: true })],
      outputs: {
        schema: `${__dirname}/../../schema.graphql`,
        typegen: `${__dirname}/../generated/nexus.ts`,
      },
      sourceTypes: {
        modules: [
          {
            module: '@prisma/client',
            alias: 'prisma',
          },
        ],
      },
    });
  }
}
