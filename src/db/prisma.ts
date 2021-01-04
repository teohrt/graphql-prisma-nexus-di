import { PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

export interface IPrisma {
  client: PrismaClient
}

@injectable()
export class Prisma implements IPrisma {
  public client: PrismaClient

  constructor() {
    this.client = new PrismaClient();
  }
}
