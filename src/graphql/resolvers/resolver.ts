import { NexusObjectTypeDef } from 'nexus/dist/definitions/objectType';

export interface IResolverService {
  getResolvers(): NexusObjectTypeDef<'Mutation'> | NexusObjectTypeDef<'Query'>
}
