(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[169],{322:function(e,t,r){Promise.resolve().then(r.bind(r,1806))},319:function(e,t,r){"use strict";r.d(t,{Z:function(){return w}});var n=r(9268),i=r(7931),o=r(7095),a=r(8235),u=r(7558),l=r(4200),s=r(4066),d=r(4240),c=r(6008),p=r(9337),h=r(6190),f=r(8902),x=r(8417);function m(e){let{...t}=e;function r(e){if(!e)return"";let t=new Date(e),r=t.getHours(),n=t.getMinutes();return"".concat(r.toString().padStart(2,"0"),":").concat(n.toString().padStart(2,"0"))}return(0,n.jsxs)(x.Z,{children:[(0,n.jsxs)(x.Z,{direction:"row",alignItems:"center",children:[(0,n.jsx)(h.Z,{sx:{rotate:t.inbound?"90deg":"270deg",mr:"5px"}}),(0,n.jsx)(d.Z,{fontWeight:"bold",children:function(e){if(!e)return"";let t=new Date(e);return"".concat(t.getDate(),".").concat(t.getMonth()+1,".").concat(t.getFullYear())}(t.departureDatetime)})]}),(0,n.jsxs)(x.Z,{direction:"row",sx:{height:"30px"},alignItems:"center",children:[(0,n.jsx)(d.Z,{sx:{width:"100px"},children:r(t.departureDatetime)}),(0,n.jsx)(f.Z,{sx:{width:"15px",height:"15px",borderRadius:"1000px",backgroundColor:"gray"}}),(0,n.jsx)(d.Z,{ml:"10px",children:t.departureAirport})]}),(0,n.jsxs)(x.Z,{direction:"row",sx:{height:"30px"},alignItems:"center",children:[(0,n.jsx)(f.Z,{sx:{ml:"100px"}}),(0,n.jsx)(f.Z,{sx:{width:"3px",height:"45px",ml:"6px",mr:"6px",backgroundColor:"gray"}}),(0,n.jsx)(d.Z,{fontWeight:"light",ml:"10px",children:function(e,t){if(!e||!t)return"";let r=new Date(t),n=new Date(e),i=Math.abs(r.getTime()-n.getTime()),o=Math.floor(i/36e5);return"".concat(o,"h ").concat(Math.floor((i-36e5*o)/6e4),"m")}(t.departureDatetime,t.arrivalDatetime)})]}),(0,n.jsxs)(x.Z,{direction:"row",sx:{height:"30px"},alignItems:"center",children:[(0,n.jsx)(d.Z,{sx:{width:"100px"},children:r(t.arrivalDatetime)}),(0,n.jsx)(f.Z,{sx:{width:"15px",height:"15px",borderRadius:"1000px",backgroundColor:"gray"}}),(0,n.jsx)(d.Z,{ml:"10px",children:t.arrivalAirport})]})]})}var b=r(5038),g=r(6269),j=r(4652),v=r(9222),y=r(7305),Z=r(6006),D=r(4212);r(8587);var _=r(2592);function w(e){let{offer:t,onToggleOffer:r,bookButton:h,isCheapest:f}=e,x=(0,c.useRouter)(),[w,I]=(0,Z.useState)(t.isSaved),[A,C]=(0,Z.useState)("#ededed"),[S,k]=(0,_.Z)("queryInput"),[P,q]=(0,_.Z)("selected_hotelid"),M=()=>(0,D.Am)("Enjoy your trip ☀️",{autoClose:1500,hideProgressBar:!1,closeOnClick:!0,draggable:!1,progress:void 0});async function O(){I(!w),await new Promise(e=>setTimeout(e,2e3)),await r(t._id),I(!w)}return(0,Z.useEffect)(()=>{f&&C("#67B7D1")},[]),(0,n.jsxs)(o.Z,{children:[(0,n.jsx)(u.Z,{sx:{backgroundColor:A},title:(0,n.jsxs)(s.ZP,{container:!0,spacing:0,children:[(0,n.jsxs)(s.ZP,{item:!0,xs:11,children:[(0,n.jsxs)(d.Z,{fontWeight:"bold",children:[t.duration," Days - ",t.outboundDepartureAirport,", ",t.outboundArrivalAirport]}),f?(0,n.jsx)(d.Z,{fontWeight:"bold",children:"✨Cheapest✨"}):(0,n.jsx)(n.Fragment,{})]}),(0,n.jsx)(s.ZP,{item:!0,xs:1,justifyContent:"end",children:(0,n.jsx)(p.Z,{direction:"row",children:(0,n.jsx)(i.Z,{onClick:O,children:w?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(j.Z,{fontSize:"medium",color:"warning"}),(0,n.jsx)(d.Z,{color:{color:"black"},children:"Unsave"})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(g.Z,{fontSize:"medium",color:"warning"}),(0,n.jsx)(d.Z,{sx:{color:"black"},children:"Save"})]})})})})]})}),(0,n.jsx)(a.Z,{children:(0,n.jsxs)(p.Z,{direction:"row",justifyContent:"space-between",children:[(0,n.jsxs)(p.Z,{gap:2,children:[(0,n.jsx)(m,{inbound:!0,departureDatetime:t.outboundDepartureDatetime,departureAirport:t.outboundDepartureAirport,arrivalDatetime:t.outboundArrivalDatetime,arrivalAirport:t.outboundArrivalAirport}),(0,n.jsx)(m,{inbound:!1,departureDatetime:t.inboundDepartureDatetime,departureAirport:t.inboundDepartureAirport,arrivalDatetime:t.inboundArrivalDatetime,arrivalAirport:t.inboundArrivalAirport})]}),(0,n.jsxs)(p.Z,{gap:2,children:[(0,n.jsxs)(p.Z,{direction:"row",alignItems:"center",children:[(0,n.jsx)(v.Z,{}),(0,n.jsx)(d.Z,{ml:1,variant:"body1",children:t.mealType})]}),(0,n.jsxs)(p.Z,{direction:"row",alignItems:"center",children:[(0,n.jsx)(b.Z,{}),(0,n.jsx)(d.Z,{ml:1,variant:"body1",children:t.roomType})]}),t.oceanView&&(0,n.jsxs)(p.Z,{direction:"row",alignItems:"center",children:[(0,n.jsx)(y.Z,{}),(0,n.jsx)(d.Z,{ml:1,variant:"body1",children:"Oceanview"})]})]}),(0,n.jsxs)(p.Z,{justifyContent:"end",gap:2,children:[(0,n.jsxs)(p.Z,{m:0,direction:"row",divider:(0,n.jsx)(l.Z,{orientation:"vertical",flexItem:!0}),spacing:1,children:[(0,n.jsxs)(d.Z,{variant:"body1",children:[t.duration," Days"]}),(0,n.jsxs)(d.Z,{variant:"body1",children:[t.countAdults," Adults"]}),(0,n.jsxs)(d.Z,{variant:"body1",children:[t.countChildren," Children"]})]}),(0,n.jsxs)(d.Z,{variant:"h5",textAlign:"right",children:[t.price," €"]}),h?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.Z,{variant:"contained",color:"success",onClick:M,children:"BOOK"}),(0,n.jsx)(D.Ix,{})]}):(0,n.jsx)(i.Z,{variant:"contained",onClick:function(){q("selected_hotelid",t.hotelid),x.push("hotel_offers/"+t.hotelid)},children:"VIEW HOTEL"})]})]})})]})}},1806:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return A}});var n=r(6118),i=r(9268),o=r(6008),a=r(6006),u=r(7056),l=r(1051),s=r(5530),d=r(7251),c=r(8902),p=r(4066),h=r(1936),f=r(7083),x=r(8417),m=r(4240),b=r(4313),g=r.n(b),j=r(319),v=r(6960),y=r(6443),Z=r(2592);function D(){let e=(0,n.Z)(["\n    query Hotel($hotelId: Float!) {\n        hotel(id: $hotelId) {\n            hotelname\n            hotelstars\n            hotelid\n        }\n    }\n"]);return D=function(){return e},e}function _(){let e=(0,n.Z)(["\n    query Offers_by_hotel_by_filter($input: OfferInput!) {\n        offers_by_hotel_by_filter(input: $input) {\n            countadults\n            countchildren\n            hotelid\n            inboundarrivalairport\n            inboundarrivaldatetime\n            inbounddepartureairport\n            inbounddeparturedatetime\n            mealtype\n            oceanview\n            isSaved\n            outboundarrivaldatetime\n            outboundarrivalairport\n            outbounddepartureairport\n            outbounddeparturedatetime\n            price\n            _id\n            roomtype\n        }\n    }\n"]);return _=function(){return e},e}let w=(0,u.Ps)(D()),I=(0,u.Ps)(_());function A(){let e=(0,o.usePathname)(),[t,r]=(0,a.useState)(1),[n,u]=(0,a.useState)(!0),[b,D]=(0,a.useState)([]),_=(0,o.useRouter)(),[A,C]=(0,a.useState)({}),[S,k]=(0,a.useState)(),[P,q]=(0,Z.Z)(["queryInput","selected_hotelid"]),{data:M,error:O,loading:T}=(0,l.a)(w,{variables:{hotelId:S}}),[E,{data:N,error:R,loading:F,fetchMore:H}]=(0,s.t)(I);(0,a.useEffect)(()=>{void 0===P.queryInput||void 0===P.selected_hotelid?_.push("/"):(console.log("Cookies",P.queryInput),console.log("HotelId: ",P.selected_hotelid),E({variables:{input:{hotelId:Number.parseInt(P.selected_hotelid),pageNumber:1,pageSize:10,earliestDepartureDate:P.queryInput.earliestDepartureDate,countAdults:P.queryInput.countAdults,departureAirports:P.queryInput.departureAirports,countChildren:P.queryInput.countChildren,price:P.queryInput.price,duration:P.queryInput.duration,latestReturnDate:P.queryInput.latestReturnDate,mealType:P.queryInput.mealType,oceanView:P.queryInput.oceanView,roomType:P.queryInput.roomType}}}).then(e=>{console.log("Got response: ",e),e.data.offers_by_hotel_by_filter.length<10&&u(!1)}).catch(e=>{console.log("Error: ",e)}))},[]);let[$,{data:V,loading:W,error:z}]=(0,d.D)(v.m);async function B(e){if(0==b.length)return[];let t=await H({variables:{pageNumber:e}}),r=t.data.offers_by_hotel_by_filter;0==r.length&&u(!1),D(e=>[...e,...r])}if((0,a.useEffect)(()=>{!F&&N&&D(N.offers_by_hotel_by_filter)},[F,N]),(0,a.useEffect)(()=>{let t=e.split("/");k(Number.parseInt(t[t.length-1]))},[e]),O||T)return(0,i.jsx)(h.Z,{});async function L(e){await $({variables:{offerId:e}})}return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(p.ZP,{container:!0,direction:"row",justifySelf:"center",justifyContent:"center",alignItems:"center",children:[(0,i.jsx)(p.ZP,{item:!0,xs:4,children:(0,i.jsx)(m.Z,{variant:"h4",children:M.hotel.hotelname})}),(0,i.jsx)(p.ZP,{item:!0,xs:1,children:(0,i.jsx)(f.Z,{value:M.hotel.hotelstars,readOnly:!0})})]}),(0,i.jsx)(c.Z,{display:"block",marginLeft:"auto",marginRight:"auto",sx:{backgroundImage:'url("/hotels/'.concat(M.hotel.hotelid%40+1,'.jpg")'),width:"711px",height:"400px",backgroundSize:"cover"}}),(0,i.jsx)(g(),{pageStart:1,loadMore:B,hasMore:n,threshold:1e3,loader:(0,i.jsx)(h.Z,{},(0,y.H)()),children:(0,i.jsx)(x.Z,{gap:3,children:void 0!==N&&b.map(e=>(0,i.jsx)(j.Z,{onToggleOffer:L,bookButton:!0,offer:{_id:e._id,isSaved:e.isSaved,hotelid:e.hotelid,price:e.price,countAdults:e.countadults,countChildren:e.countchildren,inboundDepartureAirport:e.inbounddepartureairport,inboundDepartureDatetime:e.inbounddeparturedatetime,inboundArrivalAirport:e.inboundarrivalairport,inboundArrivalDatetime:e.inboundarrivaldatetime,outboundDepartureAirport:e.outboundarrivalairport,outboundDepartureDatetime:e.outbounddeparturedatetime,outboundArrivalAirport:e.outboundarrivalairport,outboundArrivalDatetime:e.outboundarrivaldatetime,mealType:e.mealtype,oceanView:"true"==e.oceanview,roomType:e.roomtype,duration:(0,y.L)(e.outbounddeparturedatetime,e.inboundarrivaldatetime)}},(0,y.H)()))})},(0,y.H)())]})}},6960:function(e,t,r){"use strict";r.d(t,{m:function(){return a}});var n=r(6118),i=r(7056);function o(){let e=(0,n.Z)(["\n    mutation Mutation($offerId: String!) {\n        toggle_saved_offer(offer_id: $offerId)\n    }\n"]);return o=function(){return e},e}let a=(0,i.Ps)(o())},6443:function(e,t,r){"use strict";function n(e,t){let r=Date.parse(e),n=Date.parse(t);if(isNaN(r)||isNaN(n))throw Error("Invalid date format");return Math.floor(Math.abs(r-n)/864e5)}r.d(t,{H:function(){return i},L:function(){return n}});let i=()=>Math.floor(9e4*Math.random())+1e4},5530:function(e,t,r){"use strict";r.d(t,{t:function(){return s}});var n=r(9365),i=r(6006),o=r(4455),a=r(1051),u=r(6776),l=["refetch","reobserve","fetchMore","updateQuery","startPolling","subscribeToMore"];function s(e,t){var r,s=(0,i.useRef)(),d=(0,i.useRef)(),c=(0,i.useRef)(),p=s.current?(0,o.J)(t,s.current):t,h=null!==(r=null==p?void 0:p.query)&&void 0!==r?r:e;d.current=p,c.current=h;var f=(0,a.A)((0,u.x)(t&&t.client),h),x=f.useQuery((0,n.pi)((0,n.pi)({},p),{skip:!s.current})),m=x.observable.options.initialFetchPolicy||f.getDefaultFetchPolicy(),b=Object.assign(x,{called:!!s.current}),g=(0,i.useMemo)(function(){for(var e={},t=0;t<l.length;t++)!function(t){var r=b[t];e[t]=function(){return s.current||(s.current=Object.create(null),f.forceUpdate()),r.apply(this,arguments)}}(l[t]);return e},[]);return Object.assign(b,g),[(0,i.useCallback)(function(e){s.current=e?(0,n.pi)((0,n.pi)({},e),{fetchPolicy:e.fetchPolicy||m}):{fetchPolicy:m};var t=(0,o.J)(d.current,(0,n.pi)({query:c.current},s.current)),r=f.executeQuery((0,n.pi)((0,n.pi)({},t),{skip:!1})).then(function(e){return Object.assign(e,g)});return r.catch(function(){}),r},[]),b]}}},function(e){e.O(0,[769,718,22,961,83,455,744],function(){return e(e.s=322)}),_N_E=e.O()}]);