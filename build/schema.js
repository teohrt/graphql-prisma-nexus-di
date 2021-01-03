"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
var nexus_1 = require("nexus");
var nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
var User = nexus_1.objectType({
    name: 'User',
    definition: function (t) {
        t.model.id();
        t.model.name();
        t.model.email();
        t.model.posts({
            pagination: false,
        });
    },
});
var Post = nexus_1.objectType({
    name: 'Post',
    definition: function (t) {
        t.model.id();
        t.model.title();
        t.model.content();
        t.model.published();
        t.model.author();
        t.model.authorId();
    },
});
var Query = nexus_1.objectType({
    name: 'Query',
    definition: function (t) {
        t.crud.post();
        t.list.field('feed', {
            type: 'Post',
            resolve: function (_, args, ctx) {
                return ctx.prisma.post.findMany({
                    where: { published: true },
                });
            },
        });
        t.list.field('filterPosts', {
            type: 'Post',
            args: {
                searchString: nexus_1.nullable(nexus_1.stringArg()),
            },
            resolve: function (_, _a, ctx) {
                var searchString = _a.searchString;
                return ctx.prisma.post.findMany({
                    where: {
                        OR: [
                            { title: { contains: searchString } },
                            { content: { contains: searchString } },
                        ],
                    },
                });
            },
        });
    },
});
var Mutation = nexus_1.objectType({
    name: 'Mutation',
    definition: function (t) {
        t.crud.createOneUser({ alias: 'signupUser' });
        t.crud.deleteOnePost();
        t.field('createDraft', {
            type: 'Post',
            args: {
                title: nexus_1.nonNull(nexus_1.stringArg()),
                content: nexus_1.stringArg(),
                authorEmail: nexus_1.nonNull(nexus_1.stringArg()),
            },
            resolve: function (_, _a, ctx) {
                var title = _a.title, content = _a.content, authorEmail = _a.authorEmail;
                return ctx.prisma.post.create({
                    data: {
                        title: title,
                        content: content,
                        published: false,
                        author: {
                            connect: { email: authorEmail },
                        },
                    },
                });
            },
        });
        t.nullable.field('publish', {
            type: 'Post',
            args: {
                id: nexus_1.intArg(),
            },
            resolve: function (_, _a, ctx) {
                var id = _a.id;
                return ctx.prisma.post.update({
                    where: { id: Number(id) },
                    data: { published: true },
                });
            },
        });
    },
});
exports.schema = nexus_1.makeSchema({
    types: [Query, Mutation, Post, User],
    plugins: [nexus_plugin_prisma_1.nexusPrisma({ experimentalCRUD: true })],
    outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
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
