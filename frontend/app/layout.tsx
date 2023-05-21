"use client";

import {ApolloProvider} from "@apollo/client";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'


import {getClient} from "@/app/utils/gqlClient";
import AppBar from "@mui/material/AppBar"
import {Box, Container} from "@mui/system";
import {Button, Toolbar, Typography} from "@mui/material";
import HotelIcon from '@mui/icons-material/Hotel';

type RootLayoutProps = {
    children: React.ReactNode;
};

const client = getClient()

const RootLayout = ({ children}: RootLayoutProps) => {
    return (
        <html id="outerHTML">
        <head><title>Check24</title></head>
        <body id="outerBody">
        <ApolloProvider client={client}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AppBar position={"static"}>
                    <Container maxWidth={"xl"}>
                        <Toolbar disableGutters>
                            <HotelIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />

                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: {xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none'
                                }}>
                                Check24
                            </Typography>
                            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                                <Button
                                    href="/"
                                    sx={{my: 2, color: 'white', display: 'block', fontWeight: 600}}
                                    >Home
                                </Button>

                                <Button
                                    href="/hotels"
                                    sx={{my: 2, color: 'white', display: 'block', fontWeight: 600}}
                                >Hotels
                                </Button>

                                <Button
                                    href="/saved_offers"
                                    sx={{my: 2, color: 'white', display: 'block', fontWeight: 600}}
                                >Saved
                                </Button>

                            </Box>
                        </Toolbar>
                    </Container>

                </AppBar>
                {children}
            </LocalizationProvider>
        </ApolloProvider>
        </body>
        </html>
    );
};

export default RootLayout