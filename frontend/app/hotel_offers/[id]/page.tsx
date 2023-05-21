"use client";
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useState} from "react";
import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {Box, Grid, LinearProgress, Rating, Stack, Typography} from "@mui/material";
// @ts-ignore
import InfiniteScroll from "react-infinite-scroller"
import HotelOffer from "@/app/components/HotelOffer/HotelOffer";
import {ADD_SAVED_OFFERS_MUTATION} from "../../utils/mutations"
import {calcDuration, generateRandomNumber} from "../../utils/utils"
import {useCookies} from "react-cookie";

const HOTEL_QUERY = gql`
    query Hotel($hotelId: Float!) {
        hotel(id: $hotelId) {
            hotelname
            hotelstars
            hotelid
        }
    }
`


const HOTEL_OFFERS_QUERY_2 = gql`
    query Offers_by_hotel_by_filter($input: OfferInput!) {
        offers_by_hotel_by_filter(input: $input) {
            countadults
            countchildren
            hotelid
            inboundarrivalairport
            inboundarrivaldatetime
            inbounddepartureairport
            inbounddeparturedatetime
            mealtype
            oceanview
            isSaved
            outboundarrivaldatetime
            outboundarrivalairport
            outbounddepartureairport
            outbounddeparturedatetime
            price
            _id
            roomtype
        }
    }
`

export default function Page() {

    const pathname = usePathname()

    const [pageNumber, setPageNumber] = useState(1)

    const [canLoadMore, setCanLoadMore] = useState(true)

    const [offers, setOffers] = useState<any[]>([])

    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState({})

    const [hotelId, setHotelId] = useState<number>()

    const [cookies, setCookie] = useCookies(["queryInput", "selected_hotelid"])


    const {data: hotelData, error: hotelError, loading: hotelLoading} = useQuery(HOTEL_QUERY, {
        variables: {
            "hotelId": hotelId,

        }
    })

    const [getOffers, {data: offerData, error: offerError, loading: offerLoading, fetchMore}] = useLazyQuery(HOTEL_OFFERS_QUERY_2)


    useEffect(() => {
        if (cookies.queryInput === undefined || cookies.selected_hotelid === undefined) {
            router.push("/")
        } else {
            // Since we want to load it instantly, we have to read
            // the cookies instead of waiting for the path variable

            console.log("Cookies", cookies.queryInput)
            console.log("HotelId: ", cookies.selected_hotelid)

             getOffers({
                variables: {
                    input: {
                        hotelId: Number.parseInt(cookies.selected_hotelid),
                        pageNumber: 1,
                        pageSize: 10,
                        earliestDepartureDate: cookies.queryInput.earliestDepartureDate,
                        countAdults: cookies.queryInput.countAdults,
                        departureAirports: cookies.queryInput.departureAirports,
                        countChildren: cookies.queryInput.countChildren,
                        price: cookies.queryInput.price,
                        duration: cookies.queryInput.duration,
                        latestReturnDate: cookies.queryInput.latestReturnDate,
                        mealType: cookies.queryInput.mealType,
                        oceanView: cookies.queryInput.oceanView,
                        roomType: cookies.queryInput.roomType,

                    }
                }
            }).then((response) => {
                console.log("Got response: ", response)

                if (response.data.offers_by_hotel_by_filter.length < 10) {
                    setCanLoadMore(false)
                }

             }).catch((err) => {
                 console.log("Error: ", err)
             })
        }
    }, [])



    const [toggleOfferMutation, {data: saveData, loading: saveLoading, error: saveError}] = useMutation(ADD_SAVED_OFFERS_MUTATION)

    useEffect(() => {
        if (!offerLoading  && offerData) {
            setOffers(offerData.offers_by_hotel_by_filter)
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
        const newOffers = response.data.offers_by_hotel_by_filter

        if (newOffers.length == 0) {
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

        <InfiniteScroll
            pageStart={1}
            loadMore={loadMore}
            hasMore={canLoadMore}
            threshold={1000}
            loader={<LinearProgress key={generateRandomNumber()} />}
            key={generateRandomNumber()}
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
