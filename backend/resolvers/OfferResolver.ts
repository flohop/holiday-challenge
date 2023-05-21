import {Query, Resolver, Arg, InputType, Field, FieldResolver, Root, Int, Mutation} from "type-graphql";
import {Offer, OfferSchema, SimpleOffer} from "../entities/Offers";

import {Hotel} from "../entities/Hotel";
import * as mongoose from "mongoose";
import {hotels_dict, INDEX_SCHEMA, savedOffers, SMALLER_INDEX_SCHEMA} from "../index"

export const OfferModel = mongoose.model('offers', OfferSchema)

@InputType()
class OfferHotelInput {

    @Field()
    hotelid: number

    @Field()
    pageSize: number

    @Field()
    pageNumber: number
}

@InputType()
class OfferInput {

    @Field(() => [String])
    departureAirports: [string]

    @Field({nullable: true})
    hotelId?: number

    @Field()
    earliestDepartureDate: string

    @Field()
    latestReturnDate: string

    @Field()
    countAdults: number

    @Field()
    price: number

    @Field()
    countChildren: number

    @Field()
    duration: number

    @Field()
    pageSize: number

    @Field()
    pageNumber: number

    @Field()
    oceanView: string

    @Field(() => String, )
    mealType: "BREAKFAST" | "NONE" | "ALLINCLUSIVE" | "HALFBOARD"

    @Field(() => String)
    roomType: "DOUBLE" | "APARTMENT" | "SUITE" | "STUDIO" | "SINGLE" | "FAMILY" | "TRIPLE"
}


@Resolver(Offer)
export class OfferResolver {

    @Query(() => Offer)
    async minPriceOffer(
        @Arg("hotelId") hotelId: number
    ): Promise<Offer> {
        const cheapestOffer = await OfferModel.find({hotelid: hotelId}).sort({price: 1}).lean().limit(1)

        // @ts-ignore
        return cheapestOffer[0];
    }

    @Query(() => [Offer])
    async offers_by_hotel_by_filter(
        @Arg("input") input: OfferInput,
    ): Promise<Offer[]> {

        const result = await OfferModel.aggregate([
            // $match stage using covered index fields

            {
                $match: {
                    hotelid: input.hotelId,
                    outbounddeparturedatetime: {$gte: input.earliestDepartureDate},
                    outbounddepartureairport: {$in: input.departureAirports},
                    countadults: input.countAdults,
                    countchildren: input.countChildren,
                    price: {$lte: input.price},
                    inboundarrivaldatetime: {$lte: input.latestReturnDate},
                    mealtype: input.mealType,
                    oceanview: input.oceanView,
                    roomtype: input.roomType
                }
            },
            {
                $match: {
                    $expr: {
                        $eq: [
                            {
                                $floor: {
                                    $divide: [
                                        {
                                            $subtract: [
                                                {"$dateFromString": {"dateString": "$inboundarrivaldatetime"}},
                                                {"$dateFromString": {"dateString": "$outbounddeparturedatetime"}}
                                            ]
                                        },
                                        86400000
                                    ]
                                },

                            },
                            input.duration
                        ]
                    }
                }
            },

            {
                $skip: (input.pageNumber-1) * input.pageSize
            },
            {
                $limit: input.pageSize
            }]).hint(INDEX_SCHEMA).exec()

        // @ts-ignore
        return result

    }

