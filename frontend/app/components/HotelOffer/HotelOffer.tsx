import {Button, Card, CardContent, CardHeader, Divider, Grid, Typography} from "@mui/material";
import {useRouter} from "next/navigation"
import { Stack } from "@mui/system";
import Flight from "@/app/components/Flight/Flight";
import {Components} from "@/app/types/openapi"
import { Bed, RestaurantMenu, Water, BookmarkBorderOutlined, BookmarkOutlined  } from "@mui/icons-material";
import {useEffect, useState} from "react";
import { ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

type Offer = Components.Schemas.Offer

export default function HotelOffer({offer, onToggleOffer, bookButton, isCheapest}: {isCheapest?: boolean, bookButton?: boolean, offer: Offer, onToggleOffer: (id: string) => Promise<void> }) {

    const router = useRouter()

    const [isSaved, setIsSaved] = useState(offer.isSaved)

    const [bgColor, setBgColor] = useState("#cccccc")

    const bookToast = () => toast("Enjoy your trip ☀️", {
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: false,
        progress: undefined
    });


    useEffect(() => {
        if (isCheapest) {
            setBgColor("#67B7D1")
        }
    }, [])

    async function handleToggle() {
        setIsSaved(!isSaved)

        await new Promise(r => setTimeout(r, 2000));

        await onToggleOffer(offer._id)

        setIsSaved(!isSaved)
    }


    return (
        <Card>
            <CardHeader sx={{backgroundColor: bgColor}} title={
                <Grid container spacing={0}>
                    <Grid item xs={11}>
                        <Typography fontWeight="bold">{offer.duration} Days - {offer.outboundDepartureAirport}, {offer.outboundArrivalAirport}</Typography>
                        {isCheapest ? <Typography fontWeight="bold">✨Cheapest✨</Typography> : <></>}
                    </Grid>

                <Grid item xs={1} justifyContent={"end"} >
                    <Stack direction={"row"}>
                        <Button onClick={handleToggle}>

                            {!isSaved ? <>
                            <BookmarkBorderOutlined fontSize={"medium"} color={"warning"}/>
                                <Typography sx={{color: "white"}}>Save</Typography>
                            </> : <>
                            <BookmarkOutlined fontSize={"medium"} color={"warning"} />
                                <Typography color={{color: "white"}}>Unsave</Typography>
                            </>}
                        </Button>
                    </Stack>
                </Grid>

                </Grid>

            }/>
            <CardContent>
                <Stack direction="row" justifyContent="space-between">
                    <Stack gap={2}>
                        <Flight 
                            inbound={true} 
                            departureDatetime={offer.outboundDepartureDatetime}
                            departureAirport={offer.outboundDepartureAirport}
                            arrivalDatetime={offer.outboundArrivalDatetime}
                            arrivalAirport={offer.outboundArrivalAirport}
                        />
                        <Flight 
                            inbound={false} 
                            departureDatetime={offer.inboundDepartureDatetime}
                            departureAirport={offer.inboundDepartureAirport}
                            arrivalDatetime={offer.inboundArrivalDatetime}
                            arrivalAirport={offer.inboundArrivalAirport}
                        />
                    </Stack>
                    <Stack gap={2}>
                        <Stack direction="row" alignItems="center">
                            <RestaurantMenu/>
                            <Typography ml={1} variant="body1">{offer.mealType}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <Bed/>
                            <Typography ml={1} variant="body1">{offer.roomType}</Typography>
                        </Stack>
                        {offer.oceanView &&
                            <Stack direction="row" alignItems="center">
                                <Water/>
                                <Typography ml={1} variant="body1">Oceanview</Typography>
                            </Stack>
                        }
                    </Stack>
                    <Stack justifyContent="end" gap={2}>
                        <Stack m={0} direction="row" divider={<Divider orientation="vertical" flexItem/>} spacing={1}>
                            <Typography variant="body1">{offer.duration} Days</Typography>
                            <Typography variant="body1">{offer.countAdults} Adults</Typography>
                            <Typography variant="body1">{offer.countChildren} Children</Typography>
                        </Stack>
                        <Typography variant="h5" textAlign="right">{offer.price} €</Typography>
                        {bookButton ?
                            <>
                            <Button variant="contained" color={"success"} onClick={bookToast}>BOOK</Button>
                            <ToastContainer />
                            </>
                            :
                        <Button variant="contained" onClick={() => router.push("hotel_offers/" + offer.hotelid)}>VIEW HOTEL</Button>
                        }
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}