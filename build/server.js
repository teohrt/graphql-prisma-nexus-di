"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var inversify_config_1 = __importDefault(require("./ioc/inversify.config"));
var types_1 = __importDefault(require("./ioc/types"));
var schemaService = inversify_config_1.default.get(types_1.default.SchemaService);
var schema = schemaService.getSchema();
new apollo_server_1.ApolloServer({ schema: schema }).listen().then(function (_a) {
    var url = _a.url;
    console.log("Server is running on " + url);
});
