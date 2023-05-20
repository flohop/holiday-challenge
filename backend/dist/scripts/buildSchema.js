"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.here = void 0;
// @ts-nocheck
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const graphql_1 = require("graphql");
const utilities_1 = require("graphql/utilities");
const schema_1 = __importDefault(require("../schema"));
function buildSchema() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_extra_1.default.ensureFile('../data/schema.graphql.json');
        yield fs_extra_1.default.ensureFile('../data/schema.graphql');
        fs_extra_1.default.writeFileSync(path_1.default.join(__dirname, '../data/schema.graphql.json'), JSON.stringify(yield (0, graphql_1.graphql)(schema_1.default, utilities_1.introspectionQuery), null, 2));
        fs_extra_1.default.writeFileSync(path_1.default.join(__dirname, '../data/schema.graphql.txt'), (0, utilities_1.printSchema)(schema_1.default));
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield buildSchema();
        console.log('Schema build complete!');
    });
}
run().catch(e => {
    console.log(e);
    process.exit(0);
});
exports.here = "";
