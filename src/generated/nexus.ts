/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  PostCreateManyWithoutAuthorInput: { // input type
    connect?: NexusGenInputs['PostWhereUniqueInput'][] | null; // [PostWhereUniqueInput!]
    connectOrCreate?: NexusGenInputs['PostCreateOrConnectWithoutauthorInput'][] | null; // [PostCreateOrConnectWithoutauthorInput!]
    create?: NexusGenInputs['PostCreateWithoutAuthorInput'][] | null; // [PostCreateWithoutAuthorInput!]
  }
  PostCreateOrConnectWithoutauthorInput: { // input type
    create: NexusGenInputs['PostCreateWithoutAuthorInput']; // PostCreateWithoutAuthorInput!
    where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
  }
  PostCreateWithoutAuthorInput: { // input type
    content?: string | null; // String
    published?: boolean | null; // Boolean
    title: string; // String!
  }
  PostWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserCreateInput: { // input type
    email: string; // String!
    name?: string | null; // String
    posts?: NexusGenInputs['PostCreateManyWithoutAuthorInput'] | null; // PostCreateManyWithoutAuthorInput
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Post: { // root type
    authorId?: number | null; // Int
    content?: string | null; // String
    id: number; // Int!
    published: boolean; // Boolean!
    title: string; // String!
  }
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post'] | null; // Post
    deleteOnePost: NexusGenRootTypes['Post'] | null; // Post
    publish: NexusGenRootTypes['Post'] | null; // Post
    signupUser: NexusGenRootTypes['User']; // User!
  }
  Post: { // field return type
    author: NexusGenRootTypes['User'] | null; // User
    authorId: number | null; // Int
    content: string | null; // String
    id: number; // Int!
    published: boolean; // Boolean!
    title: string; // String!
  }
  Query: { // field return type
    feed: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    filterPosts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    post: NexusGenRootTypes['Post'] | null; // Post
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    createDraft: 'Post'
    deleteOnePost: 'Post'
    publish: 'Post'
    signupUser: 'User'
  }
  Post: { // field return type name
    author: 'User'
    authorId: 'Int'
    content: 'String'
    id: 'Int'
    published: 'Boolean'
    title: 'String'
  }
  Query: { // field return type name
    feed: 'Post'
    filterPosts: 'Post'
    post: 'Post'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    name: 'String'
    posts: 'Post'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createDraft: { // args
      authorEmail: string; // String!
      content?: string | null; // String
      title: string; // String!
    }
    deleteOnePost: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    publish: { // args
      id?: number | null; // Int
    }
    signupUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
  }
  Query: {
    filterPosts: { // args
      searchString?: string | null; // String
    }
    post: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}