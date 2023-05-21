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

export const SMALLER_INDEX_SCHEMA = {
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
}

export const savedOffers: string[] = []

export const dataSource = new DataSource({
    type: "mongodb",
    host: "mongo", // TODO: For local testing change to 'localhost'
    port: 27017,
    database: "test",
    entities: [Hotel, Offer]
})

async function addColumn() {
    console.log("Add column")
    OfferSchema.statics.updateDuration = function() {
        return this.updateMany({}, [
            {
                $set: {
                    duration: {
                        $abs: {
                            $trunc: {
                                $divide: [
                                    {
                                        $subtract: [
                                            {$toDate: '$outbounddeparturedatetime'},
                                            {$toDate: '$inboundarrivaldatetime'},
                                        ]
                                    },
                                    1000 * 60 * 60 * 24 // Convert ms to days
                                ]
                            }
                        }
                    }
                }
            }
        ])
    }

    // get the model
    const OfferModel = mongoose.model("Offer", OfferSchema)


    // @ts-ignore
    await OfferModel.updateDuration().then(() => {
        console.log("Updated all Offers")
    }).catch((error: any) => {
        console.log("Error updating duration: ", error)
    })
}

const startServer = async () => {

    await dataSource.initialize().catch((err) => {
        console.log("Error: ", err)
    })

    await mongoose.connect("mongodb://mongo:27017/test")

    const schema = await buildSchema({
        resolvers: [HotelResolver, OfferResolver],
        validate: {forbidUnknownValues: false}
    })
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

    const app = Express()
    const apolloServer = new ApolloServer({schema, csrfPrevention: false })
    await apolloServer.start()

    const corsOptions = {
        origin: ["*",'http://localhost:3000', "https://studio.apollographql.com"]
    };


    await apolloServer.applyMiddleware({app, cors: corsOptions});
    app.listen(4000, () => {
        console.log('server started at port 4000');
    })
}
startServer();