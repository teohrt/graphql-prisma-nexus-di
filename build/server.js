"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
var schema_1 = require("./schema");
var context_1 = require("./context");
new apollo_server_1.ApolloServer({ schema: schema_1.schema, context: context_1.createContext }).listen().then(function (_a) {
    var url = _a.url;
    return console.log("Server is running on " + url);
});
