import {Arg, Field, FieldResolver, InputType, Query, Resolver, Root} from "type-graphql";
import {Hotel, HotelSchema} from "../entities/Hotel";
import {hotels_dict} from "../index";
import {OfferModel} from "./OfferResolver";
import mongoose from "mongoose";
import {Offer} from "../entities/Offers";

export const HotelModel = mongoose.model('hotels', HotelSchema)

@InputType()
class HotelsInput {
    @Field()
    pageSize: number

    @Field()
    pageNumber: number
}


@Resolver(Hotel)
export class HotelResolver {
    @Query(() => [Hotel])
        async hotels(
            @Arg("input") input: HotelsInput
    ): Promise<Hotel[]> {

        let startIndex = 1 + (input.pageNumber-1) * input.pageSize
        let endIndex = (startIndex + input.pageSize) - 1

        const MAX_INDEX = 998

        if (startIndex > MAX_INDEX) {
            return []
        }

        const results: Hotel[] = []


        if (endIndex > MAX_INDEX) {
            endIndex = MAX_INDEX
        }

        while (startIndex <= endIndex) {
            results.push(hotels_dict[startIndex.toString()])
            startIndex+=1
        }

        return results

    }



    @FieldResolver(() => Number)
    async count(@Root() hotel: Hotel): Promise<number> {
        return OfferModel.count({hotelid: hotel.hotelid});
    }

    @Query(() => Offer)
    async maxPriceOffer(
        @Arg("hotelId") hotelId: number
    ): Promise<Offer> {
        const expensiveOffer = await OfferModel.find({hotelid: hotelId})
            .hint({price: -1})
            .sort({price: -1})
            .limit(1)

        // @ts-ignore
        return expensiveOffer[0];
    }





    @Query(() => Hotel)
    async hotel(
        @Arg("id", ) id: number,
    ): Promise<Hotel> {
        const hotel: Hotel | null = hotels_dict[id.toString()]

        const count = await OfferModel.count({hotelid: id})

        if (hotel == null) {
            console.log("Something went wrong getting the hotel")
            throw new Error("Something went wrong getting the hotel")
        }
        return hotel;
    }

    @Query(() => Number)
    async hotel_count_offers(
        @Arg("id")id: number
    ): Promise<number> {
        return OfferModel.count({hotelid: id})
    }
}

