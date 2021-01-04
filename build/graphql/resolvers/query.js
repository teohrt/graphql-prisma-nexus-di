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
var nexus_1 = require("nexus");
var inversify_1 = require("inversify");
var types_1 = __importDefault(require("../../ioc/types"));
var QueryService = /** @class */ (function () {
    function QueryService(prisma) {
        this.prisma = prisma;
    }
    QueryService.prototype.getResolvers = function () {
        var prisma = this.prisma;
        return nexus_1.objectType({
            name: 'Query',
            definition: function (t) {
                t.crud.post();
                t.list.field('feed', {
                    type: 'Post',
                    resolve: function (_, args, ctx) { return prisma.client.post.findMany({
                        where: { published: true },
                    }); },
                });
                t.list.field('filterPosts', {
                    type: 'Post',
                    args: {
                        searchString: nexus_1.nullable(nexus_1.stringArg()),
                    },
                    resolve: function (_, _a, ctx) {
                        var searchString = _a.searchString;
                        return prisma.client.post.findMany({
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
    };
    QueryService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.Prisma))
    ], QueryService);
    return QueryService;
}());
exports.default = QueryService;
