import { BaseEntity, Entity, ObjectIdColumn, Column } from 'typeorm';
import {Field, ID, Int, ObjectType} from 'type-graphql';
import {ObjectId} from "mongodb";
import mongoose from "mongoose";

@ObjectType({simpleResolvers: true})
@Entity("hotels")
export class Hotel extends BaseEntity {

    @Field(() => ID)
    @ObjectIdColumn()
    // @ts-ignore
    id: ObjectId

    @Field(() => Int, {nullable: true})
    @Column()
    // @ts-ignore
    hotelid?: number

    @Field({nullable: true})
    @Column()
    // @ts-ignore
    hotelname?: string

    @Field(() => Int, {nullable: true})
    @Column()
    // @ts-ignore
    hotelstars?: number
}

@ObjectType({simpleResolvers: true})
@Entity("hotels")
export class DetailedHotel extends BaseEntity {

    @Field(() => ID)
    @ObjectIdColumn()
        // @ts-ignore
    id: ObjectId

    @Field(() => Int, {nullable: true})
    @Column()
        // @ts-ignore
    hotelid?: number

    @Field({nullable: true})
    @Column()
        // @ts-ignore
    hotelname?: string

    @Field(() => Int, {nullable: true})
    @Column()
        // @ts-ignore
    hotelstars?: number

}

export const HotelSchema = new mongoose.Schema({
    _id: ObjectId,

    hotelid: Number,
    hotelname: String,
    hotelstars: Number,
    offerCount: Number


})
