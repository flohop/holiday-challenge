import {Box, Button, Card, Rating, Stack, Typography} from "@mui/material";
import {useRouter} from "next/navigation";

interface Properties {
    hotel: any
}

export default function HotelItem({hotel}: Properties) {

    const router = useRouter()

    return (
        <Card variant="outlined" sx={{display: 'flex'}} onClick={() => {router.push("hotels/" + hotel.hotelid)}}>
            <Box sx={{backgroundImage: `url("/hotels/${(hotel.hotelid % 40) + 1}.jpg")`, width: "355.5px",height: "200px", backgroundSize: "cover"}}/>
            <Box sx={{
                p: 1,
                pl: 2,
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Stack direction="column" justifyContent="space-between">
                    <Typography sx={{mr: 2}} variant="h6">{hotel.hotelname}</Typography>

                    <Button variant="contained">View {hotel.count} offers</Button>

                </Stack>
                <Stack direction="column" justifyContent="space-between" alignItems="flex-end">
                    <Rating value={hotel.hotelstars} readOnly/>
                </Stack>
            </Box>
        </Card>
    );
}