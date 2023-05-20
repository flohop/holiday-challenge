"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_compose_1 = require("graphql-compose");
const schemaCompose = new graphql_compose_1.SchemaComposer();
const hotels_1 = require("./hotels");
schemaCompose.Query.addFields(Object.assign({}, hotels_1.HotelQuery));
exports.default = schemaCompose.buildSchema();
