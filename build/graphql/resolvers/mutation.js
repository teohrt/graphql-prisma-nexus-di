"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var nexus_1 = require("nexus");
var types_1 = __importDefault(require("../../ioc/types"));
var MutationService = /** @class */ (function () {
    function MutationService(prisma) {
        this.prisma = prisma;
    }
    MutationService.prototype.getResolvers = function () {
        var prisma = this.prisma;
        return nexus_1.objectType({
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
                    resolve: function (_, _a, _ctx) {
                        var title = _a.title, content = _a.content, authorEmail = _a.authorEmail;
                        return prisma.client.post.create({
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
                    resolve: function (_, _a, _ctx) {
                        var id = _a.id;
                        return prisma.client.post.update({
                            where: { id: Number(id) },
                            data: { published: true },
                        });
                    },
                });
            },
        });
    };
    MutationService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.Prisma))
    ], MutationService);
    return MutationService;
}());
exports.default = MutationService;
