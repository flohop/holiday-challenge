import {Field, ID, Int, ObjectType} from "type-graphql";
import {DocumentType, getModelForClass, modelOptions, prop as Property} from "@typegoose/typegoose";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {Hotel} from "./Hotel";


@ObjectType({simpleResolvers: true})
@modelOptions({schemaOptions: {collection: "offers"}})
export class SimpleOffer {


    @Field(() => Int)
    @Property({required: true})
    hotelid?: number

    @Field(() => Hotel)
    hotel?: Hotel


    @Field()
    @Property({required: true})
    outbounddeparturedatetime?: string


    @Field(() => Int)
    @Property({required: false})
    price?: number

    @Field()
    @Property({required: false})
    inboundarrivaldatetime?: string

    @Field()
    @Property({required: false})
    outbounddepartureairport?: string

    // TODO: Add other fields
}




@ObjectType({simpleResolvers: true})
@modelOptions({schemaOptions: {collection: "offers"}})
export class Offer {

    @Field(() => ID)
    // @ts-ignore
    _id: ObjectId

    @Field(() => Int)
    @Property({required: true})
    // @ts-ignore
    hotelid?: number

    @Field(() => Hotel)
    hotel?: Hotel


    @Field()
    @Property({required: true})
    // @ts-ignore
    outbounddeparturedatetime?: string

    @Field()
    @Property({required: true})
    // @ts-ignore
    inbounddeparturedatetime?: string

    @Field(() => Int)
    @Property({required: false})
    // @ts-ignore
    countadults?: number

    @Field(() => Int)
    @Property({required: false})
    // @ts-ignore
    countchildren?: number

    @Field(() => Int)
    @Property({required: false})
    // @ts-ignore
    price?: number

    @Field()
    @Property({required: false})
    // @ts-ignore
    inbounddepartureairport?: string

    @Field()
    @Property({required: false})
    // @ts-ignore
    inboundarrivalairport?: string

    @Field()
    @Property({required: false})
    // @ts-ignore
    inboundarrivaldatetime?: string

    @Field()
    @Property({required: false})
    // @ts-ignore
    outbounddepartureairport?: string


    @Field()
    @Property({required: false})
    // @ts-ignore
    outboundarrivalairport?: string


    @Field()
    @Property({required: false})
    // @ts-ignore
    outboundarrivaldatetime?: string

    @Field()
    @Property({required: false})
    // @ts-ignore
    mealtype: string


    @Field()
    @Property({required: false})
    // @ts-ignore
    oceanview: string

    @Field()
    @Property({required: false})
    // @ts-ignore
    roomtype: string

    @Field(() => Int)
    @Property({required: false})
    // @ts-ignore
    duration: number
}


export const OfferSchema = new mongoose.Schema({
    _id: ObjectId,

    hotelid: Number,

    outbounddeparturedatetime: String,

    inbounddeparturedatetime: String,

    countadults: Number,

    countchildren: Number,

    price: Number,

    inbounddepartureairport: String,

    inboundarrivalairport: String,

    inboundarrivaldatetime: String,

    outbounddepartureairport: String,

    outboundarrivalairport: String,


    outboundarrivaldatetime: String,

    mealtype: String,

    oceanview: String,

    roomtype: String,

    duration: Number
})
