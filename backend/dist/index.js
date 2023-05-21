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
exports.dataSource = exports.savedOffers = exports.INDEX_SCHEMA = exports.hotels_dict = void 0;
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const HotelResolver_1 = require("./resolvers/HotelResolver");
const Hotel_1 = require("./entities/Hotel");
const Offers_1 = require("./entities/Offers");
const OfferResolver_1 = require("./resolvers/OfferResolver");
const mongoose_1 = __importDefault(require("mongoose"));
exports.hotels_dict = require("./hotels.json");
exports.INDEX_SCHEMA = {
    hotelid: 1,
    price: 1,
    countadults: 1,
    countchildren: 1,
    inbounddepartureairport: 1,
    inbounddeparturedatetime: 1,
    inboundarrivalairport: 1,
    inboundarrivaldatetime: 1,
    outbounddepartureairport: 1,
    outbounddeparturedatetime: 1,
    outboundarrivalairport: 1,
    outboundarrivaldatetime: 1,
    mealtype: 1,
    oceanview: 1,
    roomtype: 1,
};
exports.savedOffers = [];
exports.dataSource = new typeorm_1.DataSource({
    type: "mongodb",
    host: "mongo",
    port: 27017,
    // port: 2717,
    database: "test",
    entities: [Hotel_1.Hotel, Offers_1.Offer]
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.dataSource.initialize().catch((err) => {
        console.log("Error: ", err);
    });
    yield mongoose_1.default.connect("mongodb://mongo:27017/test");
    //await mongoose.connect("mongodb://localhost:27017/test")
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [HotelResolver_1.HotelResolver, OfferResolver_1.OfferResolver],
        validate: { forbidUnknownValues: false }
    });
    // Index the data
    //
    // console.log("Creating index")
    // @ts-ignore
    /*    OfferSchema.index({
            hotelid: 1,
            price: 1,
            countadults: 1,
            countchildren: 1,
            inbounddepartureairport: 1,
            inbounddeparturedatetime: 1,
            inboundarrivalairport: 1,
            inboundarrivaldatetime: 1,
            outbounddepartureairport: 1,
            outbounddeparturedatetime: 1,
            outboundarrivalairport: 1,
            outboundarrivaldatetime: 1,
            mealtype: 1,
            oceanview: 1,
            roomtype: 1,
        })*/
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema, csrfPrevention: false });
    yield apolloServer.start();
    const corsOptions = {
        origin: ['http://localhost:3000', "https://studio.apollographql.com", "http:141.95.127.73", "http:141.95.127.73:80"]
    };
    yield apolloServer.applyMiddleware({ app, cors: corsOptions });
    app.listen(4000, () => {
        console.log('server started at port 4000');
    });
});
startServer();
