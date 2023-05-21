exports.id = 645;
exports.ids = [645];
exports.modules = {

/***/ 72950:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 58776))

/***/ }),

/***/ 81585:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 95958, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 48950, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 12513, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 81551, 23))

/***/ }),

/***/ 27471:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* __next_internal_client_entry_do_not_use__  */ const { createProxy  } = __webpack_require__(21399);
module.exports = createProxy("/Users/flohop/WebstormProjects/check24-holiday-challenge/frontend/app/layout.tsx");


/***/ }),

/***/ 70808:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"url":"/_next/static/media/metadata/favicon.9d11c8d6.ico","type":"image/x-icon","sizes":"any"});

/***/ }),

/***/ 58776:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ layout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/@apollo/client/main.cjs
var main = __webpack_require__(26174);
// EXTERNAL MODULE: ./node_modules/@mui/x-date-pickers/node/index.js
var node = __webpack_require__(98591);
// EXTERNAL MODULE: ./node_modules/@mui/x-date-pickers/node/AdapterDayjs/index.js
var AdapterDayjs = __webpack_require__(53328);
;// CONCATENATED MODULE: ./app/utils/gqlClient.ts

let client = null;
// const URI = "http://localhost:4000/graphql"
const URI = "http://141.95.127.73:4000/graphql";
const getClient = ()=>{
    // create a new client if there's no existing one
    // or if we are running on the server.
    if (!client || "undefined" === "undefined") {
        client = new main.ApolloClient({
            link: new main.HttpLink({
                uri: URI
            }),
            cache: new main.InMemoryCache()
        });
    }
    return client;
};

// EXTERNAL MODULE: ./node_modules/@mui/material/node/AppBar/index.js
var AppBar = __webpack_require__(59965);
var AppBar_default = /*#__PURE__*/__webpack_require__.n(AppBar);
// EXTERNAL MODULE: ./node_modules/@mui/system/index.js
var system = __webpack_require__(47447);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Button/index.js
var Button = __webpack_require__(98511);
var Button_default = /*#__PURE__*/__webpack_require__.n(Button);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Toolbar/index.js
var Toolbar = __webpack_require__(90043);
var Toolbar_default = /*#__PURE__*/__webpack_require__.n(Toolbar);
// EXTERNAL MODULE: ./node_modules/@mui/material/node/Typography/index.js
var Typography = __webpack_require__(43360);
var Typography_default = /*#__PURE__*/__webpack_require__.n(Typography);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Hotel.js
var Hotel = __webpack_require__(66019);
;// CONCATENATED MODULE: ./app/layout.tsx











const layout_client = getClient();
const RootLayout = ({ children  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        id: "outerHTML",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("head", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("title", {
                    children: "Check24"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("body", {
                id: "outerBody",
                children: /*#__PURE__*/ jsx_runtime_.jsx(main.ApolloProvider, {
                    client: layout_client,
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(node.LocalizationProvider, {
                        dateAdapter: AdapterDayjs/* AdapterDayjs */.y,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx((AppBar_default()), {
                                position: "static",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(system.Container, {
                                    maxWidth: "xl",
                                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((Toolbar_default()), {
                                        disableGutters: true,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(Hotel/* default */.Z, {
                                                sx: {
                                                    display: {
                                                        xs: "none",
                                                        md: "flex"
                                                    },
                                                    mr: 1
                                                }
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx((Typography_default()), {
                                                variant: "h6",
                                                noWrap: true,
                                                component: "a",
                                                href: "/",
                                                sx: {
                                                    mr: 2,
                                                    display: {
                                                        xs: "none",
                                                        md: "flex"
                                                    },
                                                    fontFamily: "monospace",
                                                    fontWeight: 700,
                                                    letterSpacing: ".3rem",
                                                    color: "inherit",
                                                    textDecoration: "none"
                                                },
                                                children: "Check24"
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(system.Box, {
                                                sx: {
                                                    flexGrow: 1,
                                                    display: {
                                                        xs: "none",
                                                        md: "flex"
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                                                        href: "/",
                                                        sx: {
                                                            my: 2,
                                                            color: "white",
                                                            display: "block",
                                                            fontWeight: 600
                                                        },
                                                        children: "Home"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                                                        href: "/hotels",
                                                        sx: {
                                                            my: 2,
                                                            color: "white",
                                                            display: "block",
                                                            fontWeight: 600
                                                        },
                                                        children: "Hotels"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx((Button_default()), {
                                                        href: "/saved_offers",
                                                        sx: {
                                                            my: 2,
                                                            color: "white",
                                                            display: "block",
                                                            fontWeight: 600
                                                        },
                                                        children: "Saved"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                })
                            }),
                            children
                        ]
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const layout = (RootLayout);


/***/ })

};
;