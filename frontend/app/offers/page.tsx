"use client";

import {Client, Components, Paths} from "@/app/types/openapi"
import HotelOffer from "@/app/components/HotelOffer/HotelOffer";
import {useSearchParams} from 'next/navigation';
import {useEffect, useState} from "react";
import {Box, Rating, Typography} from "@mui/material";
import {Stack} from "@mui/system";
import {useMutation} from "@apollo/client";
import {ADD_SAVED_OFFERS_MUTATION} from "@/app/utils/mutations";
type HotelOffer = Components.Schemas.GetHotelOffersResponse

export default function Page() {
    const query = useSearchParams()
    const [hotelOffer, setHotelOffer] = useState<HotelOffer>();

    const [toggleOfferMutation, {data: saveData, loading: saveLoading, error: saveError}] = useMutation(ADD_SAVED_OFFERS_MUTATION)

    async function handleToggleOffer(offerId: string): Promise<void> {
        // Add offer mutation
        await toggleOfferMutation({variables: {offerId: offerId}})

    }


    if (hotelOffer == null) {
        return <p>Loading offers...</p>
    }

    return (
        <>
            <Stack direction="row" pt={5} alignItems="center">
                <Typography variant="h4" mr={2}>{hotelOffer.hotel.name}</Typography>
                <Rating value={hotelOffer.hotel.stars} readOnly/>
            </Stack>
            <Stack direction="row" height="250px" pt={2}>
                <Box sx={{borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", backgroundImage: `url("/hotels/${(hotelOffer.hotel.id % 40) + 1}.jpg")`, width: "50%", backgroundSize: "cover", backgroundPosition: "center"}}/>
                <Box sx={{borderTopRightRadius: "5px", borderBottomRightRadius: "5px", backgroundImage: `url("/rooms/${(hotelOffer.hotel.id % 30) + 1}.jpg")`, width: "50%", backgroundSize: "cover", backgroundPosition: "center"}}/>
            </Stack>
            <Typography pt={2} variant="h6">Offers:</Typography>
            <Stack gap={2} mt={1}>
                {hotelOffer.items.map(offer =>
                    <HotelOffer key={offer.price} offer={offer} onToggleOffer={handleToggleOffer} />
                )}
            </Stack>
        </>
    )
}