    @Query(() => [Offer])
    async offers_by_filter(
        @Arg("input") input: OfferInput
    ): Promise<Offer[]> {

        const result = await OfferModel.aggregate([
            // $match stage using covered index fields

            {
                $match: {
                    outbounddeparturedatetime: {$gte: input.earliestDepartureDate},
                    outbounddepartureairport: {$in:  input.departureAirports},
                    countadults: input.countAdults,
                    countchildren: input.countChildren,
                    price: {$lte: input.price},
                    inboundarrivaldatetime: {$lte: input.latestReturnDate},
                    mealtype: input.mealType,
                    oceanview: input.oceanView,
                    roomtype: input.roomType
                }
            },

            // $project stage
            {
                $project: {
                    _id: 1,
                    price: 1,
                    hotelid: 1,
                    countadults: 1,
                    countchildren: 1,
                    outbounddeparturedatetime: 1,
                    outbounddepartureairport: 1,
                    outboundarrivaldatetime: 1,
                    outboundarrivalairport: 1,
                    inbounddeparturedatetime: 1,
                    inbounddepartureairport: 1,
                    inboundarrivaldatetime: 1,
                    inboundarrivalairport: 1,
                    mealtype: 1,
                    oceanview: 1,
                    roomtype: 1,
                    "durationInDays": {
                        "$floor": {
                            "$divide": [
                                {
                                    "$subtract": [
                                        {"$dateFromString": {"dateString": "$inboundarrivaldatetime"}},
                                        {"$dateFromString": {"dateString": "$outbounddeparturedatetime"}}
                                    ]
                                },
                                86400000
                            ]
                        }
                    },
                }
            },
            {
              $match: {
                  durationInDays: input.duration
              }
            },
            {
                $group: {
                    _id: '$hotelid',
                    price: { $min: '$price' },
                    document: {$first: "$$ROOT"},
                }
            },
            {
                $replaceRoot: {
                    newRoot: "$document"
                }
            },
            // Pagination
            {
                $skip: (input.pageNumber-1) * input.pageSize
            },
            {
                $limit: input.pageSize
            }
        ]).exec()

        // @ts-ignore
        return result
    }

    @FieldResolver(() => Hotel)
    async hotel(@Root() offer: Offer): Promise<Hotel> {

        const hotel: Hotel | null = hotels_dict[offer.hotelid!.toString()]

        if (hotel == null) {
            console.log("Something went wrong getting the hotel")
            throw new Error("Something went wrong getting the hotel")
        }
        return hotel;
    }

    @FieldResolver(() => Boolean)
    async isSaved(@Root() offer: Offer): Promise<boolean> {
        return savedOffers.includes(offer._id.toString())
    }


    @Query(() => [Offer])
    async offers_by_hotel(
        @Arg("input") input: OfferHotelInput
    ): Promise<Offer[]> {

        const result = await OfferModel.aggregate([
            // $match stage using covered index fields
            {
                $match: {
                    // Query conditions
                    hotelid: input.hotelid
                }
            },


            // $project stage
            {
                $project: {
                    _id: 1,
                    price: 1,
                    hotelid: 1,
                    countadults: 1,
                    countchildren: 1,
                    outbounddeparturedatetime: 1,
                    outbounddepartureairport: 1,
                    outboundarrivaldatetime: 1,
                    outboundarrivalairport: 1,
                    inbounddeparturedatetime: 1,
                    inbounddepartureairport: 1,
                    inboundarrivaldatetime: 1,
                    inboundarrivalairport: 1,
                    mealtype: 1,
                    oceanview: 1,
                    roomtype: 1,
                    "durationInDays": {
                        "$floor": {
                            "$divide": [
                                {
                                    "$subtract": [
                                        {"$dateFromString": {"dateString": "$inboundarrivaldatetime"}},
                                        {"$dateFromString": {"dateString": "$outbounddeparturedatetime"}}
                                    ]
                                },
                                86400000
                            ]
                        }
                    },
                }
            },

            // Pagination
            {
                $skip: (input.pageNumber-1) * input.pageSize
            },
            {
                $limit: input.pageSize
            }
        ]).exec()


        // @ts-ignore
        return result
    }


    @Mutation(() => Boolean)
    async toggle_saved_offer(
        @Arg("offer_id") offer_id: string
    ): Promise<Boolean> {
        if (!savedOffers.includes(offer_id)) {
            savedOffers.push(offer_id)
            return true;
        } else {
            const index = savedOffers.indexOf(offer_id, 0);
            if (index > -1) {
                savedOffers.splice(index, 1);
            }
            return false;
        }
    }

    @Query(() => [Offer])
    async saved_offers(
    ): Promise<Offer[]> {
        return OfferModel.find({
            _id: {$in: savedOffers}
        }).lean()
    }



}