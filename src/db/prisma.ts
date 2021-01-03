import { PrismaClient } from '@prisma/client';
import { singleton } from 'tsyringe';

export interface IPrisma {
  client: PrismaClient
}

@singleton()
export class Prisma implements IPrisma {
  public client: PrismaClient

  constructor() {
    this.client = new PrismaClient();
  }
}
