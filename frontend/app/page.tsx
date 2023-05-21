"use client";

import SearchForm from "@/app/components/SearchForm/SearchForm";
import {CircularProgress, Stack, Typography, Box, LinearProgress, Grid} from "@mui/material";
import { useState} from "react";
import {gql, useLazyQuery, useMutation} from '@apollo/client';
import HotelOffer from "@/app/components/HotelOffer/HotelOffer";
import {calcDuration, generateRandomNumber} from "./utils/utils"
import {ADD_SAVED_OFFERS_MUTATION} from "./utils/mutations"
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

    async function onSubmitSearchForm(departureAirports: string[], countAdults: number, countChildren: number, duration: number, earliestDeparture: string, latestReturn: string, oceanView: boolean, mealtype: string, roomtype: string, maxPrice: number) {

        // Placeholder for testing
/*         const queryInput = {
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
        }*/

        const queryInput = {
            "hotelId": null,
            "countAdults": countAdults,
            "countChildren": countChildren,
            "duration": duration,
            "earliestDepartureDate": earliestDeparture,
            "latestReturnDate": latestReturn,
            "departureAirports": departureAirports,
            "price": maxPrice,
            "pageNumber": 1,
            "pageSize": 10,
            "oceanView": oceanView ? "true" : "false",
            "mealType":  mealtype,
            "roomType": roomtype
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
            <Grid container justifyContent={"center"} direction={"column"} alignItems={"center"}>
                <Grid item xs={7}>
                    <Typography sx={{mb: "50px", mt: "40px"}} variant="h3">☀️CHECK24 Holiday Challenge☀️</Typography>
                </Grid>
                <Grid item xs={7}>
                    <SearchForm submitCallback={onSubmitSearchForm} />
                </Grid>
            </Grid>



            <Typography variant="h4" sx={{mt: "60px", mb: "30px"}}>Offers for your Mallorca-Trip🏝:</Typography>
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
                                countAdults: offer.countadults,
                                countChildren: offer.countchildren,
                                duration: calcDuration(offer.outbounddeparturedatetime, offer.inboundarrivaldatetime),
                                hotelid: offer.hotelid,
                                inboundArrivalAirport: offer.inboundarrivalairport,
                                inboundArrivalDatetime: offer.inboundarrivaldatetime,
                                inboundDepartureAirport: offer.inbounddepartureairport, // date
                                inboundDepartureDatetime: offer.inbounddeparturedatetime,
                                isSaved: offer.isSaved, // datetime
                                mealType: offer.mealtype,
                                oceanView: offer.oceanview == 'true', // date
                                outboundArrivalAirport: offer.outboundarrivalairport,
                                outboundArrivalDatetime: offer.outboundarrivaldatetime, // datetime
                                outboundDepartureAirport: offer.outboundarrivalairport,
                                outboundDepartureDatetime: offer.outbounddeparturedatetime,
                                price: offer.price,
                                roomType: offer.roomtype
                            }} />
                        )}


                </InfiniteScroll>
            }




        </Box>
    )
}