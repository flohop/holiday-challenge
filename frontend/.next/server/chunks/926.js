"use strict";
exports.id = 926;
exports.ids = [926];
exports.modules = {

/***/ 89748:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ HotelOffer)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Button/index.js
var Button = __webpack_require__(98511);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Card/index.js
var Card = __webpack_require__(76395);
var Card_default = /*#__PURE__*/__webpack_require__.n(Card);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/CardContent/index.js
var CardContent = __webpack_require__(57582);
var CardContent_default = /*#__PURE__*/__webpack_require__.n(CardContent);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/CardHeader/index.js
var CardHeader = __webpack_require__(60493);
var CardHeader_default = /*#__PURE__*/__webpack_require__.n(CardHeader);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Divider/index.js
var Divider = __webpack_require__(73638);
var Divider_default = /*#__PURE__*/__webpack_require__.n(Divider);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Grid/index.js
var Grid = __webpack_require__(89216);
var Grid_default = /*#__PURE__*/__webpack_require__.n(Grid);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Typography/index.js
var Typography = __webpack_require__(43360);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(59483);
// EXTERNAL MODULE: ./node_modules/@mui/system/index.js
var system = __webpack_require__(47447);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Flight.js
var Flight = __webpack_require__(58164);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Box/index.js
var Box = __webpack_require__(46661);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Stack/index.js
var Stack = __webpack_require__(5537);
;// CONCATENATED MODULE: ./app/components/Flight/Flight.tsx





