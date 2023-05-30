"use client";
import {usePathname} from "next/navigation"
import {useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {Box, Grid, LinearProgress, Rating, Stack, Typography} from "@mui/material";
// @ts-ignore
import InfiniteScroll from "react-infinite-scroller"
import HotelOffer from "@/app/components/HotelOffer/HotelOffer";

import {ADD_SAVED_OFFERS_MUTATION} from "@/app/utils/mutations"

import {calcDuration, generateRandomNumber} from "../../utils/utils"


const HOTEL_QUERY = gql`
    query Hotel($hotelId: Float!) {
  hotel(id: $hotelId) {
    hotelname
    hotelstars
    hotelid
  }
}
`



const HOTEL_OFFERS_QUERY = gql`
    query Offers_by_hotel($input: OfferHotelInput!) {
  
  offers_by_hotel(input: $input) {
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
    isSaved
  }
}
`

const MIN_PRICE_OFFER = gql`
    query Query($hotelId: Float!) {
        minPriceOffer(hotelId: $hotelId) {
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
            isSaved
        }
    }
`

export default function Page() {

    const pathname = usePathname()

    const [pageNumber, setPageNumber] = useState(1)

    const [canLoadMore, setCanLoadMore] = useState(true)

    const [offers, setOffers] = useState<any[]>([])

    const [hotelId, setHotelId] = useState<number>()
    const {data: hotelData, error: hotelError, loading: hotelLoading} = useQuery(HOTEL_QUERY, {
        variables: {
            "hotelId": hotelId,

        }
    })

    const {data: offerData, error: offerError, loading: offerLoading, fetchMore} = useQuery(HOTEL_OFFERS_QUERY, {
        variables: {
            "input": {
                "hotelid": hotelId,
                "pageNumber": pageNumber,
                "pageSize": 25
            }
        }
    })

    const [toggleOfferMutation, {data: saveData, loading: saveLoading, error: saveError}] = useMutation(ADD_SAVED_OFFERS_MUTATION)

    const {data: minOfferData, loading: minOfferLoading, error: minOfferError} = useQuery(MIN_PRICE_OFFER, {
        variables: {
            "hotelId": hotelId
        }
    })


    useEffect(() => {
        if (!offerLoading  && offerData) {
            setOffers(offerData.offers_by_hotel)
        }

    }, [offerLoading, offerData])

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
        const newOffers = response.data.offers_by_hotel

        if (newOffers.length < 25) {
            setCanLoadMore(false)
        }

        setOffers(prevState => [...prevState, ...newOffers])
    }



    useEffect(() => {
        const split = pathname.split("/")
        setHotelId(Number.parseInt(split[split.length-1]))
    }, [pathname])

    if (hotelError || hotelLoading) {
        return <LinearProgress />
    }

    async function handleToggleOffer(offerId: string): Promise<void> {
        // Add offer mutation
        await toggleOfferMutation({variables: {offerId: offerId}})

    }

    // @ts-ignore
    return <>
        <Grid container direction="row" justifySelf="center" justifyContent="center" alignItems="center">
            <Grid item xs={4}>
                <Typography variant="h4">{hotelData.hotel.hotelname}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Rating value={hotelData.hotel.hotelstars} readOnly />
            </Grid>
        </Grid>
                <Box
                    display="block"
                    marginLeft="auto"
                    marginRight="auto"
                    sx={{backgroundImage: `url("/hotels/${(hotelData.hotel.hotelid % 40) + 1}.jpg")`, width: "711px",height: "400px", backgroundSize: "cover"}}/>

        {/* offers */}

        {minOfferLoading || minOfferData === undefined ?
            <>
            <Stack>
                <Stack><LinearProgress /></Stack>
            </Stack>
        </> :
            <Stack marginTop={"1%"}>
                <HotelOffer bookButton={true}  isCheapest={true} offer={{
                    _id: minOfferData.minPriceOffer._id,
                    isSaved: minOfferData.minPriceOffer.isSaved,
                    hotelid: minOfferData.minPriceOffer.hotelid,
                    price: minOfferData.minPriceOffer.price,
                    countAdults: minOfferData.minPriceOffer.countadults,
                    countChildren: minOfferData.minPriceOffer.countchildren,
                    inboundDepartureAirport: minOfferData.minPriceOffer.inbounddepartureairport,
                    inboundDepartureDatetime: minOfferData.minPriceOffer.inbounddeparturedatetime, // date
                    inboundArrivalAirport:  minOfferData.minPriceOffer.inboundarrivalairport,
                    inboundArrivalDatetime: minOfferData.minPriceOffer.inboundarrivaldatetime, // datetime
                    outboundDepartureAirport: minOfferData.minPriceOffer.outboundarrivalairport,
                    outboundDepartureDatetime: minOfferData.minPriceOffer.outbounddeparturedatetime, // date
                    outboundArrivalAirport: minOfferData.minPriceOffer.outboundarrivalairport,
                    outboundArrivalDatetime: minOfferData.minPriceOffer.outboundarrivaldatetime, // datetime
                    mealType: minOfferData.minPriceOffer.mealtype,
                    oceanView: minOfferData.minPriceOffer.oceanview == 'true' ,
                    roomType: minOfferData.minPriceOffer.roomtype,
                    duration: calcDuration(minOfferData.minPriceOffer.outbounddeparturedatetime, minOfferData.minPriceOffer.inboundarrivaldatetime)
                }

                } onToggleOffer={handleToggleOffer} />

            </Stack>

        }

        <InfiniteScroll
            pageStart={1}
            loadMore={loadMore}
            hasMore={canLoadMore}
            loader={<LinearProgress />}
        >

        <Stack gap={3}>
            {offerData !== undefined && offers.map((offer: any) =>
                <HotelOffer key={generateRandomNumber()} onToggleOffer={handleToggleOffer} bookButton={true} offer={{
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
        </Stack>
        </InfiniteScroll>

        </>
}
