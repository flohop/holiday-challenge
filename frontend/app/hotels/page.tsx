"use client";
import {useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";
// @ts-ignore
import InfiniteScroll from "react-infinite-scroller"
import {LinearProgress, Stack} from "@mui/material";
import HotelItem from "../components/Hotel/HotelItem"


const ALL_HOTELS_QUERY = gql`
    query Hotels($input: HotelsInput!) {
        hotels(input: $input) {
            count
            hotelid
            hotelname
            hotelstars
        }
    }
`



export default function Page() {


    const [canLoadMore, setCanLoadMore] = useState(true)

    const [hotels, setHotels] = useState<any[]>([])

    const {data: hotelData, error: hotelError, loading: hotelLoading, fetchMore} = useQuery(ALL_HOTELS_QUERY, {
        variables: {input: {
            "pageSize": 25,
            "pageNumber": 1
        }}
    })



    useEffect(() => {
        if (!hotelLoading && hotelData) {
            setHotels(hotelData.hotels)
        }
    }, [hotelLoading, hotelData])

    async function loadMore(pageNumber: number) {

        // Only load more if there are already some present
        if (hotels.length == 0 ) {
            return []
        }

        const response = await fetchMore({
            variables: {input: {
                pageNumber: pageNumber,
                pageSize: 25
            }}
        })
        const newHotels = response.data.hotels

        if (newHotels.length < 25) {
            setCanLoadMore(false)
        }

        setHotels(prevState => [...prevState, ...newHotels])
    }


    if (hotelError || hotelLoading) {
        return <LinearProgress />
    }

    return <>
        <InfiniteScroll
            pageStart={1}
            loadMore={loadMore}
            hasMore={canLoadMore}
            threshold={1500}
            loader={<LinearProgress />}
        >
            <Stack gap={3}>
                {hotelData !== undefined && hotels.map((hotel: any) =>
                    <HotelItem key={hotel.hotelid} hotel={hotel} />)
                }
            </Stack>
        </InfiniteScroll>

    </>
}
