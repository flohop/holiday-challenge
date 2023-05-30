import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import {HotelResolver} from "./resolvers/HotelResolver";
import {OfferResolver} from "./resolvers/OfferResolver";
import mongoose from "mongoose";

export const hotels_dict = require("./hotels.json")

export const INDEX_SCHEMA = {
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
}

export const savedOffers: string[] = []




const startServer = async () => {

    // const URI = "mongodb+srv://user1:sleiper1@cluster0.rppntnn.mongodb.net/?retryWrites=true&w=majority\";\n"
    // const URI = "mongodb://localhost:27017/test"
    //await mongoose.connect(URI)
    const URI = "mongodb+srv://flohop:Sleiper1@serverlessinstance0.p3zwsdc.mongodb.net/test"
    await mongoose.connect(URI)

    const schema = await buildSchema({
        resolvers: [HotelResolver, OfferResolver],
        validate: {forbidUnknownValues: false}
    })

    const app = Express()
    const apolloServer = new ApolloServer({schema, csrfPrevention: false })
    await apolloServer.start()

    const corsOptions = {
        origin: ['http://localhost:3000', "https://studio.apollographql.com", "http://141.95.127.73", "http://141.95.127.73:80",
        "https://studio.apollographql.com/sandbox/explorer", "http://check24.flohop.com"]
    };


    await apolloServer.applyMiddleware({app, cors: corsOptions});
    app.listen(4000, () => {
        console.log('server started at port ', 4000);
    })
}
startServer();