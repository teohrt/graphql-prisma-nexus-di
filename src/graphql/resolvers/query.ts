import {
  nullable,
  objectType,
  stringArg,
} from 'nexus';
import { inject, injectable } from 'inversify';
import { NexusObjectTypeDef } from 'nexus/dist/definitions/objectType';
import TYPES from '../../ioc/types';
import { IPrisma } from '../../db/prisma';
import { IResolverService } from './resolver';

@injectable()
export default class QueryService implements IResolverService {
  private prisma: IPrisma;

  constructor(@inject(TYPES.Prisma) prisma: IPrisma) {
    this.prisma = prisma;
  }

  public getResolvers(): NexusObjectTypeDef<string> {
    const { prisma } = this;
    return objectType({
      name: 'Query',
      definition(t) {
        t.crud.post();

        t.list.field('feed', {
          type: 'Post',
          resolve: (_, args, ctx) => prisma.client.post.findMany({
            where: { published: true },
          }),
        });

        t.list.field('filterPosts', {
          type: 'Post',
          args: {
            searchString: nullable(stringArg()),
          },
          resolve: (_, { searchString }, ctx) => prisma.client.post.findMany({
            where: {
              OR: [
                { title: { contains: searchString as string } },
                { content: { contains: searchString as string } },
              ],
            },
          }),
        });
      },
    });
  }
}
