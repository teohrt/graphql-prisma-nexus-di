import { inject, singleton } from 'tsyringe';
import { makeSchema, objectType } from 'nexus';
import { nexusPrisma } from 'nexus-plugin-prisma';
import { NexusGraphQLSchema } from 'nexus/dist/definitions/_types';
import { IResolverService } from './resolvers/resolver';

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

@singleton()
export class SchemaService {
  private mutationService: IResolverService;

  private queryService: IResolverService;

  constructor(@inject('MutationService') ms: IResolverService, @inject('QueryService') qs: IResolverService) {
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
      contextType: {
        module: require.resolve('./context'),
        export: 'Context',
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
