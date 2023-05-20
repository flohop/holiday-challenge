"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySchema = exports.hotelQueryType = void 0;
const graphql_1 = require("graphql");
const mongoose_1 = __importDefault(require("mongoose"));
const URI = "mongodb://localhost:27017";
mongoose_1.default.connect(URI).catch((err) => {
    console.log("Could not connect to mongoose," + err);
});
const Hotels = mongoose_1.default.model("Hotel", null);
const HotelType = new graphql_1.GraphQLObjectType({
    name: "hotel",
    fields: function () {
        return {
            id: {
                type: graphql_1.GraphQLID
            },
            name: {
                type: graphql_1.GraphQLString
            },
            stars: {
                type: graphql_1.GraphQLInt
            }
        };
    }
});
exports.hotelQueryType = new graphql_1.GraphQLObjectType({
    name: "Query",
    fields: function () {
        return {
            hotels: {
                type: new graphql_1.GraphQLList(HotelType),
                resolve: function () {
                    return new Promise(function (resolve, reject) {
                        Hotels.find().then((hotels) => {
                            console.log(hotels[0]);
                            resolve(hotels);
                        }).catch((err) => {
                            reject(err);
                        });
                    });
                }
            }
        };
    }
});
exports.MySchema = new graphql_1.GraphQLSchema({
    query: exports.hotelQueryType
});
