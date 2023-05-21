"use client";

import {OpenAPIClientAxios, Parameters} from "openapi-client-axios";
import {Client, Components, Paths} from "@/app/types/openapi"
import HotelOffer from "@/app/components/HotelOffer/HotelOffer";
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {Box, LinearProgress, Rating, Typography} from "@mui/material";
import {gql, useMutation, useQuery} from "@apollo/client";
import {ADD_SAVED_OFFERS_MUTATION} from "../utils/mutations"


import {calcDuration} from "../utils/utils"

type HotelOffer = Components.Schemas.GetHotelOffersResponse

const SAVED_OFFERS_QUERY = gql`
    query Saved_offers {
        saved_offers {
            _id
            countadults
            countchildren
            hotelid
            inboundarrivalairport
            inboundarrivaldatetime
            inbounddepartureairport
            inbounddeparturedatetime
            mealtype
            oceanview
            outboundarrivaldatetime
            outboundarrivalairport
            outbounddepartureairport
            outbounddeparturedatetime
            price
            roomtype
        }
    }
`


export default function Page() {
    const query = useSearchParams()
    const [savedOffers, setSavedOffers] = useState<HotelOffer>();

    const [toggleOfferMutation, {data: saveData, loading: saveLoading, error: saveError}] = useMutation(ADD_SAVED_OFFERS_MUTATION)

    const {data, loading, error} = useQuery(SAVED_OFFERS_QUERY, {
        pollInterval: 500
    })

    async function handleToggleOffer(offerId: string): Promise<void> {
        // Add offer mutation
        await toggleOfferMutation({variables: {offerId: offerId}})
    }


    if (loading || error ) {
        return <LinearProgress />
    }

    return (
        <>
                {data !== undefined && data.saved_offers.map((offer: any) =>
                    <HotelOffer key={offer._id} onToggleOffer={handleToggleOffer} bookButton={true} offer={{
                        _id: offer._id,
                        isSaved: true,
                        hotelid: offer.hotelid,
                        price: offer.price,
                        countAdults: offer.countadults,
                        countChildren: offer.countchildren,
                        inboundDepartureAirport: offer.inbounddepartureairport,
                        inboundDepartureDatetime: offer.inbounddeparturedatetime, // date
                        inboundArrivalAirport:  offer.inboundarrivalairport,
                        inboundArrivalDatetime: offer.inboundarrivaldatetime, // datetime
                        outboundDepartureAirport: offer.outboundarrivalairport,
                        outboundDepartureDatetime: offer.outbounddeparturedatetime, // date
                        outboundArrivalAirport: offer.outboundarrivalairport,
                        outboundArrivalDatetime: offer.outboundarrivaldatetime, // datetime
                        mealType: offer.mealtype,
                        oceanView: offer.oceanview == 'true' ,
                        roomType: offer.roomtype,
                        duration: calcDuration(offer.outbounddeparturedatetime, offer.inboundarrivaldatetime)
                    }} />
                )}
        </>
    )
}