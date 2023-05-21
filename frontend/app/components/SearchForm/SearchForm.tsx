import React, {ChangeEvent, useEffect, useState} from 'react';
import './SearchForm.css';
import {
    Box, Button,
    Checkbox,
    Chip,
    FormControl, FormControlLabel, InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent, Stack, Switch,
    TextField, Typography,
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import Counter from "@/app/components/Counter/Counter";
import { useSearchParams } from 'next/navigation';
import { GetBestOffersByHotelFromQuery } from '@/app/types/converter';
import dayjs, { Dayjs } from 'dayjs';
import {styled} from "@mui/system";
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

type Properties = {
    submitCallback: (departureAirports: string[], countAdults: number, countChildren: number, duration: number, earliestDeparture: string, latestReturn: string, oceanView: boolean, mealtype: string, roomtype: string, maxPrice: number) => Promise<void>
}

interface Airport {
    code: string,
    name: string
}

const availableMealtype = [
    {code: "UNSELECTED", name: ""},
    {code: "NONE", name: "None"},
    {code: "BREAKFAST", name: "Breakfast"},
    {code: "HALFBOARD", name: "Half board"},
    {code: "ALLINCLUSIVE", name: "All inclusive"}
]

const availableRoomType = [
    {code: "UNSELECTED", name: ""},
    {code: "DOUBLE", name: "Double"},
    {code: "APARTMENT", name: "Apartment"},
    {code: "SUITE", name: "Suite"},
    {code: "SINGLE", name: "Studio"},
    {code: "FAMILY", name: "Family"},
    {code: "TRIPLE", name: "Triple"}
]

const availableDepartureAirports: Airport[] = [
    {code: "MUC", name: "Munich"},
    {code: "FRA", name: "Frankfurt"},
    {code: "HAM", name: "Hamburg"},
    {code: "CGN", name: "Köln"},
    {code: "DUS", name: "Düsseldorf"},
    {code: "HAJ", name: "Hannover"},
    {code: "STR", name: "Stuttgart"},
    {code: "BER", name: "Berlin"},
    {code: "FKB", name: "Karlsruhe"},
    {code: "ZRH", name: "Zürich"},
    {code: "NUE", name: "Nürnberg"},
    {code: "SCN", name: "Saaarbrücken"},
    {code: "FMN", name: "Memmingen"},
    {code: "DTM", name: "Dortmund"},
    {code: "DRS", name: "Dresden"},
    {code: "LUX", name: "Luxenburg"},
    {code: "LEJ", name: "Leipzig"},
    {code: "BRE", name: "Bremen"},
    {code: "PAD", name: "Paderborn"},
    {code: "KSF", name: "Kassel"},
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: 'white',
            backgroundColor: "green",
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M269.5 69.9c11.1-7.9 25.9-7.9 37 0C329 85.4 356.5 96 384 96c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 149.7 417 160 384 160c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4C42.8 92.6 61 83.5 75.3 71.6c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 85.2 165.1 96 192 96c27.5 0 55-10.6 77.5-26.1zm37 288C329 373.4 356.5 384 384 384c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 437.7 417 448 384 448c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 373.2 165.1 384 192 384c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0zm0-144C329 229.4 356.5 240 384 240c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 293.7 417 304 384 304c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.5 27.3-10.1 39.2-1.7l0 0C136.7 229.2 165.1 240 192 240c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: 'white',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            margin: 'auto',
            position: 'absolute',
            width: '65%',
            height: '65%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8, <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208H104L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320H80L5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5H192v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448H424.5c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320h33.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208h24.9c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z"/></svg>')`,

        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        borderRadius: 20 / 2,
    },
}));


export default function SearchForm({submitCallback}: Properties) {
    const [departureAirports, setDepartureAirports] = useState<string[]>([]);
    const [countChildren, setCountChildren] = useState<number>(0);
    const [countAdults, setCountAdults] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [durationInput, setDurationInput] = useState<string>("");
    const [earliestDepartureDate, setEarliestDepartureDate] = useState<Dayjs | null>(null);
    const [latestReturnDate, setLatestReturnDate] = useState<Dayjs | null>(null);

    // Custom
    const [oceanView, setOceanView] = useState(false)
    const [mealType, setMealType] = useState<string>("")
    const [roomType, setRoomType] = useState<string>("")
    const [maxPrice, setMaxPrice] = useState<number>(0)
    const [maxPriceInput, setMaxPriceInput] = useState("")

    const query = useSearchParams();


    useEffect(() => {
        const params = GetBestOffersByHotelFromQuery(query)
        setDepartureAirports(params.departureAirports && params.departureAirports[0] && params.departureAirports[0].length !== 0 ? params.departureAirports : [])
        setCountChildren(isNaN(params.countChildren) ? 0 : params.countChildren);
        setCountAdults(isNaN(params.countAdults) ? 0 : params.countAdults);
        setDuration(isNaN(params.duration) ? 0 : params.duration);
        setDurationInput(params.duration ? params.duration.toString() : "");
        setEarliestDepartureDate(params.earliestDepartureDate ? dayjs(params.earliestDepartureDate) : null);
        setLatestReturnDate(params.latestReturnDate ? dayjs(params.latestReturnDate) : null);
    }, [query])

    const handleAirportChange = (event: SelectChangeEvent<typeof departureAirports>) => {
        const {target: {value}} = event;
        setDepartureAirports(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleMealtypeChange = (event: SelectChangeEvent<string>) => {
        const {target: {value}} = event

        // Get the code from the name
        const item = availableMealtype.find(item => item.name === value)

        setMealType(item!.code)
    }
    const handleRoomTypeChange = (event: SelectChangeEvent<string>) => {
        const {target: {value}} = event

        // Get the code from the name
        const item = availableRoomType.find(item => item.name === value)

        setRoomType(item!.code)
    }

    const handleOceanViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOceanView(event.target.checked)
    }

    const handleDurationChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setDurationInput(value);

        const duration = parseInt(value);
        if(isNaN(duration)) {
            return;
        }
        setDuration(duration);
    }

    const handleMaxPriceChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;

        if (value == "") {
            setMaxPriceInput("")
        }

        const price = parseInt(value)
        if (isNaN(price) || price <= 0) {
            return
        }
        setMaxPriceInput(value);
        setMaxPrice(price)
    }

    function formIsValid() {
        // Very simple form validation that only checks that
        // all values are set
        return departureAirports.length > 0 &&
            (countChildren > 0 || countAdults > 0) &&
            duration > 0 &&
            earliestDepartureDate !== null &&
            latestReturnDate !== null &&
            mealType.length > 0 &&
            roomType.length > 0 &&
            maxPrice > 0
    }

    return (
        <FormControl>
            <Stack gap={2}>
                <FormControl>
                <Stack direction="row" gap={4} marginBottom={"2%"} sx={{alignItems: "center"}}>
                    <InputLabel id="departure-airport-label" required={true}>Departure Airport</InputLabel>
                    <Select id="departure-airport" multiple label="Departure airport"
                            label-id="departure-airport-label"
                            sx={{width: "100%"}}
                            value={departureAirports} onChange={handleAirportChange} MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', height: '90%', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value}/>
                                    ))}
                                </Box>
                            )}>
                        {availableDepartureAirports.map((airport) => (
                            <MenuItem key={airport.code} value={airport.code}>
                                <Checkbox checked={departureAirports.indexOf(airport.code) > -1}/>
                                <ListItemText primary={airport.code}/>
                            </MenuItem>
                        ))}
                    </Select>
                    <Counter label="Children" value={countChildren} setValue={setCountChildren}/>
                    <Counter label="Adults" value={countAdults} setValue={setCountAdults}/>
                </Stack>
                <Stack direction="row" gap={4} sx={{alignItems: "center"}}>
                    <TextField sx={{width: "100%"}} label="Duration (days)" required={true} value={durationInput} onChange={handleDurationChange}
                               type="number" variant="outlined"/>
                    <Typography>between</Typography>
                    <DatePicker sx={{width: "100%"}} value={earliestDepartureDate} onChange={(value) => setEarliestDepartureDate(value)} label="Earliest departure *"/>
                    <Typography>and</Typography>
                    <DatePicker sx={{width: "100%"}} value={latestReturnDate} onChange={(value) => setLatestReturnDate(value)} label="Latest return *"/>
                </Stack>
                </FormControl>

                <FormControl>

                <Stack direction="row" gap={2} marginBottom={"2%"} sx={{alignItems: "center"}}>



                    <InputLabel required={true} id="meal-type-label">Meal type</InputLabel>
                    <Select id="mealtype" label="Meal type"
                            labelId="meal-type-label"
                            sx={{width: "20%"}}
                            value={mealType} onChange={handleMealtypeChange} MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', height: '90%', flexWrap: 'wrap', gap: 0.5}}>
                                    {availableMealtype.find((elem) => elem.code === selected)!.name}
                                </Box>
                            )}>
                        {availableMealtype.map((mealtype) => (
                            <MenuItem key={mealtype.code} value={mealtype.name}>
                                <ListItemText primary={mealtype.name}/>
                            </MenuItem>
                        ))}
                    </Select>

                    <FormControl sx={{width: "25%"}}>

                        <InputLabel required={true} id="room-type-label">Room type</InputLabel>
                        <Select id="roomtype" label="Room type"
                                labelId="room-type-label"
                                sx={{width: "100%"}}
                                defaultValue=""
                                value={roomType} onChange={handleRoomTypeChange} MenuProps={MenuProps}
                                renderValue={(selected) => (
                                    <Box sx={{display: 'flex', height: '90%', flexWrap: 'wrap', gap: 0.5}}>
                                        {availableRoomType.find((elem) => elem.code === selected)!.name}
                                    </Box>
                                )}>
                            {availableRoomType.map((roomType) => (
                                <MenuItem key={roomType.code} value={roomType.name}>
                                    <ListItemText primary={roomType.name}/>
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>


                    <FormControl>
                        <TextField sx={{width: "100%"}} label="Max Price (€)" required={true} value={maxPriceInput} onChange={handleMaxPriceChange}
                                   type="number" variant="outlined"/>

                    </FormControl>

                    <FormControl>
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ m: 1 }} checked={oceanView} onChange={handleOceanViewChange}/>}
                        label={oceanView ? "Ocean view" : "No ocean view"}
                    /></FormControl>



                </Stack>

                <Button
                    disabled={!formIsValid()}
                    endIcon={<FlightTakeoffIcon />}
                    startIcon={<FlightLandIcon />}
                    variant="contained" 
                    onClick={() =>
                        // parameters should be validated here, but as this is a just a very simple implementation we skip this for now
                        submitCallback(
                            departureAirports, 
                            countAdults, countChildren, 
                            duration, 
                            earliestDepartureDate ? earliestDepartureDate.toISOString() : "", 
                            latestReturnDate ? latestReturnDate.toISOString() : "",
                            oceanView,
                            mealType || "UNSELECTED",
                            roomType,
                            maxPrice
                        )
                    }
                >
                    Suchen
                </Button>
        </FormControl>
            </Stack>
        </FormControl>
    );
}
