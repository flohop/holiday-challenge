(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[961],{7611:function(e,t,r){"use strict";var o=r(6054);function s(){}function i(){}i.resetWarningCache=s,e.exports=function(){function e(e,t,r,s,i,n){if(n!==o){var a=Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:s};return r.PropTypes=r,r}},9497:function(e,t,r){e.exports=r(7611)()},6054:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},3184:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),s=r(6006),i=a(s),n=a(r(9497));function a(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return t&&("object"==typeof t||"function"==typeof t)?t:e}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.scrollListener=r.scrollListener.bind(r),r.eventListenerOptions=r.eventListenerOptions.bind(r),r.mousewheelListener=r.mousewheelListener.bind(r),r}return!function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"componentDidMount",value:function(){this.pageLoaded=this.props.pageStart,this.options=this.eventListenerOptions(),this.attachScrollListener()}},{key:"componentDidUpdate",value:function(){if(this.props.isReverse&&this.loadMore){var e=this.getParentElement(this.scrollComponent);e.scrollTop=e.scrollHeight-this.beforeScrollHeight+this.beforeScrollTop,this.loadMore=!1}this.attachScrollListener()}},{key:"componentWillUnmount",value:function(){this.detachScrollListener(),this.detachMousewheelListener()}},{key:"isPassiveSupported",value:function(){var e=!1,t={get passive(){e=!0}};try{document.addEventListener("test",null,t),document.removeEventListener("test",null,t)}catch(e){}return e}},{key:"eventListenerOptions",value:function(){return this.props.useCapture,this.isPassiveSupported()?{useCapture:this.props.useCapture,passive:!0}:{passive:!1}}},{key:"setDefaultLoader",value:function(e){this.defaultLoader=e}},{key:"detachMousewheelListener",value:function(){var e=window;!1===this.props.useWindow&&(e=this.scrollComponent.parentNode),e.removeEventListener("mousewheel",this.mousewheelListener,this.options?this.options:this.props.useCapture)}},{key:"detachScrollListener",value:function(){var e=window;!1===this.props.useWindow&&(e=this.getParentElement(this.scrollComponent)),e.removeEventListener("scroll",this.scrollListener,this.options?this.options:this.props.useCapture),e.removeEventListener("resize",this.scrollListener,this.options?this.options:this.props.useCapture)}},{key:"getParentElement",value:function(e){var t=this.props.getScrollParent&&this.props.getScrollParent();return null!=t?t:e&&e.parentNode}},{key:"filterProps",value:function(e){return e}},{key:"attachScrollListener",value:function(){var e=this.getParentElement(this.scrollComponent);if(this.props.hasMore&&e){var t=window;!1===this.props.useWindow&&(t=e),t.addEventListener("mousewheel",this.mousewheelListener,this.options?this.options:this.props.useCapture),t.addEventListener("scroll",this.scrollListener,this.options?this.options:this.props.useCapture),t.addEventListener("resize",this.scrollListener,this.options?this.options:this.props.useCapture),this.props.initialLoad&&this.scrollListener()}}},{key:"mousewheelListener",value:function(e){1!==e.deltaY||this.isPassiveSupported()||e.preventDefault()}},{key:"scrollListener",value:function(){var e=this.scrollComponent,t=window,r=this.getParentElement(e),o=void 0;if(this.props.useWindow){var s=document.documentElement||document.body.parentNode||document.body,i=void 0!==t.pageYOffset?t.pageYOffset:s.scrollTop;o=this.props.isReverse?i:this.calculateOffset(e,i)}else o=this.props.isReverse?r.scrollTop:e.scrollHeight-r.scrollTop-r.clientHeight;o<Number(this.props.threshold)&&e&&null!==e.offsetParent&&(this.detachScrollListener(),this.beforeScrollHeight=r.scrollHeight,this.beforeScrollTop=r.scrollTop,"function"==typeof this.props.loadMore&&(this.props.loadMore(this.pageLoaded+=1),this.loadMore=!0))}},{key:"calculateOffset",value:function(e,t){return e?this.calculateTopPosition(e)+(e.offsetHeight-t-window.innerHeight):0}},{key:"calculateTopPosition",value:function(e){return e?e.offsetTop+this.calculateTopPosition(e.offsetParent):0}},{key:"render",value:function(){var e=this,t=this.filterProps(this.props),r=t.children,o=t.element,s=t.hasMore,n=(t.initialLoad,t.isReverse),a=t.loader,u=(t.loadMore,t.pageStart,t.ref),l=(t.threshold,t.useCapture,t.useWindow,t.getScrollParent,function(e,t){var r={};for(var o in e)!(t.indexOf(o)>=0)&&Object.prototype.hasOwnProperty.call(e,o)&&(r[o]=e[o]);return r}(t,["children","element","hasMore","initialLoad","isReverse","loader","loadMore","pageStart","ref","threshold","useCapture","useWindow","getScrollParent"]));l.ref=function(t){e.scrollComponent=t,u&&u(t)};var c=[r];return s&&(a?n?c.unshift(a):c.push(a):this.defaultLoader&&(n?c.unshift(this.defaultLoader):c.push(this.defaultLoader))),i.default.createElement(o,l,c)}}]),t}(s.Component);u.propTypes={children:n.default.node.isRequired,element:n.default.node,hasMore:n.default.bool,initialLoad:n.default.bool,isReverse:n.default.bool,loader:n.default.node,loadMore:n.default.func.isRequired,pageStart:n.default.number,ref:n.default.func,getScrollParent:n.default.func,threshold:n.default.number,useCapture:n.default.bool,useWindow:n.default.bool},u.defaultProps={element:"div",hasMore:!1,initialLoad:!0,pageStart:0,ref:null,threshold:250,useWindow:!0,isReverse:!1,useCapture:!1,loader:null,getScrollParent:null},t.default=u,e.exports=t.default},4313:function(e,t,r){e.exports=r(3184)},5086:function(e,t,r){"use strict";var o,s;function i(e){return!!e&&e<7}r.d(t,{I:function(){return o},O:function(){return i}}),(s=o||(o={}))[s.loading=1]="loading",s[s.setVariables=2]="setVariables",s[s.fetchMore=3]="fetchMore",s[s.refetch=4]="refetch",s[s.poll=6]="poll",s[s.ready=7]="ready",s[s.error=8]="error"},1051:function(e,t,r){"use strict";r.d(t,{A:function(){return k},a:function(){return w}});var o=r(9365),s=r(3393),i=r(6006),n=r.t(i,2),a=r(8547),u=!1,l=n.useSyncExternalStore||function(e,t,r){var o=t();__DEV__&&!u&&o!==t()&&(u=!0,__DEV__&&s.kG.error("The result of getSnapshot should be cached to avoid an infinite loop"));var n=i.useState({inst:{value:o,getSnapshot:t}}),l=n[0].inst,h=n[1];return a.JC?i.useLayoutEffect(function(){Object.assign(l,{value:o,getSnapshot:t}),c(l)&&h({inst:l})},[e,o,t]):Object.assign(l,{value:o,getSnapshot:t}),i.useEffect(function(){return c(l)&&h({inst:l}),e(function(){c(l)&&h({inst:l})})},[e]),o};function c(e){var t=e.value,r=e.getSnapshot;try{return t!==r()}catch(e){return!0}}var h=r(9551),p=r(4455),f=r(6110),d=r(9580),v=r(5086),y=r(3844),b=r(6776),O=r(8059),g=r(2190),m=r(5606),P=Object.prototype.hasOwnProperty;function w(e,t){return void 0===t&&(t=Object.create(null)),k((0,b.x)(t.client),e).useQuery(t)}function k(e,t){var r=(0,i.useRef)();r.current&&e===r.current.client&&t===r.current.query||(r.current=new S(e,t,r.current));var o=r.current,s=(0,i.useState)(0),n=(s[0],s[1]);return o.forceUpdate=function(){n(function(e){return e+1})},o}var S=function(){function e(e,t,r){this.client=e,this.query=t,this.ssrDisabledResult=(0,O.J)({loading:!0,data:void 0,error:void 0,networkStatus:v.I.loading}),this.skipStandbyResult=(0,O.J)({loading:!1,data:void 0,error:void 0,networkStatus:v.I.ready}),this.toQueryResultCache=new(a.mr?WeakMap:Map),(0,y.Vp)(t,y.n_.Query);var o=r&&r.result,s=o&&o.data;s&&(this.previousData=s)}return e.prototype.forceUpdate=function(){__DEV__&&s.kG.warn("Calling default no-op implementation of InternalState#forceUpdate")},e.prototype.executeQuery=function(e){var t,r=this;e.query&&Object.assign(this,{query:e.query}),this.watchQueryOptions=this.createWatchQueryOptions(this.queryHookOptions=e);var o=this.observable.reobserveAsConcast(this.getObsQueryOptions());return this.previousData=(null===(t=this.result)||void 0===t?void 0:t.data)||this.previousData,this.result=void 0,this.forceUpdate(),new Promise(function(e){var t;o.subscribe({next:function(e){t=e},error:function(){e(r.toQueryResult(r.observable.getCurrentResult()))},complete:function(){e(r.toQueryResult(t))}})})},e.prototype.useQuery=function(e){var t=this;this.renderPromises=(0,i.useContext)((0,f.K)()).renderPromises,this.useOptions(e);var r=this.useObservableQuery(),o=l((0,i.useCallback)(function(){if(t.renderPromises)return function(){};var e=function(){var e=t.result,o=r.getCurrentResult();e&&e.loading===o.loading&&e.networkStatus===o.networkStatus&&(0,h.D)(e.data,o.data)||t.setResult(o)},o=function(i){var n=r.last;s.unsubscribe();try{r.resetLastResults(),s=r.subscribe(e,o)}finally{r.last=n}if(!P.call(i,"graphQLErrors"))throw i;var a=t.result;(!a||a&&a.loading||!(0,h.D)(i,a.error))&&t.setResult({data:a&&a.data,error:i,loading:!1,networkStatus:v.I.error})},s=r.subscribe(e,o);return function(){return setTimeout(function(){return s.unsubscribe()})}},[r,this.renderPromises,this.client.disableNetworkFetches]),function(){return t.getCurrentResult()},function(){return t.getCurrentResult()});return this.unsafeHandlePartialRefetch(o),this.toQueryResult(o)},e.prototype.useOptions=function(t){var r,o=this.createWatchQueryOptions(this.queryHookOptions=t),s=this.watchQueryOptions;!(0,h.D)(o,s)&&(this.watchQueryOptions=o,s&&this.observable&&(this.observable.reobserve(this.getObsQueryOptions()),this.previousData=(null===(r=this.result)||void 0===r?void 0:r.data)||this.previousData,this.result=void 0)),this.onCompleted=t.onCompleted||e.prototype.onCompleted,this.onError=t.onError||e.prototype.onError,(this.renderPromises||this.client.disableNetworkFetches)&&!1===this.queryHookOptions.ssr&&!this.queryHookOptions.skip?this.result=this.ssrDisabledResult:this.queryHookOptions.skip||"standby"===this.watchQueryOptions.fetchPolicy?this.result=this.skipStandbyResult:(this.result===this.ssrDisabledResult||this.result===this.skipStandbyResult)&&(this.result=void 0)},e.prototype.getObsQueryOptions=function(){var e=[],t=this.client.defaultOptions.watchQuery;return t&&e.push(t),this.queryHookOptions.defaultOptions&&e.push(this.queryHookOptions.defaultOptions),e.push((0,g.o)(this.observable&&this.observable.options,this.watchQueryOptions)),e.reduce(p.J)},e.prototype.createWatchQueryOptions=function(e){void 0===e&&(e={});var t,r=e.skip,s=Object.assign((e.ssr,e.onCompleted,e.onError,e.defaultOptions,(0,o._T)(e,["skip","ssr","onCompleted","onError","defaultOptions"])),{query:this.query});if(this.renderPromises&&("network-only"===s.fetchPolicy||"cache-and-network"===s.fetchPolicy)&&(s.fetchPolicy="cache-first"),s.variables||(s.variables={}),r){var i=s.fetchPolicy,n=void 0===i?this.getDefaultFetchPolicy():i,a=s.initialFetchPolicy;Object.assign(s,{initialFetchPolicy:void 0===a?n:a,fetchPolicy:"standby"})}else s.fetchPolicy||(s.fetchPolicy=(null===(t=this.observable)||void 0===t?void 0:t.options.initialFetchPolicy)||this.getDefaultFetchPolicy());return s},e.prototype.getDefaultFetchPolicy=function(){var e,t;return(null===(e=this.queryHookOptions.defaultOptions)||void 0===e?void 0:e.fetchPolicy)||(null===(t=this.client.defaultOptions.watchQuery)||void 0===t?void 0:t.fetchPolicy)||"cache-first"},e.prototype.onCompleted=function(e){},e.prototype.onError=function(e){},e.prototype.useObservableQuery=function(){var e=this.observable=this.renderPromises&&this.renderPromises.getSSRObservable(this.watchQueryOptions)||this.observable||this.client.watchQuery(this.getObsQueryOptions());this.obsQueryFields=(0,i.useMemo)(function(){return{refetch:e.refetch.bind(e),reobserve:e.reobserve.bind(e),fetchMore:e.fetchMore.bind(e),updateQuery:e.updateQuery.bind(e),startPolling:e.startPolling.bind(e),stopPolling:e.stopPolling.bind(e),subscribeToMore:e.subscribeToMore.bind(e)}},[e]);var t=!(!1===this.queryHookOptions.ssr||this.queryHookOptions.skip);return this.renderPromises&&t&&(this.renderPromises.registerSSRObservable(e),e.getCurrentResult().loading&&this.renderPromises.addObservableQueryPromise(e)),e},e.prototype.setResult=function(e){var t=this.result;t&&t.data&&(this.previousData=t.data),this.result=e,this.forceUpdate(),this.handleErrorOrCompleted(e)},e.prototype.handleErrorOrCompleted=function(e){var t=this;if(!e.loading){var r=this.toApolloError(e);Promise.resolve().then(function(){r?t.onError(r):e.data&&t.onCompleted(e.data)}).catch(function(e){__DEV__&&s.kG.warn(e)})}},e.prototype.toApolloError=function(e){return(0,m.O)(e.errors)?new d.cA({graphQLErrors:e.errors}):e.error},e.prototype.getCurrentResult=function(){return this.result||this.handleErrorOrCompleted(this.result=this.observable.getCurrentResult()),this.result},e.prototype.toQueryResult=function(e){var t=this.toQueryResultCache.get(e);if(t)return t;var r=e.data,s=(e.partial,(0,o._T)(e,["data","partial"]));return this.toQueryResultCache.set(e,t=(0,o.pi)((0,o.pi)((0,o.pi)({data:r},s),this.obsQueryFields),{client:this.client,observable:this.observable,variables:this.observable.variables,called:!this.queryHookOptions.skip,previousData:this.previousData})),!t.error&&(0,m.O)(e.errors)&&(t.error=new d.cA({graphQLErrors:e.errors})),t},e.prototype.unsafeHandlePartialRefetch=function(e){e.partial&&this.queryHookOptions.partialRefetch&&!e.loading&&(!e.data||0===Object.keys(e.data).length)&&"cache-only"!==this.observable.options.fetchPolicy&&(Object.assign(e,{loading:!0,networkStatus:v.I.refetch}),this.observable.refetch())},e}()},5606:function(e,t,r){"use strict";r.d(t,{O:function(){return s},k:function(){return o}});var o=Array.isArray;function s(e){return Array.isArray(e)&&e.length>0}},8059:function(e,t,r){"use strict";r.d(t,{J:function(){return s}}),r(3393);var o=r(3620);function s(e){if(__DEV__){var t;(t=new Set([e])).forEach(function(e){(0,o.s)(e)&&function(e){if(__DEV__&&!Object.isFrozen(e))try{Object.freeze(e)}catch(e){if(e instanceof TypeError)return null;throw e}return e}(e)===e&&Object.getOwnPropertyNames(e).forEach(function(r){(0,o.s)(e[r])&&t.add(e[r])})})}return e}}}]);