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
    SelectChangeEvent, Stack,
    TextField, Typography,
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";
import Counter from "@/app/components/Counter/Counter";
import { useSearchParams } from 'next/navigation';
import { GetBestOffersByHotelFromQuery } from '@/app/types/converter';
import dayjs, { Dayjs } from 'dayjs';
import {Check} from "@mui/icons-material";

type Properties = {
    submitCallback: (departureAirports: string[], countAdults: number, countChildren: number, duration: number, earliestDeparture: string, latestReturn: string, requireOceanView: boolean, mealtype: string) => Promise<void>
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


export default function SearchForm({submitCallback}: Properties) {
    const [departureAirports, setDepartureAirports] = useState<string[]>([]);
    const [countChildren, setCountChildren] = useState<number>(0);
    const [countAdults, setCountAdults] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [durationInput, setDurationInput] = useState<string>("");
    const [earliestDepartureDate, setEarliestDepartureDate] = useState<Dayjs | null>(null);
    const [latestReturnDate, setLatestReturnDate] = useState<Dayjs | null>(null);

    // Custom
    const [requireOceanView, setRequireOceanView] = useState(false)
    const [mealType, setMealType] = useState<string>("")
    const [roomType, setRoomType] = useState<string>("")

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

        console.log("Mealtype: ",item!. code)
        setMealType(item!.code)
    }
    const handleRoomTypeChange = (event: SelectChangeEvent<string>) => {
        const {target: {value}} = event

        // Get the code from the name
        const item = availableRoomType.find(item => item.name === value)

        setRoomType(item!.code)
    }

    const handleOceanViewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRequireOceanView(event.target.checked)
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


                    <InputLabel id="meal-type-label">Meal type</InputLabel>
                    <Select id="mealtype" label="Meal type"
                            labelId="meal-type-label"
                            sx={{width: "20%"}}
                            value={mealType} onChange={handleMealtypeChange} MenuProps={MenuProps}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', height: '90%', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected}
                                </Box>
                            )}>
                        {availableMealtype.map((mealtype) => (
                            <MenuItem key={mealtype.code} value={mealtype.name}>
                                <ListItemText primary={mealtype.name}/>
                            </MenuItem>
                        ))}
                    </Select>

                    <FormControl sx={{width: "25%"}}>

                        <InputLabel id="room-type-label">Room type</InputLabel>
                        <Select id="roomtype" label="Room type"
                                labelId="room-type-label"
                                sx={{width: "100%"}}
                                defaultValue=""
                                value={roomType} onChange={handleRoomTypeChange} MenuProps={MenuProps}
                                renderValue={(selected) => (
                                    <Box sx={{display: 'flex', height: '90%', flexWrap: 'wrap', gap: 0.5}}>
                                        {selected}
                                    </Box>
                                )}>
                            {availableRoomType.map((roomType) => (
                                <MenuItem key={roomType.code} value={roomType.name}>
                                    <ListItemText primary={roomType.name}/>
                                </MenuItem>
                            ))}
                        </Select>

                    </FormControl>

                    <FormControlLabel control={<Checkbox value={requireOceanView} onChange={handleOceanViewChange}  />} label="Require oceanview" />

                </Stack>

                <Button 
                    variant="contained" 
                    onClick={() =>
                        // parameters should be validated here, but as this is a just a very simple implementation we skip this for now
                        submitCallback(
                            departureAirports, 
                            countAdults, countChildren, 
                            duration, 
                            earliestDepartureDate ? earliestDepartureDate.toISOString() : "", 
                            latestReturnDate ? latestReturnDate.toISOString() : "",
                            requireOceanView,
                            mealType || "UNSELECTED"
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
