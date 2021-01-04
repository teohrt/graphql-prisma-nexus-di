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
exports.SchemaService = void 0;
require("reflect-metadata");
var inversify_1 = require("inversify");
var nexus_1 = require("nexus");
var nexus_plugin_prisma_1 = require("nexus-plugin-prisma");
var types_1 = __importDefault(require("../ioc/types"));
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
var SchemaService = /** @class */ (function () {
    function SchemaService(ms, qs) {
        this.mutationService = ms;
        this.queryService = qs;
    }
    SchemaService.prototype.getSchema = function () {
        return nexus_1.makeSchema({
            types: [this.queryService.getResolvers(), this.mutationService.getResolvers(), Post, User],
            plugins: [nexus_plugin_prisma_1.nexusPrisma({ experimentalCRUD: true })],
            outputs: {
                schema: __dirname + "/../../schema.graphql",
                typegen: __dirname + "/../generated/nexus.ts",
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
    };
    SchemaService = __decorate([
        inversify_1.injectable(),
        __param(0, inversify_1.inject(types_1.default.MutationService)),
        __param(1, inversify_1.inject(types_1.default.QueryService))
    ], SchemaService);
    return SchemaService;
}());
exports.SchemaService = SchemaService;
