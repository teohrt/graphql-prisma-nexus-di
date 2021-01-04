import { inject, injectable } from 'inversify';
import {
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { NexusObjectTypeDef } from 'nexus/dist/definitions/objectType';
import TYPES from '../../ioc/types';
import { IPrisma } from '../../db/prisma';
import { IResolverService } from './resolver';

@injectable()
export default class MutationService implements IResolverService {
  private prisma: IPrisma;

  constructor(@inject(TYPES.Prisma) prisma: IPrisma) {
    this.prisma = prisma;
  }

  public getResolvers(): NexusObjectTypeDef<string> {
    const { prisma } = this;

    return objectType({
      name: 'Mutation',
      definition(t) {
        t.crud.createOneUser({ alias: 'signupUser' });
        t.crud.deleteOnePost();

        t.field('createDraft', {
          type: 'Post',
          args: {
            title: nonNull(stringArg()),
            content: stringArg(),
            authorEmail: nonNull(stringArg()),
          },
          resolve: (_, { title, content, authorEmail }, _ctx) => prisma.client.post.create({
            data: {
              title,
              content,
              published: false,
              author: {
                connect: { email: authorEmail },
              },
            },
          }),
        });

        t.nullable.field('publish', {
          type: 'Post',
          args: {
            id: intArg(),
          },
          resolve: (_, { id }, _ctx) => prisma.client.post.update({
            where: { id: Number(id) },
            data: { published: true },
          }),
        });
      },
    });
  }
}
