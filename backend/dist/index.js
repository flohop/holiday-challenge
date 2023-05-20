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
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const express_graphql_1 = require("express-graphql");
const graphql_1 = require("graphql");
const query_1 = require("./gql/query");
const app = (0, express_1.default)();
const URI = "mongodb://localhost:27017";
const client = new mongodb_1.MongoClient(URI);
client.connect().catch((error) => {
    console.log(error);
    return;
});
var schema = (0, graphql_1.buildSchema)(`
    type Query {
        hello: String
    }
`);
var root = {
    hello: () => {
        return "Hello World!";
    }
};
// Middleware
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: query_1.MySchema,
    rootValue: root,
    graphiql: true
}));
function getData(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield collection.findOne({ "hotelid": 3 });
        }
        catch (err) {
            console.error("Error");
        }
    });
}
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = client.db("test").collection("hotels");
    const h1 = yield getData(collection);
    res.send("Hello world" + JSON.stringify(h1));
}));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening in PORT ${port}`));
