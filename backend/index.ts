import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { buildSchema } from 'type-graphql';
import { DataSource } from "typeorm";
import {HotelResolver} from "./resolvers/HotelResolver";
import {Hotel} from "./entities/Hotel";
import {Offer, OfferSchema} from "./entities/Offers";
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


/*export const dataSource = new DataSource({
    type: "mongodb",
    // host: "localhost",
    // host: "mongodb://141.95.127.73",

    // host: "mongo",
    // port: 27017,
    // database: "test",
    entities: [Hotel, Offer]
})*/

const startServer = async () => {

/*
    await dataSource.initialize().catch((err) => {
        console.log("Error: ", err)
    })

*/
    //const URI = "mongodb://localhost:2717/"
    await mongoose.connect("mongodb://db:27017")
    // await mongoose.connect(URI, {connectTimeoutMS:99999999999})
    //await mongoose.connect("mongodb://localhost:27017/test")

    const schema = await buildSchema({
        resolvers: [HotelResolver, OfferResolver],
        validate: {forbidUnknownValues: false}
    })

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

    const app = Express()
    const apolloServer = new ApolloServer({schema, csrfPrevention: false })
    await apolloServer.start()

    const corsOptions = {
        origin: ['http://localhost:3000', "https://studio.apollographql.com", "http://141.95.127.73", "http://141.95.127.73:80"]
    };


    await apolloServer.applyMiddleware({app, cors: corsOptions});
    app.listen(4000, () => {
        console.log('server started at port 4000');
    })
}
startServer();