function Flight_Flight({ ...flight }) {
    function getDateString(s) {
        if (!s) return "";
        const date = new Date(s);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
    function getHourMinuteString(s) {
        if (!s) return "";
        const date = new Date(s);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }
    function getFlightDurationString(departure, arrival) {
        if (!departure || !arrival) {
            return "";
        }
        const date1 = new Date(arrival);
        const date2 = new Date(departure);
        const difference = Math.abs(date1.getTime() - date2.getTime());
        const hours = Math.floor(difference / (1000 * 3600));
        const minutes = Math.floor((difference - hours * 1000 * 3600) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Stack/* default */.ZP, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Stack/* default */.ZP, {
                direction: "row",
                alignItems: "center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Flight/* default */.Z, {
                        sx: {
                            rotate: flight.inbound ? "90deg" : "270deg",
                            mr: "5px"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                        fontWeight: "bold",
                        children: getDateString(flight.departureDatetime)
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Stack/* default */.ZP, {
                direction: "row",
                sx: {
                    height: "30px"
                },
                alignItems: "center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                        sx: {
                            width: "100px"
                        },
                        children: getHourMinuteString(flight.departureDatetime)
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Box/* default */.Z, {
                        sx: {
                            width: "15px",
                            height: "15px",
                            borderRadius: "1000px",
                            backgroundColor: "gray"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                        ml: "10px",
                        children: flight.departureAirport
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Stack/* default */.ZP, {
                direction: "row",
                sx: {
                    height: "30px"
                },
                alignItems: "center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(Box/* default */.Z, {
                        sx: {
                            ml: "100px"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Box/* default */.Z, {
                        sx: {
                            width: "3px",
                            height: "45px",
                            ml: "6px",
                            mr: "6px",
                            backgroundColor: "gray"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                        fontWeight: "light",
                        ml: "10px",
                        children: getFlightDurationString(flight.departureDatetime, flight.arrivalDatetime)
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Stack/* default */.ZP, {
                direction: "row",
                sx: {
                    height: "30px"
                },
                alignItems: "center",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                        sx: {
                            width: "100px"
                        },
                        children: getHourMinuteString(flight.arrivalDatetime)
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Box/* default */.Z, {
                        sx: {
                            width: "15px",
                            height: "15px",
                            borderRadius: "1000px",
                            backgroundColor: "gray"
                        }
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                        ml: "10px",
                        children: flight.arrivalAirport
                    })
                ]
            })
        ]
    });
}

// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Bed.js
var Bed = __webpack_require__(53790);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/BookmarkBorderOutlined.js
var BookmarkBorderOutlined = __webpack_require__(13376);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/BookmarkOutlined.js
var BookmarkOutlined = __webpack_require__(55437);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/RestaurantMenu.js
var RestaurantMenu = __webpack_require__(55425);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Water.js
var Water = __webpack_require__(6225);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/react-toastify.esm.mjs
var react_toastify_esm = __webpack_require__(93578);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(1536);
// EXTERNAL MODULE: ./node_modules/react-cookie/cjs/index.js
var cjs = __webpack_require__(15786);
;// CONCATENATED MODULE: ./app/components/HotelOffer/HotelOffer.tsx




















function HotelOffer({ offer , onToggleOffer , bookButton , isCheapest  }) {
    const router = (0,navigation.useRouter)();
    const [isSaved, setIsSaved] = (0,react_.useState)(offer.isSaved);
    const [bgColor, setBgColor] = (0,react_.useState)("#ededed");
    // @ts-ignore
    const [cookies, setCookie] = (0,cjs.useCookies)("queryInput");
    // @ts-ignore
    const [hotelIdCookies, setHotelIdCookie] = (0,cjs.useCookies)("selected_hotelid");
    const bookToast = ()=>(0,react_toastify_esm/* toast */.Am)("Enjoy your trip ☀️", {
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: false,
            progress: undefined
        });
    (0,react_.useEffect)(()=>{
        if (isCheapest) {
            setBgColor("#67B7D1");
        }
    }, []);
    async function handleToggle() {
        setIsSaved(!isSaved);
        await new Promise((r)=>setTimeout(r, 2000));
        await onToggleOffer(offer._id);
        setIsSaved(!isSaved);
    }
    function onClickOfferHandler() {
        setHotelIdCookie("selected_hotelid", offer.hotelid);
        router.push("hotel_offers/" + offer.hotelid);
    }
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Card_default()), {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((CardHeader_default()), {
                sx: {
                    backgroundColor: bgColor
                },
                title: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Grid_default()), {
                    container: true,
                    spacing: 0,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Grid_default()), {
                            item: true,
                            xs: 11,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Typography_default()), {
                                    fontWeight: "bold",
                                    children: [
                                        offer.duration,
                                        " Days - ",
                                        offer.outboundDepartureAirport,
                                        ", ",
                                        offer.outboundArrivalAirport
                                    ]
                                }),
                                isCheapest ? /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                    fontWeight: "bold",
                                    children: "✨Cheapest✨"
                                }) : /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {})
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx((Grid_default()), {
                            item: true,
                            xs: 1,
                            justifyContent: "end",
                            children: /*#__PURE__*/ jsx_runtime_.jsx(system.Stack, {
                                direction: "row",
                                children: /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                                    onClick: handleToggle,
                                    children: !isSaved ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(BookmarkBorderOutlined/* default */.Z, {
                                                fontSize: "medium",
                                                color: "warning"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                                sx: {
                                                    color: "black"
                                                },
                                                children: "Save"
                                            })
                                        ]
                                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(BookmarkOutlined/* default */.Z, {
                                                fontSize: "medium",
                                                color: "warning"
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                                color: {
                                                    color: "black"
                                                },
                                                children: "Unsave"
                                            })
                                        ]
                                    })
                                })
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx((CardContent_default()), {
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Stack, {
                    direction: "row",
                    justifyContent: "space-between",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Stack, {
                            gap: 2,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(Flight_Flight, {
                                    inbound: true,
                                    departureDatetime: offer.outboundDepartureDatetime,
                                    departureAirport: offer.outboundDepartureAirport,
                                    arrivalDatetime: offer.outboundArrivalDatetime,
                                    arrivalAirport: offer.outboundArrivalAirport
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(Flight_Flight, {
                                    inbound: false,
                                    departureDatetime: offer.inboundDepartureDatetime,
                                    departureAirport: offer.inboundDepartureAirport,
                                    arrivalDatetime: offer.inboundArrivalDatetime,
                                    arrivalAirport: offer.inboundArrivalAirport
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Stack, {
                            gap: 2,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Stack, {
                                    direction: "row",
                                    alignItems: "center",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(RestaurantMenu/* default */.Z, {}),
                                        /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                            ml: 1,
                                            variant: "body1",
                                            children: offer.mealType
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Stack, {
                                    direction: "row",
                                    alignItems: "center",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(Bed/* default */.Z, {}),
                                        /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                            ml: 1,
                                            variant: "body1",
                                            children: offer.roomType
                                        })
                                    ]
                                }),
                                offer.oceanView && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Stack, {
                                    direction: "row",
                                    alignItems: "center",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(Water/* default */.Z, {}),
                                        /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                            ml: 1,
                                            variant: "body1",
                                            children: "Oceanview"
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Stack, {
                            justifyContent: "end",
                            gap: 2,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Stack, {
                                    m: 0,
                                    direction: "row",
                                    divider: /*#__PURE__*/ jsx_runtime_.jsx((Divider_default()), {
                                        orientation: "vertical",
                                        flexItem: true
                                    }),
                                    spacing: 1,
                                    children: [
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Typography_default()), {
                                            variant: "body1",
                                            children: [
                                                offer.duration,
                                                " Days"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Typography_default()), {
                                            variant: "body1",
                                            children: [
                                                offer.countAdults,
                                                " Adults"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Typography_default()), {
                                            variant: "body1",
                                            children: [
                                                offer.countChildren,
                                                " Children"
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Typography_default()), {
                                    variant: "h5",
                                    textAlign: "right",
                                    children: [
                                        offer.price,
                                        " €"
                                    ]
                                }),
                                bookButton ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                                            variant: "contained",
                                            color: "success",
                                            onClick: bookToast,
                                            children: "BOOK"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(react_toastify_esm/* ToastContainer */.Ix, {})
                                    ]
                                }) : /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                                    variant: "contained",
                                    onClick: onClickOfferHandler,
                                    children: "VIEW HOTEL"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 61116:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "m": () => (/* binding */ ADD_SAVED_OFFERS_MUTATION)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26174);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const ADD_SAVED_OFFERS_MUTATION = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation Mutation($offerId: String!) {
        toggle_saved_offer(offer_id: $offerId)
    }
`;


/***/ })

};
;