"use client";

import SearchForm from "@/app/components/SearchForm/SearchForm";
import {CircularProgress, Stack, Typography, Box, LinearProgress} from "@mui/material";
import Hotel from "@/app/components/Hotel/Hotel";
import {Client, Components, Paths} from "@/app/types/openapi";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useQuery, gql, useLazyQuery, useMutation} from '@apollo/client';
import HotelOffer from "@/app/components/HotelOffer/HotelOffer";
// @ts-ignore
import InfiniteScroll from "react-infinite-scroller"
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {useCookies} from "react-cookie";



const GET_HOTELS = gql`
    query Hotels {
        hotels {
            hotelid
            hotelname
            hotelstars
        }
    }
`;

const GET_OFFERS = gql`
    query Query($input: OfferInput!) {
        offers_by_filter(input: $input) {
            _id
            isSaved
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

export const ADD_SAVED_OFFERS_MUTATION = gql`
    mutation Mutation($offerId: String!) {
        toggle_saved_offer(offer_id: $offerId)
    }
`


export function calcDuration(start: string, end: string): number  {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    const startDate = Date.parse(start);
    const endDate = Date.parse(end)

    if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error("Invalid date format")
    }
    const differenceMilliseconds = Math.abs(startDate - endDate);
    const daysDifference = Math.floor(differenceMilliseconds / millisecondsPerDay);

    return daysDifference;
}

export const generateRandomNumber = () => {
    const min = Math.pow(10, 4); // Minimum value for 5 digits (10000)
    const max = Math.pow(10, 5) - 1; // Maximum value for 5 digits (99999)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
};

export default function HomePage() {
    const [offers, setOffers] = useState<any[]>([]);
    const [getOffers, {loading, error, data, fetchMore}] = useLazyQuery(GET_OFFERS)
    const [toggleOfferMutation, {data: saveData, loading: saveLoading, error: saveError}] = useMutation(ADD_SAVED_OFFERS_MUTATION, {
        ignoreResults: true
    })

    const [cookies, setCookie] = useCookies(['queryInput'])

    const [canLoadMore, setCanLoadMore] = useState(false)



    async function loadMore(pageNumber: number) {

        // Only load more if there are already some present
        if (offers.length == 0 ) {
            return []
        }

        const response = await fetchMore({
            variables: {
                pageNumber: pageNumber
            }
        })
        const newOffers = response.data.offers_by_filter

        if (newOffers.length == 0) {
            setCanLoadMore(false)
        }

        setOffers(prevOffers => [...prevOffers, ...newOffers])

        return  []
    }

    async function handleToggleOffer(offerId: string): Promise<void> {
        // Add offer mutation
        await toggleOfferMutation({variables: {offerId: offerId}})
    }

    async function onSubmitSearchForm(departureAirports: string[], countAdults: number, countChildren: number, duration: number, earliestDeparture: string, latestReturn: string, requireOceanView: boolean, mealtype: string) {

        /*
        const pre_variables = {
            input: {
                countAdults: 2,
                duration: 3,
                countChildren: 0,
                latestReturnDate: "2025-05-19T00:00:00+00:00",
                earliestDepartureDate: "2020-05-19T00:00:00+00:00",
                departureAirports: ["HERE", "SOME", "LEJ"]
            }
        }

         */

        const queryInput = {
            "hotelId": null,
            "countAdults": 2,
            "countChildren": 0,
            "duration": 4,
            "earliestDepartureDate": "2023-05-19T00:00:00+00:00",
            "latestReturnDate": "2023-05-30T17:40:00+00:00",
            "departureAirports": ["LEJ", "MUC"],
            "pageNumber": 1,
            "pageSize": 10,
            "price": 900,
            "oceanView": "false",
            "mealType": "NONE",
            "roomType": "STUDIO"
        }

        // @ts-ignore
        window.queryInput = queryInput
        setCookie('queryInput', queryInput, {path: "/"})



        const response = await getOffers( {
            variables: {input: queryInput
            }})

        setOffers(response.data.offers_by_filter)
        setCanLoadMore(true)
    }

    // @ts-ignore
    return (
        <Box sx={{height: "100%", width: "100%"}} id="outerBOX">
            <Typography sx={{mb: "50px", mt: "40px"}} variant="h3">CHECK24 Holiday Challenge</Typography>
            <SearchForm submitCallback={onSubmitSearchForm} />



            <Typography variant="h4" sx={{mt: "60px", mb: "30px"}}>Hotels for your Mallorca-Trip:</Typography>
            {loading ? <LinearProgress /> :

                <InfiniteScroll
                    pageStart={1}
                    loadMore={loadMore}
                    hasMore={canLoadMore}
                    loader={<LinearProgress key={generateRandomNumber()} />}
                    threshold={2000}
                    key={generateRandomNumber()}
                >
                        {data !== undefined && offers.map((offer: any) =>
                            <HotelOffer key={offer._id} onToggleOffer={handleToggleOffer} offer={{
                                _id: offer._id,
                                isSaved: offer.isSaved,
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


                </InfiniteScroll>
            }




        </Box>
    )
}