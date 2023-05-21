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
exports.dataSource = exports.savedOffers = exports.SMALLER_INDEX_SCHEMA = exports.INDEX_SCHEMA = exports.hotels_dict = void 0;
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
exports.SMALLER_INDEX_SCHEMA = {
    price: 1,
    hotelid: 1,
    countadults: 1,
    countchildren: 1,
    inboundarrivaldatetime: 1,
    outbounddepartureairport: 1,
    outbounddeparturedatetime: 1,
    oceanview: 1,
    mealtype: 1,
    roomtype: 1
};
exports.savedOffers = [];
exports.dataSource = new typeorm_1.DataSource({
    type: "mongodb",
    host: "mongo",
    port: 27017,
    database: "test",
    entities: [Hotel_1.Hotel, Offers_1.Offer]
});
function addColumn() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Add column");
        Offers_1.OfferSchema.statics.updateDuration = function () {
            return this.updateMany({}, [
                {
                    $set: {
                        duration: {
                            $abs: {
                                $trunc: {
                                    $divide: [
                                        {
                                            $subtract: [
                                                { $toDate: '$outbounddeparturedatetime' },
                                                { $toDate: '$inboundarrivaldatetime' },
                                            ]
                                        },
                                        1000 * 60 * 60 * 24 // Convert ms to days
                                    ]
                                }
                            }
                        }
                    }
                }
            ]);
        };
        // get the model
        const OfferModel = mongoose_1.default.model("Offer", Offers_1.OfferSchema);
        // @ts-ignore
        yield OfferModel.updateDuration().then(() => {
            console.log("Updated all Offers");
        }).catch((error) => {
            console.log("Error updating duration: ", error);
        });
    });
}
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.dataSource.initialize().catch((err) => {
        console.log("Error: ", err);
    });
    yield mongoose_1.default.connect("mongodb://mongo:27017/test");
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [HotelResolver_1.HotelResolver, OfferResolver_1.OfferResolver],
        validate: { forbidUnknownValues: false }
    });
    // Uncomment to add the attribute duration to the documents
    /*
    addColumn().then((result) => {
        console.log("Added all columns")
    })
     */
    /*
    {outbounddeparturedatetime: "2023-06-05T11:15:00+00:00",
    outbounddepartureairport: "LEJ",
inboundarrivaldatetime: "2023-06-09T10:55:00+00:00",
countadults: 2,
countchildren: 0,
price: 1350,


}
     */
    // Index the data
    //
    // console.log("Creating index")
    // TODO: Make sure this index can be used alone
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
        origin: ["*", 'http://localhost:3000', "https://studio.apollographql.com"]
    };
    yield apolloServer.applyMiddleware({ app, cors: corsOptions });
    app.listen(4000, () => {
        console.log('server started at port 4000');
    });
});
startServer();
