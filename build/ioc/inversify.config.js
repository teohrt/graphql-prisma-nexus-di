"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var types_1 = __importDefault(require("./types"));
var prisma_1 = require("../db/prisma");
var query_1 = __importDefault(require("../graphql/resolvers/query"));
var mutation_1 = __importDefault(require("../graphql/resolvers/mutation"));
var schema_1 = require("../graphql/schema");
var container = new inversify_1.Container();
container.bind(types_1.default.Prisma).to(prisma_1.Prisma);
container.bind(types_1.default.QueryService).to(query_1.default);
container.bind(types_1.default.MutationService).to(mutation_1.default);
container.bind(types_1.default.SchemaService).to(schema_1.SchemaService);
exports.default = container;
