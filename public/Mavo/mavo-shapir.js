!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).firebase=t()}(this,function(){"use strict";var r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};var n=function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function v(e,t){if(!(t instanceof Object))return t;switch(t.constructor){case Date:return new Date(t.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return t}for(var r in t)t.hasOwnProperty(r)&&(e[r]=v(e[r],t[r]));return e}var e,t,o,f=(o=Error,r(e=s,t=o),void(e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)),s);function i(){this.constructor=e}function s(e,t){var r=o.call(this,t)||this;return r.code=e,r.name="FirebaseError",Object.setPrototypeOf(r,s.prototype),Error.captureStackTrace&&Error.captureStackTrace(r,a.prototype.create),r}var a=(c.prototype.create=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];for(var n=t[0]||{},o=this.service+"/"+e,i=this.errors[e],s=i?function(e,n){return e.replace(h,function(e,t){var r=n[t];return null!=r?r.toString():"<"+t+"?>"})}(i,n):"Error",a=this.serviceName+": "+s+" ("+o+").",c=new f(o,a),p=0,l=Object.keys(n);p<l.length;p++){var u=l[p];"_"!==u.slice(-1)&&(u in c&&console.warn('Overwriting FirebaseError base field "'+u+'" can cause unexpected behavior.'),c[u]=n[u])}return c},c);function c(e,t,r){this.service=e,this.serviceName=t,this.errors=r}var h=/\{\$([^}]+)}/g;function d(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function p(e,t){var r=new b(e,t);return r.subscribe.bind(r)}var l,u,b=(y.prototype.next=function(t){this.forEachObserver(function(e){e.next(t)})},y.prototype.error=function(t){this.forEachObserver(function(e){e.error(t)}),this.close(t)},y.prototype.complete=function(){this.forEachObserver(function(e){e.complete()}),this.close()},y.prototype.subscribe=function(e,t,r){var n,o=this;if(void 0===e&&void 0===t&&void 0===r)throw new Error("Missing Observer.");void 0===(n=function(e,t){if("object"!=typeof e||null===e)return!1;for(var r=0,n=t;r<n.length;r++){var o=n[r];if(o in e&&"function"==typeof e[o])return!0}return!1}(e,["next","error","complete"])?e:{next:e,error:t,complete:r}).next&&(n.next=g),void 0===n.error&&(n.error=g),void 0===n.complete&&(n.complete=g);var i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{o.finalError?n.error(o.finalError):n.complete()}catch(e){}}),this.observers.push(n),i},y.prototype.unsubscribeOne=function(e){void 0!==this.observers&&void 0!==this.observers[e]&&(delete this.observers[e],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},y.prototype.forEachObserver=function(e){if(!this.finalized)for(var t=0;t<this.observers.length;t++)this.sendOne(t,e)},y.prototype.sendOne=function(e,t){var r=this;this.task.then(function(){if(void 0!==r.observers&&void 0!==r.observers[e])try{t(r.observers[e])}catch(e){"undefined"!=typeof console&&console.error&&console.error(e)}})},y.prototype.close=function(e){var t=this;this.finalized||(this.finalized=!0,void 0!==e&&(this.finalError=e),this.task.then(function(){t.observers=void 0,t.onNoObservers=void 0}))},y);function y(e,t){var r=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(function(){e(r)}).catch(function(e){r.error(e)})}function g(){}(u=l=l||{})[u.DEBUG=0]="DEBUG",u[u.VERBOSE=1]="VERBOSE",u[u.INFO=2]="INFO",u[u.WARN=3]="WARN",u[u.ERROR=4]="ERROR",u[u.SILENT=5]="SILENT";function m(e,t){for(var r=[],n=2;n<arguments.length;n++)r[n-2]=arguments[n];if(!(t<e.logLevel)){var o=(new Date).toISOString();switch(t){case l.DEBUG:case l.VERBOSE:console.log.apply(console,["["+o+"]  "+e.name+":"].concat(r));break;case l.INFO:console.info.apply(console,["["+o+"]  "+e.name+":"].concat(r));break;case l.WARN:console.warn.apply(console,["["+o+"]  "+e.name+":"].concat(r));break;case l.ERROR:console.error.apply(console,["["+o+"]  "+e.name+":"].concat(r));break;default:throw new Error("Attempted to log a message with an invalid logType (value: "+t+")")}}}var _,E=l.INFO,N=(Object.defineProperty(O.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in l))throw new TypeError("Invalid value assigned to `logLevel`");this._logLevel=e},enumerable:!0,configurable:!0}),Object.defineProperty(O.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!0,configurable:!0}),O.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,l.DEBUG].concat(e))},O.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,l.VERBOSE].concat(e))},O.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,l.INFO].concat(e))},O.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,l.WARN].concat(e))},O.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,l.ERROR].concat(e))},O);function O(e){this.name=e,this._logLevel=E,this._logHandler=m}var k=((_={})["no-app"]="No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",_["bad-app-name"]="Illegal App name: '{$appName}",_["duplicate-app"]="Firebase App named '{$appName}' already exists",_["app-deleted"]="Firebase App named '{$appName}' already deleted",_["invalid-app-argument"]="firebase.{$appName}() takes either no argument or a Firebase App instance.",_),A=new a("app","Firebase",k),w="[DEFAULT]",R=(Object.defineProperty(L.prototype,"automaticDataCollectionEnabled",{get:function(){return this.checkDestroyed_(),this.automaticDataCollectionEnabled_},set:function(e){this.checkDestroyed_(),this.automaticDataCollectionEnabled_=e},enumerable:!0,configurable:!0}),Object.defineProperty(L.prototype,"name",{get:function(){return this.checkDestroyed_(),this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(L.prototype,"options",{get:function(){return this.checkDestroyed_(),this.options_},enumerable:!0,configurable:!0}),L.prototype.delete=function(){var a=this;return new Promise(function(e){a.checkDestroyed_(),e()}).then(function(){a.firebase_.INTERNAL.removeApp(a.name_);for(var e=[],t=0,r=Object.keys(a.services_);t<r.length;t++)for(var n=r[t],o=0,i=Object.keys(a.services_[n]);o<i.length;o++){var s=i[o];e.push(a.services_[n][s])}return Promise.all(e.filter(function(e){return"INTERNAL"in e}).map(function(e){return e.INTERNAL.delete()}))}).then(function(){a.isDeleted_=!0,a.services_={}})},L.prototype._getService=function(e,t){if(void 0===t&&(t=w),this.checkDestroyed_(),this.services_[e]||(this.services_[e]={}),!this.services_[e][t]){var r=t!==w?t:void 0,n=this.firebase_.INTERNAL.factories[e](this,this.extendApp.bind(this),r);this.services_[e][t]=n}return this.services_[e][t]},L.prototype._removeServiceInstance=function(e,t){void 0===t&&(t=w),this.services_[e]&&this.services_[e][t]&&delete this.services_[e][t]},L.prototype.extendApp=function(e){if(v(this,e),e.INTERNAL){if(e.INTERNAL.addAuthTokenListener){for(var t=0,r=this.tokenListeners_;t<r.length;t++){var n=r[t];this.INTERNAL.addAuthTokenListener(n)}this.tokenListeners_=[]}if(e.INTERNAL.analytics){for(var o=0,i=this.analyticsEventRequests_;o<i.length;o++){var s=i[o];this.INTERNAL.analytics.logEvent.apply(void 0,s)}this.analyticsEventRequests_=[]}}},L.prototype.checkDestroyed_=function(){if(this.isDeleted_)throw A.create("app-deleted",{appName:this.name_})},L);function L(e,t,r){var n=this;this.firebase_=r,this.isDeleted_=!1,this.services_={},this.tokenListeners_=[],this.analyticsEventRequests_=[],this.name_=t.name,this.automaticDataCollectionEnabled_=t.automaticDataCollectionEnabled||!1,this.options_=function(e){return v(void 0,e)}(e);var o=this;this.INTERNAL={getUid:function(){return null},getToken:function(){return Promise.resolve(null)},addAuthTokenListener:function(e){n.tokenListeners_.push(e),setTimeout(function(){return e(null)},0)},removeAuthTokenListener:function(t){n.tokenListeners_=n.tokenListeners_.filter(function(e){return e!==t})},analytics:{logEvent:function(){o.analyticsEventRequests_.push(arguments)}}}}R.prototype.name&&R.prototype.options||R.prototype.delete||console.log("dc");var T="7.1.0",I=new N("@firebase/app");if("object"==typeof self&&self.self===self&&void 0!==self.firebase){I.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");var j=self.firebase.SDK_VERSION;j&&0<=j.indexOf("LITE")&&I.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ")}var D=function e(){var t=function(s){var i={},a={},c={},p={__esModule:!0,initializeApp:function(e,t){void 0===t&&(t={}),"object"==typeof t&&null!==t||(t={name:t});var r=t;void 0===r.name&&(r.name=w);var n=r.name;if("string"!=typeof n||!n)throw A.create("bad-app-name",{appName:String(n)});if(d(i,n))throw A.create("duplicate-app",{appName:n});var o=new s(e,r,p);return f(i[n]=o,"create"),o},app:l,apps:null,SDK_VERSION:T,INTERNAL:{registerService:function(r,e,t,n,o){if(void 0===o&&(o=!1),a[r])return I.debug("There were multiple attempts to register service "+r+"."),p[r];function i(e){if(void 0===e&&(e=l()),"function"!=typeof e[r])throw A.create("invalid-app-argument",{appName:r});return e[r]()}return a[r]=e,n&&(c[r]=n,u().forEach(function(e){n("create",e)})),void 0!==t&&v(i,t),p[r]=i,s.prototype[r]=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return this._getService.bind(this,r).apply(this,o?e:[])},i},removeApp:function(e){f(i[e],"delete"),delete i[e]},factories:a,useAsService:h}};function l(e){if(!d(i,e=e||w))throw A.create("no-app",{appName:e});return i[e]}function u(){return Object.keys(i).map(function(e){return i[e]})}function f(e,t){for(var r=0,n=Object.keys(a);r<n.length;r++){var o=h(0,n[r]);if(null===o)return;c[o]&&c[o](t,e)}}function h(e,t){return"serverAuth"===t?null:t}return p.default=p,Object.defineProperty(p,"apps",{get:u}),l.App=s,p}(R);return t.INTERNAL=n({},t.INTERNAL,{createFirebaseNamespace:e,extendNamespace:function(e){v(t,e)},createSubscribe:p,ErrorFactory:a,deepExtend:v}),t}(),F=D.initializeApp;return D.initializeApp=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return function(){try{return"[object process]"===Object.prototype.toString.call(global.process)}catch(e){return!1}}()&&I.warn('\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the "main" field in package.json.\n      \n      If you are using Webpack, you can specify "main" as the first item in\n      "resolve.mainFields":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify "main"\n      as the first item in "mainFields", e.g. [\'main\', \'module\'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      '),F.apply(void 0,e)},D});
// sourceMappingURL=firebase-app.js.map
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app"],e):e((t=t||self).firebase)}(this,function(Vi){"use strict";try{(function(){Vi=Vi&&Vi.hasOwnProperty("default")?Vi.default:Vi;var r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)};function t(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var u=function(){return(u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};function e(n,r){var i,o,s,t,a={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(i)throw new TypeError("Generator is already executing.");for(;a;)try{if(i=1,o&&(s=2&e[0]?o.return:e[0]?o.throw||((s=o.return)&&s.call(o),0):o.next)&&!(s=s.call(o,e[1])).done)return s;switch(o=0,s&&(e=[2&e[0],s.value]),e[0]){case 0:case 1:s=e;break;case 4:return a.label++,{value:e[1],done:!1};case 5:a.label++,o=e[1],e=[0];continue;case 7:e=a.ops.pop(),a.trys.pop();continue;default:if(!(s=0<(s=a.trys).length&&s[s.length-1])&&(6===e[0]||2===e[0])){a=0;continue}if(3===e[0]&&(!s||e[1]>s[0]&&e[1]<s[3])){a.label=e[1];break}if(6===e[0]&&a.label<s[1]){a.label=s[1],s=e;break}if(s&&a.label<s[2]){a.label=s[2],a.ops.push(e);break}s[2]&&a.ops.pop(),a.trys.pop();continue}e=r.call(n,a)}catch(t){e=[6,t],o=0}finally{i=s=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}function f(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}}function _(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,i,o=n.call(t),s=[];try{for(;(void 0===e||0<e--)&&!(r=o.next()).done;)s.push(r.value)}catch(t){i={error:t}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s}function o(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(_(arguments[e]));return t}function s(t){for(var e=[],n=0,r=0;r<t.length;r++){var i=t.charCodeAt(r);i<128?e[n++]=i:(i<2048?e[n++]=i>>6|192:(55296==(64512&i)&&r+1<t.length&&56320==(64512&t.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&t.charCodeAt(++r)),e[n++]=i>>18|240,e[n++]=i>>12&63|128):e[n++]=i>>12|224,e[n++]=i>>6&63|128),e[n++]=63&i|128)}return e}function a(t){try{return l.decodeString(t,!0)}catch(t){console.error("base64Decode failed: ",t)}return null}var h={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},C=function(t,e){if(!t)throw c(e)},c=function(t){return new Error("Firebase Database ("+h.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)},l={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"==typeof atob,encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[],i=0;i<t.length;i+=3){var o=t[i],s=i+1<t.length,a=s?t[i+1]:0,h=i+2<t.length,l=h?t[i+2]:0,u=o>>2,c=(3&o)<<4|a>>4,p=(15&a)<<2|l>>6,d=63&l;h||(d=64,s||(p=64)),r.push(n[u],n[c],n[p],n[d])}return r.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(s(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):function(t){for(var e=[],n=0,r=0;n<t.length;){var i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(191<i&&i<224){var o=t[n++];e[r++]=String.fromCharCode((31&i)<<6|63&o)}else if(239<i&&i<365){var s=((7&i)<<18|(63&(o=t[n++]))<<12|(63&(a=t[n++]))<<6|63&t[n++])-65536;e[r++]=String.fromCharCode(55296+(s>>10)),e[r++]=String.fromCharCode(56320+(1023&s))}else{o=t[n++];var a=t[n++];e[r++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&a)}}return e.join("")}(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[],i=0;i<t.length;){var o=n[t.charAt(i++)],s=i<t.length?n[t.charAt(i)]:0,a=++i<t.length?n[t.charAt(i)]:64,h=++i<t.length?n[t.charAt(i)]:64;if(++i,null==o||null==s||null==a||null==h)throw Error();var l=o<<2|s>>4;if(r.push(l),64!==a){var u=s<<4&240|a>>2;if(r.push(u),64!==h){var c=a<<6&192|h;r.push(c)}}}return r},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),(this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t)>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};function n(t){return function t(e,n){if(!(n instanceof Object))return n;switch(n.constructor){case Date:var r=n;return new Date(r.getTime());case Object:void 0===e&&(e={});break;case Array:e=[];break;default:return n}for(var i in n)n.hasOwnProperty(i)&&(e[i]=t(e[i],n[i]));return e}(void 0,t)}var p=(i.prototype.wrapCallback=function(n){var r=this;return function(t,e){t?r.reject(t):r.resolve(e),"function"==typeof n&&(r.promise.catch(function(){}),1===n.length?n(t):n(t,e))}},i);function i(){var n=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise(function(t,e){n.resolve=t,n.reject=e})}function d(){return"undefined"!=typeof window&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test("undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:"")}function y(){return!0===h.NODE_ADMIN}var v,g=(t(m,v=Error),m);function m(t,e){var n=v.call(this,e)||this;return n.code=t,n.name="FirebaseError",Object.setPrototypeOf(n,m.prototype),Error.captureStackTrace&&Error.captureStackTrace(n,E.prototype.create),n}var E=(w.prototype.create=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var r=e[0]||{},i=this.service+"/"+t,o=this.errors[t],s=o?function(t,r){return t.replace(b,function(t,e){var n=r[e];return null!=n?n.toString():"<"+e+"?>"})}(o,r):"Error",a=this.serviceName+": "+s+" ("+i+").",h=new g(i,a),l=0,u=Object.keys(r);l<u.length;l++){var c=u[l];"_"!==c.slice(-1)&&(c in h&&console.warn('Overwriting FirebaseError base field "'+c+'" can cause unexpected behavior.'),h[c]=r[c])}return h},w);function w(t,e,n){this.service=t,this.serviceName=e,this.errors=n}var b=/\{\$([^}]+)}/g;function S(t){return JSON.parse(t)}function T(t){return JSON.stringify(t)}function I(t){var e={},n={},r={},i="";try{var o=t.split(".");e=S(a(o[0])||""),n=S(a(o[1])||""),i=o[2],r=n.d||{},delete n.d}catch(t){}return{header:e,claims:n,data:r,signature:i}}function N(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function R(t,e){return Object.prototype.hasOwnProperty.call(t,e)?t[e]:void 0}function P(t){for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function D(t,e,n){var r={};for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(r[i]=e.call(n,t[i],i,t));return r}var O=(x.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},x.prototype.compress_=function(t,e){e=e||0;var n=this.W_;if("string"==typeof t)for(var r=0;r<16;r++)n[r]=t.charCodeAt(e)<<24|t.charCodeAt(e+1)<<16|t.charCodeAt(e+2)<<8|t.charCodeAt(e+3),e+=4;else for(r=0;r<16;r++)n[r]=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3],e+=4;for(r=16;r<80;r++){var i=n[r-3]^n[r-8]^n[r-14]^n[r-16];n[r]=4294967295&(i<<1|i>>>31)}var o,s,a=this.chain_[0],h=this.chain_[1],l=this.chain_[2],u=this.chain_[3],c=this.chain_[4];for(r=0;r<80;r++)s=r<40?r<20?(o=u^h&(l^u),1518500249):(o=h^l^u,1859775393):r<60?(o=h&l|u&(h|l),2400959708):(o=h^l^u,3395469782),i=(a<<5|a>>>27)+o+c+s+n[r]&4294967295,c=u,u=l,l=4294967295&(h<<30|h>>>2),h=a,a=i;this.chain_[0]=this.chain_[0]+a&4294967295,this.chain_[1]=this.chain_[1]+h&4294967295,this.chain_[2]=this.chain_[2]+l&4294967295,this.chain_[3]=this.chain_[3]+u&4294967295,this.chain_[4]=this.chain_[4]+c&4294967295},x.prototype.update=function(t,e){if(null!=t){void 0===e&&(e=t.length);for(var n=e-this.blockSize,r=0,i=this.buf_,o=this.inbuf_;r<e;){if(0===o)for(;r<=n;)this.compress_(t,r),r+=this.blockSize;if("string"==typeof t){for(;r<e;)if(i[o]=t.charCodeAt(r),++r,++o===this.blockSize){this.compress_(i),o=0;break}}else for(;r<e;)if(i[o]=t[r],++r,++o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=e}},x.prototype.digest=function(){var t=[],e=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var n=this.blockSize-1;56<=n;n--)this.buf_[n]=255&e,e/=256;this.compress_(this.buf_);var r=0;for(n=0;n<5;n++)for(var i=24;0<=i;i-=8)t[r]=this.chain_[n]>>i&255,++r;return t},x);function x(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(var t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}function k(t,e,n,r){var i;if(r<e?i="at least "+e:n<r&&(i=0===n?"none":"no more than "+n),i)throw new Error(t+" failed: Was called with "+r+(1===r?" argument.":" arguments.")+" Expects "+i+".")}function F(t,e,n){var r="";switch(e){case 1:r=n?"first":"First";break;case 2:r=n?"second":"Second";break;case 3:r=n?"third":"Third";break;case 4:r=n?"fourth":"Fourth";break;default:throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?")}var i=t+" failed: ";return i+=r+" argument "}function A(t,e,n,r){if((!r||n)&&"function"!=typeof n)throw new Error(F(t,e,r)+"must be a valid function.")}function L(t,e,n,r){if((!r||n)&&("object"!=typeof n||null===n))throw new Error(F(t,e,r)+"must be a valid context object.")}function M(t){for(var e=0,n=0;n<t.length;n++){var r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:55296<=r&&r<=56319?(e+=4,n++):e+=3}return e}var W,Q;(Q=W=W||{})[Q.DEBUG=0]="DEBUG",Q[Q.VERBOSE=1]="VERBOSE",Q[Q.INFO=2]="INFO",Q[Q.WARN=3]="WARN",Q[Q.ERROR=4]="ERROR",Q[Q.SILENT=5]="SILENT";function q(t,e){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];if(!(e<t.logLevel)){var i=(new Date).toISOString();switch(e){case W.DEBUG:case W.VERBOSE:console.log.apply(console,["["+i+"]  "+t.name+":"].concat(n));break;case W.INFO:console.info.apply(console,["["+i+"]  "+t.name+":"].concat(n));break;case W.WARN:console.warn.apply(console,["["+i+"]  "+t.name+":"].concat(n));break;case W.ERROR:console.error.apply(console,["["+i+"]  "+t.name+":"].concat(n));break;default:throw new Error("Attempted to log a message with an invalid logType (value: "+e+")")}}}var U=W.INFO,V=(Object.defineProperty(H.prototype,"logLevel",{get:function(){return this._logLevel},set:function(t){if(!(t in W))throw new TypeError("Invalid value assigned to `logLevel`");this._logLevel=t},enumerable:!0,configurable:!0}),Object.defineProperty(H.prototype,"logHandler",{get:function(){return this._logHandler},set:function(t){if("function"!=typeof t)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t},enumerable:!0,configurable:!0}),H.prototype.debug=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._logHandler.apply(this,[this,W.DEBUG].concat(t))},H.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._logHandler.apply(this,[this,W.VERBOSE].concat(t))},H.prototype.info=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._logHandler.apply(this,[this,W.INFO].concat(t))},H.prototype.warn=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._logHandler.apply(this,[this,W.WARN].concat(t))},H.prototype.error=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this._logHandler.apply(this,[this,W.ERROR].concat(t))},H);function H(t){this.name=t,this._logLevel=U,this._logHandler=q}var B=(j.prototype.set=function(t,e){null==e?this.domStorage_.removeItem(this.prefixedName_(t)):this.domStorage_.setItem(this.prefixedName_(t),T(e))},j.prototype.get=function(t){var e=this.domStorage_.getItem(this.prefixedName_(t));return null==e?null:S(e)},j.prototype.remove=function(t){this.domStorage_.removeItem(this.prefixedName_(t))},j.prototype.prefixedName_=function(t){return this.prefix_+t},j.prototype.toString=function(){return this.domStorage_.toString()},j);function j(t){this.domStorage_=t,this.prefix_="firebase:"}var K=(Y.prototype.set=function(t,e){null==e?delete this.cache_[t]:this.cache_[t]=e},Y.prototype.get=function(t){return N(this.cache_,t)?this.cache_[t]:null},Y.prototype.remove=function(t){delete this.cache_[t]},Y);function Y(){this.cache_={},this.isInMemoryStorage=!0}function z(t){try{if("undefined"!=typeof window&&void 0!==window[t]){var e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new B(e)}}catch(t){}return new K}function G(t){var e=function(t){for(var e=[],n=0,r=0;r<t.length;r++){var i=t.charCodeAt(r);if(55296<=i&&i<=56319){var o=i-55296;C(++r<t.length,"Surrogate pair missing trail surrogate."),i=65536+(o<<10)+(t.charCodeAt(r)-56320)}i<128?e[n++]=i:(i<2048?e[n++]=i>>6|192:(i<65536?e[n++]=i>>12|224:(e[n++]=i>>18|240,e[n++]=i>>12&63|128),e[n++]=i>>6&63|128),e[n++]=63&i|128)}return e}(t),n=new O;n.update(e);var r=n.digest();return l.encodeByteArray(r)}function X(t,e){C(!e||!0===t||!1===t,"Can't turn on custom loggers persistently."),!0===t?(lt.logLevel=W.VERBOSE,dt=lt.log.bind(lt),e&&ht.set("logging_enabled",!0)):"function"==typeof t?dt=t:(dt=null,ht.remove("logging_enabled"))}function $(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(!0===ft&&(ft=!1,null===dt&&!0===ht.get("logging_enabled")&&X(!0)),dt){var n=pt.apply(null,t);dt(n)}}function J(n){return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];$.apply(void 0,o([n],t))}}function Z(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE INTERNAL ERROR: "+pt.apply(void 0,o(t));lt.error(n)}function tt(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE FATAL ERROR: "+pt.apply(void 0,o(t));throw lt.error(n),new Error(n)}function et(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="FIREBASE WARNING: "+pt.apply(void 0,o(t));lt.warn(n)}function nt(t){return"number"==typeof t&&(t!=t||t==Number.POSITIVE_INFINITY||t==Number.NEGATIVE_INFINITY)}function rt(t,e){return t===e?0:t<e?-1:1}function it(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+T(e))}function ot(t,e){var n=t.length;if(n<=e)return[t];for(var r=[],i=0;i<n;i+=e)n<i+e?r.push(t.substring(i,n)):r.push(t.substring(i,i+e));return r}var st,at=z("localStorage"),ht=z("sessionStorage"),lt=new V("@firebase/database"),ut="FIREBASE_DATABASE_EMULATOR_HOST",ct=(st=1,function(){return st++}),pt=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var n="",r=0;r<t.length;r++)Array.isArray(t[r])||t[r]&&"object"==typeof t[r]&&"number"==typeof t[r].length?n+=pt.apply(null,t[r]):"object"==typeof t[r]?n+=T(t[r]):n+=t[r],n+=" ";return n},dt=null,ft=!0,_t="[MIN_NAME]",yt="[MAX_NAME]",vt=function(t,e){if(t===e)return 0;if(t===_t||e===yt)return-1;if(e===_t||t===yt)return 1;var n=St(t),r=St(e);return null!==n?null!==r?n-r==0?t.length-e.length:n-r:-1:null!==r?1:t<e?-1:1},gt=function(t){if("object"!=typeof t||null===t)return T(t);var e=[];for(var n in t)e.push(n);e.sort();for(var r="{",i=0;i<e.length;i++)0!==i&&(r+=","),r+=T(e[i]),r+=":",r+=gt(t[e[i]]);return r+="}"};function mt(t,e){for(var n in t)t.hasOwnProperty(n)&&e(n,t[n])}function Ct(t){var e,n,r,i,o,s,a;for(C(!nt(t),"Invalid JSON number"),0===t?e=1/t==-1/(r=n=0)?1:0:(e=t<0,r=(t=Math.abs(t))>=Math.pow(2,-1022)?(n=(i=Math.min(Math.floor(Math.log(t)/Math.LN2),1023))+1023,Math.round(t*Math.pow(2,52-i)-Math.pow(2,52))):(n=0,Math.round(t/Math.pow(2,-1074)))),s=[],o=52;o;o-=1)s.push(r%2?1:0),r=Math.floor(r/2);for(o=11;o;o-=1)s.push(n%2?1:0),n=Math.floor(n/2);s.push(e?1:0),s.reverse(),a=s.join("");var h="";for(o=0;o<64;o+=8){var l=parseInt(a.substr(o,8),2).toString(16);1===l.length&&(l="0"+l),h+=l}return h.toLowerCase()}function Et(t){try{t()}catch(e){setTimeout(function(){var t=e.stack||"";throw et("Exception was thrown by user callback.",t),e},Math.floor(0))}}function wt(t,e){var n=setTimeout(t,e);return"object"==typeof n&&n.unref&&n.unref(),n}var bt=new RegExp("^-?(0*)\\d{1,10}$"),St=function(t){if(bt.test(t)){var e=Number(t);if(-2147483648<=e&&e<=2147483647)return e}return null},Tt=(Object.defineProperty(It,"Empty",{get:function(){return new It("")},enumerable:!0,configurable:!0}),It.prototype.getFront=function(){return this.pieceNum_>=this.pieces_.length?null:this.pieces_[this.pieceNum_]},It.prototype.getLength=function(){return this.pieces_.length-this.pieceNum_},It.prototype.popFront=function(){var t=this.pieceNum_;return t<this.pieces_.length&&t++,new It(this.pieces_,t)},It.prototype.getBack=function(){return this.pieceNum_<this.pieces_.length?this.pieces_[this.pieces_.length-1]:null},It.prototype.toString=function(){for(var t="",e=this.pieceNum_;e<this.pieces_.length;e++)""!==this.pieces_[e]&&(t+="/"+this.pieces_[e]);return t||"/"},It.prototype.toUrlEncodedString=function(){for(var t="",e=this.pieceNum_;e<this.pieces_.length;e++)""!==this.pieces_[e]&&(t+="/"+encodeURIComponent(String(this.pieces_[e])));return t||"/"},It.prototype.slice=function(t){return void 0===t&&(t=0),this.pieces_.slice(this.pieceNum_+t)},It.prototype.parent=function(){if(this.pieceNum_>=this.pieces_.length)return null;for(var t=[],e=this.pieceNum_;e<this.pieces_.length-1;e++)t.push(this.pieces_[e]);return new It(t,0)},It.prototype.child=function(t){for(var e=[],n=this.pieceNum_;n<this.pieces_.length;n++)e.push(this.pieces_[n]);if(t instanceof It)for(n=t.pieceNum_;n<t.pieces_.length;n++)e.push(t.pieces_[n]);else{var r=t.split("/");for(n=0;n<r.length;n++)0<r[n].length&&e.push(r[n])}return new It(e,0)},It.prototype.isEmpty=function(){return this.pieceNum_>=this.pieces_.length},It.relativePath=function(t,e){var n=t.getFront(),r=e.getFront();if(null===n)return e;if(n===r)return It.relativePath(t.popFront(),e.popFront());throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")},It.comparePaths=function(t,e){for(var n=t.slice(),r=e.slice(),i=0;i<n.length&&i<r.length;i++){var o=vt(n[i],r[i]);if(0!==o)return o}return n.length===r.length?0:n.length<r.length?-1:1},It.prototype.equals=function(t){if(this.getLength()!==t.getLength())return!1;for(var e=this.pieceNum_,n=t.pieceNum_;e<=this.pieces_.length;e++,n++)if(this.pieces_[e]!==t.pieces_[n])return!1;return!0},It.prototype.contains=function(t){var e=this.pieceNum_,n=t.pieceNum_;if(this.getLength()>t.getLength())return!1;for(;e<this.pieces_.length;){if(this.pieces_[e]!==t.pieces_[n])return!1;++e,++n}return!0},It);function It(t,e){if(void 0===e){this.pieces_=t.split("/");for(var n=0,r=0;r<this.pieces_.length;r++)0<this.pieces_[r].length&&(this.pieces_[n]=this.pieces_[r],n++);this.pieces_.length=n,this.pieceNum_=0}else this.pieces_=t,this.pieceNum_=e}var Nt=(Object.defineProperty(Rt,"MAX_PATH_DEPTH",{get:function(){return 32},enumerable:!0,configurable:!0}),Object.defineProperty(Rt,"MAX_PATH_LENGTH_BYTES",{get:function(){return 768},enumerable:!0,configurable:!0}),Rt.prototype.push=function(t){0<this.parts_.length&&(this.byteLength_+=1),this.parts_.push(t),this.byteLength_+=M(t),this.checkValid_()},Rt.prototype.pop=function(){var t=this.parts_.pop();this.byteLength_-=M(t),0<this.parts_.length&&(this.byteLength_-=1)},Rt.prototype.checkValid_=function(){if(this.byteLength_>Rt.MAX_PATH_LENGTH_BYTES)throw new Error(this.errorPrefix_+"has a key path longer than "+Rt.MAX_PATH_LENGTH_BYTES+" bytes ("+this.byteLength_+").");if(this.parts_.length>Rt.MAX_PATH_DEPTH)throw new Error(this.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Rt.MAX_PATH_DEPTH+") or object contains a cycle "+this.toErrorString())},Rt.prototype.toErrorString=function(){return 0==this.parts_.length?"":"in property '"+this.parts_.join(".")+"'"},Rt);function Rt(t,e){this.errorPrefix_=e,this.parts_=t.slice(),this.byteLength_=Math.max(1,this.parts_.length);for(var n=0;n<this.parts_.length;n++)this.byteLength_+=M(this.parts_[n]);this.checkValid_()}var Pt="firebaseio.com",Dt="websocket",Ot="long_polling",xt=(kt.prototype.needsQueryParam=function(){return this.host!==this.internalHost||this.isCustomHost()||this.includeNamespaceInQueryParams},kt.prototype.isCacheableHost=function(){return"s-"===this.internalHost.substr(0,2)},kt.prototype.isDemoHost=function(){return"firebaseio-demo.com"===this.domain},kt.prototype.isCustomHost=function(){return"firebaseio.com"!==this.domain&&"firebaseio-demo.com"!==this.domain},kt.prototype.updateHost=function(t){t!==this.internalHost&&(this.internalHost=t,this.isCacheableHost()&&at.set("host:"+this.host,this.internalHost))},kt.prototype.connectionURL=function(t,e){var n;if(C("string"==typeof t,"typeof type must == string"),C("object"==typeof e,"typeof params must == object"),t===Dt)n=(this.secure?"wss://":"ws://")+this.internalHost+"/.ws?";else{if(t!==Ot)throw new Error("Unknown connection type: "+t);n=(this.secure?"https://":"http://")+this.internalHost+"/.lp?"}this.needsQueryParam()&&(e.ns=this.namespace);var r=[];return mt(e,function(t,e){r.push(t+"="+e)}),n+r.join("&")},kt.prototype.toString=function(){var t=this.toURLString();return this.persistenceKey&&(t+="<"+this.persistenceKey+">"),t},kt.prototype.toURLString=function(){return(this.secure?"https://":"http://")+this.host},kt);function kt(t,e,n,r,i,o){void 0===i&&(i=""),void 0===o&&(o=!1),this.secure=e,this.namespace=n,this.webSocketOnly=r,this.persistenceKey=i,this.includeNamespaceInQueryParams=o,this.host=t.toLowerCase(),this.domain=this.host.substr(this.host.indexOf(".")+1),this.internalHost=at.get("host:"+t)||this.host}function Ft(t){var e=Kt(t),n=e.namespace;"firebase"===e.domain&&tt(e.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),n&&"undefined"!=n||"localhost"===e.domain||tt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),e.secure||"undefined"!=typeof window&&window.location&&window.location.protocol&&-1!==window.location.protocol.indexOf("https:")&&et("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");var r="ws"===e.scheme||"wss"===e.scheme;return{repoInfo:new xt(e.host,e.secure,n,r,"",n!=e.subdomain),path:new Tt(e.pathString)}}function At(t){return"string"==typeof t&&0!==t.length&&!Yt.test(t)}function Lt(t){return"string"==typeof t&&0!==t.length&&!zt.test(t)}function Mt(t){return null===t||"string"==typeof t||"number"==typeof t&&!nt(t)||t&&"object"==typeof t&&N(t,".sv")}function Wt(t,e,n,r,i){i&&void 0===n||Xt(F(t,e,i),n,r)}function Qt(t,e,n,r,i){if(!i||void 0!==n){var o=F(t,e,i);if(!n||"object"!=typeof n||Array.isArray(n))throw new Error(o+" must be an object containing the children to replace.");var s=[];mt(n,function(t,e){var n=new Tt(t);if(Xt(o,e,r.child(n)),".priority"===n.getBack()&&!Mt(e))throw new Error(o+"contains an invalid value for '"+n.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");s.push(n)}),function(t,e){var n,r;for(n=0;n<e.length;n++)for(var i=(r=e[n]).slice(),o=0;o<i.length;o++)if(".priority"===i[o]&&o===i.length-1);else if(!At(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+r.toString()+'. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');e.sort(Tt.comparePaths);var s=null;for(n=0;n<e.length;n++){if(r=e[n],null!==s&&s.contains(r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}}(o,s)}}function qt(t,e,n,r){if(!r||void 0!==n){if(nt(n))throw new Error(F(t,e,r)+"is "+n.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Mt(n))throw new Error(F(t,e,r)+"must be a valid Firebase priority (a string, finite number, server value, or null).")}}function Ut(t,e,n,r){if(!r||void 0!==n)switch(n){case"value":case"child_added":case"child_removed":case"child_changed":case"child_moved":break;default:throw new Error(F(t,e,r)+'must be a valid event type = "value", "child_added", "child_removed", "child_changed", or "child_moved".')}}function Vt(t,e,n,r){if(!(r&&void 0===n||At(n)))throw new Error(F(t,e,r)+'was an invalid key = "'+n+'".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").')}function Ht(t,e,n,r){if(!(r&&void 0===n||Lt(n)))throw new Error(F(t,e,r)+'was an invalid path = "'+n+'". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"')}function Bt(t,e){if(".info"===e.getFront())throw new Error(t+" failed = Can't modify data under /.info/")}function jt(t,e,n){var r=n.path.toString();if("string"!=typeof n.repoInfo.host||0===n.repoInfo.host.length||!At(n.repoInfo.namespace)&&"localhost"!==n.repoInfo.host.split(":")[0]||0!==r.length&&!function(t){return t=t&&t.replace(/^\/*\.info(\/|$)/,"/"),Lt(t)}(r))throw new Error(F(t,e,!1)+'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".')}var Kt=function(t){var e="",n="",r="",i="",o="",s=!0,a="https",h=443;if("string"==typeof t){var l=t.indexOf("//");0<=l&&(a=t.substring(0,l-1),t=t.substring(l+2));var u=t.indexOf("/");-1===u&&(u=t.length);var c=t.indexOf("?");-1===c&&(c=t.length),e=t.substring(0,Math.min(u,c)),u<c&&(i=function(t){for(var e="",n=t.split("/"),r=0;r<n.length;r++)if(0<n[r].length){var i=n[r];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch(t){}e+="/"+i}return e}(t.substring(u,c)));var p=function(t){var e,n,r={};"?"===t.charAt(0)&&(t=t.substring(1));try{for(var i=f(t.split("&")),o=i.next();!o.done;o=i.next()){var s=o.value;if(0!==s.length){var a=s.split("=");2===a.length?r[decodeURIComponent(a[0])]=decodeURIComponent(a[1]):et("Invalid query segment '"+s+"' in query '"+t+"'")}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return r}(t.substring(Math.min(t.length,c)));0<=(l=e.indexOf(":"))?(s="https"===a||"wss"===a,h=parseInt(e.substring(l+1),10)):l=t.length;var d=e.split(".");3===d.length?(n=d[1],o=r=d[0].toLowerCase()):2===d.length?n=d[0]:"localhost"===d[0].slice(0,l).toLowerCase()&&(n="localhost"),"ns"in p&&(o=p.ns)}return{host:e,port:h,domain:n,subdomain:r,secure:s,scheme:a,pathString:i,namespace:o}},Yt=/[\[\].#$\/\u0000-\u001F\u007F]/,zt=/[\[\].#$\u0000-\u001F\u007F]/,Gt=10485760,Xt=function(n,t,e){var r=e instanceof Tt?new Nt(e,n):e;if(void 0===t)throw new Error(n+"contains undefined "+r.toErrorString());if("function"==typeof t)throw new Error(n+"contains a function "+r.toErrorString()+" with contents = "+t.toString());if(nt(t))throw new Error(n+"contains "+t.toString()+" "+r.toErrorString());if("string"==typeof t&&t.length>Gt/3&&M(t)>Gt)throw new Error(n+"contains a string greater than "+Gt+" utf8 bytes "+r.toErrorString()+" ('"+t.substring(0,50)+"...')");if(t&&"object"==typeof t){var i=!1,o=!1;if(mt(t,function(t,e){if(".value"===t)i=!0;else if(".priority"!==t&&".sv"!==t&&(o=!0,!At(t)))throw new Error(n+" contains an invalid key ("+t+") "+r.toErrorString()+'.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');r.push(t),Xt(n,e,r),r.pop()}),i&&o)throw new Error(n+' contains ".value" child '+r.toErrorString()+" in addition to actual children.")}},$t=(Jt.prototype.cancel=function(t){k("OnDisconnect.cancel",0,1,arguments.length),A("OnDisconnect.cancel",1,t,!0);var e=new p;return this.repo_.onDisconnectCancel(this.path_,e.wrapCallback(t)),e.promise},Jt.prototype.remove=function(t){k("OnDisconnect.remove",0,1,arguments.length),Bt("OnDisconnect.remove",this.path_),A("OnDisconnect.remove",1,t,!0);var e=new p;return this.repo_.onDisconnectSet(this.path_,null,e.wrapCallback(t)),e.promise},Jt.prototype.set=function(t,e){k("OnDisconnect.set",1,2,arguments.length),Bt("OnDisconnect.set",this.path_),Wt("OnDisconnect.set",1,t,this.path_,!1),A("OnDisconnect.set",2,e,!0);var n=new p;return this.repo_.onDisconnectSet(this.path_,t,n.wrapCallback(e)),n.promise},Jt.prototype.setWithPriority=function(t,e,n){k("OnDisconnect.setWithPriority",2,3,arguments.length),Bt("OnDisconnect.setWithPriority",this.path_),Wt("OnDisconnect.setWithPriority",1,t,this.path_,!1),qt("OnDisconnect.setWithPriority",2,e,!1),A("OnDisconnect.setWithPriority",3,n,!0);var r=new p;return this.repo_.onDisconnectSetWithPriority(this.path_,t,e,r.wrapCallback(n)),r.promise},Jt.prototype.update=function(t,e){if(k("OnDisconnect.update",1,2,arguments.length),Bt("OnDisconnect.update",this.path_),Array.isArray(t)){for(var n={},r=0;r<t.length;++r)n[""+r]=t[r];t=n,et("Passing an Array to firebase.database.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Qt("OnDisconnect.update",1,t,this.path_,!1),A("OnDisconnect.update",2,e,!0);var i=new p;return this.repo_.onDisconnectUpdate(this.path_,t,i.wrapCallback(e)),i.promise},Jt);function Jt(t,e){this.repo_=t,this.path_=e}var Zt=(te.prototype.toJSON=function(){return k("TransactionResult.toJSON",0,1,arguments.length),{committed:this.committed,snapshot:this.snapshot.toJSON()}},te);function te(t,e){this.committed=t,this.snapshot=e}var ee,ne,re,ie=(ee="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",ne=0,re=[],function(t){var e,n=t===ne;ne=t;var r=new Array(8);for(e=7;0<=e;e--)r[e]=ee.charAt(t%64),t=Math.floor(t/64);C(0===t,"Cannot push at time == 0");var i=r.join("");if(n){for(e=11;0<=e&&63===re[e];e--)re[e]=0;re[e]++}else for(e=0;e<12;e++)re[e]=Math.floor(64*Math.random());for(e=0;e<12;e++)i+=ee.charAt(re[e]);return C(20===i.length,"nextPushId: Length should be 20."),i}),oe=(se.Wrap=function(t,e){return new se(t,e)},se);function se(t,e){this.name=t,this.node=e}var ae,he=(le.prototype.getCompare=function(){return this.compare.bind(this)},le.prototype.indexedValueChanged=function(t,e){var n=new oe(_t,t),r=new oe(_t,e);return 0!==this.compare(n,r)},le.prototype.minPost=function(){return oe.MIN},le);function le(){}var ue,ce=(t(pe,ue=he),Object.defineProperty(pe,"__EMPTY_NODE",{get:function(){return ae},set:function(t){ae=t},enumerable:!0,configurable:!0}),pe.prototype.compare=function(t,e){return vt(t.name,e.name)},pe.prototype.isDefinedOn=function(t){throw c("KeyIndex.isDefinedOn not expected to be called.")},pe.prototype.indexedValueChanged=function(t,e){return!1},pe.prototype.minPost=function(){return oe.MIN},pe.prototype.maxPost=function(){return new oe(yt,ae)},pe.prototype.makePost=function(t,e){return C("string"==typeof t,"KeyIndex indexValue must always be a string."),new oe(t,ae)},pe.prototype.toString=function(){return".key"},pe);function pe(){return null!==ue&&ue.apply(this,arguments)||this}var de,fe=new ce;function _e(t){return"number"==typeof t?"number:"+Ct(t):"string:"+t}function ye(t){if(t.isLeafNode()){var e=t.val();C("string"==typeof e||"number"==typeof e||"object"==typeof e&&N(e,".sv"),"Priority must be a string or number.")}else C(t===de||t.isEmpty(),"priority of unexpected type.");C(t===de||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")}var ve,ge,me,Ce,Ee=(Object.defineProperty(we,"__childrenNodeConstructor",{get:function(){return ve},set:function(t){ve=t},enumerable:!0,configurable:!0}),we.prototype.isLeafNode=function(){return!0},we.prototype.getPriority=function(){return this.priorityNode_},we.prototype.updatePriority=function(t){return new we(this.value_,t)},we.prototype.getImmediateChild=function(t){return".priority"===t?this.priorityNode_:we.__childrenNodeConstructor.EMPTY_NODE},we.prototype.getChild=function(t){return t.isEmpty()?this:".priority"===t.getFront()?this.priorityNode_:we.__childrenNodeConstructor.EMPTY_NODE},we.prototype.hasChild=function(){return!1},we.prototype.getPredecessorChildName=function(t,e){return null},we.prototype.updateImmediateChild=function(t,e){return".priority"===t?this.updatePriority(e):e.isEmpty()&&".priority"!==t?this:we.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(t,e).updatePriority(this.priorityNode_)},we.prototype.updateChild=function(t,e){var n=t.getFront();return null===n?e:e.isEmpty()&&".priority"!==n?this:(C(".priority"!==n||1===t.getLength(),".priority must be the last token in a path"),this.updateImmediateChild(n,we.__childrenNodeConstructor.EMPTY_NODE.updateChild(t.popFront(),e)))},we.prototype.isEmpty=function(){return!1},we.prototype.numChildren=function(){return 0},we.prototype.forEachChild=function(t,e){return!1},we.prototype.val=function(t){return t&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()},we.prototype.hash=function(){if(null===this.lazyHash_){var t="";this.priorityNode_.isEmpty()||(t+="priority:"+_e(this.priorityNode_.val())+":");var e=typeof this.value_;t+=e+":",t+="number"==e?Ct(this.value_):this.value_,this.lazyHash_=G(t)}return this.lazyHash_},we.prototype.getValue=function(){return this.value_},we.prototype.compareTo=function(t){return t===we.__childrenNodeConstructor.EMPTY_NODE?1:t instanceof we.__childrenNodeConstructor?-1:(C(t.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(t))},we.prototype.compareToLeafNode_=function(t){var e=typeof t.value_,n=typeof this.value_,r=we.VALUE_TYPE_ORDER.indexOf(e),i=we.VALUE_TYPE_ORDER.indexOf(n);return C(0<=r,"Unknown leaf type: "+e),C(0<=i,"Unknown leaf type: "+n),r===i?"object"==n?0:this.value_<t.value_?-1:this.value_===t.value_?0:1:i-r},we.prototype.withIndex=function(){return this},we.prototype.isIndexed=function(){return!0},we.prototype.equals=function(t){if(t===this)return!0;if(t.isLeafNode()){var e=t;return this.value_===e.value_&&this.priorityNode_.equals(e.priorityNode_)}return!1},we.VALUE_TYPE_ORDER=["object","boolean","number","string"],we);function we(t,e){void 0===e&&(e=we.__childrenNodeConstructor.EMPTY_NODE),this.value_=t,this.priorityNode_=e,this.lazyHash_=null,C(void 0!==this.value_&&null!==this.value_,"LeafNode shouldn't be created with null/undefined value."),ye(this.priorityNode_)}function be(){return null!==Ce&&Ce.apply(this,arguments)||this}var Se=new(t(be,Ce=he),be.prototype.compare=function(t,e){var n=t.node.getPriority(),r=e.node.getPriority(),i=n.compareTo(r);return 0===i?vt(t.name,e.name):i},be.prototype.isDefinedOn=function(t){return!t.getPriority().isEmpty()},be.prototype.indexedValueChanged=function(t,e){return!t.getPriority().equals(e.getPriority())},be.prototype.minPost=function(){return oe.MIN},be.prototype.maxPost=function(){return new oe(yt,new Ee("[PRIORITY-POST]",me))},be.prototype.makePost=function(t,e){var n=ge(t);return new oe(e,new Ee("[PRIORITY-POST]",n))},be.prototype.toString=function(){return".priority"},be),Te=(Ie.prototype.getNext=function(){if(0===this.nodeStack_.length)return null;var t,e=this.nodeStack_.pop();if(t=this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t},Ie.prototype.hasNext=function(){return 0<this.nodeStack_.length},Ie.prototype.peek=function(){if(0===this.nodeStack_.length)return null;var t=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(t.key,t.value):{key:t.key,value:t.value}},Ie);function Ie(t,e,n,r,i){void 0===i&&(i=null),this.isReverse_=r,this.resultGenerator_=i,this.nodeStack_=[];for(var o=1;!t.isEmpty();)if(t=t,o=e?n(t.key,e):1,r&&(o*=-1),o<0)t=this.isReverse_?t.left:t.right;else{if(0===o){this.nodeStack_.push(t);break}this.nodeStack_.push(t),t=this.isReverse_?t.right:t.left}}var Ne=(Re.prototype.copy=function(t,e,n,r,i){return new Re(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)},Re.prototype.count=function(){return this.left.count()+1+this.right.count()},Re.prototype.isEmpty=function(){return!1},Re.prototype.inorderTraversal=function(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)},Re.prototype.reverseTraversal=function(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)},Re.prototype.min_=function(){return this.left.isEmpty()?this:this.left.min_()},Re.prototype.minKey=function(){return this.min_().key},Re.prototype.maxKey=function(){return this.right.isEmpty()?this.key:this.right.maxKey()},Re.prototype.insert=function(t,e,n){var r,i;return(i=(r=n(t,(i=this).key))<0?i.copy(null,null,null,i.left.insert(t,e,n),null):0===r?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,n))).fixUp_()},Re.prototype.removeMin_=function(){if(this.left.isEmpty())return Oe.EMPTY_NODE;var t=this;return t.left.isRed_()||t.left.left.isRed_()||(t=t.moveRedLeft_()),(t=t.copy(null,null,null,t.left.removeMin_(),null)).fixUp_()},Re.prototype.remove=function(t,e){var n,r;if(e(t,(n=this).key)<0)n.left.isEmpty()||n.left.isRed_()||n.left.left.isRed_()||(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(t,e),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),n.right.isEmpty()||n.right.isRed_()||n.right.left.isRed_()||(n=n.moveRedRight_()),0===e(t,n.key)){if(n.right.isEmpty())return Oe.EMPTY_NODE;r=n.right.min_(),n=n.copy(r.key,r.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(t,e))}return n.fixUp_()},Re.prototype.isRed_=function(){return this.color},Re.prototype.fixUp_=function(){var t=this;return t.right.isRed_()&&!t.left.isRed_()&&(t=t.rotateLeft_()),t.left.isRed_()&&t.left.left.isRed_()&&(t=t.rotateRight_()),t.left.isRed_()&&t.right.isRed_()&&(t=t.colorFlip_()),t},Re.prototype.moveRedLeft_=function(){var t=this.colorFlip_();return t.right.left.isRed_()&&(t=(t=(t=t.copy(null,null,null,null,t.right.rotateRight_())).rotateLeft_()).colorFlip_()),t},Re.prototype.moveRedRight_=function(){var t=this.colorFlip_();return t.left.left.isRed_()&&(t=(t=t.rotateRight_()).colorFlip_()),t},Re.prototype.rotateLeft_=function(){var t=this.copy(null,null,Re.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)},Re.prototype.rotateRight_=function(){var t=this.copy(null,null,Re.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)},Re.prototype.colorFlip_=function(){var t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)},Re.prototype.checkMaxDepth_=function(){var t=this.check_();return Math.pow(2,t)<=this.count()+1},Re.prototype.check_=function(){var t;if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");if((t=this.left.check_())!==this.right.check_())throw new Error("Black depths differ");return t+(this.isRed_()?0:1)},Re.RED=!0,Re.BLACK=!1,Re);function Re(t,e,n,r,i){this.key=t,this.value=e,this.color=null!=n?n:Re.RED,this.left=null!=r?r:Oe.EMPTY_NODE,this.right=null!=i?i:Oe.EMPTY_NODE}var Pe=(De.prototype.copy=function(t,e,n,r,i){return this},De.prototype.insert=function(t,e,n){return new Ne(t,e,null)},De.prototype.remove=function(t,e){return this},De.prototype.count=function(){return 0},De.prototype.isEmpty=function(){return!0},De.prototype.inorderTraversal=function(t){return!1},De.prototype.reverseTraversal=function(t){return!1},De.prototype.minKey=function(){return null},De.prototype.maxKey=function(){return null},De.prototype.check_=function(){return 0},De.prototype.isRed_=function(){return!1},De);function De(){}var Oe=(xe.prototype.insert=function(t,e){return new xe(this.comparator_,this.root_.insert(t,e,this.comparator_).copy(null,null,Ne.BLACK,null,null))},xe.prototype.remove=function(t){return new xe(this.comparator_,this.root_.remove(t,this.comparator_).copy(null,null,Ne.BLACK,null,null))},xe.prototype.get=function(t){for(var e,n=this.root_;!n.isEmpty();){if(0===(e=this.comparator_(t,n.key)))return n.value;e<0?n=n.left:0<e&&(n=n.right)}return null},xe.prototype.getPredecessorKey=function(t){for(var e,n=this.root_,r=null;!n.isEmpty();){if(0===(e=this.comparator_(t,n.key))){if(n.left.isEmpty())return r?r.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}e<0?n=n.left:0<e&&(n=(r=n).right)}throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")},xe.prototype.isEmpty=function(){return this.root_.isEmpty()},xe.prototype.count=function(){return this.root_.count()},xe.prototype.minKey=function(){return this.root_.minKey()},xe.prototype.maxKey=function(){return this.root_.maxKey()},xe.prototype.inorderTraversal=function(t){return this.root_.inorderTraversal(t)},xe.prototype.reverseTraversal=function(t){return this.root_.reverseTraversal(t)},xe.prototype.getIterator=function(t){return new Te(this.root_,null,this.comparator_,!1,t)},xe.prototype.getIteratorFrom=function(t,e){return new Te(this.root_,t,this.comparator_,!1,e)},xe.prototype.getReverseIteratorFrom=function(t,e){return new Te(this.root_,t,this.comparator_,!0,e)},xe.prototype.getReverseIterator=function(t){return new Te(this.root_,null,this.comparator_,!0,t)},xe.EMPTY_NODE=new Pe,xe);function xe(t,e){void 0===e&&(e=xe.EMPTY_NODE),this.comparator_=t,this.root_=e}var ke=Math.log(2),Fe=(Ae.prototype.nextBitIsOne=function(){var t=!(this.bits_&1<<this.current_);return this.current_--,t},Ae);function Ae(t){var e;this.count=(e=t+1,parseInt(Math.log(e)/ke,10)),this.current_=this.count-1;var n,r=(n=this.count,parseInt(Array(n+1).join("1"),2));this.bits_=t+1&r}var Le,Me,We=function(l,t,u,e){l.sort(t);var c=function(t,e){var n,r,i=e-t;if(0==i)return null;if(1==i)return n=l[t],r=u?u(n):n,new Ne(r,n.node,Ne.BLACK,null,null);var o=parseInt(i/2,10)+t,s=c(t,o),a=c(o+1,e);return n=l[o],r=u?u(n):n,new Ne(r,n.node,Ne.BLACK,s,a)},n=function(t){for(var e=null,n=null,a=l.length,r=function(t,e){var n=a-t,r=a;a-=t;var i=c(1+n,r),o=l[n],s=u?u(o):o;h(new Ne(s,o.node,e,null,i))},h=function(t){e=e?e.left=t:n=t},i=0;i<t.count;++i){var o=t.nextBitIsOne(),s=Math.pow(2,t.count-(i+1));o?r(s,Ne.BLACK):(r(s,Ne.BLACK),r(s,Ne.RED))}return n}(new Fe(l.length));return new Oe(e||t,n)},Qe={},qe=(Object.defineProperty(Ue,"Default",{get:function(){return C(Se,"ChildrenNode.ts has not been loaded"),Le=Le||new Ue({".priority":Qe},{".priority":Se})},enumerable:!0,configurable:!0}),Ue.prototype.get=function(t){var e=R(this.indexes_,t);if(!e)throw new Error("No index defined for "+t);return e instanceof Oe?e:null},Ue.prototype.hasIndex=function(t){return N(this.indexSet_,t.toString())},Ue.prototype.addIndex=function(t,e){C(t!==fe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");for(var n,r=[],i=!1,o=e.getIterator(oe.Wrap),s=o.getNext();s;)i=i||t.isDefinedOn(s.node),r.push(s),s=o.getNext();n=i?We(r,t.getCompare()):Qe;var a=t.toString(),h=u({},this.indexSet_);h[a]=t;var l=u({},this.indexes_);return l[a]=n,new Ue(l,h)},Ue.prototype.addToIndexes=function(h,l){var u=this;return new Ue(D(this.indexes_,function(t,e){var n=R(u.indexSet_,e);if(C(n,"Missing index implementation for "+e),t===Qe){if(n.isDefinedOn(h.node)){for(var r=[],i=l.getIterator(oe.Wrap),o=i.getNext();o;)o.name!=h.name&&r.push(o),o=i.getNext();return r.push(h),We(r,n.getCompare())}return Qe}var s=l.get(h.name),a=t;return s&&(a=a.remove(new oe(h.name,s))),a.insert(h,h.node)}),this.indexSet_)},Ue.prototype.removeFromIndexes=function(n,r){return new Ue(D(this.indexes_,function(t){if(t===Qe)return t;var e=r.get(n.name);return e?t.remove(new oe(n.name,e)):t}),this.indexSet_)},Ue);function Ue(t,e){this.indexes_=t,this.indexSet_=e}function Ve(t,e){return vt(t.name,e.name)}function He(t,e){return vt(t,e)}var Be,je=(Object.defineProperty(Ke,"EMPTY_NODE",{get:function(){return Me=Me||new Ke(new Oe(He),null,qe.Default)},enumerable:!0,configurable:!0}),Ke.prototype.isLeafNode=function(){return!1},Ke.prototype.getPriority=function(){return this.priorityNode_||Me},Ke.prototype.updatePriority=function(t){return this.children_.isEmpty()?this:new Ke(this.children_,t,this.indexMap_)},Ke.prototype.getImmediateChild=function(t){if(".priority"===t)return this.getPriority();var e=this.children_.get(t);return null===e?Me:e},Ke.prototype.getChild=function(t){var e=t.getFront();return null===e?this:this.getImmediateChild(e).getChild(t.popFront())},Ke.prototype.hasChild=function(t){return null!==this.children_.get(t)},Ke.prototype.updateImmediateChild=function(t,e){if(C(e,"We should always be passing snapshot nodes"),".priority"===t)return this.updatePriority(e);var n,r=new oe(t,e),i=void 0,o=void 0;return o=e.isEmpty()?(i=this.children_.remove(t),this.indexMap_.removeFromIndexes(r,this.children_)):(i=this.children_.insert(t,e),this.indexMap_.addToIndexes(r,this.children_)),n=i.isEmpty()?Me:this.priorityNode_,new Ke(i,n,o)},Ke.prototype.updateChild=function(t,e){var n=t.getFront();if(null===n)return e;C(".priority"!==t.getFront()||1===t.getLength(),".priority must be the last token in a path");var r=this.getImmediateChild(n).updateChild(t.popFront(),e);return this.updateImmediateChild(n,r)},Ke.prototype.isEmpty=function(){return this.children_.isEmpty()},Ke.prototype.numChildren=function(){return this.children_.count()},Ke.prototype.val=function(n){if(this.isEmpty())return null;var r={},i=0,o=0,s=!0;if(this.forEachChild(Se,function(t,e){r[t]=e.val(n),i++,s&&Ke.INTEGER_REGEXP_.test(t)?o=Math.max(o,Number(t)):s=!1}),!n&&s&&o<2*i){var t=[];for(var e in r)t[e]=r[e];return t}return n&&!this.getPriority().isEmpty()&&(r[".priority"]=this.getPriority().val()),r},Ke.prototype.hash=function(){if(null===this.lazyHash_){var r="";this.getPriority().isEmpty()||(r+="priority:"+_e(this.getPriority().val())+":"),this.forEachChild(Se,function(t,e){var n=e.hash();""!==n&&(r+=":"+t+":"+n)}),this.lazyHash_=""===r?"":G(r)}return this.lazyHash_},Ke.prototype.getPredecessorChildName=function(t,e,n){var r=this.resolveIndex_(n);if(r){var i=r.getPredecessorKey(new oe(t,e));return i?i.name:null}return this.children_.getPredecessorKey(t)},Ke.prototype.getFirstChildName=function(t){var e=this.resolveIndex_(t);if(e){var n=e.minKey();return n&&n.name}return this.children_.minKey()},Ke.prototype.getFirstChild=function(t){var e=this.getFirstChildName(t);return e?new oe(e,this.children_.get(e)):null},Ke.prototype.getLastChildName=function(t){var e=this.resolveIndex_(t);if(e){var n=e.maxKey();return n&&n.name}return this.children_.maxKey()},Ke.prototype.getLastChild=function(t){var e=this.getLastChildName(t);return e?new oe(e,this.children_.get(e)):null},Ke.prototype.forEachChild=function(t,e){var n=this.resolveIndex_(t);return n?n.inorderTraversal(function(t){return e(t.name,t.node)}):this.children_.inorderTraversal(e)},Ke.prototype.getIterator=function(t){return this.getIteratorFrom(t.minPost(),t)},Ke.prototype.getIteratorFrom=function(t,e){var n=this.resolveIndex_(e);if(n)return n.getIteratorFrom(t,function(t){return t});for(var r=this.children_.getIteratorFrom(t.name,oe.Wrap),i=r.peek();null!=i&&e.compare(i,t)<0;)r.getNext(),i=r.peek();return r},Ke.prototype.getReverseIterator=function(t){return this.getReverseIteratorFrom(t.maxPost(),t)},Ke.prototype.getReverseIteratorFrom=function(t,e){var n=this.resolveIndex_(e);if(n)return n.getReverseIteratorFrom(t,function(t){return t});for(var r=this.children_.getReverseIteratorFrom(t.name,oe.Wrap),i=r.peek();null!=i&&0<e.compare(i,t);)r.getNext(),i=r.peek();return r},Ke.prototype.compareTo=function(t){return this.isEmpty()?t.isEmpty()?0:-1:t.isLeafNode()||t.isEmpty()?1:t===ze?-1:0},Ke.prototype.withIndex=function(t){if(t===fe||this.indexMap_.hasIndex(t))return this;var e=this.indexMap_.addIndex(t,this.children_);return new Ke(this.children_,this.priorityNode_,e)},Ke.prototype.isIndexed=function(t){return t===fe||this.indexMap_.hasIndex(t)},Ke.prototype.equals=function(t){if(t===this)return!0;if(t.isLeafNode())return!1;var e=t;if(this.getPriority().equals(e.getPriority())){if(this.children_.count()!==e.children_.count())return!1;for(var n=this.getIterator(Se),r=e.getIterator(Se),i=n.getNext(),o=r.getNext();i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=n.getNext(),o=r.getNext()}return null===i&&null===o}return!1},Ke.prototype.resolveIndex_=function(t){return t===fe?null:this.indexMap_.get(t.toString())},Ke.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/,Ke);function Ke(t,e,n){this.children_=t,this.priorityNode_=e,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&ye(this.priorityNode_),this.children_.isEmpty()&&C(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}function Ye(){return Be.call(this,new Oe(He),je.EMPTY_NODE,qe.Default)||this}var ze=new(t(Ye,Be=je),Ye.prototype.compareTo=function(t){return t===this?0:1},Ye.prototype.equals=function(t){return t===this},Ye.prototype.getPriority=function(){return this},Ye.prototype.getImmediateChild=function(t){return je.EMPTY_NODE},Ye.prototype.isEmpty=function(){return!1},Ye);Object.defineProperties(oe,{MIN:{value:new oe(_t,je.EMPTY_NODE)},MAX:{value:new oe(yt,ze)}}),ce.__EMPTY_NODE=je.EMPTY_NODE,Ee.__childrenNodeConstructor=je,de=ze,me=ze;var Ge,Xe=!0;function $e(r,t){if(void 0===t&&(t=null),null===r)return je.EMPTY_NODE;if("object"==typeof r&&".priority"in r&&(t=r[".priority"]),C(null===t||"string"==typeof t||"number"==typeof t||"object"==typeof t&&".sv"in t,"Invalid priority type found: "+typeof t),"object"==typeof r&&".value"in r&&null!==r[".value"]&&(r=r[".value"]),"object"!=typeof r||".sv"in r)return new Ee(r,$e(t));if(r instanceof Array||!Xe){var i=je.EMPTY_NODE;return mt(r,function(t,e){if(N(r,t)&&"."!==t.substring(0,1)){var n=$e(e);!n.isLeafNode()&&n.isEmpty()||(i=i.updateImmediateChild(t,n))}}),i.updatePriority($e(t))}var o=[],s=!1;if(mt(r,function(t,e){if("."!==t.substring(0,1)){var n=$e(e);n.isEmpty()||(s=s||!n.getPriority().isEmpty(),o.push(new oe(t,n)))}}),0==o.length)return je.EMPTY_NODE;var e=We(o,Ve,function(t){return t.name},He);if(s){var n=We(o,Se.getCompare());return new je(e,$e(t),new qe({".priority":n},{".priority":Se}))}return new je(e,$e(t),qe.Default)}function Je(){return null!==Ge&&Ge.apply(this,arguments)||this}ge=$e;var Ze,tn=new(t(Je,Ge=he),Je.prototype.compare=function(t,e){var n=t.node.compareTo(e.node);return 0===n?vt(t.name,e.name):n},Je.prototype.isDefinedOn=function(t){return!0},Je.prototype.indexedValueChanged=function(t,e){return!t.equals(e)},Je.prototype.minPost=function(){return oe.MIN},Je.prototype.maxPost=function(){return oe.MAX},Je.prototype.makePost=function(t,e){var n=$e(t);return new oe(e,n)},Je.prototype.toString=function(){return".value"},Je),en=(t(nn,Ze=he),nn.prototype.extractChild=function(t){return t.getChild(this.indexPath_)},nn.prototype.isDefinedOn=function(t){return!t.getChild(this.indexPath_).isEmpty()},nn.prototype.compare=function(t,e){var n=this.extractChild(t.node),r=this.extractChild(e.node),i=n.compareTo(r);return 0===i?vt(t.name,e.name):i},nn.prototype.makePost=function(t,e){var n=$e(t),r=je.EMPTY_NODE.updateChild(this.indexPath_,n);return new oe(e,r)},nn.prototype.maxPost=function(){var t=je.EMPTY_NODE.updateChild(this.indexPath_,ze);return new oe(yt,t)},nn.prototype.toString=function(){return this.indexPath_.slice().join("/")},nn);function nn(t){var e=Ze.call(this)||this;return e.indexPath_=t,C(!t.isEmpty()&&".priority"!==t.getFront(),"Can't create PathIndex with empty path or .priority key"),e}var rn=(on.prototype.val=function(){return k("DataSnapshot.val",0,0,arguments.length),this.node_.val()},on.prototype.exportVal=function(){return k("DataSnapshot.exportVal",0,0,arguments.length),this.node_.val(!0)},on.prototype.toJSON=function(){return k("DataSnapshot.toJSON",0,1,arguments.length),this.exportVal()},on.prototype.exists=function(){return k("DataSnapshot.exists",0,0,arguments.length),!this.node_.isEmpty()},on.prototype.child=function(t){k("DataSnapshot.child",0,1,arguments.length),t=String(t),Ht("DataSnapshot.child",1,t,!1);var e=new Tt(t),n=this.ref_.child(e);return new on(this.node_.getChild(e),n,Se)},on.prototype.hasChild=function(t){k("DataSnapshot.hasChild",1,1,arguments.length),Ht("DataSnapshot.hasChild",1,t,!1);var e=new Tt(t);return!this.node_.getChild(e).isEmpty()},on.prototype.getPriority=function(){return k("DataSnapshot.getPriority",0,0,arguments.length),this.node_.getPriority().val()},on.prototype.forEach=function(n){var r=this;return k("DataSnapshot.forEach",1,1,arguments.length),A("DataSnapshot.forEach",1,n,!1),!this.node_.isLeafNode()&&!!this.node_.forEachChild(this.index_,function(t,e){return n(new on(e,r.ref_.child(t),Se))})},on.prototype.hasChildren=function(){return k("DataSnapshot.hasChildren",0,0,arguments.length),!this.node_.isLeafNode()&&!this.node_.isEmpty()},Object.defineProperty(on.prototype,"key",{get:function(){return this.ref_.getKey()},enumerable:!0,configurable:!0}),on.prototype.numChildren=function(){return k("DataSnapshot.numChildren",0,0,arguments.length),this.node_.numChildren()},on.prototype.getRef=function(){return k("DataSnapshot.ref",0,0,arguments.length),this.ref_},Object.defineProperty(on.prototype,"ref",{get:function(){return this.getRef()},enumerable:!0,configurable:!0}),on);function on(t,e,n){this.node_=t,this.ref_=e,this.index_=n}var sn=(an.prototype.getPath=function(){var t=this.snapshot.getRef();return"value"===this.eventType?t.path:t.getParent().path},an.prototype.getEventType=function(){return this.eventType},an.prototype.getEventRunner=function(){return this.eventRegistration.getEventRunner(this)},an.prototype.toString=function(){return this.getPath().toString()+":"+this.eventType+":"+T(this.snapshot.exportVal())},an);function an(t,e,n,r){this.eventType=t,this.eventRegistration=e,this.snapshot=n,this.prevName=r}var hn=(ln.prototype.getPath=function(){return this.path},ln.prototype.getEventType=function(){return"cancel"},ln.prototype.getEventRunner=function(){return this.eventRegistration.getEventRunner(this)},ln.prototype.toString=function(){return this.path.toString()+":cancel"},ln);function ln(t,e,n){this.eventRegistration=t,this.error=e,this.path=n}var un=(cn.prototype.respondsTo=function(t){return"value"===t},cn.prototype.createEvent=function(t,e){var n=e.getQueryParams().getIndex();return new sn("value",this,new rn(t.snapshotNode,e.getRef(),n))},cn.prototype.getEventRunner=function(t){var e=this.context_;if("cancel"===t.getEventType()){C(this.cancelCallback_,"Raising a cancel event on a listener with no cancel callback");var n=this.cancelCallback_;return function(){n.call(e,t.error)}}var r=this.callback_;return function(){r.call(e,t.snapshot)}},cn.prototype.createCancelEvent=function(t,e){return this.cancelCallback_?new hn(this,t,e):null},cn.prototype.matches=function(t){return t instanceof cn&&(!t.callback_||!this.callback_||t.callback_===this.callback_&&t.context_===this.context_)},cn.prototype.hasAnyCallback=function(){return null!==this.callback_},cn);function cn(t,e,n){this.callback_=t,this.cancelCallback_=e,this.context_=n}var pn,dn=(fn.prototype.respondsTo=function(t){var e="children_added"===t?"child_added":t;return e="children_removed"===e?"child_removed":e,N(this.callbacks_,e)},fn.prototype.createCancelEvent=function(t,e){return this.cancelCallback_?new hn(this,t,e):null},fn.prototype.createEvent=function(t,e){C(null!=t.childName,"Child events should have a childName.");var n=e.getRef().child(t.childName),r=e.getQueryParams().getIndex();return new sn(t.type,this,new rn(t.snapshotNode,n,r),t.prevName)},fn.prototype.getEventRunner=function(t){var e=this.context_;if("cancel"===t.getEventType()){C(this.cancelCallback_,"Raising a cancel event on a listener with no cancel callback");var n=this.cancelCallback_;return function(){n.call(e,t.error)}}var r=this.callbacks_[t.eventType];return function(){r.call(e,t.snapshot,t.prevName)}},fn.prototype.matches=function(e){var n=this;if(e instanceof fn){if(!this.callbacks_||!e.callbacks_)return!0;if(this.context_===e.context_){var t=Object.keys(e.callbacks_),r=Object.keys(this.callbacks_),i=t.length;if(i===r.length){if(1!==i)return r.every(function(t){return e.callbacks_[t]===n.callbacks_[t]});var o=t[0],s=r[0];return!(s!==o||e.callbacks_[o]&&this.callbacks_[s]&&e.callbacks_[o]!==this.callbacks_[s])}}}return!1},fn.prototype.hasAnyCallback=function(){return null!==this.callbacks_},fn);function fn(t,e,n){this.callbacks_=t,this.cancelCallback_=e,this.context_=n}var _n=(Object.defineProperty(yn,"__referenceConstructor",{get:function(){return C(pn,"Reference.ts has not been loaded"),pn},set:function(t){pn=t},enumerable:!0,configurable:!0}),yn.validateQueryEndpoints_=function(t){var e=null,n=null;if(t.hasStart()&&(e=t.getIndexStartValue()),t.hasEnd()&&(n=t.getIndexEndValue()),t.getIndex()===fe){var r="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",i="Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.";if(t.hasStart()){if(t.getIndexStartName()!=_t)throw new Error(r);if("string"!=typeof e)throw new Error(i)}if(t.hasEnd()){if(t.getIndexEndName()!=yt)throw new Error(r);if("string"!=typeof n)throw new Error(i)}}else if(t.getIndex()===Se){if(null!=e&&!Mt(e)||null!=n&&!Mt(n))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(C(t.getIndex()instanceof en||t.getIndex()===tn,"unknown index type."),null!=e&&"object"==typeof e||null!=n&&"object"==typeof n)throw new Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.")},yn.validateLimit_=function(t){if(t.hasStart()&&t.hasEnd()&&t.hasLimit()&&!t.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.")},yn.prototype.validateNoPreviousOrderByCall_=function(t){if(!0===this.orderByCalled_)throw new Error(t+": You can't combine multiple orderBy calls.")},yn.prototype.getQueryParams=function(){return this.queryParams_},yn.prototype.getRef=function(){return k("Query.ref",0,0,arguments.length),new yn.__referenceConstructor(this.repo,this.path)},yn.prototype.on=function(t,e,n,r){k("Query.on",2,4,arguments.length),Ut("Query.on",1,t,!1),A("Query.on",2,e,!1);var i=yn.getCancelAndContextArgs_("Query.on",n,r);if("value"===t)this.onValueEvent(e,i.cancel,i.context);else{var o={};o[t]=e,this.onChildEvent(o,i.cancel,i.context)}return e},yn.prototype.onValueEvent=function(t,e,n){var r=new un(t,e||null,n||null);this.repo.addEventCallbackForQuery(this,r)},yn.prototype.onChildEvent=function(t,e,n){var r=new dn(t,e,n);this.repo.addEventCallbackForQuery(this,r)},yn.prototype.off=function(t,e,n){k("Query.off",0,3,arguments.length),Ut("Query.off",1,t,!0),A("Query.off",2,e,!0),L("Query.off",3,n,!0);var r=null,i=null;"value"===t?r=new un(e||null,null,n||null):t&&(e&&((i={})[t]=e),r=new dn(i,null,n||null)),this.repo.removeEventCallbackForQuery(this,r)},yn.prototype.once=function(e,n,t,r){var i=this;k("Query.once",1,4,arguments.length),Ut("Query.once",1,e,!1),A("Query.once",2,n,!0);var o=yn.getCancelAndContextArgs_("Query.once",t,r),s=!0,a=new p;a.promise.catch(function(){});var h=function(t){s&&(s=!1,i.off(e,h),n&&n.bind(o.context)(t),a.resolve(t))};return this.on(e,h,function(t){i.off(e,h),o.cancel&&o.cancel.bind(o.context)(t),a.reject(t)}),a.promise},yn.prototype.limitToFirst=function(t){if(k("Query.limitToFirst",1,1,arguments.length),"number"!=typeof t||Math.floor(t)!==t||t<=0)throw new Error("Query.limitToFirst: First argument must be a positive integer.");if(this.queryParams_.hasLimit())throw new Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new yn(this.repo,this.path,this.queryParams_.limitToFirst(t),this.orderByCalled_)},yn.prototype.limitToLast=function(t){if(k("Query.limitToLast",1,1,arguments.length),"number"!=typeof t||Math.floor(t)!==t||t<=0)throw new Error("Query.limitToLast: First argument must be a positive integer.");if(this.queryParams_.hasLimit())throw new Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");return new yn(this.repo,this.path,this.queryParams_.limitToLast(t),this.orderByCalled_)},yn.prototype.orderByChild=function(t){if(k("Query.orderByChild",1,1,arguments.length),"$key"===t)throw new Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');if("$priority"===t)throw new Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');if("$value"===t)throw new Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');Ht("Query.orderByChild",1,t,!1),this.validateNoPreviousOrderByCall_("Query.orderByChild");var e=new Tt(t);if(e.isEmpty())throw new Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");var n=new en(e),r=this.queryParams_.orderBy(n);return yn.validateQueryEndpoints_(r),new yn(this.repo,this.path,r,!0)},yn.prototype.orderByKey=function(){k("Query.orderByKey",0,0,arguments.length),this.validateNoPreviousOrderByCall_("Query.orderByKey");var t=this.queryParams_.orderBy(fe);return yn.validateQueryEndpoints_(t),new yn(this.repo,this.path,t,!0)},yn.prototype.orderByPriority=function(){k("Query.orderByPriority",0,0,arguments.length),this.validateNoPreviousOrderByCall_("Query.orderByPriority");var t=this.queryParams_.orderBy(Se);return yn.validateQueryEndpoints_(t),new yn(this.repo,this.path,t,!0)},yn.prototype.orderByValue=function(){k("Query.orderByValue",0,0,arguments.length),this.validateNoPreviousOrderByCall_("Query.orderByValue");var t=this.queryParams_.orderBy(tn);return yn.validateQueryEndpoints_(t),new yn(this.repo,this.path,t,!0)},yn.prototype.startAt=function(t,e){void 0===t&&(t=null),k("Query.startAt",0,2,arguments.length),Wt("Query.startAt",1,t,this.path,!0),Vt("Query.startAt",2,e,!0);var n=this.queryParams_.startAt(t,e);if(yn.validateLimit_(n),yn.validateQueryEndpoints_(n),this.queryParams_.hasStart())throw new Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");return void 0===t&&(e=t=null),new yn(this.repo,this.path,n,this.orderByCalled_)},yn.prototype.endAt=function(t,e){void 0===t&&(t=null),k("Query.endAt",0,2,arguments.length),Wt("Query.endAt",1,t,this.path,!0),Vt("Query.endAt",2,e,!0);var n=this.queryParams_.endAt(t,e);if(yn.validateLimit_(n),yn.validateQueryEndpoints_(n),this.queryParams_.hasEnd())throw new Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");return new yn(this.repo,this.path,n,this.orderByCalled_)},yn.prototype.equalTo=function(t,e){if(k("Query.equalTo",1,2,arguments.length),Wt("Query.equalTo",1,t,this.path,!1),Vt("Query.equalTo",2,e,!0),this.queryParams_.hasStart())throw new Error("Query.equalTo: Starting point was already set (by another call to startAt or equalTo).");if(this.queryParams_.hasEnd())throw new Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");return this.startAt(t,e).endAt(t,e)},yn.prototype.toString=function(){return k("Query.toString",0,0,arguments.length),this.repo.toString()+this.path.toUrlEncodedString()},yn.prototype.toJSON=function(){return k("Query.toJSON",0,1,arguments.length),this.toString()},yn.prototype.queryObject=function(){return this.queryParams_.getQueryObject()},yn.prototype.queryIdentifier=function(){var t=this.queryObject(),e=gt(t);return"{}"===e?"default":e},yn.prototype.isEqual=function(t){if(k("Query.isEqual",1,1,arguments.length),!(t instanceof yn))throw new Error("Query.isEqual failed: First argument must be an instance of firebase.database.Query.");var e=this.repo===t.repo,n=this.path.equals(t.path),r=this.queryIdentifier()===t.queryIdentifier();return e&&n&&r},yn.getCancelAndContextArgs_=function(t,e,n){var r={cancel:null,context:null};if(e&&n)r.cancel=e,A(t,3,r.cancel,!0),r.context=n,L(t,4,r.context,!0);else if(e)if("object"==typeof e&&null!==e)r.context=e;else{if("function"!=typeof e)throw new Error(F(t,3,!0)+" must either be a cancel callback or a context object.");r.cancel=e}return r},Object.defineProperty(yn.prototype,"ref",{get:function(){return this.getRef()},enumerable:!0,configurable:!0}),yn);function yn(t,e,n,r){this.repo=t,this.path=e,this.queryParams_=n,this.orderByCalled_=r}var vn=(gn.prototype.find=function(t){if(null!=this.value)return this.value.getChild(t);if(!t.isEmpty()&&0<this.children.size){var e=t.getFront();return t=t.popFront(),this.children.has(e)?this.children.get(e).find(t):null}return null},gn.prototype.remember=function(t,e){if(t.isEmpty())this.value=e,this.children.clear();else if(null!==this.value)this.value=this.value.updateChild(t,e);else{var n=t.getFront();this.children.has(n)||this.children.set(n,new gn);var r=this.children.get(n);t=t.popFront(),r.remember(t,e)}},gn.prototype.forget=function(t){if(t.isEmpty())return this.value=null,this.children.clear(),!0;if(null!==this.value){if(this.value.isLeafNode())return!1;var e=this.value;this.value=null;var n=this;return e.forEachChild(Se,function(t,e){n.remember(new Tt(t),e)}),this.forget(t)}if(0<this.children.size){var r=t.getFront();return t=t.popFront(),!this.children.has(r)||this.children.get(r).forget(t)&&this.children.delete(r),0===this.children.size}return!0},gn.prototype.forEachTree=function(r,i){null!==this.value?i(r,this.value):this.forEachChild(function(t,e){var n=new Tt(r.toString()+"/"+t);e.forEachTree(n,i)})},gn.prototype.forEachChild=function(n){this.children.forEach(function(t,e){n(e,t)})},gn);function gn(){this.value=null,this.children=new Map}function mn(t,e){return t&&"object"==typeof t?(C(".sv"in t,"Unexpected leaf node or priority contents"),e[t[".sv"]]):t}var Cn,En,wn=function(t,r){var i,e=t.getPriority().val(),n=mn(e,r);if(t.isLeafNode()){var o=t,s=mn(o.getValue(),r);return s!==o.getValue()||n!==o.getPriority().val()?new Ee(s,$e(n)):t}var a=t;return n!==(i=a).getPriority().val()&&(i=i.updatePriority(new Ee(n))),a.forEachChild(Se,function(t,e){var n=wn(e,r);n!==e&&(i=i.updateImmediateChild(t,n))}),i};(En=Cn=Cn||{})[En.OVERWRITE=0]="OVERWRITE",En[En.MERGE=1]="MERGE",En[En.ACK_USER_WRITE=2]="ACK_USER_WRITE",En[En.LISTEN_COMPLETE=3]="LISTEN_COMPLETE";var bn=(Sn.User=new Sn(!0,!1,null,!1),Sn.Server=new Sn(!1,!0,null,!1),Sn.forServerTaggedQuery=function(t){return new Sn(!1,!0,t,!0)},Sn);function Sn(t,e,n,r){this.fromUser=t,this.fromServer=e,this.queryId=n,this.tagged=r,C(!r||e,"Tagged queries must be from server.")}var Tn,In=(Nn.prototype.operationForChild=function(t){if(this.path.isEmpty()){if(null!=this.affectedTree.value)return C(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;var e=this.affectedTree.subtree(new Tt(t));return new Nn(Tt.Empty,e,this.revert)}return C(this.path.getFront()===t,"operationForChild called for unrelated child."),new Nn(this.path.popFront(),this.affectedTree,this.revert)},Nn);function Nn(t,e,n){this.path=t,this.affectedTree=e,this.revert=n,this.type=Cn.ACK_USER_WRITE,this.source=bn.User}var Rn=(Pn.fromObject=function(t){var n=Pn.Empty;return mt(t,function(t,e){n=n.set(new Tt(t),e)}),n},Pn.prototype.isEmpty=function(){return null===this.value&&this.children.isEmpty()},Pn.prototype.findRootMostMatchingPathAndValue=function(t,e){if(null!=this.value&&e(this.value))return{path:Tt.Empty,value:this.value};if(t.isEmpty())return null;var n=t.getFront(),r=this.children.get(n);if(null===r)return null;var i=r.findRootMostMatchingPathAndValue(t.popFront(),e);return null==i?null:{path:new Tt(n).child(i.path),value:i.value}},Pn.prototype.findRootMostValueAndPath=function(t){return this.findRootMostMatchingPathAndValue(t,function(){return!0})},Pn.prototype.subtree=function(t){if(t.isEmpty())return this;var e=t.getFront(),n=this.children.get(e);return null!==n?n.subtree(t.popFront()):Pn.Empty},Pn.prototype.set=function(t,e){if(t.isEmpty())return new Pn(e,this.children);var n=t.getFront(),r=(this.children.get(n)||Pn.Empty).set(t.popFront(),e),i=this.children.insert(n,r);return new Pn(this.value,i)},Pn.prototype.remove=function(t){if(t.isEmpty())return this.children.isEmpty()?Pn.Empty:new Pn(null,this.children);var e=t.getFront(),n=this.children.get(e);if(n){var r=n.remove(t.popFront()),i=void 0;return i=r.isEmpty()?this.children.remove(e):this.children.insert(e,r),null===this.value&&i.isEmpty()?Pn.Empty:new Pn(this.value,i)}return this},Pn.prototype.get=function(t){if(t.isEmpty())return this.value;var e=t.getFront(),n=this.children.get(e);return n?n.get(t.popFront()):null},Pn.prototype.setTree=function(t,e){if(t.isEmpty())return e;var n=t.getFront(),r=(this.children.get(n)||Pn.Empty).setTree(t.popFront(),e),i=void 0;return i=r.isEmpty()?this.children.remove(n):this.children.insert(n,r),new Pn(this.value,i)},Pn.prototype.fold=function(t){return this.fold_(Tt.Empty,t)},Pn.prototype.fold_=function(n,r){var i={};return this.children.inorderTraversal(function(t,e){i[t]=e.fold_(n.child(t),r)}),r(n,this.value,i)},Pn.prototype.findOnPath=function(t,e){return this.findOnPath_(t,Tt.Empty,e)},Pn.prototype.findOnPath_=function(t,e,n){var r=!!this.value&&n(e,this.value);if(r)return r;if(t.isEmpty())return null;var i=t.getFront(),o=this.children.get(i);return o?o.findOnPath_(t.popFront(),e.child(i),n):null},Pn.prototype.foreachOnPath=function(t,e){return this.foreachOnPath_(t,Tt.Empty,e)},Pn.prototype.foreachOnPath_=function(t,e,n){if(t.isEmpty())return this;this.value&&n(e,this.value);var r=t.getFront(),i=this.children.get(r);return i?i.foreachOnPath_(t.popFront(),e.child(r),n):Pn.Empty},Pn.prototype.foreach=function(t){this.foreach_(Tt.Empty,t)},Pn.prototype.foreach_=function(n,r){this.children.inorderTraversal(function(t,e){e.foreach_(n.child(t),r)}),this.value&&r(n,this.value)},Pn.prototype.foreachChild=function(n){this.children.inorderTraversal(function(t,e){e.value&&n(t,e.value)})},Pn.Empty=new Pn(null),Pn);function Pn(t,e){void 0===e&&(e=Tn=Tn||new Oe(rt)),this.value=t,this.children=e}var Dn=(On.prototype.operationForChild=function(t){return this.path.isEmpty()?new On(this.source,Tt.Empty):new On(this.source,this.path.popFront())},On);function On(t,e){this.source=t,this.path=e,this.type=Cn.LISTEN_COMPLETE}var xn=(kn.prototype.operationForChild=function(t){return this.path.isEmpty()?new kn(this.source,Tt.Empty,this.snap.getImmediateChild(t)):new kn(this.source,this.path.popFront(),this.snap)},kn);function kn(t,e,n){this.source=t,this.path=e,this.snap=n,this.type=Cn.OVERWRITE}var Fn=(An.prototype.operationForChild=function(t){if(this.path.isEmpty()){var e=this.children.subtree(new Tt(t));return e.isEmpty()?null:e.value?new xn(this.source,Tt.Empty,e.value):new An(this.source,Tt.Empty,e)}return C(this.path.getFront()===t,"Can't get a merge for a child not on the path of the operation"),new An(this.source,this.path.popFront(),this.children)},An.prototype.toString=function(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"},An);function An(t,e,n){this.source=t,this.path=e,this.children=n,this.type=Cn.MERGE}var Ln=(Mn.prototype.isFullyInitialized=function(){return this.fullyInitialized_},Mn.prototype.isFiltered=function(){return this.filtered_},Mn.prototype.isCompleteForPath=function(t){if(t.isEmpty())return this.isFullyInitialized()&&!this.filtered_;var e=t.getFront();return this.isCompleteForChild(e)},Mn.prototype.isCompleteForChild=function(t){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(t)},Mn.prototype.getNode=function(){return this.node_},Mn);function Mn(t,e,n){this.node_=t,this.fullyInitialized_=e,this.filtered_=n}var Wn=(Qn.prototype.updateEventSnap=function(t,e,n){return new Qn(new Ln(t,e,n),this.serverCache_)},Qn.prototype.updateServerSnap=function(t,e,n){return new Qn(this.eventCache_,new Ln(t,e,n))},Qn.prototype.getEventCache=function(){return this.eventCache_},Qn.prototype.getCompleteEventSnap=function(){return this.eventCache_.isFullyInitialized()?this.eventCache_.getNode():null},Qn.prototype.getServerCache=function(){return this.serverCache_},Qn.prototype.getCompleteServerSnap=function(){return this.serverCache_.isFullyInitialized()?this.serverCache_.getNode():null},Qn.Empty=new Qn(new Ln(je.EMPTY_NODE,!1,!1),new Ln(je.EMPTY_NODE,!1,!1)),Qn);function Qn(t,e){this.eventCache_=t,this.serverCache_=e}var qn=(Un.valueChange=function(t){return new Un(Un.VALUE,t)},Un.childAddedChange=function(t,e){return new Un(Un.CHILD_ADDED,e,t)},Un.childRemovedChange=function(t,e){return new Un(Un.CHILD_REMOVED,e,t)},Un.childChangedChange=function(t,e,n){return new Un(Un.CHILD_CHANGED,e,t,n)},Un.childMovedChange=function(t,e){return new Un(Un.CHILD_MOVED,e,t)},Un.CHILD_ADDED="child_added",Un.CHILD_REMOVED="child_removed",Un.CHILD_CHANGED="child_changed",Un.CHILD_MOVED="child_moved",Un.VALUE="value",Un);function Un(t,e,n,r,i){this.type=t,this.snapshotNode=e,this.childName=n,this.oldSnap=r,this.prevName=i}var Vn=(Hn.prototype.updateChild=function(t,e,n,r,i,o){C(t.isIndexed(this.index_),"A node must be indexed if only a child is updated");var s=t.getImmediateChild(e);return s.getChild(r).equals(n.getChild(r))&&s.isEmpty()==n.isEmpty()?t:(null!=o&&(n.isEmpty()?t.hasChild(e)?o.trackChildChange(qn.childRemovedChange(e,s)):C(t.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):s.isEmpty()?o.trackChildChange(qn.childAddedChange(e,n)):o.trackChildChange(qn.childChangedChange(e,n,s))),t.isLeafNode()&&n.isEmpty()?t:t.updateImmediateChild(e,n).withIndex(this.index_))},Hn.prototype.updateFullNode=function(r,n,i){return null!=i&&(r.isLeafNode()||r.forEachChild(Se,function(t,e){n.hasChild(t)||i.trackChildChange(qn.childRemovedChange(t,e))}),n.isLeafNode()||n.forEachChild(Se,function(t,e){if(r.hasChild(t)){var n=r.getImmediateChild(t);n.equals(e)||i.trackChildChange(qn.childChangedChange(t,e,n))}else i.trackChildChange(qn.childAddedChange(t,e))})),n.withIndex(this.index_)},Hn.prototype.updatePriority=function(t,e){return t.isEmpty()?je.EMPTY_NODE:t.updatePriority(e)},Hn.prototype.filtersNodes=function(){return!1},Hn.prototype.getIndexedFilter=function(){return this},Hn.prototype.getIndex=function(){return this.index_},Hn);function Hn(t){this.index_=t}var Bn=(jn.prototype.trackChildChange=function(t){var e=t.type,n=t.childName;C(e==qn.CHILD_ADDED||e==qn.CHILD_CHANGED||e==qn.CHILD_REMOVED,"Only child changes supported for tracking"),C(".priority"!==n,"Only non-priority child changes can be tracked.");var r=this.changeMap.get(n);if(r){var i=r.type;if(e==qn.CHILD_ADDED&&i==qn.CHILD_REMOVED)this.changeMap.set(n,qn.childChangedChange(n,t.snapshotNode,r.snapshotNode));else if(e==qn.CHILD_REMOVED&&i==qn.CHILD_ADDED)this.changeMap.delete(n);else if(e==qn.CHILD_REMOVED&&i==qn.CHILD_CHANGED)this.changeMap.set(n,qn.childRemovedChange(n,r.oldSnap));else if(e==qn.CHILD_CHANGED&&i==qn.CHILD_ADDED)this.changeMap.set(n,qn.childAddedChange(n,t.snapshotNode));else{if(e!=qn.CHILD_CHANGED||i!=qn.CHILD_CHANGED)throw c("Illegal combination of changes: "+t+" occurred after "+r);this.changeMap.set(n,qn.childChangedChange(n,t.snapshotNode,r.oldSnap))}}else this.changeMap.set(n,t)},jn.prototype.getChanges=function(){return Array.from(this.changeMap.values())},jn);function jn(){this.changeMap=new Map}function Kn(){}var Yn=new(Kn.prototype.getCompleteChild=function(t){return null},Kn.prototype.getChildAfterChild=function(t,e,n){return null},Kn),zn=(Gn.prototype.getCompleteChild=function(t){var e=this.viewCache_.getEventCache();if(e.isCompleteForChild(t))return e.getNode().getImmediateChild(t);var n=null!=this.optCompleteServerCache_?new Ln(this.optCompleteServerCache_,!0,!1):this.viewCache_.getServerCache();return this.writes_.calcCompleteChild(t,n)},Gn.prototype.getChildAfterChild=function(t,e,n){var r=null!=this.optCompleteServerCache_?this.optCompleteServerCache_:this.viewCache_.getCompleteServerSnap(),i=this.writes_.calcIndexedSlice(r,e,1,n,t);return 0===i.length?null:i[0]},Gn);function Gn(t,e,n){void 0===n&&(n=null),this.writes_=t,this.viewCache_=e,this.optCompleteServerCache_=n}var Xn=function(t,e){this.viewCache=t,this.changes=e},$n=(Jn.prototype.assertIndexed=function(t){C(t.getEventCache().getNode().isIndexed(this.filter_.getIndex()),"Event snap not indexed"),C(t.getServerCache().getNode().isIndexed(this.filter_.getIndex()),"Server snap not indexed")},Jn.prototype.applyOperation=function(t,e,n,r){var i,o,s=new Bn;if(e.type===Cn.OVERWRITE){var a=e;i=a.source.fromUser?this.applyUserOverwrite_(t,a.path,a.snap,n,r,s):(C(a.source.fromServer,"Unknown source."),o=a.source.tagged||t.getServerCache().isFiltered()&&!a.path.isEmpty(),this.applyServerOverwrite_(t,a.path,a.snap,n,r,o,s))}else if(e.type===Cn.MERGE){var h=e;i=h.source.fromUser?this.applyUserMerge_(t,h.path,h.children,n,r,s):(C(h.source.fromServer,"Unknown source."),o=h.source.tagged||t.getServerCache().isFiltered(),this.applyServerMerge_(t,h.path,h.children,n,r,o,s))}else if(e.type===Cn.ACK_USER_WRITE){var l=e;i=l.revert?this.revertUserWrite_(t,l.path,n,r,s):this.ackUserWrite_(t,l.path,l.affectedTree,n,r,s)}else{if(e.type!==Cn.LISTEN_COMPLETE)throw c("Unknown operation type: "+e.type);i=this.listenComplete_(t,e.path,n,s)}var u=s.getChanges();return Jn.maybeAddValueEvent_(t,i,u),new Xn(i,u)},Jn.maybeAddValueEvent_=function(t,e,n){var r=e.getEventCache();if(r.isFullyInitialized()){var i=r.getNode().isLeafNode()||r.getNode().isEmpty(),o=t.getCompleteEventSnap();(0<n.length||!t.getEventCache().isFullyInitialized()||i&&!r.getNode().equals(o)||!r.getNode().getPriority().equals(o.getPriority()))&&n.push(qn.valueChange(e.getCompleteEventSnap()))}},Jn.prototype.generateEventCacheAfterServerEvent_=function(t,e,n,r,i){var o=t.getEventCache();if(null!=n.shadowingWrite(e))return t;var s=void 0,a=void 0;if(e.isEmpty())if(C(t.getServerCache().isFullyInitialized(),"If change path is empty, we must have complete server data"),t.getServerCache().isFiltered()){var h=t.getCompleteServerSnap(),l=h instanceof je?h:je.EMPTY_NODE,u=n.calcCompleteEventChildren(l);s=this.filter_.updateFullNode(t.getEventCache().getNode(),u,i)}else{var c=n.calcCompleteEventCache(t.getCompleteServerSnap());s=this.filter_.updateFullNode(t.getEventCache().getNode(),c,i)}else{var p=e.getFront();if(".priority"==p){C(1==e.getLength(),"Can't have a priority with additional path components");var d=o.getNode();a=t.getServerCache().getNode();var f=n.calcEventCacheAfterServerOverwrite(e,d,a);s=null!=f?this.filter_.updatePriority(d,f):o.getNode()}else{var _=e.popFront(),y=void 0;if(o.isCompleteForChild(p)){a=t.getServerCache().getNode();var v=n.calcEventCacheAfterServerOverwrite(e,o.getNode(),a);y=null!=v?o.getNode().getImmediateChild(p).updateChild(_,v):o.getNode().getImmediateChild(p)}else y=n.calcCompleteChild(p,t.getServerCache());s=null!=y?this.filter_.updateChild(o.getNode(),p,y,_,r,i):o.getNode()}}return t.updateEventSnap(s,o.isFullyInitialized()||e.isEmpty(),this.filter_.filtersNodes())},Jn.prototype.applyServerOverwrite_=function(t,e,n,r,i,o,s){var a,h=t.getServerCache(),l=o?this.filter_:this.filter_.getIndexedFilter();if(e.isEmpty())a=l.updateFullNode(h.getNode(),n,null);else if(l.filtersNodes()&&!h.isFiltered()){var u=h.getNode().updateChild(e,n);a=l.updateFullNode(h.getNode(),u,null)}else{var c=e.getFront();if(!h.isCompleteForPath(e)&&1<e.getLength())return t;var p=e.popFront(),d=h.getNode().getImmediateChild(c).updateChild(p,n);a=".priority"==c?l.updatePriority(h.getNode(),d):l.updateChild(h.getNode(),c,d,p,Yn,null)}var f=t.updateServerSnap(a,h.isFullyInitialized()||e.isEmpty(),l.filtersNodes()),_=new zn(r,f,i);return this.generateEventCacheAfterServerEvent_(f,e,r,_,s)},Jn.prototype.applyUserOverwrite_=function(t,e,n,r,i,o){var s,a,h=t.getEventCache(),l=new zn(r,t,i);if(e.isEmpty())a=this.filter_.updateFullNode(t.getEventCache().getNode(),n,o),s=t.updateEventSnap(a,!0,this.filter_.filtersNodes());else{var u=e.getFront();if(".priority"===u)a=this.filter_.updatePriority(t.getEventCache().getNode(),n),s=t.updateEventSnap(a,h.isFullyInitialized(),h.isFiltered());else{var c=e.popFront(),p=h.getNode().getImmediateChild(u),d=void 0;if(c.isEmpty())d=n;else{var f=l.getCompleteChild(u);d=null!=f?".priority"===c.getBack()&&f.getChild(c.parent()).isEmpty()?f:f.updateChild(c,n):je.EMPTY_NODE}if(p.equals(d))s=t;else{var _=this.filter_.updateChild(h.getNode(),u,d,c,l,o);s=t.updateEventSnap(_,h.isFullyInitialized(),this.filter_.filtersNodes())}}}return s},Jn.cacheHasChild_=function(t,e){return t.getEventCache().isCompleteForChild(e)},Jn.prototype.applyUserMerge_=function(r,i,t,o,s,a){var h=this,l=r;return t.foreach(function(t,e){var n=i.child(t);Jn.cacheHasChild_(r,n.getFront())&&(l=h.applyUserOverwrite_(l,n,e,o,s,a))}),t.foreach(function(t,e){var n=i.child(t);Jn.cacheHasChild_(r,n.getFront())||(l=h.applyUserOverwrite_(l,n,e,o,s,a))}),l},Jn.prototype.applyMerge_=function(n,t){return t.foreach(function(t,e){n=n.updateChild(t,e)}),n},Jn.prototype.applyServerMerge_=function(o,t,e,s,a,h,l){var u=this;if(o.getServerCache().getNode().isEmpty()&&!o.getServerCache().isFullyInitialized())return o;var n,c=o;n=t.isEmpty()?e:Rn.Empty.setTree(t,e);var p=o.getServerCache().getNode();return n.children.inorderTraversal(function(t,e){if(p.hasChild(t)){var n=o.getServerCache().getNode().getImmediateChild(t),r=u.applyMerge_(n,e);c=u.applyServerOverwrite_(c,new Tt(t),r,s,a,h,l)}}),n.children.inorderTraversal(function(t,e){var n=!o.getServerCache().isCompleteForChild(t)&&null==e.value;if(!p.hasChild(t)&&!n){var r=o.getServerCache().getNode().getImmediateChild(t),i=u.applyMerge_(r,e);c=u.applyServerOverwrite_(c,new Tt(t),i,s,a,h,l)}}),c},Jn.prototype.ackUserWrite_=function(t,r,e,n,i,o){if(null!=n.shadowingWrite(r))return t;var s=t.getServerCache().isFiltered(),a=t.getServerCache();if(null!=e.value){if(r.isEmpty()&&a.isFullyInitialized()||a.isCompleteForPath(r))return this.applyServerOverwrite_(t,r,a.getNode().getChild(r),n,i,s,o);if(r.isEmpty()){var h=Rn.Empty;return a.getNode().forEachChild(fe,function(t,e){h=h.set(new Tt(t),e)}),this.applyServerMerge_(t,r,h,n,i,s,o)}return t}var l=Rn.Empty;return e.foreach(function(t,e){var n=r.child(t);a.isCompleteForPath(n)&&(l=l.set(t,a.getNode().getChild(n)))}),this.applyServerMerge_(t,r,l,n,i,s,o)},Jn.prototype.listenComplete_=function(t,e,n,r){var i=t.getServerCache(),o=t.updateServerSnap(i.getNode(),i.isFullyInitialized()||e.isEmpty(),i.isFiltered());return this.generateEventCacheAfterServerEvent_(o,e,n,Yn,r)},Jn.prototype.revertUserWrite_=function(t,e,n,r,i){var o;if(null!=n.shadowingWrite(e))return t;var s=new zn(n,t,r),a=t.getEventCache().getNode(),h=void 0;if(e.isEmpty()||".priority"===e.getFront()){var l=void 0;if(t.getServerCache().isFullyInitialized())l=n.calcCompleteEventCache(t.getCompleteServerSnap());else{var u=t.getServerCache().getNode();C(u instanceof je,"serverChildren would be complete if leaf node"),l=n.calcCompleteEventChildren(u)}l=l,h=this.filter_.updateFullNode(a,l,i)}else{var c=e.getFront(),p=n.calcCompleteChild(c,t.getServerCache());null==p&&t.getServerCache().isCompleteForChild(c)&&(p=a.getImmediateChild(c)),(h=null!=p?this.filter_.updateChild(a,c,p,e.popFront(),s,i):t.getEventCache().getNode().hasChild(c)?this.filter_.updateChild(a,c,je.EMPTY_NODE,e.popFront(),s,i):a).isEmpty()&&t.getServerCache().isFullyInitialized()&&(o=n.calcCompleteEventCache(t.getCompleteServerSnap())).isLeafNode()&&(h=this.filter_.updateFullNode(h,o,i))}return o=t.getServerCache().isFullyInitialized()||null!=n.shadowingWrite(Tt.Empty),t.updateEventSnap(h,o,this.filter_.filtersNodes())},Jn);function Jn(t){this.filter_=t}var Zn=(tr.prototype.generateEventsForChanges=function(t,e,n){var r=this,i=[],o=[];return t.forEach(function(t){t.type===qn.CHILD_CHANGED&&r.index_.indexedValueChanged(t.oldSnap,t.snapshotNode)&&o.push(qn.childMovedChange(t.childName,t.snapshotNode))}),this.generateEventsForType_(i,qn.CHILD_REMOVED,t,n,e),this.generateEventsForType_(i,qn.CHILD_ADDED,t,n,e),this.generateEventsForType_(i,qn.CHILD_MOVED,o,n,e),this.generateEventsForType_(i,qn.CHILD_CHANGED,t,n,e),this.generateEventsForType_(i,qn.VALUE,t,n,e),i},tr.prototype.generateEventsForType_=function(r,e,t,i,o){var s=this,n=t.filter(function(t){return t.type===e});n.sort(this.compareChanges_.bind(this)),n.forEach(function(e){var n=s.materializeSingleChange_(e,o);i.forEach(function(t){t.respondsTo(e.type)&&r.push(t.createEvent(n,s.query_))})})},tr.prototype.materializeSingleChange_=function(t,e){return"value"===t.type||"child_removed"===t.type||(t.prevName=e.getPredecessorChildName(t.childName,t.snapshotNode,this.index_)),t},tr.prototype.compareChanges_=function(t,e){if(null==t.childName||null==e.childName)throw c("Should only compare child_ events.");var n=new oe(t.childName,t.snapshotNode),r=new oe(e.childName,e.snapshotNode);return this.index_.compare(n,r)},tr);function tr(t){this.query_=t,this.index_=this.query_.getQueryParams().getIndex()}var er,nr=(rr.prototype.getQuery=function(){return this.query_},rr.prototype.getServerCache=function(){return this.viewCache_.getServerCache().getNode()},rr.prototype.getCompleteServerCache=function(t){var e=this.viewCache_.getCompleteServerSnap();return e&&(this.query_.getQueryParams().loadsAllData()||!t.isEmpty()&&!e.getImmediateChild(t.getFront()).isEmpty())?e.getChild(t):null},rr.prototype.isEmpty=function(){return 0===this.eventRegistrations_.length},rr.prototype.addEventRegistration=function(t){this.eventRegistrations_.push(t)},rr.prototype.removeEventRegistration=function(t,n){var r=[];if(n){C(null==t,"A cancel should cancel all event registrations.");var i=this.query_.path;this.eventRegistrations_.forEach(function(t){n=n;var e=t.createCancelEvent(n,i);e&&r.push(e)})}if(t){for(var e=[],o=0;o<this.eventRegistrations_.length;++o){var s=this.eventRegistrations_[o];if(s.matches(t)){if(t.hasAnyCallback()){e=e.concat(this.eventRegistrations_.slice(o+1));break}}else e.push(s)}this.eventRegistrations_=e}else this.eventRegistrations_=[];return r},rr.prototype.applyOperation=function(t,e,n){t.type===Cn.MERGE&&null!==t.source.queryId&&(C(this.viewCache_.getCompleteServerSnap(),"We should always have a full cache before handling merges"),C(this.viewCache_.getCompleteEventSnap(),"Missing event cache, even though we have a server cache"));var r=this.viewCache_,i=this.processor_.applyOperation(r,t,e,n);return this.processor_.assertIndexed(i.viewCache),C(i.viewCache.getServerCache().isFullyInitialized()||!r.getServerCache().isFullyInitialized(),"Once a server snap is complete, it should never go back"),this.viewCache_=i.viewCache,this.generateEventsForChanges_(i.changes,i.viewCache.getEventCache().getNode(),null)},rr.prototype.getInitialEvents=function(t){var e=this.viewCache_.getEventCache(),n=[];return e.getNode().isLeafNode()||e.getNode().forEachChild(Se,function(t,e){n.push(qn.childAddedChange(t,e))}),e.isFullyInitialized()&&n.push(qn.valueChange(e.getNode())),this.generateEventsForChanges_(n,e.getNode(),t)},rr.prototype.generateEventsForChanges_=function(t,e,n){var r=n?[n]:this.eventRegistrations_;return this.eventGenerator_.generateEventsForChanges(t,e,r)},rr);function rr(t,e){this.query_=t,this.eventRegistrations_=[];var n=this.query_.getQueryParams(),r=new Vn(n.getIndex()),i=n.getNodeFilter();this.processor_=new $n(i);var o=e.getServerCache(),s=e.getEventCache(),a=r.updateFullNode(je.EMPTY_NODE,o.getNode(),null),h=i.updateFullNode(je.EMPTY_NODE,s.getNode(),null),l=new Ln(a,o.isFullyInitialized(),r.filtersNodes()),u=new Ln(h,s.isFullyInitialized(),i.filtersNodes());this.viewCache_=new Wn(u,l),this.eventGenerator_=new Zn(this.query_)}var ir=(Object.defineProperty(or,"__referenceConstructor",{get:function(){return C(er,"Reference.ts has not been loaded"),er},set:function(t){C(!er,"__referenceConstructor has already been defined"),er=t},enumerable:!0,configurable:!0}),or.prototype.isEmpty=function(){return 0===this.views.size},or.prototype.applyOperation=function(t,e,n){var r,i,o=t.source.queryId;if(null!==o){var s=this.views.get(o);return C(null!=s,"SyncTree gave us an op for an invalid query."),s.applyOperation(t,e,n)}var a=[];try{for(var h=f(this.views.values()),l=h.next();!l.done;l=h.next())s=l.value,a=a.concat(s.applyOperation(t,e,n))}catch(t){r={error:t}}finally{try{l&&!l.done&&(i=h.return)&&i.call(h)}finally{if(r)throw r.error}}return a},or.prototype.addEventRegistration=function(t,e,n,r,i){var o=t.queryIdentifier(),s=this.views.get(o);if(!s){var a=n.calcCompleteEventCache(i?r:null),h=!1;h=!!a||(a=r instanceof je?n.calcCompleteEventChildren(r):je.EMPTY_NODE,!1);var l=new Wn(new Ln(a,h,!1),new Ln(r,i,!1));s=new nr(t,l),this.views.set(o,s)}return s.addEventRegistration(e),s.getInitialEvents(e)},or.prototype.removeEventRegistration=function(t,e,n){var r,i,o=t.queryIdentifier(),s=[],a=[],h=this.hasCompleteView();if("default"===o)try{for(var l=f(this.views.entries()),u=l.next();!u.done;u=l.next()){var c=_(u.value,2),p=c[0],d=c[1];a=a.concat(d.removeEventRegistration(e,n)),d.isEmpty()&&(this.views.delete(p),d.getQuery().getQueryParams().loadsAllData()||s.push(d.getQuery()))}}catch(t){r={error:t}}finally{try{u&&!u.done&&(i=l.return)&&i.call(l)}finally{if(r)throw r.error}}else(d=this.views.get(o))&&(a=a.concat(d.removeEventRegistration(e,n)),d.isEmpty()&&(this.views.delete(o),d.getQuery().getQueryParams().loadsAllData()||s.push(d.getQuery())));return h&&!this.hasCompleteView()&&s.push(new or.__referenceConstructor(t.repo,t.path)),{removed:s,events:a}},or.prototype.getQueryViews=function(){var e,t,n=[];try{for(var r=f(this.views.values()),i=r.next();!i.done;i=r.next()){var o=i.value;o.getQuery().getQueryParams().loadsAllData()||n.push(o)}}catch(t){e={error:t}}finally{try{i&&!i.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}return n},or.prototype.getCompleteServerCache=function(t){var e,n,r=null;try{for(var i=f(this.views.values()),o=i.next();!o.done;o=i.next()){var s=o.value;r=r||s.getCompleteServerCache(t)}}catch(t){e={error:t}}finally{try{o&&!o.done&&(n=i.return)&&n.call(i)}finally{if(e)throw e.error}}return r},or.prototype.viewForQuery=function(t){if(t.getQueryParams().loadsAllData())return this.getCompleteView();var e=t.queryIdentifier();return this.views.get(e)},or.prototype.viewExistsForQuery=function(t){return null!=this.viewForQuery(t)},or.prototype.hasCompleteView=function(){return null!=this.getCompleteView()},or.prototype.getCompleteView=function(){var e,t;try{for(var n=f(this.views.values()),r=n.next();!r.done;r=n.next()){var i=r.value;if(i.getQuery().getQueryParams().loadsAllData())return i}}catch(t){e={error:t}}finally{try{r&&!r.done&&(t=n.return)&&t.call(n)}finally{if(e)throw e.error}}return null},or);function or(){this.views=new Map}var sr=(ar.prototype.addWrite=function(t,e){if(t.isEmpty())return new ar(new Rn(e));var n=this.writeTree_.findRootMostValueAndPath(t);if(null!=n){var r=n.path,i=n.value,o=Tt.relativePath(r,t);return i=i.updateChild(o,e),new ar(this.writeTree_.set(r,i))}var s=new Rn(e);return new ar(this.writeTree_.setTree(t,s))},ar.prototype.addWrites=function(n,t){var r=this;return mt(t,function(t,e){r=r.addWrite(n.child(t),e)}),r},ar.prototype.removeWrite=function(t){return t.isEmpty()?ar.Empty:new ar(this.writeTree_.setTree(t,Rn.Empty))},ar.prototype.hasCompleteWrite=function(t){return null!=this.getCompleteNode(t)},ar.prototype.getCompleteNode=function(t){var e=this.writeTree_.findRootMostValueAndPath(t);return null!=e?this.writeTree_.get(e.path).getChild(Tt.relativePath(e.path,t)):null},ar.prototype.getCompleteChildren=function(){var n=[],t=this.writeTree_.value;return null!=t?t.isLeafNode()||t.forEachChild(Se,function(t,e){n.push(new oe(t,e))}):this.writeTree_.children.inorderTraversal(function(t,e){null!=e.value&&n.push(new oe(t,e.value))}),n},ar.prototype.childCompoundWrite=function(t){if(t.isEmpty())return this;var e=this.getCompleteNode(t);return new ar(null!=e?new Rn(e):this.writeTree_.subtree(t))},ar.prototype.isEmpty=function(){return this.writeTree_.isEmpty()},ar.prototype.apply=function(t){return function n(r,t,i){if(null!=t.value)return i.updateChild(r,t.value);var o=null;return t.children.inorderTraversal(function(t,e){".priority"===t?(C(null!==e.value,"Priority writes must always be leaf nodes"),o=e.value):i=n(r.child(t),e,i)}),i.getChild(r).isEmpty()||null===o||(i=i.updateChild(r.child(".priority"),o)),i}(Tt.Empty,this.writeTree_,t)},ar.Empty=new ar(new Rn(null)),ar);function ar(t){this.writeTree_=t}var hr=(lr.prototype.childWrites=function(t){return new ur(t,this)},lr.prototype.addOverwrite=function(t,e,n,r){C(n>this.lastWriteId_,"Stacking an older write on top of newer ones"),void 0===r&&(r=!0),this.allWrites_.push({path:t,snap:e,writeId:n,visible:r}),r&&(this.visibleWrites_=this.visibleWrites_.addWrite(t,e)),this.lastWriteId_=n},lr.prototype.addMerge=function(t,e,n){C(n>this.lastWriteId_,"Stacking an older merge on top of newer ones"),this.allWrites_.push({path:t,children:e,writeId:n,visible:!0}),this.visibleWrites_=this.visibleWrites_.addWrites(t,e),this.lastWriteId_=n},lr.prototype.getWrite=function(t){for(var e=0;e<this.allWrites_.length;e++){var n=this.allWrites_[e];if(n.writeId===t)return n}return null},lr.prototype.removeWrite=function(e){var n=this,t=this.allWrites_.findIndex(function(t){return t.writeId===e});C(0<=t,"removeWrite called with nonexistent writeId.");var r=this.allWrites_[t];this.allWrites_.splice(t,1);for(var i=r.visible,o=!1,s=this.allWrites_.length-1;i&&0<=s;){var a=this.allWrites_[s];a.visible&&(t<=s&&this.recordContainsPath_(a,r.path)?i=!1:r.path.contains(a.path)&&(o=!0)),s--}return!!i&&(o?this.resetTree_():r.snap?this.visibleWrites_=this.visibleWrites_.removeWrite(r.path):mt(r.children,function(t){n.visibleWrites_=n.visibleWrites_.removeWrite(r.path.child(t))}),!0)},lr.prototype.getCompleteWriteData=function(t){return this.visibleWrites_.getCompleteNode(t)},lr.prototype.calcCompleteEventCache=function(e,t,n,r){if(n||r){var i=this.visibleWrites_.childCompoundWrite(e);if(!r&&i.isEmpty())return t;if(r||null!=t||i.hasCompleteWrite(Tt.Empty)){var o=lr.layerTree_(this.allWrites_,function(t){return(t.visible||r)&&(!n||!~n.indexOf(t.writeId))&&(t.path.contains(e)||e.contains(t.path))},e);return h=t||je.EMPTY_NODE,o.apply(h)}return null}var s=this.visibleWrites_.getCompleteNode(e);if(null!=s)return s;var a=this.visibleWrites_.childCompoundWrite(e);if(a.isEmpty())return t;if(null!=t||a.hasCompleteWrite(Tt.Empty)){var h=t||je.EMPTY_NODE;return a.apply(h)}return null},lr.prototype.calcCompleteEventChildren=function(t,e){var r=je.EMPTY_NODE,n=this.visibleWrites_.getCompleteNode(t);if(n)return n.isLeafNode()||n.forEachChild(Se,function(t,e){r=r.updateImmediateChild(t,e)}),r;if(e){var i=this.visibleWrites_.childCompoundWrite(t);return e.forEachChild(Se,function(t,e){var n=i.childCompoundWrite(new Tt(t)).apply(e);r=r.updateImmediateChild(t,n)}),i.getCompleteChildren().forEach(function(t){r=r.updateImmediateChild(t.name,t.node)}),r}return this.visibleWrites_.childCompoundWrite(t).getCompleteChildren().forEach(function(t){r=r.updateImmediateChild(t.name,t.node)}),r},lr.prototype.calcEventCacheAfterServerOverwrite=function(t,e,n,r){C(n||r,"Either existingEventSnap or existingServerSnap must exist");var i=t.child(e);if(this.visibleWrites_.hasCompleteWrite(i))return null;var o=this.visibleWrites_.childCompoundWrite(i);return o.isEmpty()?r.getChild(e):o.apply(r.getChild(e))},lr.prototype.calcCompleteChild=function(t,e,n){var r=t.child(e),i=this.visibleWrites_.getCompleteNode(r);return null!=i?i:n.isCompleteForChild(e)?this.visibleWrites_.childCompoundWrite(r).apply(n.getNode().getImmediateChild(e)):null},lr.prototype.shadowingWrite=function(t){return this.visibleWrites_.getCompleteNode(t)},lr.prototype.calcIndexedSlice=function(t,e,n,r,i,o){var s,a=this.visibleWrites_.childCompoundWrite(t),h=a.getCompleteNode(Tt.Empty);if(null!=h)s=h;else{if(null==e)return[];s=a.apply(e)}if((s=s.withIndex(o)).isEmpty()||s.isLeafNode())return[];for(var l=[],u=o.getCompare(),c=i?s.getReverseIteratorFrom(n,o):s.getIteratorFrom(n,o),p=c.getNext();p&&l.length<r;)0!==u(p,n)&&l.push(p),p=c.getNext();return l},lr.prototype.recordContainsPath_=function(t,e){if(t.snap)return t.path.contains(e);for(var n in t.children)if(t.children.hasOwnProperty(n)&&t.path.child(n).contains(e))return!0;return!1},lr.prototype.resetTree_=function(){this.visibleWrites_=lr.layerTree_(this.allWrites_,lr.DefaultFilter_,Tt.Empty),0<this.allWrites_.length?this.lastWriteId_=this.allWrites_[this.allWrites_.length-1].writeId:this.lastWriteId_=-1},lr.DefaultFilter_=function(t){return t.visible},lr.layerTree_=function(t,e,n){for(var r=sr.Empty,i=0;i<t.length;++i){var o=t[i];if(e(o)){var s=o.path,a=void 0;if(o.snap)n.contains(s)?(a=Tt.relativePath(n,s),r=r.addWrite(a,o.snap)):s.contains(n)&&(a=Tt.relativePath(s,n),r=r.addWrite(Tt.Empty,o.snap.getChild(a)));else{if(!o.children)throw c("WriteRecord should have .snap or .children");if(n.contains(s))a=Tt.relativePath(n,s),r=r.addWrites(a,o.children);else if(s.contains(n))if((a=Tt.relativePath(s,n)).isEmpty())r=r.addWrites(Tt.Empty,o.children);else{var h=R(o.children,a.getFront());if(h){var l=h.getChild(a.popFront());r=r.addWrite(Tt.Empty,l)}}}}}return r},lr);function lr(){this.visibleWrites_=sr.Empty,this.allWrites_=[],this.lastWriteId_=-1}var ur=(cr.prototype.calcCompleteEventCache=function(t,e,n){return this.writeTree_.calcCompleteEventCache(this.treePath_,t,e,n)},cr.prototype.calcCompleteEventChildren=function(t){return this.writeTree_.calcCompleteEventChildren(this.treePath_,t)},cr.prototype.calcEventCacheAfterServerOverwrite=function(t,e,n){return this.writeTree_.calcEventCacheAfterServerOverwrite(this.treePath_,t,e,n)},cr.prototype.shadowingWrite=function(t){return this.writeTree_.shadowingWrite(this.treePath_.child(t))},cr.prototype.calcIndexedSlice=function(t,e,n,r,i){return this.writeTree_.calcIndexedSlice(this.treePath_,t,e,n,r,i)},cr.prototype.calcCompleteChild=function(t,e){return this.writeTree_.calcCompleteChild(this.treePath_,t,e)},cr.prototype.child=function(t){return new cr(this.treePath_.child(t),this.writeTree_)},cr);function cr(t,e){this.treePath_=t,this.writeTree_=e}var pr=(dr.prototype.applyUserOverwrite=function(t,e,n,r){return this.pendingWriteTree_.addOverwrite(t,e,n,r),r?this.applyOperationToSyncPoints_(new xn(bn.User,t,e)):[]},dr.prototype.applyUserMerge=function(t,e,n){this.pendingWriteTree_.addMerge(t,e,n);var r=Rn.fromObject(e);return this.applyOperationToSyncPoints_(new Fn(bn.User,t,r))},dr.prototype.ackUserWrite=function(t,e){void 0===e&&(e=!1);var n=this.pendingWriteTree_.getWrite(t);if(this.pendingWriteTree_.removeWrite(t)){var r=Rn.Empty;return null!=n.snap?r=r.set(Tt.Empty,!0):mt(n.children,function(t,e){r=r.set(new Tt(t),e)}),this.applyOperationToSyncPoints_(new In(n.path,r,e))}return[]},dr.prototype.applyServerOverwrite=function(t,e){return this.applyOperationToSyncPoints_(new xn(bn.Server,t,e))},dr.prototype.applyServerMerge=function(t,e){var n=Rn.fromObject(e);return this.applyOperationToSyncPoints_(new Fn(bn.Server,t,n))},dr.prototype.applyListenComplete=function(t){return this.applyOperationToSyncPoints_(new Dn(bn.Server,t))},dr.prototype.applyTaggedQueryOverwrite=function(t,e,n){var r=this.queryKeyForTag_(n);if(null==r)return[];var i=dr.parseQueryKey_(r),o=i.path,s=i.queryId,a=Tt.relativePath(o,t),h=new xn(bn.forServerTaggedQuery(s),a,e);return this.applyTaggedOperation_(o,h)},dr.prototype.applyTaggedQueryMerge=function(t,e,n){var r=this.queryKeyForTag_(n);if(r){var i=dr.parseQueryKey_(r),o=i.path,s=i.queryId,a=Tt.relativePath(o,t),h=Rn.fromObject(e),l=new Fn(bn.forServerTaggedQuery(s),a,h);return this.applyTaggedOperation_(o,l)}return[]},dr.prototype.applyTaggedListenComplete=function(t,e){var n=this.queryKeyForTag_(e);if(n){var r=dr.parseQueryKey_(n),i=r.path,o=r.queryId,s=Tt.relativePath(i,t),a=new Dn(bn.forServerTaggedQuery(o),s);return this.applyTaggedOperation_(i,a)}return[]},dr.prototype.addEventRegistration=function(t,e){var r=t.path,i=null,o=!1;this.syncPointTree_.foreachOnPath(r,function(t,e){var n=Tt.relativePath(t,r);i=i||e.getCompleteServerCache(n),o=o||e.hasCompleteView()});var n,s=this.syncPointTree_.get(r);s?(o=o||s.hasCompleteView(),i=i||s.getCompleteServerCache(Tt.Empty)):(s=new ir,this.syncPointTree_=this.syncPointTree_.set(r,s)),null!=i?n=!0:(n=!1,i=je.EMPTY_NODE,this.syncPointTree_.subtree(r).foreachChild(function(t,e){var n=e.getCompleteServerCache(Tt.Empty);n&&(i=i.updateImmediateChild(t,n))}));var a=s.viewExistsForQuery(t);if(!a&&!t.getQueryParams().loadsAllData()){var h=dr.makeQueryKey_(t);C(!this.queryToTagMap.has(h),"View does not exist, but we have a tag");var l=dr.getNextQueryTag_();this.queryToTagMap.set(h,l),this.tagToQueryMap.set(l,h)}var u=this.pendingWriteTree_.childWrites(r),c=s.addEventRegistration(t,e,u,i,n);if(!a&&!o){var p=s.viewForQuery(t);c=c.concat(this.setupListener_(t,p))}return c},dr.prototype.removeEventRegistration=function(t,e,n){var r=this,i=t.path,o=this.syncPointTree_.get(i),s=[];if(o&&("default"===t.queryIdentifier()||o.viewExistsForQuery(t))){var a=o.removeEventRegistration(t,e,n);o.isEmpty()&&(this.syncPointTree_=this.syncPointTree_.remove(i));var h=a.removed;s=a.events;var l=-1!==h.findIndex(function(t){return t.getQueryParams().loadsAllData()}),u=this.syncPointTree_.findOnPath(i,function(t,e){return e.hasCompleteView()});if(l&&!u){var c=this.syncPointTree_.subtree(i);if(!c.isEmpty())for(var p=this.collectDistinctViewsForSubTree_(c),d=0;d<p.length;++d){var f=p[d],_=f.getQuery(),y=this.createListenerForView_(f);this.listenProvider_.startListening(dr.queryForListening_(_),this.tagForQuery_(_),y.hashFn,y.onComplete)}}!u&&0<h.length&&!n&&(l?this.listenProvider_.stopListening(dr.queryForListening_(t),null):h.forEach(function(t){var e=r.queryToTagMap.get(dr.makeQueryKey_(t));r.listenProvider_.stopListening(dr.queryForListening_(t),e)})),this.removeTags_(h)}return s},dr.prototype.calcCompleteEventCache=function(i,t){var e=this.pendingWriteTree_,n=this.syncPointTree_.findOnPath(i,function(t,e){var n=Tt.relativePath(t,i),r=e.getCompleteServerCache(n);if(r)return r});return e.calcCompleteEventCache(i,n,t,!0)},dr.prototype.collectDistinctViewsForSubTree_=function(t){return t.fold(function(t,e,n){if(e&&e.hasCompleteView())return[e.getCompleteView()];var r=[];return e&&(r=e.getQueryViews()),mt(n,function(t,e){r=r.concat(e)}),r})},dr.prototype.removeTags_=function(t){for(var e=0;e<t.length;++e){var n=t[e];if(!n.getQueryParams().loadsAllData()){var r=dr.makeQueryKey_(n),i=this.queryToTagMap.get(r);this.queryToTagMap.delete(r),this.tagToQueryMap.delete(i)}}},dr.queryForListening_=function(t){return t.getQueryParams().loadsAllData()&&!t.getQueryParams().isDefault()?t.getRef():t},dr.prototype.setupListener_=function(t,e){var n=t.path,r=this.tagForQuery_(t),i=this.createListenerForView_(e),o=this.listenProvider_.startListening(dr.queryForListening_(t),r,i.hashFn,i.onComplete),s=this.syncPointTree_.subtree(n);if(r)C(!s.value.hasCompleteView(),"If we're adding a query, it shouldn't be shadowed");else for(var a=s.fold(function(t,e,n){if(!t.isEmpty()&&e&&e.hasCompleteView())return[e.getCompleteView().getQuery()];var r=[];return e&&(r=r.concat(e.getQueryViews().map(function(t){return t.getQuery()}))),mt(n,function(t,e){r=r.concat(e)}),r}),h=0;h<a.length;++h){var l=a[h];this.listenProvider_.stopListening(dr.queryForListening_(l),this.tagForQuery_(l))}return o},dr.prototype.createListenerForView_=function(t){var n=this,r=t.getQuery(),i=this.tagForQuery_(r);return{hashFn:function(){return(t.getServerCache()||je.EMPTY_NODE).hash()},onComplete:function(t){if("ok"===t)return i?n.applyTaggedListenComplete(r.path,i):n.applyListenComplete(r.path);var e=function(t,e){var n="Unknown Error";"too_big"===t?n="The data requested exceeds the maximum size that can be accessed with a single request.":"permission_denied"==t?n="Client doesn't have permission to access the desired data.":"unavailable"==t&&(n="The service is unavailable");var r=new Error(t+" at "+e.path.toString()+": "+n);return r.code=t.toUpperCase(),r}(t,r);return n.removeEventRegistration(r,null,e)}}},dr.makeQueryKey_=function(t){return t.path.toString()+"$"+t.queryIdentifier()},dr.parseQueryKey_=function(t){var e=t.indexOf("$");return C(-1!==e&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new Tt(t.substr(0,e))}},dr.prototype.queryKeyForTag_=function(t){return this.tagToQueryMap.get(t)},dr.prototype.tagForQuery_=function(t){var e=dr.makeQueryKey_(t);return this.queryToTagMap.get(e)},dr.getNextQueryTag_=function(){return dr.nextQueryTag_++},dr.prototype.applyTaggedOperation_=function(t,e){var n=this.syncPointTree_.get(t);C(n,"Missing sync point for query tag that we're tracking");var r=this.pendingWriteTree_.childWrites(t);return n.applyOperation(e,r,null)},dr.prototype.applyOperationToSyncPoints_=function(t){return this.applyOperationHelper_(t,this.syncPointTree_,null,this.pendingWriteTree_.childWrites(Tt.Empty))},dr.prototype.applyOperationHelper_=function(t,e,n,r){if(t.path.isEmpty())return this.applyOperationDescendantsHelper_(t,e,n,r);var i=e.get(Tt.Empty);null==n&&null!=i&&(n=i.getCompleteServerCache(Tt.Empty));var o=[],s=t.path.getFront(),a=t.operationForChild(s),h=e.children.get(s);if(h&&a){var l=n?n.getImmediateChild(s):null,u=r.child(s);o=o.concat(this.applyOperationHelper_(a,h,l,u))}return i&&(o=o.concat(i.applyOperation(t,r,n))),o},dr.prototype.applyOperationDescendantsHelper_=function(o,t,s,a){var h=this,e=t.get(Tt.Empty);null==s&&null!=e&&(s=e.getCompleteServerCache(Tt.Empty));var l=[];return t.children.inorderTraversal(function(t,e){var n=s?s.getImmediateChild(t):null,r=a.child(t),i=o.operationForChild(t);i&&(l=l.concat(h.applyOperationDescendantsHelper_(i,e,n,r)))}),e&&(l=l.concat(e.applyOperation(o,a,s))),l},dr.nextQueryTag_=1,dr);function dr(t){this.listenProvider_=t,this.syncPointTree_=Rn.Empty,this.pendingWriteTree_=new hr,this.tagToQueryMap=new Map,this.queryToTagMap=new Map}var fr=(_r.prototype.getNode=function(t){return this.rootNode_.getChild(t)},_r.prototype.updateSnapshot=function(t,e){this.rootNode_=this.rootNode_.updateChild(t,e)},_r);function _r(){this.rootNode_=je.EMPTY_NODE}var yr=(vr.prototype.getToken=function(t){return this.app_.INTERNAL.getToken(t).then(null,function(t){return t&&"auth/token-not-initialized"===t.code?($("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)})},vr.prototype.addTokenChangeListener=function(t){this.app_.INTERNAL.addAuthTokenListener(t)},vr.prototype.removeTokenChangeListener=function(t){this.app_.INTERNAL.removeAuthTokenListener(t)},vr.prototype.notifyForInvalidToken=function(){var t='Provided authentication credentials for the app named "'+this.app_.name+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.app_.options?t+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.app_.options?t+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':t+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',et(t)},vr);function vr(t){this.app_=t}var gr=function(t){this.accessToken=t},mr=(Cr.prototype.getToken=function(t){return Promise.resolve(new gr("owner"))},Cr.prototype.addTokenChangeListener=function(t){},Cr.prototype.removeTokenChangeListener=function(t){},Cr.prototype.notifyForInvalidToken=function(){et('Database emulator unexpectedly rejected fake "owner" credentials.')},Cr);function Cr(t){this.app_=t}var Er=(wr.prototype.incrementCounter=function(t,e){void 0===e&&(e=1),N(this.counters_,t)||(this.counters_[t]=0),this.counters_[t]+=e},wr.prototype.get=function(){return n(this.counters_)},wr);function wr(){this.counters_={}}var br=(Sr.getCollection=function(t){var e=t.toString();return this.collections_[e]||(this.collections_[e]=new Er),this.collections_[e]},Sr.getOrCreateReporter=function(t,e){var n=t.toString();return this.reporters_[n]||(this.reporters_[n]=e()),this.reporters_[n]},Sr.collections_={},Sr.reporters_={},Sr);function Sr(){}var Tr=(Ir.prototype.get=function(){var t=this.collection_.get(),n=u({},t);return this.last_&&mt(this.last_,function(t,e){n[t]=n[t]-e}),this.last_=t,n},Ir);function Ir(t){this.collection_=t,this.last_=null}var Nr=(Rr.prototype.includeStat=function(t){this.statsToReport_[t]=!0},Rr.prototype.reportStats_=function(){var n=this,t=this.statsListener_.get(),r={},i=!1;mt(t,function(t,e){0<e&&N(n.statsToReport_,t)&&(r[t]=e,i=!0)}),i&&this.server_.reportStats(r),wt(this.reportStats_.bind(this),Math.floor(2*Math.random()*3e5))},Rr);function Rr(t,e){this.server_=e,this.statsToReport_={},this.statsListener_=new Tr(t);var n=1e4+2e4*Math.random();wt(this.reportStats_.bind(this),Math.floor(n))}var Pr=(Dr.prototype.queueEvents=function(t){for(var e=null,n=0;n<t.length;n++){var r=t[n],i=r.getPath();null===e||i.equals(e.getPath())||(this.eventLists_.push(e),e=null),null===e&&(e=new Or(i)),e.add(r)}e&&this.eventLists_.push(e)},Dr.prototype.raiseEventsAtPath=function(e,t){this.queueEvents(t),this.raiseQueuedEventsMatchingPredicate_(function(t){return t.equals(e)})},Dr.prototype.raiseEventsForChangedPath=function(e,t){this.queueEvents(t),this.raiseQueuedEventsMatchingPredicate_(function(t){return t.contains(e)||e.contains(t)})},Dr.prototype.raiseQueuedEventsMatchingPredicate_=function(t){this.recursionDepth_++;for(var e=!0,n=0;n<this.eventLists_.length;n++){var r=this.eventLists_[n];r&&(t(r.getPath())?(this.eventLists_[n].raise(),this.eventLists_[n]=null):e=!1)}e&&(this.eventLists_=[]),this.recursionDepth_--},Dr);function Dr(){this.eventLists_=[],this.recursionDepth_=0}var Or=(xr.prototype.add=function(t){this.events_.push(t)},xr.prototype.raise=function(){for(var t=0;t<this.events_.length;t++){var e=this.events_[t];if(null!==e){this.events_[t]=null;var n=e.getEventRunner();dt&&$("event: "+e.toString()),Et(n)}}},xr.prototype.getPath=function(){return this.path_},xr);function xr(t){this.path_=t,this.events_=[]}var kr=(Fr.prototype.trigger=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(Array.isArray(this.listeners_[t]))for(var r=o(this.listeners_[t]),i=0;i<r.length;i++)r[i].callback.apply(r[i].context,e)},Fr.prototype.on=function(t,e,n){this.validateEventType_(t),this.listeners_[t]=this.listeners_[t]||[],this.listeners_[t].push({callback:e,context:n});var r=this.getInitialEvent(t);r&&e.apply(n,r)},Fr.prototype.off=function(t,e,n){this.validateEventType_(t);for(var r=this.listeners_[t]||[],i=0;i<r.length;i++)if(r[i].callback===e&&(!n||n===r[i].context))return void r.splice(i,1)},Fr.prototype.validateEventType_=function(e){C(this.allowedEvents_.find(function(t){return t===e}),"Unknown event: "+e)},Fr);function Fr(t){this.allowedEvents_=t,this.listeners_={},C(Array.isArray(t)&&0<t.length,"Requires a non-empty array")}var Ar,Lr=(t(Mr,Ar=kr),Mr.getInstance=function(){return new Mr},Mr.prototype.getInitialEvent=function(t){return C("visible"===t,"Unknown event type: "+t),[this.visible_]},Mr);function Mr(){var e,t,n=Ar.call(this,["visible"])||this;return"undefined"!=typeof document&&void 0!==document.addEventListener&&(void 0!==document.hidden?(t="visibilitychange",e="hidden"):void 0!==document.mozHidden?(t="mozvisibilitychange",e="mozHidden"):void 0!==document.msHidden?(t="msvisibilitychange",e="msHidden"):void 0!==document.webkitHidden&&(t="webkitvisibilitychange",e="webkitHidden")),n.visible_=!0,t&&document.addEventListener(t,function(){var t=!document[e];t!==n.visible_&&(n.visible_=t,n.trigger("visible",t))},!1),n}var Wr,Qr=(t(qr,Wr=kr),qr.getInstance=function(){return new qr},qr.prototype.getInitialEvent=function(t){return C("online"===t,"Unknown event type: "+t),[this.online_]},qr.prototype.currentlyOnline=function(){return this.online_},qr);function qr(){var t=Wr.call(this,["online"])||this;return t.online_=!0,"undefined"==typeof window||void 0===window.addEventListener||d()||(window.addEventListener("online",function(){t.online_||(t.online_=!0,t.trigger("online",!0))},!1),window.addEventListener("offline",function(){t.online_&&(t.online_=!1,t.trigger("online",!1))},!1)),t}var Ur=(Vr.prototype.closeAfter=function(t,e){this.closeAfterResponse=t,this.onClose=e,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)},Vr.prototype.handleResponse=function(t,e){var r=this;this.pendingResponses[t]=e;for(var n=function(){var e=i.pendingResponses[i.currentResponseNum];delete i.pendingResponses[i.currentResponseNum];for(var t=function(t){e[t]&&Et(function(){r.onMessage_(e[t])})},n=0;n<e.length;++n)t(n);if(i.currentResponseNum===i.closeAfterResponse)return i.onClose&&(i.onClose(),i.onClose=null),"break";i.currentResponseNum++},i=this;this.pendingResponses[this.currentResponseNum]&&"break"!==n(););},Vr);function Vr(t){this.onMessage_=t,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}var Hr=(Br.prototype.open=function(t,e){var s=this;this.curSegmentNum=0,this.onDisconnect_=e,this.myPacketOrderer=new Ur(t),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(function(){s.log_("Timed out trying to connect."),s.onClosed_(),s.connectTimeoutTimer_=null},Math.floor(3e4)),function(t){if("complete"===document.readyState)t();else{var e=!1,n=function(){document.body?e||(e=!0,t()):setTimeout(n,Math.floor(10))};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&n()}),window.attachEvent("onload",n))}}(function(){if(!s.isClosed_){s.scriptTagHolder=new jr(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=_(t,5),r=n[0],i=n[1],o=n[2];if(n[3],n[4],s.incrementIncomingBytes_(t),s.scriptTagHolder)if(s.connectTimeoutTimer_&&(clearTimeout(s.connectTimeoutTimer_),s.connectTimeoutTimer_=null),s.everConnected_=!0,"start"==r)s.id=i,s.password=o;else{if("close"!==r)throw new Error("Unrecognized command received: "+r);i?(s.scriptTagHolder.sendNewPolls=!1,s.myPacketOrderer.closeAfter(i,function(){s.onClosed_()})):s.onClosed_()}},function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=_(t,2),r=n[0],i=n[1];s.incrementIncomingBytes_(t),s.myPacketOrderer.handleResponse(r,i)},function(){s.onClosed_()},s.urlFn);var t={start:"t"};t.ser=Math.floor(1e8*Math.random()),s.scriptTagHolder.uniqueCallbackIdentifier&&(t.cb=s.scriptTagHolder.uniqueCallbackIdentifier),t.v="5",s.transportSessionId&&(t.s=s.transportSessionId),s.lastSessionId&&(t.ls=s.lastSessionId),"undefined"!=typeof location&&location.href&&-1!==location.href.indexOf(Pt)&&(t.r="f");var e=s.urlFn(t);s.log_("Connecting via long-poll to "+e),s.scriptTagHolder.addTag(e,function(){})}})},Br.prototype.start=function(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)},Br.forceAllow=function(){Br.forceAllow_=!0},Br.forceDisallow=function(){Br.forceDisallow_=!0},Br.isAvailable=function(){return!!Br.forceAllow_||!(Br.forceDisallow_||"undefined"==typeof document||null==document.createElement||"object"==typeof window&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href)||"object"==typeof Windows&&"object"==typeof Windows.UI)},Br.prototype.markConnectionHealthy=function(){},Br.prototype.shutdown_=function(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)},Br.prototype.onClosed_=function(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))},Br.prototype.close=function(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())},Br.prototype.send=function(t){var e=T(t);this.bytesSent+=e.length,this.stats_.incrementCounter("bytes_sent",e.length);for(var n=function(t){var e=s(t);return l.encodeByteArray(e,!0)}(e),r=ot(n,1840),i=0;i<r.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,r.length,r[i]),this.curSegmentNum++},Br.prototype.addDisconnectPingFrame=function(t,e){this.myDisconnFrame=document.createElement("iframe");var n={dframe:"t"};n.id=t,n.pw=e,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)},Br.prototype.incrementIncomingBytes_=function(t){var e=T(t).length;this.bytesReceived+=e,this.stats_.incrementCounter("bytes_received",e)},Br);function Br(t,e,n,r){this.connId=t,this.repoInfo=e,this.transportSessionId=n,this.lastSessionId=r,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=J(t),this.stats_=br.getCollection(e),this.urlFn=function(t){return e.connectionURL(Ot,t)}}var jr=(Kr.createIFrame_=function(){var e=document.createElement("iframe");if(e.style.display="none",!document.body)throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";document.body.appendChild(e);try{e.contentWindow.document||$("No IE domain setting required")}catch(t){var n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e},Kr.prototype.close=function(){var t=this;this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.innerHTML="",setTimeout(function(){null!==t.myIFrame&&(document.body.removeChild(t.myIFrame),t.myIFrame=null)},Math.floor(0)));var e=this.onDisconnect;e&&(this.onDisconnect=null,e())},Kr.prototype.startLongPoll=function(t,e){for(this.myID=t,this.myPW=e,this.alive=!0;this.newRequest_(););},Kr.prototype.newRequest_=function(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(0<this.pendingSegs.length?2:1)){this.currentSerial++;var t={};t.id=this.myID,t.pw=this.myPW,t.ser=this.currentSerial;for(var e=this.urlFn(t),n="",r=0;0<this.pendingSegs.length&&this.pendingSegs[0].d.length+30+n.length<=1870;){var i=this.pendingSegs.shift();n=n+"&seg"+r+"="+i.seg+"&ts"+r+"="+i.ts+"&d"+r+"="+i.d,r++}return e+=n,this.addLongPollTag_(e,this.currentSerial),!0}return!1},Kr.prototype.enqueueSegment=function(t,e,n){this.pendingSegs.push({seg:t,ts:e,d:n}),this.alive&&this.newRequest_()},Kr.prototype.addLongPollTag_=function(t,e){var n=this;function r(){n.outstandingRequests.delete(e),n.newRequest_()}this.outstandingRequests.add(e);var i=setTimeout(r,Math.floor(25e3));this.addTag(t,function(){clearTimeout(i),r()})},Kr.prototype.addTag=function(t,n){var r=this;setTimeout(function(){try{if(!r.sendNewPolls)return;var e=r.myIFrame.doc.createElement("script");e.type="text/javascript",e.async=!0,e.src=t,e.onload=e.onreadystatechange=function(){var t=e.readyState;t&&"loaded"!==t&&"complete"!==t||(e.onload=e.onreadystatechange=null,e.parentNode&&e.parentNode.removeChild(e),n())},e.onerror=function(){$("Long-poll script failed to load: "+t),r.sendNewPolls=!1,r.close()},r.myIFrame.doc.body.appendChild(e)}catch(t){}},Math.floor(1))},Kr);function Kr(t,e,n,r){this.onDisconnect=n,this.urlFn=r,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(1e8*Math.random()),this.sendNewPolls=!0,this.uniqueCallbackIdentifier=ct(),window["pLPCommand"+this.uniqueCallbackIdentifier]=t,window["pRTLPCB"+this.uniqueCallbackIdentifier]=e,this.myIFrame=Kr.createIFrame_();var i="";this.myIFrame.src&&"javascript:"===this.myIFrame.src.substr(0,"javascript:".length)&&(i='<script>document.domain="'+document.domain+'";<\/script>');var o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(t){$("frame writing exception"),t.stack&&$(t.stack),$(t)}}var Yr="";var zr=null;"undefined"!=typeof MozWebSocket?zr=MozWebSocket:"undefined"!=typeof WebSocket&&(zr=WebSocket);var Gr=(Xr.connectionURL_=function(t,e,n){var r={v:"5"};return"undefined"!=typeof location&&location.href&&-1!==location.href.indexOf(Pt)&&(r.r="f"),e&&(r.s=e),n&&(r.ls=n),t.connectionURL(Dt,r)},Xr.prototype.open=function(t,e){var n=this;this.onDisconnect=e,this.onMessage=t,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,at.set("previous_websocket_failure",!0);try{if(y()){var r=h.NODE_ADMIN?"AdminNode":"Node",i={headers:{"User-Agent":"Firebase/5/"+Yr+"/"+process.platform+"/"+r}},o=process.env,s=0==this.connURL.indexOf("wss://")?o.HTTPS_PROXY||o.https_proxy:o.HTTP_PROXY||o.http_proxy;s&&(i.proxy={origin:s}),this.mySock=new zr(this.connURL,[],i)}else this.mySock=new zr(this.connURL)}catch(t){this.log_("Error instantiating WebSocket.");var a=t.message||t.data;return a&&this.log_(a),void this.onClosed_()}this.mySock.onopen=function(){n.log_("Websocket connected."),n.everConnected_=!0},this.mySock.onclose=function(){n.log_("Websocket connection was disconnected."),n.mySock=null,n.onClosed_()},this.mySock.onmessage=function(t){n.handleIncomingFrame(t)},this.mySock.onerror=function(t){n.log_("WebSocket error.  Closing connection.");var e=t.message||t.data;e&&n.log_(e),n.onClosed_()}},Xr.prototype.start=function(){},Xr.forceDisallow=function(){Xr.forceDisallow_=!0},Xr.isAvailable=function(){var t=!1;if("undefined"!=typeof navigator&&navigator.userAgent){var e=navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);e&&1<e.length&&parseFloat(e[1])<4.4&&(t=!0)}return!t&&null!==zr&&!Xr.forceDisallow_},Xr.previouslyFailed=function(){return at.isInMemoryStorage||!0===at.get("previous_websocket_failure")},Xr.prototype.markConnectionHealthy=function(){at.remove("previous_websocket_failure")},Xr.prototype.appendFrame_=function(t){if(this.frames.push(t),this.frames.length==this.totalFrames){var e=this.frames.join("");this.frames=null;var n=S(e);this.onMessage(n)}},Xr.prototype.handleNewFrameCount_=function(t){this.totalFrames=t,this.frames=[]},Xr.prototype.extractFrameCount_=function(t){if(C(null===this.frames,"We already have a frame buffer"),t.length<=6){var e=Number(t);if(!isNaN(e))return this.handleNewFrameCount_(e),null}return this.handleNewFrameCount_(1),t},Xr.prototype.handleIncomingFrame=function(t){if(null!==this.mySock){var e=t.data;if(this.bytesReceived+=e.length,this.stats_.incrementCounter("bytes_received",e.length),this.resetKeepAlive(),null!==this.frames)this.appendFrame_(e);else{var n=this.extractFrameCount_(e);null!==n&&this.appendFrame_(n)}}},Xr.prototype.send=function(t){this.resetKeepAlive();var e=T(t);this.bytesSent+=e.length,this.stats_.incrementCounter("bytes_sent",e.length);var n=ot(e,16384);1<n.length&&this.sendString_(String(n.length));for(var r=0;r<n.length;r++)this.sendString_(n[r])},Xr.prototype.shutdown_=function(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)},Xr.prototype.onClosed_=function(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))},Xr.prototype.close=function(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())},Xr.prototype.resetKeepAlive=function(){var t=this;clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(function(){t.mySock&&t.sendString_("0"),t.resetKeepAlive()},Math.floor(45e3))},Xr.prototype.sendString_=function(t){try{this.mySock.send(t)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}},Xr.responsesRequiredToBeHealthy=2,Xr.healthyTimeout=3e4,Xr);function Xr(t,e,n,r){this.connId=t,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=J(this.connId),this.stats_=br.getCollection(e),this.connURL=Xr.connectionURL_(e,n,r)}var $r=(Object.defineProperty(Jr,"ALL_TRANSPORTS",{get:function(){return[Hr,Gr]},enumerable:!0,configurable:!0}),Jr.prototype.initTransports_=function(t){var e,n,r=Gr&&Gr.isAvailable(),i=r&&!Gr.previouslyFailed();if(t.webSocketOnly&&(r||et("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Gr];else{var o=this.transports_=[];try{for(var s=f(Jr.ALL_TRANSPORTS),a=s.next();!a.done;a=s.next()){var h=a.value;h&&h.isAvailable()&&o.push(h)}}catch(t){e={error:t}}finally{try{a&&!a.done&&(n=s.return)&&n.call(s)}finally{if(e)throw e.error}}}},Jr.prototype.initialTransport=function(){if(0<this.transports_.length)return this.transports_[0];throw new Error("No transports available")},Jr.prototype.upgradeTransport=function(){return 1<this.transports_.length?this.transports_[1]:null},Jr);function Jr(t){this.initTransports_(t)}var Zr=(ti.prototype.start_=function(){var t=this,e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,void 0,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;var n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(function(){t.conn_&&t.conn_.open(n,r)},Math.floor(0));var i=e.healthyTimeout||0;0<i&&(this.healthyTimeout_=wt(function(){t.healthyTimeout_=null,t.isHealthy_||(t.conn_&&102400<t.conn_.bytesReceived?(t.log_("Connection exceeded healthy timeout but has received "+t.conn_.bytesReceived+" bytes.  Marking connection healthy."),t.isHealthy_=!0,t.conn_.markConnectionHealthy()):t.conn_&&10240<t.conn_.bytesSent?t.log_("Connection exceeded healthy timeout but has sent "+t.conn_.bytesSent+" bytes.  Leaving connection alive."):(t.log_("Closing unhealthy connection after timeout."),t.close()))},Math.floor(i)))},ti.prototype.nextTransportId_=function(){return"c:"+this.id+":"+this.connectionCount++},ti.prototype.disconnReceiver_=function(e){var n=this;return function(t){e===n.conn_?n.onConnectionLost_(t):e===n.secondaryConn_?(n.log_("Secondary connection lost."),n.onSecondaryConnectionLost_()):n.log_("closing an old connection")}},ti.prototype.connReceiver_=function(e){var n=this;return function(t){2!=n.state_&&(e===n.rx_?n.onPrimaryMessageReceived_(t):e===n.secondaryConn_?n.onSecondaryMessageReceived_(t):n.log_("message on old connection"))}},ti.prototype.sendRequest=function(t){var e={t:"d",d:t};this.sendData_(e)},ti.prototype.tryCleanupConnection=function(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)},ti.prototype.onSecondaryControl_=function(t){if("t"in t){var e=t.t;"a"===e?this.upgradeIfSecondaryHealthy_():"r"===e?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),this.tx_!==this.secondaryConn_&&this.rx_!==this.secondaryConn_||this.close()):"o"===e&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}},ti.prototype.onSecondaryMessageReceived_=function(t){var e=it("t",t),n=it("d",t);if("c"==e)this.onSecondaryControl_(n);else{if("d"!=e)throw new Error("Unknown protocol layer: "+e);this.pendingDataMessages.push(n)}},ti.prototype.upgradeIfSecondaryHealthy_=function(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:"p",d:{}}}))},ti.prototype.proceedWithUpgrade_=function(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:"a",d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:"n",d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()},ti.prototype.onPrimaryMessageReceived_=function(t){var e=it("t",t),n=it("d",t);"c"==e?this.onControl_(n):"d"==e&&this.onDataMessage_(n)},ti.prototype.onDataMessage_=function(t){this.onPrimaryResponse_(),this.onMessage_(t)},ti.prototype.onPrimaryResponse_=function(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))},ti.prototype.onControl_=function(t){var e=it("t",t);if("d"in t){var n=t.d;if("h"===e)this.onHandshake_(n);else if("n"===e){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(var r=0;r<this.pendingDataMessages.length;++r)this.onDataMessage_(this.pendingDataMessages[r]);this.pendingDataMessages=[],this.tryCleanupConnection()}else"s"===e?this.onConnectionShutdown_(n):"r"===e?this.onReset_(n):"e"===e?Z("Server Error: "+n):"o"===e?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Z("Unknown control packet command: "+e)}},ti.prototype.onHandshake_=function(t){var e=t.ts,n=t.v,r=t.h;this.sessionId=t.s,this.repoInfo_.updateHost(r),0==this.state_&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,e),"5"!==n&&et("Protocol version mismatch detected"),this.tryStartUpgrade_())},ti.prototype.tryStartUpgrade_=function(){var t=this.transportManager_.upgradeTransport();t&&this.startUpgrade_(t)},ti.prototype.startUpgrade_=function(t){var e=this;this.secondaryConn_=new t(this.nextTransportId_(),this.repoInfo_,this.sessionId),this.secondaryResponsesRequired_=t.responsesRequiredToBeHealthy||0;var n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),wt(function(){e.secondaryConn_&&(e.log_("Timed out trying to upgrade."),e.secondaryConn_.close())},Math.floor(6e4))},ti.prototype.onReset_=function(t){this.log_("Reset packet received.  New host: "+t),this.repoInfo_.updateHost(t),1===this.state_?this.close():(this.closeConnections_(),this.start_())},ti.prototype.onConnectionEstablished_=function(t,e){var n=this;this.log_("Realtime connection established."),this.conn_=t,this.state_=1,this.onReady_&&(this.onReady_(e,this.sessionId),this.onReady_=null),0===this.primaryResponsesRequired_?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):wt(function(){n.sendPingOnPrimaryIfNecessary_()},Math.floor(5e3))},ti.prototype.sendPingOnPrimaryIfNecessary_=function(){this.isHealthy_||1!==this.state_||(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:"p",d:{}}}))},ti.prototype.onSecondaryConnectionLost_=function(){var t=this.secondaryConn_;this.secondaryConn_=null,this.tx_!==t&&this.rx_!==t||this.close()},ti.prototype.onConnectionLost_=function(t){this.conn_=null,t||0!==this.state_?1===this.state_&&this.log_("Realtime connection lost."):(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(at.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)),this.close()},ti.prototype.onConnectionShutdown_=function(t){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(t),this.onKill_=null),this.onDisconnect_=null,this.close()},ti.prototype.sendData_=function(t){if(1!==this.state_)throw"Connection is not connected";this.tx_.send(t)},ti.prototype.close=function(){2!==this.state_&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))},ti.prototype.closeConnections_=function(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)},ti);function ti(t,e,n,r,i,o,s){this.id=t,this.repoInfo_=e,this.onMessage_=n,this.onReady_=r,this.onDisconnect_=i,this.onKill_=o,this.lastSessionId=s,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=J("c:"+this.id+":"),this.transportManager_=new $r(e),this.log_("Connection created"),this.start_()}var ei=(ni.prototype.put=function(t,e,n,r){},ni.prototype.merge=function(t,e,n,r){},ni.prototype.refreshAuthToken=function(t){},ni.prototype.onDisconnectPut=function(t,e,n){},ni.prototype.onDisconnectMerge=function(t,e,n){},ni.prototype.onDisconnectCancel=function(t,e){},ni.prototype.reportStats=function(t){},ni);function ni(){}var ri,ii=(t(oi,ri=ei),oi.prototype.sendRequest=function(t,e,n){var r=++this.requestNumber_,i={r:r,a:t,b:e};this.log_(T(i)),C(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),n&&(this.requestCBHash_[r]=n)},oi.prototype.listen=function(t,e,n,r){var i=t.queryIdentifier(),o=t.path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),C(t.getQueryParams().isDefault()||!t.getQueryParams().loadsAllData(),"listen() called for non-default but complete query"),C(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");var s={onComplete:r,hashFn:e,query:t,tag:n};this.listens.get(o).set(i,s),this.connected_&&this.sendListen_(s)},oi.prototype.sendListen_=function(r){var i=this,o=r.query,s=o.path.toString(),a=o.queryIdentifier();this.log_("Listen on "+s+" for "+a);var t={p:s};r.tag&&(t.q=o.queryObject(),t.t=r.tag),t.h=r.hashFn(),this.sendRequest("q",t,function(t){var e=t.d,n=t.s;oi.warnOnListenWarnings_(e,o),(i.listens.get(s)&&i.listens.get(s).get(a))===r&&(i.log_("listen response",t),"ok"!==n&&i.removeListen_(s,a),r.onComplete&&r.onComplete(n,e))})},oi.warnOnListenWarnings_=function(t,e){if(t&&"object"==typeof t&&N(t,"w")){var n=R(t,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){var r='".indexOn": "'+e.getQueryParams().getIndex().toString()+'"',i=e.path.toString();et("Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding "+r+" at "+i+" to your security rules for better performance.")}}},oi.prototype.refreshAuthToken=function(t){this.authToken_=t,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},function(){}),this.reduceReconnectDelayIfAdminCredential_(t)},oi.prototype.reduceReconnectDelayIfAdminCredential_=function(t){(t&&40===t.length||function(t){var e=I(t).claims;return"object"==typeof e&&!0===e.admin}(t))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=3e4)},oi.prototype.tryAuth=function(){var r=this;if(this.connected_&&this.authToken_){var i=this.authToken_,t=function(t){var e=I(t).claims;return!!e&&"object"==typeof e&&e.hasOwnProperty("iat")}(i)?"auth":"gauth",e={cred:i};null===this.authOverride_?e.noauth=!0:"object"==typeof this.authOverride_&&(e.authvar=this.authOverride_),this.sendRequest(t,e,function(t){var e=t.s,n=t.d||"error";r.authToken_===i&&("ok"===e?r.invalidAuthTokenCount_=0:r.onAuthRevoked_(e,n))})}},oi.prototype.unlisten=function(t,e){var n=t.path.toString(),r=t.queryIdentifier();this.log_("Unlisten called for "+n+" "+r),C(t.getQueryParams().isDefault()||!t.getQueryParams().loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(n,r)&&this.connected_&&this.sendUnlisten_(n,r,t.queryObject(),e)},oi.prototype.sendUnlisten_=function(t,e,n,r){this.log_("Unlisten on "+t+" for "+e);var i={p:t};r&&(i.q=n,i.t=r),this.sendRequest("n",i)},oi.prototype.onDisconnectPut=function(t,e,n){this.connected_?this.sendOnDisconnect_("o",t,e,n):this.onDisconnectRequestQueue_.push({pathString:t,action:"o",data:e,onComplete:n})},oi.prototype.onDisconnectMerge=function(t,e,n){this.connected_?this.sendOnDisconnect_("om",t,e,n):this.onDisconnectRequestQueue_.push({pathString:t,action:"om",data:e,onComplete:n})},oi.prototype.onDisconnectCancel=function(t,e){this.connected_?this.sendOnDisconnect_("oc",t,null,e):this.onDisconnectRequestQueue_.push({pathString:t,action:"oc",data:null,onComplete:e})},oi.prototype.sendOnDisconnect_=function(t,e,n,r){var i={p:e,d:n};this.log_("onDisconnect "+t,i),this.sendRequest(t,i,function(t){r&&setTimeout(function(){r(t.s,t.d)},Math.floor(0))})},oi.prototype.put=function(t,e,n,r){this.putInternal("p",t,e,n,r)},oi.prototype.merge=function(t,e,n,r){this.putInternal("m",t,e,n,r)},oi.prototype.putInternal=function(t,e,n,r,i){var o={p:e,d:n};void 0!==i&&(o.h=i),this.outstandingPuts_.push({action:t,request:o,onComplete:r}),this.outstandingPutCount_++;var s=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(s):this.log_("Buffering put: "+e)},oi.prototype.sendPut_=function(e){var n=this,r=this.outstandingPuts_[e].action,t=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(r,t,function(t){n.log_(r+" response",t),delete n.outstandingPuts_[e],n.outstandingPutCount_--,0===n.outstandingPutCount_&&(n.outstandingPuts_=[]),i&&i(t.s,t.d)})},oi.prototype.reportStats=function(t){var n=this;if(this.connected_){var e={c:t};this.log_("reportStats",e),this.sendRequest("s",e,function(t){if("ok"!==t.s){var e=t.d;n.log_("reportStats","Error sending stats: "+e)}})}},oi.prototype.onDataMessage_=function(t){if("r"in t){this.log_("from server: "+T(t));var e=t.r,n=this.requestCBHash_[e];n&&(delete this.requestCBHash_[e],n(t.b))}else{if("error"in t)throw"A server-side error has occurred: "+t.error;"a"in t&&this.onDataPush_(t.a,t.b)}},oi.prototype.onDataPush_=function(t,e){this.log_("handleServerMessage",t,e),"d"===t?this.onDataUpdate_(e.p,e.d,!1,e.t):"m"===t?this.onDataUpdate_(e.p,e.d,!0,e.t):"c"===t?this.onListenRevoked_(e.p,e.q):"ac"===t?this.onAuthRevoked_(e.s,e.d):"sd"===t?this.onSecurityDebugPacket_(e):Z("Unrecognized action received from server: "+T(t)+"\nAre you using the latest client?")},oi.prototype.onReady_=function(t,e){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=(new Date).getTime(),this.handleTimestamp_(t),this.lastSessionId=e,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)},oi.prototype.scheduleConnect_=function(t){var e=this;C(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(function(){e.establishConnectionTimer_=null,e.establishConnection_()},Math.floor(t))},oi.prototype.onVisible_=function(t){t&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=1e3,this.realtime_||this.scheduleConnect_(0)),this.visible_=t},oi.prototype.onOnline_=function(t){t?(this.log_("Browser went online."),this.reconnectDelay_=1e3,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())},oi.prototype.onRealtimeDisconnect_=function(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(3e4<(new Date).getTime()-this.lastConnectionEstablishedTime_&&(this.reconnectDelay_=1e3),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=(new Date).getTime());var t=(new Date).getTime()-this.lastConnectionAttemptTime_,e=Math.max(0,this.reconnectDelay_-t);e=Math.random()*e,this.log_("Trying to reconnect in "+e+"ms"),this.scheduleConnect_(e),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,1.3*this.reconnectDelay_)}this.onConnectStatus_(!1)},oi.prototype.establishConnection_=function(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=(new Date).getTime(),this.lastConnectionEstablishedTime_=null;var e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+oi.nextConnectionId_++,o=this,s=this.lastSessionId,a=!1,h=null,l=function(){h?h.close():(a=!0,r())};this.realtime_={close:l,sendRequest:function(t){C(h,"sendRequest call when we're not connected not allowed."),h.sendRequest(t)}};var t=this.forceTokenRefresh_;this.forceTokenRefresh_=!1,this.authTokenProvider_.getToken(t).then(function(t){a?$("getToken() completed but was canceled"):($("getToken() completed. Creating connection."),o.authToken_=t&&t.accessToken,h=new Zr(i,o.repoInfo_,e,n,r,function(t){et(t+" ("+o.repoInfo_.toString()+")"),o.interrupt("server_kill")},s))}).then(null,function(t){o.log_("Failed to get token: "+t),a||l()})}},oi.prototype.interrupt=function(t){$("Interrupting connection for reason: "+t),this.interruptReasons_[t]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())},oi.prototype.resume=function(t){$("Resuming connection for reason: "+t),delete this.interruptReasons_[t],P(this.interruptReasons_)&&(this.reconnectDelay_=1e3,this.realtime_||this.scheduleConnect_(0))},oi.prototype.handleTimestamp_=function(t){var e=t-(new Date).getTime();this.onServerInfoUpdate_({serverTimeOffset:e})},oi.prototype.cancelSentTransactions_=function(){for(var t=0;t<this.outstandingPuts_.length;t++){var e=this.outstandingPuts_[t];e&&"h"in e.request&&e.queued&&(e.onComplete&&e.onComplete("disconnect"),delete this.outstandingPuts_[t],this.outstandingPutCount_--)}0===this.outstandingPutCount_&&(this.outstandingPuts_=[])},oi.prototype.onListenRevoked_=function(t,e){var n;n=e?e.map(function(t){return gt(t)}).join("$"):"default";var r=this.removeListen_(t,n);r&&r.onComplete&&r.onComplete("permission_denied")},oi.prototype.removeListen_=function(t,e){var n,r=new Tt(t).toString();if(this.listens.has(r)){var i=this.listens.get(r);n=i.get(e),i.delete(e),0===i.size&&this.listens.delete(r)}else n=void 0;return n},oi.prototype.onAuthRevoked_=function(t,e){$("Auth token revoked: "+t+"/"+e),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),"invalid_token"!==t&&"permission_denied"!==t||(this.invalidAuthTokenCount_++,3<=this.invalidAuthTokenCount_&&(this.reconnectDelay_=3e4,this.authTokenProvider_.notifyForInvalidToken()))},oi.prototype.onSecurityDebugPacket_=function(t){this.securityDebugCallback_?this.securityDebugCallback_(t):"msg"in t&&console.log("FIREBASE: "+t.msg.replace("\n","\nFIREBASE: "))},oi.prototype.restoreState_=function(){var e,t,n,r;this.tryAuth();try{for(var i=f(this.listens.values()),o=i.next();!o.done;o=i.next()){var s=o.value;try{for(var a=(n=void 0,f(s.values())),h=a.next();!h.done;h=a.next()){var l=h.value;this.sendListen_(l)}}catch(t){n={error:t}}finally{try{h&&!h.done&&(r=a.return)&&r.call(a)}finally{if(n)throw n.error}}}}catch(t){e={error:t}}finally{try{o&&!o.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}for(var u=0;u<this.outstandingPuts_.length;u++)this.outstandingPuts_[u]&&this.sendPut_(u);for(;this.onDisconnectRequestQueue_.length;){var c=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(c.action,c.pathString,c.data,c.onComplete)}},oi.prototype.sendConnectStats_=function(){var t={};t["sdk.js."+Yr.replace(/\./g,"-")]=1,d()?t["framework.cordova"]=1:"object"==typeof navigator&&"ReactNative"===navigator.product&&(t["framework.reactnative"]=1),this.reportStats(t)},oi.prototype.shouldReconnect_=function(){var t=Qr.getInstance().currentlyOnline();return P(this.interruptReasons_)&&t},oi.nextPersistentConnectionId_=0,oi.nextConnectionId_=0,oi);function oi(t,e,n,r,i,o){var s=ri.call(this)||this;if(s.repoInfo_=t,s.onDataUpdate_=e,s.onConnectStatus_=n,s.onServerInfoUpdate_=r,s.authTokenProvider_=i,s.authOverride_=o,s.id=oi.nextPersistentConnectionId_++,s.log_=J("p:"+s.id+":"),s.interruptReasons_={},s.listens=new Map,s.outstandingPuts_=[],s.outstandingPutCount_=0,s.onDisconnectRequestQueue_=[],s.connected_=!1,s.reconnectDelay_=1e3,s.maxReconnectDelay_=3e5,s.securityDebugCallback_=null,s.lastSessionId=null,s.establishConnectionTimer_=null,s.visible_=!1,s.requestCBHash_={},s.requestNumber_=0,s.realtime_=null,s.authToken_=null,s.forceTokenRefresh_=!1,s.invalidAuthTokenCount_=0,s.firstConnection_=!0,s.lastConnectionAttemptTime_=null,s.lastConnectionEstablishedTime_=null,o&&!y())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");return s.scheduleConnect_(0),Lr.getInstance().on("visible",s.onVisible_,s),-1===t.host.indexOf("fblocal")&&Qr.getInstance().on("online",s.onOnline_,s),s}var si,ai=(t(hi,si=ei),hi.prototype.reportStats=function(t){throw new Error("Method not implemented.")},hi.getListenId_=function(t,e){return void 0!==e?"tag$"+e:(C(t.getQueryParams().isDefault(),"should have a tag if it's not a default query."),t.path.toString())},hi.prototype.listen=function(t,e,r,i){var o=this,s=t.path.toString();this.log_("Listen called for "+s+" "+t.queryIdentifier());var a=hi.getListenId_(t,r),h={};this.listens_[a]=h;var n=t.getQueryParams().toRestQueryStringParameters();this.restRequest_(s+".json",n,function(t,e){var n=e;404===t&&(t=n=null),null===t&&o.onDataUpdate_(s,n,!1,r),R(o.listens_,a)===h&&i(t?401==t?"permission_denied":"rest_error:"+t:"ok",null)})},hi.prototype.unlisten=function(t,e){var n=hi.getListenId_(t,e);delete this.listens_[n]},hi.prototype.refreshAuthToken=function(t){},hi.prototype.restRequest_=function(i,o,s){var a=this;void 0===o&&(o={}),o.format="export",this.authTokenProvider_.getToken(!1).then(function(t){var e=t&&t.accessToken;e&&(o.auth=e);var n=(a.repoInfo_.secure?"https://":"http://")+a.repoInfo_.host+i+"?ns="+a.repoInfo_.namespace+function(t){for(var n=[],e=function(e,t){Array.isArray(t)?t.forEach(function(t){n.push(encodeURIComponent(e)+"="+encodeURIComponent(t))}):n.push(encodeURIComponent(e)+"="+encodeURIComponent(t))},r=0,i=Object.entries(t);r<i.length;r++){var o=i[r];e(o[0],o[1])}return n.length?"&"+n.join("&"):""}(o);a.log_("Sending REST request for "+n);var r=new XMLHttpRequest;r.onreadystatechange=function(){if(s&&4===r.readyState){a.log_("REST Response for "+n+" received. status:",r.status,"response:",r.responseText);var t=null;if(200<=r.status&&r.status<300){try{t=S(r.responseText)}catch(t){et("Failed to parse JSON response for "+n+": "+r.responseText)}s(null,t)}else 401!==r.status&&404!==r.status&&et("Got unsuccessful REST response for "+n+" Status: "+r.status),s(r.status);s=null}},r.open("GET",n,!0),r.send()})},hi);function hi(t,e,n){var r=si.call(this)||this;return r.repoInfo_=t,r.onDataUpdate_=e,r.authTokenProvider_=n,r.log_=J("p:rest:"),r.listens_={},r}var li="repo_interrupt",ui=(ci.prototype.toString=function(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host},ci.prototype.name=function(){return this.repoInfo_.namespace},ci.prototype.serverTime=function(){var t=this.infoData_.getNode(new Tt(".info/serverTimeOffset")).val()||0;return(new Date).getTime()+t},ci.prototype.generateServerValues=function(){return function(t){return(t=t||{}).timestamp=t.timestamp||(new Date).getTime(),t}({timestamp:this.serverTime()})},ci.prototype.onDataUpdate_=function(t,e,n,r){this.dataUpdateCount++;var i=new Tt(t);e=this.interceptServerDataCallback_?this.interceptServerDataCallback_(t,e):e;var o=[];if(r)if(n){var s=D(e,function(t){return $e(t)});o=this.serverSyncTree_.applyTaggedQueryMerge(i,s,r)}else{var a=$e(e);o=this.serverSyncTree_.applyTaggedQueryOverwrite(i,a,r)}else if(n){var h=D(e,function(t){return $e(t)});o=this.serverSyncTree_.applyServerMerge(i,h)}else{var l=$e(e);o=this.serverSyncTree_.applyServerOverwrite(i,l)}var u=i;0<o.length&&(u=this.rerunTransactions_(i)),this.eventQueue_.raiseEventsForChangedPath(u,o)},ci.prototype.interceptServerData_=function(t){this.interceptServerDataCallback_=t},ci.prototype.onConnectStatus_=function(t){this.updateInfo_("connected",t),!1===t&&this.runOnDisconnectEvents_()},ci.prototype.onServerInfoUpdate_=function(t){var n=this;mt(t,function(t,e){n.updateInfo_(t,e)})},ci.prototype.updateInfo_=function(t,e){var n=new Tt("/.info/"+t),r=$e(e);this.infoData_.updateSnapshot(n,r);var i=this.infoSyncTree_.applyServerOverwrite(n,r);this.eventQueue_.raiseEventsForChangedPath(n,i)},ci.prototype.getNextWriteId_=function(){return this.nextWriteId_++},ci.prototype.setWithPriority=function(i,t,e,o){var s=this;this.log_("set",{path:i.toString(),value:t,priority:e});var n=this.generateServerValues(),r=$e(t,e),a=wn(r,n),h=this.getNextWriteId_(),l=this.serverSyncTree_.applyUserOverwrite(i,a,h,!0);this.eventQueue_.queueEvents(l),this.server_.put(i.toString(),r.val(!0),function(t,e){var n="ok"===t;n||et("set at "+i+" failed: "+t);var r=s.serverSyncTree_.ackUserWrite(h,!n);s.eventQueue_.raiseEventsForChangedPath(i,r),s.callOnCompleteCallback(o,t,e)});var u=this.abortTransactions_(i);this.rerunTransactions_(u),this.eventQueue_.raiseEventsForChangedPath(u,[])},ci.prototype.update=function(o,t,s){var a=this;this.log_("update",{path:o.toString(),value:t});var r=!0,i=this.generateServerValues(),h={};if(mt(t,function(t,e){r=!1;var n=$e(e);h[t]=wn(n,i)}),r)$("update() called with empty data.  Don't do anything."),this.callOnCompleteCallback(s,"ok");else{var l=this.getNextWriteId_(),e=this.serverSyncTree_.applyUserMerge(o,h,l);this.eventQueue_.queueEvents(e),this.server_.merge(o.toString(),t,function(t,e){var n="ok"===t;n||et("update at "+o+" failed: "+t);var r=a.serverSyncTree_.ackUserWrite(l,!n),i=0<r.length?a.rerunTransactions_(o):o;a.eventQueue_.raiseEventsForChangedPath(i,r),a.callOnCompleteCallback(s,t,e)}),mt(t,function(t){var e=a.abortTransactions_(o.child(t));a.rerunTransactions_(e)}),this.eventQueue_.raiseEventsForChangedPath(o,[])}},ci.prototype.runOnDisconnectEvents_=function(){var r=this;this.log_("onDisconnectEvents");var t=this.generateServerValues(),e=function(t,n){var r=new vn;return t.forEachTree(new Tt(""),function(t,e){r.remember(t,wn(e,n))}),r}(this.onDisconnect_,t),i=[];e.forEachTree(Tt.Empty,function(t,e){i=i.concat(r.serverSyncTree_.applyServerOverwrite(t,e));var n=r.abortTransactions_(t);r.rerunTransactions_(n)}),this.onDisconnect_=new vn,this.eventQueue_.raiseEventsForChangedPath(Tt.Empty,i)},ci.prototype.onDisconnectCancel=function(n,r){var i=this;this.server_.onDisconnectCancel(n.toString(),function(t,e){"ok"===t&&i.onDisconnect_.forget(n),i.callOnCompleteCallback(r,t,e)})},ci.prototype.onDisconnectSet=function(n,t,r){var i=this,o=$e(t);this.server_.onDisconnectPut(n.toString(),o.val(!0),function(t,e){"ok"===t&&i.onDisconnect_.remember(n,o),i.callOnCompleteCallback(r,t,e)})},ci.prototype.onDisconnectSetWithPriority=function(n,t,e,r){var i=this,o=$e(t,e);this.server_.onDisconnectPut(n.toString(),o.val(!0),function(t,e){"ok"===t&&i.onDisconnect_.remember(n,o),i.callOnCompleteCallback(r,t,e)})},ci.prototype.onDisconnectUpdate=function(r,n,i){var o=this;if(P(n))return $("onDisconnect().update() called with empty data.  Don't do anything."),void this.callOnCompleteCallback(i,"ok");this.server_.onDisconnectMerge(r.toString(),n,function(t,e){"ok"===t&&mt(n,function(t,e){var n=$e(e);o.onDisconnect_.remember(r.child(t),n)}),o.callOnCompleteCallback(i,t,e)})},ci.prototype.addEventCallbackForQuery=function(t,e){var n;n=".info"===t.path.getFront()?this.infoSyncTree_.addEventRegistration(t,e):this.serverSyncTree_.addEventRegistration(t,e),this.eventQueue_.raiseEventsAtPath(t.path,n)},ci.prototype.removeEventCallbackForQuery=function(t,e){var n;n=".info"===t.path.getFront()?this.infoSyncTree_.removeEventRegistration(t,e):this.serverSyncTree_.removeEventRegistration(t,e),this.eventQueue_.raiseEventsAtPath(t.path,n)},ci.prototype.interrupt=function(){this.persistentConnection_&&this.persistentConnection_.interrupt(li)},ci.prototype.resume=function(){this.persistentConnection_&&this.persistentConnection_.resume(li)},ci.prototype.stats=function(t){if(void 0===t&&(t=!1),"undefined"!=typeof console){var e;e=t?(this.statsListener_||(this.statsListener_=new Tr(this.stats_)),this.statsListener_.get()):this.stats_.get();var i=Object.keys(e).reduce(function(t,e){return Math.max(e.length,t)},0);mt(e,function(t,e){for(var n=t,r=t.length;r<i+2;r++)n+=" ";console.log(n+e)})}},ci.prototype.statsIncrementCounter=function(t){this.stats_.incrementCounter(t),this.statsReporter_.includeStat(t)},ci.prototype.log_=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n="";this.persistentConnection_&&(n=this.persistentConnection_.id+":"),$.apply(void 0,o([n],t))},ci.prototype.callOnCompleteCallback=function(r,i,o){r&&Et(function(){if("ok"==i)r(null);else{var t=(i||"error").toUpperCase(),e=t;o&&(e+=": "+o);var n=new Error(e);n.code=t,r(n)}})},Object.defineProperty(ci.prototype,"database",{get:function(){return this.__database||(this.__database=new Di(this))},enumerable:!0,configurable:!0}),ci);function ci(t,e,n){var r,s=this;if(this.repoInfo_=t,this.app=n,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new Pr,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=new vn,this.persistentConnection_=null,r="undefined"!=typeof process&&process.env[ut]?new mr(n):new yr(n),this.stats_=br.getCollection(t),e||0<=("object"==typeof window&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i))this.server_=new ai(this.repoInfo_,this.onDataUpdate_.bind(this),r),setTimeout(this.onConnectStatus_.bind(this,!0),0);else{var i=n.options.databaseAuthVariableOverride;if(null!=i){if("object"!=typeof i)throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{T(i)}catch(t){throw new Error("Invalid authOverride provided: "+t)}}this.persistentConnection_=new ii(this.repoInfo_,this.onDataUpdate_.bind(this),this.onConnectStatus_.bind(this),this.onServerInfoUpdate_.bind(this),r,i),this.server_=this.persistentConnection_}r.addTokenChangeListener(function(t){s.server_.refreshAuthToken(t)}),this.statsReporter_=br.getOrCreateReporter(t,function(){return new Nr(s.stats_,s.server_)}),this.transactions_init_(),this.infoData_=new fr,this.infoSyncTree_=new pr({startListening:function(t,e,n,r){var i=[],o=s.infoData_.getNode(t.path);return o.isEmpty()||(i=s.infoSyncTree_.applyServerOverwrite(t.path,o),setTimeout(function(){r("ok")},0)),i},stopListening:function(){}}),this.updateInfo_("connected",!1),this.serverSyncTree_=new pr({startListening:function(r,t,e,i){return s.server_.listen(r,e,t,function(t,e){var n=i(t,e);s.eventQueue_.raiseEventsForChangedPath(r.path,n)}),[]},stopListening:function(t,e){s.server_.unlisten(t,e)}})}var pi=(di.prototype.getStartPost=function(){return this.startPost_},di.prototype.getEndPost=function(){return this.endPost_},di.prototype.matches=function(t){return this.index_.compare(this.getStartPost(),t)<=0&&this.index_.compare(t,this.getEndPost())<=0},di.prototype.updateChild=function(t,e,n,r,i,o){return this.matches(new oe(e,n))||(n=je.EMPTY_NODE),this.indexedFilter_.updateChild(t,e,n,r,i,o)},di.prototype.updateFullNode=function(t,e,n){e.isLeafNode()&&(e=je.EMPTY_NODE);var r=e.withIndex(this.index_);r=r.updatePriority(je.EMPTY_NODE);var i=this;return e.forEachChild(Se,function(t,e){i.matches(new oe(t,e))||(r=r.updateImmediateChild(t,je.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(t,r,n)},di.prototype.updatePriority=function(t,e){return t},di.prototype.filtersNodes=function(){return!0},di.prototype.getIndexedFilter=function(){return this.indexedFilter_},di.prototype.getIndex=function(){return this.index_},di.getStartPost_=function(t){if(t.hasStart()){var e=t.getIndexStartName();return t.getIndex().makePost(t.getIndexStartValue(),e)}return t.getIndex().minPost()},di.getEndPost_=function(t){if(t.hasEnd()){var e=t.getIndexEndName();return t.getIndex().makePost(t.getIndexEndValue(),e)}return t.getIndex().maxPost()},di);function di(t){this.indexedFilter_=new Vn(t.getIndex()),this.index_=t.getIndex(),this.startPost_=di.getStartPost_(t),this.endPost_=di.getEndPost_(t)}var fi=(_i.prototype.updateChild=function(t,e,n,r,i,o){return this.rangedFilter_.matches(new oe(e,n))||(n=je.EMPTY_NODE),t.getImmediateChild(e).equals(n)?t:t.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(t,e,n,r,i,o):this.fullLimitUpdateChild_(t,e,n,i,o)},_i.prototype.updateFullNode=function(t,e,n){var r;if(e.isLeafNode()||e.isEmpty())r=je.EMPTY_NODE.withIndex(this.index_);else if(2*this.limit_<e.numChildren()&&e.isIndexed(this.index_)){r=je.EMPTY_NODE.withIndex(this.index_);var i=void 0;i=this.reverse_?e.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):e.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);for(var o=0;i.hasNext()&&o<this.limit_;){var s=i.getNext();if(!(this.reverse_?this.index_.compare(this.rangedFilter_.getStartPost(),s)<=0:this.index_.compare(s,this.rangedFilter_.getEndPost())<=0))break;r=r.updateImmediateChild(s.name,s.node),o++}}else{r=(r=e.withIndex(this.index_)).updatePriority(je.EMPTY_NODE);var a=void 0,h=void 0,l=void 0;if(i=void 0,this.reverse_){i=r.getReverseIterator(this.index_),a=this.rangedFilter_.getEndPost(),h=this.rangedFilter_.getStartPost();var u=this.index_.getCompare();l=function(t,e){return u(e,t)}}else i=r.getIterator(this.index_),a=this.rangedFilter_.getStartPost(),h=this.rangedFilter_.getEndPost(),l=this.index_.getCompare();o=0;for(var c=!1;i.hasNext();)s=i.getNext(),!c&&l(a,s)<=0&&(c=!0),c&&o<this.limit_&&l(s,h)<=0?o++:r=r.updateImmediateChild(s.name,je.EMPTY_NODE)}return this.rangedFilter_.getIndexedFilter().updateFullNode(t,r,n)},_i.prototype.updatePriority=function(t,e){return t},_i.prototype.filtersNodes=function(){return!0},_i.prototype.getIndexedFilter=function(){return this.rangedFilter_.getIndexedFilter()},_i.prototype.getIndex=function(){return this.index_},_i.prototype.fullLimitUpdateChild_=function(t,e,n,r,i){var o;if(this.reverse_){var s=this.index_.getCompare();o=function(t,e){return s(e,t)}}else o=this.index_.getCompare();var a=t;C(a.numChildren()==this.limit_,"");var h=new oe(e,n),l=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(h);if(a.hasChild(e)){for(var c=a.getImmediateChild(e),p=r.getChildAfterChild(this.index_,l,this.reverse_);null!=p&&(p.name==e||a.hasChild(p.name));)p=r.getChildAfterChild(this.index_,p,this.reverse_);var d=null==p?1:o(p,h);if(u&&!n.isEmpty()&&0<=d)return null!=i&&i.trackChildChange(qn.childChangedChange(e,n,c)),a.updateImmediateChild(e,n);null!=i&&i.trackChildChange(qn.childRemovedChange(e,c));var f=a.updateImmediateChild(e,je.EMPTY_NODE);return null!=p&&this.rangedFilter_.matches(p)?(null!=i&&i.trackChildChange(qn.childAddedChange(p.name,p.node)),f.updateImmediateChild(p.name,p.node)):f}return n.isEmpty()?t:u&&0<=o(l,h)?(null!=i&&(i.trackChildChange(qn.childRemovedChange(l.name,l.node)),i.trackChildChange(qn.childAddedChange(e,n))),a.updateImmediateChild(e,n).updateImmediateChild(l.name,je.EMPTY_NODE)):t},_i);function _i(t){this.rangedFilter_=new pi(t),this.index_=t.getIndex(),this.limit_=t.getLimit(),this.reverse_=!t.isViewFromLeft()}var yi=(vi.prototype.hasStart=function(){return this.startSet_},vi.prototype.isViewFromLeft=function(){return""===this.viewFrom_?this.startSet_:this.viewFrom_===vi.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_LEFT},vi.prototype.getIndexStartValue=function(){return C(this.startSet_,"Only valid if start has been set"),this.indexStartValue_},vi.prototype.getIndexStartName=function(){return C(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:_t},vi.prototype.hasEnd=function(){return this.endSet_},vi.prototype.getIndexEndValue=function(){return C(this.endSet_,"Only valid if end has been set"),this.indexEndValue_},vi.prototype.getIndexEndName=function(){return C(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:yt},vi.prototype.hasLimit=function(){return this.limitSet_},vi.prototype.hasAnchoredLimit=function(){return this.limitSet_&&""!==this.viewFrom_},vi.prototype.getLimit=function(){return C(this.limitSet_,"Only valid if limit has been set"),this.limit_},vi.prototype.getIndex=function(){return this.index_},vi.prototype.copy_=function(){var t=new vi;return t.limitSet_=this.limitSet_,t.limit_=this.limit_,t.startSet_=this.startSet_,t.indexStartValue_=this.indexStartValue_,t.startNameSet_=this.startNameSet_,t.indexStartName_=this.indexStartName_,t.endSet_=this.endSet_,t.indexEndValue_=this.indexEndValue_,t.endNameSet_=this.endNameSet_,t.indexEndName_=this.indexEndName_,t.index_=this.index_,t.viewFrom_=this.viewFrom_,t},vi.prototype.limit=function(t){var e=this.copy_();return e.limitSet_=!0,e.limit_=t,e.viewFrom_="",e},vi.prototype.limitToFirst=function(t){var e=this.copy_();return e.limitSet_=!0,e.limit_=t,e.viewFrom_=vi.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_LEFT,e},vi.prototype.limitToLast=function(t){var e=this.copy_();return e.limitSet_=!0,e.limit_=t,e.viewFrom_=vi.WIRE_PROTOCOL_CONSTANTS_.VIEW_FROM_RIGHT,e},vi.prototype.startAt=function(t,e){var n=this.copy_();return n.startSet_=!0,void 0===t&&(t=null),n.indexStartValue_=t,null!=e?(n.startNameSet_=!0,n.indexStartName_=e):(n.startNameSet_=!1,n.indexStartName_=""),n},vi.prototype.endAt=function(t,e){var n=this.copy_();return n.endSet_=!0,void 0===t&&(t=null),n.indexEndValue_=t,void 0!==e?(n.endNameSet_=!0,n.indexEndName_=e):(n.endNameSet_=!1,n.indexEndName_=""),n},vi.prototype.orderBy=function(t){var e=this.copy_();return e.index_=t,e},vi.prototype.getQueryObject=function(){var t=vi.WIRE_PROTOCOL_CONSTANTS_,e={};if(this.startSet_&&(e[t.INDEX_START_VALUE]=this.indexStartValue_,this.startNameSet_&&(e[t.INDEX_START_NAME]=this.indexStartName_)),this.endSet_&&(e[t.INDEX_END_VALUE]=this.indexEndValue_,this.endNameSet_&&(e[t.INDEX_END_NAME]=this.indexEndName_)),this.limitSet_){e[t.LIMIT]=this.limit_;var n=this.viewFrom_;""===n&&(n=this.isViewFromLeft()?t.VIEW_FROM_LEFT:t.VIEW_FROM_RIGHT),e[t.VIEW_FROM]=n}return this.index_!==Se&&(e[t.INDEX]=this.index_.toString()),e},vi.prototype.loadsAllData=function(){return!(this.startSet_||this.endSet_||this.limitSet_)},vi.prototype.isDefault=function(){return this.loadsAllData()&&this.index_==Se},vi.prototype.getNodeFilter=function(){return this.loadsAllData()?new Vn(this.getIndex()):this.hasLimit()?new fi(this):new pi(this)},vi.prototype.toRestQueryStringParameters=function(){var t,e=vi.REST_QUERY_CONSTANTS_,n={};return this.isDefault()||(t=this.index_===Se?e.PRIORITY_INDEX:this.index_===tn?e.VALUE_INDEX:this.index_===fe?e.KEY_INDEX:(C(this.index_ instanceof en,"Unrecognized index type!"),this.index_.toString()),n[e.ORDER_BY]=T(t),this.startSet_&&(n[e.START_AT]=T(this.indexStartValue_),this.startNameSet_&&(n[e.START_AT]+=","+T(this.indexStartName_))),this.endSet_&&(n[e.END_AT]=T(this.indexEndValue_),this.endNameSet_&&(n[e.END_AT]+=","+T(this.indexEndName_))),this.limitSet_&&(this.isViewFromLeft()?n[e.LIMIT_TO_FIRST]=this.limit_:n[e.LIMIT_TO_LAST]=this.limit_)),n},vi.WIRE_PROTOCOL_CONSTANTS_={INDEX_START_VALUE:"sp",INDEX_START_NAME:"sn",INDEX_END_VALUE:"ep",INDEX_END_NAME:"en",LIMIT:"l",VIEW_FROM:"vf",VIEW_FROM_LEFT:"l",VIEW_FROM_RIGHT:"r",INDEX:"i"},vi.REST_QUERY_CONSTANTS_={ORDER_BY:"orderBy",PRIORITY_INDEX:"$priority",VALUE_INDEX:"$value",KEY_INDEX:"$key",START_AT:"startAt",END_AT:"endAt",LIMIT_TO_FIRST:"limitToFirst",LIMIT_TO_LAST:"limitToLast"},vi.DEFAULT=new vi,vi);function vi(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=Se}var gi,mi=(t(Ci,gi=_n),Ci.prototype.getKey=function(){return k("Reference.key",0,0,arguments.length),this.path.isEmpty()?null:this.path.getBack()},Ci.prototype.child=function(t){return k("Reference.child",1,1,arguments.length),"number"==typeof t?t=String(t):t instanceof Tt||(null===this.path.getFront()?function(t,e,n,r){n=n&&n.replace(/^\/*\.info(\/|$)/,"/"),Ht(t,e,n,r)}("Reference.child",1,t,!1):Ht("Reference.child",1,t,!1)),new Ci(this.repo,this.path.child(t))},Ci.prototype.getParent=function(){k("Reference.parent",0,0,arguments.length);var t=this.path.parent();return null===t?null:new Ci(this.repo,t)},Ci.prototype.getRoot=function(){k("Reference.root",0,0,arguments.length);for(var t=this;null!==t.getParent();)t=t.getParent();return t},Ci.prototype.databaseProp=function(){return this.repo.database},Ci.prototype.set=function(t,e){k("Reference.set",1,2,arguments.length),Bt("Reference.set",this.path),Wt("Reference.set",1,t,this.path,!1),A("Reference.set",2,e,!0);var n=new p;return this.repo.setWithPriority(this.path,t,null,n.wrapCallback(e)),n.promise},Ci.prototype.update=function(t,e){if(k("Reference.update",1,2,arguments.length),Bt("Reference.update",this.path),Array.isArray(t)){for(var n={},r=0;r<t.length;++r)n[""+r]=t[r];t=n,et("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")}Qt("Reference.update",1,t,this.path,!1),A("Reference.update",2,e,!0);var i=new p;return this.repo.update(this.path,t,i.wrapCallback(e)),i.promise},Ci.prototype.setWithPriority=function(t,e,n){if(k("Reference.setWithPriority",2,3,arguments.length),Bt("Reference.setWithPriority",this.path),Wt("Reference.setWithPriority",1,t,this.path,!1),qt("Reference.setWithPriority",2,e,!1),A("Reference.setWithPriority",3,n,!0),".length"===this.getKey()||".keys"===this.getKey())throw"Reference.setWithPriority failed: "+this.getKey()+" is a read-only object.";var r=new p;return this.repo.setWithPriority(this.path,t,e,r.wrapCallback(n)),r.promise},Ci.prototype.remove=function(t){return k("Reference.remove",0,1,arguments.length),Bt("Reference.remove",this.path),A("Reference.remove",1,t,!0),this.set(null,t)},Ci.prototype.transaction=function(t,r,e){if(k("Reference.transaction",1,3,arguments.length),Bt("Reference.transaction",this.path),A("Reference.transaction",1,t,!1),A("Reference.transaction",2,r,!0),function(t,e,n,r){if((!r||void 0!==n)&&"boolean"!=typeof n)throw new Error(F(t,e,r)+"must be a boolean.")}("Reference.transaction",3,e,!0),".length"===this.getKey()||".keys"===this.getKey())throw"Reference.transaction failed: "+this.getKey()+" is a read-only object.";void 0===e&&(e=!0);var i=new p;return"function"==typeof r&&i.promise.catch(function(){}),this.repo.startTransaction(this.path,t,function(t,e,n){t?i.reject(t):i.resolve(new Zt(e,n)),"function"==typeof r&&r(t,e,n)},e),i.promise},Ci.prototype.setPriority=function(t,e){k("Reference.setPriority",1,2,arguments.length),Bt("Reference.setPriority",this.path),qt("Reference.setPriority",1,t,!1),A("Reference.setPriority",2,e,!0);var n=new p;return this.repo.setWithPriority(this.path.child(".priority"),t,null,n.wrapCallback(e)),n.promise},Ci.prototype.push=function(t,e){k("Reference.push",0,2,arguments.length),Bt("Reference.push",this.path),Wt("Reference.push",1,t,this.path,!0),A("Reference.push",2,e,!0);var n,r=this.repo.serverTime(),i=ie(r),o=this.child(i),s=this.child(i);return n=null!=t?o.set(t,e).then(function(){return s}):Promise.resolve(s),o.then=n.then.bind(n),o.catch=n.then.bind(n,void 0),"function"==typeof e&&n.catch(function(){}),o},Ci.prototype.onDisconnect=function(){return Bt("Reference.onDisconnect",this.path),new $t(this.repo,this.path)},Object.defineProperty(Ci.prototype,"database",{get:function(){return this.databaseProp()},enumerable:!0,configurable:!0}),Object.defineProperty(Ci.prototype,"key",{get:function(){return this.getKey()},enumerable:!0,configurable:!0}),Object.defineProperty(Ci.prototype,"parent",{get:function(){return this.getParent()},enumerable:!0,configurable:!0}),Object.defineProperty(Ci.prototype,"root",{get:function(){return this.getRoot()},enumerable:!0,configurable:!0}),Ci);function Ci(t,e){if(!(t instanceof ui))throw new Error("new Reference() no longer supported - use app.database().");return gi.call(this,t,e,yi.DEFAULT,!1)||this}_n.__referenceConstructor=mi,ir.__referenceConstructor=mi;var Ei,wi,bi=function(){this.children={},this.childCount=0,this.value=null},Si=(Ti.prototype.subTree=function(t){for(var e,n=t instanceof Tt?t:new Tt(t),r=this;null!==(e=n.getFront());)r=new Ti(e,r,R(r.node_.children,e)||new bi),n=n.popFront();return r},Ti.prototype.getValue=function(){return this.node_.value},Ti.prototype.setValue=function(t){C(void 0!==t,"Cannot set value to undefined"),this.node_.value=t,this.updateParents_()},Ti.prototype.clear=function(){this.node_.value=null,this.node_.children={},this.node_.childCount=0,this.updateParents_()},Ti.prototype.hasChildren=function(){return 0<this.node_.childCount},Ti.prototype.isEmpty=function(){return null===this.getValue()&&!this.hasChildren()},Ti.prototype.forEachChild=function(n){var r=this;mt(this.node_.children,function(t,e){n(new Ti(t,r,e))})},Ti.prototype.forEachDescendant=function(e,t,n){t&&!n&&e(this),this.forEachChild(function(t){t.forEachDescendant(e,!0,n)}),t&&n&&e(this)},Ti.prototype.forEachAncestor=function(t,e){for(var n=e?this:this.parent();null!==n;){if(t(n))return!0;n=n.parent()}return!1},Ti.prototype.forEachImmediateDescendantWithValue=function(e){this.forEachChild(function(t){null!==t.getValue()?e(t):t.forEachImmediateDescendantWithValue(e)})},Ti.prototype.path=function(){return new Tt(null===this.parent_?this.name_:this.parent_.path()+"/"+this.name_)},Ti.prototype.name=function(){return this.name_},Ti.prototype.parent=function(){return this.parent_},Ti.prototype.updateParents_=function(){null!==this.parent_&&this.parent_.updateChild_(this.name_,this)},Ti.prototype.updateChild_=function(t,e){var n=e.isEmpty(),r=N(this.node_.children,t);n&&r?(delete this.node_.children[t],this.node_.childCount--,this.updateParents_()):n||r||(this.node_.children[t]=e.node_,this.node_.childCount++,this.updateParents_())},Ti);function Ti(t,e,n){void 0===t&&(t=""),void 0===e&&(e=null),void 0===n&&(n=new bi),this.name_=t,this.parent_=e,this.node_=n}(wi=Ei=Ei||{})[wi.RUN=0]="RUN",wi[wi.SENT=1]="SENT",wi[wi.COMPLETED=2]="COMPLETED",wi[wi.SENT_NEEDS_ABORT=3]="SENT_NEEDS_ABORT",wi[wi.NEEDS_ABORT=4]="NEEDS_ABORT",ui.MAX_TRANSACTION_RETRIES_=25,ui.prototype.transactions_init_=function(){this.transactionQueueTree_=new Si},ui.prototype.startTransaction=function(t,e,n,r){this.log_("transaction on "+t);function i(){}var o=new mi(this,t);o.on("value",i);var s={path:t,update:e,onComplete:n,status:null,order:ct(),applyLocally:r,retryCount:0,unwatcher:function(){o.off("value",i)},abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=this.getLatestState_(t);s.currentInputSnapshot=a;var h=s.update(a.val());if(void 0===h){if(s.unwatcher(),s.currentOutputSnapshotRaw=null,s.currentOutputSnapshotResolved=null,s.onComplete){var l=new rn(s.currentInputSnapshot,new mi(this,s.path),Se);s.onComplete(null,!1,l)}}else{Xt("transaction failed: Data returned ",h,s.path),s.status=Ei.RUN;var u=this.transactionQueueTree_.subTree(t),c=u.getValue()||[];c.push(s),u.setValue(c);var p=void 0;if("object"==typeof h&&null!==h&&N(h,".priority"))p=R(h,".priority"),C(Mt(p),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.");else p=(this.serverSyncTree_.calcCompleteEventCache(t)||je.EMPTY_NODE).getPriority().val();p=p;var d=this.generateServerValues(),f=$e(h,p),_=wn(f,d);s.currentOutputSnapshotRaw=f,s.currentOutputSnapshotResolved=_,s.currentWriteId=this.getNextWriteId_();var y=this.serverSyncTree_.applyUserOverwrite(t,_,s.currentWriteId,s.applyLocally);this.eventQueue_.raiseEventsForChangedPath(t,y),this.sendReadyTransactions_()}},ui.prototype.getLatestState_=function(t,e){return this.serverSyncTree_.calcCompleteEventCache(t,e)||je.EMPTY_NODE},ui.prototype.sendReadyTransactions_=function(t){var e=this;if(void 0===t&&(t=this.transactionQueueTree_),t||this.pruneCompletedTransactionsBelowNode_(t),null!==t.getValue()){var n=this.buildTransactionQueue_(t);C(0<n.length,"Sending zero length transaction queue"),n.every(function(t){return t.status===Ei.RUN})&&this.sendTransactionQueue_(t.path(),n)}else t.hasChildren()&&t.forEachChild(function(t){e.sendReadyTransactions_(t)})},ui.prototype.sendTransactionQueue_=function(a,h){for(var l=this,t=h.map(function(t){return t.currentWriteId}),e=this.getLatestState_(a,t),n=e,r=e.hash(),i=0;i<h.length;i++){var o=h[i];C(o.status===Ei.RUN,"tryToSendTransactionQueue_: items in queue should all be run."),o.status=Ei.SENT,o.retryCount++;var s=Tt.relativePath(a,o.path);n=n.updateChild(s,o.currentOutputSnapshotRaw)}var u=n.val(!0),c=a;this.server_.put(c.toString(),u,function(t){l.log_("transaction put response",{path:c.toString(),status:t});var e=[];if("ok"===t){for(var n=[],r=0;r<h.length;r++){if(h[r].status=Ei.COMPLETED,e=e.concat(l.serverSyncTree_.ackUserWrite(h[r].currentWriteId)),h[r].onComplete){var i=h[r].currentOutputSnapshotResolved,o=new mi(l,h[r].path),s=new rn(i,o,Se);n.push(h[r].onComplete.bind(null,null,!0,s))}h[r].unwatcher()}l.pruneCompletedTransactionsBelowNode_(l.transactionQueueTree_.subTree(a)),l.sendReadyTransactions_(),l.eventQueue_.raiseEventsForChangedPath(a,e);for(r=0;r<n.length;r++)Et(n[r])}else{if("datastale"===t)for(r=0;r<h.length;r++)h[r].status===Ei.SENT_NEEDS_ABORT?h[r].status=Ei.NEEDS_ABORT:h[r].status=Ei.RUN;else{et("transaction at "+c.toString()+" failed: "+t);for(r=0;r<h.length;r++)h[r].status=Ei.NEEDS_ABORT,h[r].abortReason=t}l.rerunTransactions_(a)}},r)},ui.prototype.rerunTransactions_=function(t){var e=this.getAncestorTransactionNode_(t),n=e.path(),r=this.buildTransactionQueue_(e);return this.rerunTransactionQueue_(r,n),n},ui.prototype.rerunTransactionQueue_=function(t,e){if(0!==t.length){for(var n,r=[],i=[],o=t.filter(function(t){return t.status===Ei.RUN}).map(function(t){return t.currentWriteId}),s=0;s<t.length;s++){var a=t[s],h=Tt.relativePath(e,a.path),l=!1,u=void 0;if(C(null!==h,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===Ei.NEEDS_ABORT)l=!0,u=a.abortReason,i=i.concat(this.serverSyncTree_.ackUserWrite(a.currentWriteId,!0));else if(a.status===Ei.RUN)if(a.retryCount>=ui.MAX_TRANSACTION_RETRIES_)l=!0,u="maxretry",i=i.concat(this.serverSyncTree_.ackUserWrite(a.currentWriteId,!0));else{var c=this.getLatestState_(a.path,o);a.currentInputSnapshot=c;var p=t[s].update(c.val());if(void 0!==p){Xt("transaction failed: Data returned ",p,a.path);var d=$e(p);"object"==typeof p&&null!=p&&N(p,".priority")||(d=d.updatePriority(c.getPriority()));var f=a.currentWriteId,_=this.generateServerValues(),y=wn(d,_);a.currentOutputSnapshotRaw=d,a.currentOutputSnapshotResolved=y,a.currentWriteId=this.getNextWriteId_(),o.splice(o.indexOf(f),1),i=(i=i.concat(this.serverSyncTree_.applyUserOverwrite(a.path,y,a.currentWriteId,a.applyLocally))).concat(this.serverSyncTree_.ackUserWrite(f,!0))}else l=!0,u="nodata",i=i.concat(this.serverSyncTree_.ackUserWrite(a.currentWriteId,!0))}if(this.eventQueue_.raiseEventsForChangedPath(e,i),i=[],l&&(t[s].status=Ei.COMPLETED,n=t[s].unwatcher,setTimeout(n,Math.floor(0)),t[s].onComplete))if("nodata"===u){var v=new mi(this,t[s].path),g=t[s].currentInputSnapshot,m=new rn(g,v,Se);r.push(t[s].onComplete.bind(null,null,!1,m))}else r.push(t[s].onComplete.bind(null,new Error(u),!1,null))}this.pruneCompletedTransactionsBelowNode_(this.transactionQueueTree_);for(s=0;s<r.length;s++)Et(r[s]);this.sendReadyTransactions_()}},ui.prototype.getAncestorTransactionNode_=function(t){for(var e,n=this.transactionQueueTree_;null!==(e=t.getFront())&&null===n.getValue();)n=n.subTree(e),t=t.popFront();return n},ui.prototype.buildTransactionQueue_=function(t){var e=[];return this.aggregateTransactionQueuesForNode_(t,e),e.sort(function(t,e){return t.order-e.order}),e},ui.prototype.aggregateTransactionQueuesForNode_=function(t,e){var n=this,r=t.getValue();if(null!==r)for(var i=0;i<r.length;i++)e.push(r[i]);t.forEachChild(function(t){n.aggregateTransactionQueuesForNode_(t,e)})},ui.prototype.pruneCompletedTransactionsBelowNode_=function(t){var e=this,n=t.getValue();if(n){for(var r=0,i=0;i<n.length;i++)n[i].status!==Ei.COMPLETED&&(n[r]=n[i],r++);n.length=r,t.setValue(0<n.length?n:null)}t.forEachChild(function(t){e.pruneCompletedTransactionsBelowNode_(t)})},ui.prototype.abortTransactions_=function(t){var e=this,n=this.getAncestorTransactionNode_(t).path(),r=this.transactionQueueTree_.subTree(t);return r.forEachAncestor(function(t){e.abortTransactionsOnNode_(t)}),this.abortTransactionsOnNode_(r),r.forEachDescendant(function(t){e.abortTransactionsOnNode_(t)}),n},ui.prototype.abortTransactionsOnNode_=function(t){var e=t.getValue();if(null!==e){for(var n=[],r=[],i=-1,o=0;o<e.length;o++)if(e[o].status===Ei.SENT_NEEDS_ABORT);else if(e[o].status===Ei.SENT)C(i===o-1,"All SENT items should be at beginning of queue."),e[i=o].status=Ei.SENT_NEEDS_ABORT,e[o].abortReason="set";else if(C(e[o].status===Ei.RUN,"Unexpected transaction status in abort"),e[o].unwatcher(),r=r.concat(this.serverSyncTree_.ackUserWrite(e[o].currentWriteId,!0)),e[o].onComplete){n.push(e[o].onComplete.bind(null,new Error("set"),!1,null))}-1===i?t.setValue(null):e.length=i+1,this.eventQueue_.raiseEventsForChangedPath(t.path(),r);for(o=0;o<n.length;o++)Et(n[o])}};var Ii,Ni="databaseURL",Ri=(Pi.getInstance=function(){return Ii=Ii||new Pi},Pi.prototype.interrupt=function(){for(var t in this.repos_)for(var e in this.repos_[t])this.repos_[t][e].interrupt()},Pi.prototype.resume=function(){for(var t in this.repos_)for(var e in this.repos_[t])this.repos_[t][e].resume()},Pi.prototype.databaseFromApp=function(t,e){var n=e||t.options[Ni];void 0===n&&tt("Can't determine Firebase Database URL.  Be sure to include "+Ni+" option when calling firebase.initializeApp().");var r=Ft(n),i=r.repoInfo,o=void 0;return"undefined"!=typeof process&&(o=process.env[ut]),o&&(n="http://"+o+"?ns="+i.namespace,i=(r=Ft(n)).repoInfo),jt("Invalid Firebase Database URL",1,r),r.path.isEmpty()||tt("Database URL must point to the root of a Firebase Database (not including a child path)."),this.createRepo(i,t).database},Pi.prototype.deleteRepo=function(t){var e=R(this.repos_,t.app.name);e&&R(e,t.repoInfo_.toURLString())===t||tt("Database "+t.app.name+"("+t.repoInfo_+") has already been deleted."),t.interrupt(),delete e[t.repoInfo_.toURLString()]},Pi.prototype.createRepo=function(t,e){var n=R(this.repos_,e.name);n||(n={},this.repos_[e.name]=n);var r=R(n,t.toURLString());return r&&tt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new ui(t,this.useRestClient_,e),n[t.toURLString()]=r},Pi.prototype.forceRestClient=function(t){this.useRestClient_=t},Pi);function Pi(){this.repos_={},this.useRestClient_=!1}var Di=(Object.defineProperty(Oi.prototype,"app",{get:function(){return this.repo_.app},enumerable:!0,configurable:!0}),Oi.prototype.ref=function(t){return this.checkDeleted_("ref"),k("database.ref",0,1,arguments.length),t instanceof mi?this.refFromURL(t.toString()):void 0!==t?this.root_.child(t):this.root_},Oi.prototype.refFromURL=function(t){var e="database.refFromURL";this.checkDeleted_(e),k(e,1,1,arguments.length);var n=Ft(t);jt(e,1,n);var r=n.repoInfo;return r.host!==this.repo_.repoInfo_.host&&tt(e+": Host name does not match the current database: (found "+r.host+" but expected "+this.repo_.repoInfo_.host+")"),this.ref(n.path.toString())},Oi.prototype.checkDeleted_=function(t){null===this.repo_&&tt("Cannot call "+t+" on a deleted database.")},Oi.prototype.goOffline=function(){k("database.goOffline",0,0,arguments.length),this.checkDeleted_("goOffline"),this.repo_.interrupt()},Oi.prototype.goOnline=function(){k("database.goOnline",0,0,arguments.length),this.checkDeleted_("goOnline"),this.repo_.resume()},Oi.ServerValue={TIMESTAMP:{".sv":"timestamp"}},Oi);function Oi(t){(this.repo_=t)instanceof ui||tt("Don't call new Database() directly - please use firebase.database()."),this.root_=new mi(t,Tt.Empty),this.INTERNAL=new xi(this)}var xi=(ki.prototype.delete=function(){return function(o,s,a,h){return new(a=a||Promise)(function(t,e){function n(t){try{i(h.next(t))}catch(t){e(t)}}function r(t){try{i(h.throw(t))}catch(t){e(t)}}function i(e){e.done?t(e.value):new a(function(t){t(e.value)}).then(n,r)}i((h=h.apply(o,s||[])).next())})}(this,void 0,void 0,function(){return e(this,function(t){return this.database.checkDeleted_("delete"),Ri.getInstance().deleteRepo(this.database.repo_),this.database.repo_=null,this.database.root_=null,this.database.INTERNAL=null,this.database=null,[2]})})},ki);function ki(t){this.database=t}var Fi=Object.freeze({forceLongPolling:function(){Gr.forceDisallow(),Hr.forceAllow()},forceWebSockets:function(){Hr.forceDisallow()},isWebSocketsAvailable:function(){return Gr.isAvailable()},setSecurityDebugCallback:function(t,e){t.repo.persistentConnection_.securityDebugCallback_=e},stats:function(t,e){t.repo.stats(e)},statsIncrementCounter:function(t,e){t.repo.statsIncrementCounter(e)},dataUpdateCount:function(t){return t.repo.dataUpdateCount},interceptServerData:function(t,e){return t.repo.interceptServerData_(e)}}),Ai=ii;ii.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)},ii.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};var Li,Mi,Wi=Zr,Qi=xt,qi=Object.freeze({DataConnection:Ai,RealTimeConnection:Wi,hijackHash:function(i){var o=ii.prototype.put;return ii.prototype.put=function(t,e,n,r){void 0!==r&&(r=i()),o.call(this,t,e,n,r)},function(){ii.prototype.put=o}},ConnectionTarget:Qi,queryIdentifier:function(t){return t.queryIdentifier()},forceRestClient:function(t){Ri.getInstance().forceRestClient(t)}}),Ui=Di.ServerValue;Li=(Mi=Vi).SDK_VERSION,Yr=Li,Mi.INTERNAL.registerService("database",function(t,e,n){return Ri.getInstance().databaseFromApp(t,n)},{Reference:mi,Query:_n,Database:Di,DataSnapshot:rn,enableLogging:X,INTERNAL:Fi,ServerValue:Ui,TEST_ACCESS:qi},null,!0)}).apply(this,arguments)}catch(t){throw console.error(t),new Error("Cannot instantiate firebase-database - be sure to load firebase-app.js first.")}});
// sourceMappingURL=firebase-database.js.map
import {config} from"./firebase-config.js";
firebase.initializeApp(config);

function shapir(){
    
    var result, obJSON, auth_url, token_url, redirect_url, client_id, client_secret, response_type, scope, grant_type, client_auth, tok, expires_in, properties = [], methods = [], sitesToken=[], currentType="", results = [];
    
    return firebase.database().ref('/abstractions')
    .once('value')
    .then(snapshot=> {
        snapshot.forEach( childSnapshot=> { 
                var site = childSnapshot.key;    
                window[site] = {} //initilize function

                var promise = firebase.database().ref('/abstractions/'+site).once('value').then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) { 

                        let siteKey = childSnapshot.key;
                        let siteVal  = childSnapshot.val();
                        
                    if(siteKey == "objects"){
                        for (const [key, value] of Object.entries(siteVal)) {
                            let type = key;
                            let val  = eval(value);
                        
                        window[site][type] = function(...args) { return self(type, val, "self", "none", ...args) };  
                                                
                        function self (typekey, typeOb, caller, prop, ...args) { 
                            // console.log("typeOb:", typeOb)
                            // console.log("caller:", caller)
                            // console.log("callerTYPE:", typekey)
                            // console.log("typeId: ", typeOb.id)
                            // console.log("args: ", args)
                            currentType = typekey;

                            if(prop == "none"){
                                var endpoint = typeOb.construct[caller].endpoint;
                                var params = typeOb.construct[caller].input;
                                // var typeId = typeOb.id
                                // console.log("typeId1: ", typeId)
                            }else{
                                var arrEndpoints= typeOb.construct[caller];
                                console.log("arrEndpoints: ", arrEndpoints)
                                var elemIndex = arrEndpoints.findIndex(element => element.property == prop)
                                var endpoint = typeOb.construct[caller][elemIndex].endpoint;
                                var params = typeOb.construct[caller][elemIndex].input;
                                // var typeId = typeOb.construct[caller][elemIndex].id;
                                // console.log("typeId2: ", typeId)
                            }

                            var idValue = args[0];
                            var typeId = typeOb.id;
                            var properties = typeOb.properties;
                            var getters = typeOb.getters;
                            var setters = typeOb.setters;
                            var methods = typeOb.methods;
                            var fields=[], paramList="", mParamList="";

                            if(params){
                                for(var p=0; p<params.length; ++p){
                                    Object.entries(params[p]).forEach(([key, value]) => {
                                        paramList+=`${key}`
                                        paramList+="="
                                        paramList+=args[p]
                                    });
                                    if(p+1<params.length){
                                        paramList+="&" 
                                    }
                                }
                            }

                            for(var f=0; f< properties.length; ++f){
                                if(properties[f].field != undefined){
                                    fields.push(properties[f].property)
                                }
                            }

                            // return new Promise(function(resolve, reject) {resolve(fetch('https://scrapir.org/api/'+endpoint+'?'+paramList+'&Number of Results=2').then(response => response.json())) }).then(o => {                                        
                            return firebase.database().ref('/apis/'+endpoint).once('value').then(function(snapshot) {
                                obJSON = snapshot.val();
                                if(obJSON.oauth2){
                                    // console.log("oauth2")
                                    return new Promise((resolve, reject) => {
                                    console.log("auth function");
                                        auth_url= obJSON.oauth2[0].authURL;
                                        token_url= obJSON.oauth2[0].tokenURL;
                                        redirect_url= obJSON.oauth2[0].callbackURL;
                                        client_id= obJSON.oauth2[0].clientId;
                                        client_secret= obJSON.oauth2[0].clientSec;
                                        response_type= obJSON.oauth2[0].resType;
                                        scope= obJSON.oauth2[0].scope;
                                        grant_type= obJSON.oauth2[0].grantType;
                                        client_auth= obJSON.oauth2[0].clientAuth;
                                            
                                        var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                        //while(acToken === undefined){
                                        var pollTimer = window.setInterval(function() {
                                            try {
                                                console.log("url here: ", win.document.URL); //here url
                                                if (win.document.URL.indexOf(redirect_url) != -1) {
                                                    window.clearInterval(pollTimer);
                                                    var url =   win.document.URL;
                                                    acToken =   gup(url, 'code');
                                                    resolve(acToken)
                                                    // tokenType = gup(url, 'token_type');
                                                    // expiresIn = gup(url, 'expires_in');
                                                    win.close();
                                                    // return validateToken(acToken)
                                                }
                                            } catch(e) {
                                                console.log("error in oauth")
                                            }
                                        }, 200);

                                        function gup(url, name) {
                                            name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                            var regexS = "[\?&]"+name+"=([^&#]*)";
                                            var regex = new RegExp( regexS );
                                            var results = regex.exec( url );
                                            if( results == null )
                                                return "";
                                            else
                                                return results[1];
                                        }//end of gup()
                                        
                                    })
                                    .then(token=>{ 
                                        return new Promise((resolve, reject) => {
                                        console.log("Token: ",token)
                                        console.log("Token URL: ",token_url)
                                        $.ajax({
                                            url: token_url,
                                            method: "POST",
                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                            success: function(response) {
                                                console.log("response: ",response);
                                                //important to check access token and token type (e.g. bearer)
                                                tok = response.access_token;
                                                console.log("tok: ", tok)
                                                resolve('https://scrapir.org/api/'+endpoint+'?tokenAPI='+tok)
                                                //console.log("result: ",result);
                                                //return result;
                                            },
                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                console.log("error: ",response);
                                            }
                                        })
                                    })
                                    // return something
                                    })

                                }else{ //no oauth
                                    // console.log("NOT oauth2")
                                    result =  'https://scrapir.org/api/'+endpoint+'?'+paramList
                                    return result;
                                }
                            })//firebase
                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                            .then(o => {
                                console.log("result: ", o)
                                //map response to class properties                
                                if(o.constructor === Array){
                                    // console.log("ARRAY");
                                    o.forEach(function(ob) {
                                        for(var p=0; p<properties.length; ++p){
                                            if(properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                                if (properties[p].property != properties[p].field && ob[properties[p].field]) {
                                                    Object.defineProperty(ob, properties[p].property, Object.getOwnPropertyDescriptor(ob, properties[p].field));
                                                    delete ob[properties[p].field];
                                                }
                                            }else{ //if the property is a type
                                                let propType = properties[p].property;
                                                let typeName = properties[p].type;

                                                Object.defineProperty(ob, propType, { 
                                                    get: function() { 
                                                        let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                            console.log("typeOb4: ", snapshot.val())
                                                            // return self(snapshot.val(), type, propType, ob[typeId]);
                                                            return self(snapshot.key, snapshot.val(), currentType, propType, ob[typeId]);
                                                        });
                                                        return promise;
                                                    }
                                                });//end of getter
            
                                            }
                                        }
                                
                                        //***************************** GETTERS *********************************/


                                        //***************************** SETTERS *********************************/
                                        for(s in setters){
                                            // console.log("setter: ", setters[s])   
                                            var field = setters[s].field; //API endpoint field to be set
                                            var prop;
                                            var setEndpoint =  setters[s].endpoint;
                                            var setParams = setters[s].params;
                                            var idd = setters[s].id;
                                            //get the schema.org property mapped to this field
                                            for(var f=0; f< properties.length; ++f){
                                                if(properties[f].field == field){
                                                    prop = properties[f].property;
                                                }
                                            }

                                            Object.defineProperty(ob, prop, { 
                                                set: function(newValue) { 
                                                    console.log("newValue: ", newValue)
                                                    this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                    obJSON = snapshot.val();
                                                    console.log(obJSON)
                                                    if(obJSON.oauth2){
                                                        // console.log("oauth2")
                                                        return new Promise((resolve, reject) => {
                                                                console.log("auth function");
                                                                auth_url= obJSON.oauth2[0].authURL;
                                                                token_url= obJSON.oauth2[0].tokenURL;
                                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                                client_id= obJSON.oauth2[0].clientId;
                                                                client_secret= obJSON.oauth2[0].clientSec;
                                                                response_type= obJSON.oauth2[0].resType;
                                                                scope= obJSON.oauth2[0].scope;
                                                                grant_type= obJSON.oauth2[0].grantType;
                                                                client_auth= obJSON.oauth2[0].clientAuth;
                                                                    
                                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                var pollTimer = window.setInterval(function() {
                                                                    try {
                                                                        console.log("url here: ", win.document.URL); //here url
                                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                            window.clearInterval(pollTimer);
                                                                            var url =   win.document.URL;
                                                                            acToken =   gup(url, 'code');
                                                                            resolve(acToken)
                                                                            // tokenType = gup(url, 'token_type');
                                                                            // expiresIn = gup(url, 'expires_in');
                                                                            win.close();
                                                                            // return validateToken(acToken)
                                                                        }
                                                                    } catch(e) {
                                                                        console.log("error in oauth")
                                                                    }
                                                                }, 200);
                                    
                                                                function gup(url, name) {
                                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                    var regex = new RegExp( regexS );
                                                                    var results = regex.exec( url );
                                                                    if( results == null )
                                                                        return "";
                                                                    else
                                                                        return results[1];
                                                                }//end of gup()
                                                                
                                                            })
                                                            .then(token=>{ 
                                                                return new Promise((resolve, reject) => {
                                                                console.log("Token: ",token)
                                                                console.log("Token URL: ",token_url)
                                                                $.ajax({
                                                                    url: token_url,
                                                                    method: "POST",
                                                                    data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                    success: function(response) {
                                                                        console.log("response: ",response);
                                                                        //important to check access token and token type (e.g. bearer)
                                                                        tok = response.access_token;
                                                                        console.log("tok: ", tok)
                                                                        resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                    },
                                                                    error: function(response, jqXHR, textStatus, errorThrown) {
                                                                        console.log("error: ",response);
                                                                    }
                                                                })
                                                            })
                                                            // return something
                                                            })
                                    
                                                    }else{ //no oauth
                                                        // console.log("!!!oauth2")
                                                        result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                        //console.log("result: ",result);
                                                        return result;
                                                    }
                        
                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })
                                                    
                                                }
                                            });
                                        }

                                        //***************************** METHODS *********************************/
                                     if(methods){
                                        for(var m=0;  m<methods.length; ++m){
                                            var mName = methods[m].name;
                                            var mEndpoint = methods[m].endpoint;
                                            var mParams = methods[m].params;

                                            // add the imageId
                                            Object.defineProperty(ob, mName.toString(), { value: function(mArgs) { 
                                                // var paramLen = Object.entries(mArgs).length;
                                                // // console.log("paramLen: ", paramLen)

                                                // for (const [key, value] of Object.entries(mArgs)) {
                                                //     --paramLen
                                                //     console.log(`${key}: ${value}`);
                                                //     mParamList+= key
                                                //     mParamList+="="
                                                //     mParamList+= value
                                                //     if(paramLen>0){
                                                //         mParamList+="&" 
                                                //     }
                                                // }

                                                if(mArgs.length>0){
                                                    if(mParams){
                                                        for(var p=0; p<mParams.length; ++p){
                                                            //Object.entries(mParams[p]).forEach(([key, value]) => {
                                                                mParamList+=mParams[p]//`${key}`
                                                                mParamList+="="
                                                                mParamList+=mArgs[p]//THIS ASSUMES THAT id value will be sent
                                                            // });
                                                            if(p+1<mParams.length){
                                                                mParamList+="&" 
                                                            }
                                                        }
                                                    }
                                                }else{
                                                    mParamList+=mParams[0]
                                                    mParamList+="="
                                                    mParamList+=ob[mParams[0]]
                                                }

                                                console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                //console.log(obJSON)
                                            
                                                if(obJSON.oauth2){
                                                    // console.log("oauth2")
                    
                                                    var tokenPromise;
                                                    var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                    console.log(sTokens)
                                                    const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                    console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                    if(sTokens[elementsIndex].token!=""){
                                                                tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                .then(token=>{ 
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                            
                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }else{
                                                                tokenPromise= new Promise((resolve, reject) => {
                                                                    console.log("auth function");
                                                                    auth_url= obJSON.oauth2[0].authURL;
                                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                                    client_id= obJSON.oauth2[0].clientId;
                                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                                    response_type= obJSON.oauth2[0].resType;
                                                                    scope= obJSON.oauth2[0].scope;
                                                                    grant_type= obJSON.oauth2[0].grantType;
                                                                    client_auth= obJSON.oauth2[0].clientAuth;
                                                                        
                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                acToken =   gup(url, 'code');
                                                                                resolve(acToken)
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);
                                            
                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if( results == null )
                                                                            return "";
                                                                        else
                                                                            return results[1];
                                                                    }//end of gup()
                                                                        
                                                                })
                                                                .then(token=>{ 
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});

                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                            
                            
                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                        
                                                    return tokenPromise

                                
                                                }else{ //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }
                    
                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                            }
                                            });
                                        //   });

                                        }//loop to create methods
                                    }
                                    });//loop over array of objects


                                    //remove the fields that are not in the class
                                    var keys = Object.keys(o[0])
                                    for(var k=0; k<keys.length; ++k){
                                        if(!fields.includes(keys[k])){
                                            o.forEach(function(ob) {
                                                delete ob[keys[k]];
                                            })
                                        }
                                    }

                                }else{
                                    // console.log("NOT ARRAY")
                                    for(var p=0; p< properties.length; ++p){
                                        if(properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                            if (properties[p].property != properties[p].field && o[properties[p].field]) {
                                                Object.defineProperty(o, properties[p].property,Object.getOwnPropertyDescriptor(o, properties[p].field));
                                                delete o[properties[p].field];
                                            }
                                        }else{ //if the property is a type
                                            let propType = properties[p].property;
                                            let typeName = properties[p].type;                                
                                            console.log("typeId: ", typeId);
                                            console.log("o[typeId]1: ", o[typeId])
                                            var idVal = o[typeId];

                                            // creat a getter for property of type Type
                                            Object.defineProperty(o, propType, { 
                                                get: function() { 
                                                    let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                        console.log("typeOb1: ", snapshot.val())
                                                        console.log("o[typeId]2: ", idVal)
                                                        return self(snapshot.key, snapshot.val(), currentType, propType, idVal);
                                                    });
                                                    return promise;
                                                }
                                            });

                                            //*** if you want to remove the getter, replce iti with this 
                                            // o[propType]= function(){return ""};                               
                                            // (async function(){
                                            //     o[propType] = await firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                            //         console.log("typeOb1: ", snapshot.val())
                                            //         return self(snapshot.key, snapshot.val(), currentType, propType, o[typeId]);
                                            //     });
                                            //     return o;
                                            // })()
            
                                        }
                                    }//end of for loop properties

                                    //***************************** GETTERS *********************************/


                                    //***************************** SETTERS *********************************/
                                    for(s in setters){
                                        // console.log("setter: ", setters[s])   
                                        var field = setters[s].field; //API endpoint field to be set
                                        var prop;
                                        var setEndpoint =  setters[s].endpoint;
                                        var setParams = setters[s].params;
                                        var idd = setters[s].id;
                                        //get the schema.org property mapped to this field
                                        for(var f=0; f< properties.length; ++f){
                                            if(properties[f].field == field){
                                                prop = properties[f].property;
                                            }
                                        }

                                        Object.defineProperty(o, prop, { 
                                            set: function(newValue) { 
                                                console.log("newValue: ", newValue)
                                                this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                console.log(obJSON)
                                                if(obJSON.oauth2){
                                                    // console.log("oauth2")
                                                    return new Promise((resolve, reject) => {
                                                            console.log("auth function");
                                                            auth_url= obJSON.oauth2[0].authURL;
                                                            token_url= obJSON.oauth2[0].tokenURL;
                                                            redirect_url= obJSON.oauth2[0].callbackURL;
                                                            client_id= obJSON.oauth2[0].clientId;
                                                            client_secret= obJSON.oauth2[0].clientSec;
                                                            response_type= obJSON.oauth2[0].resType;
                                                            scope= obJSON.oauth2[0].scope;
                                                            grant_type= obJSON.oauth2[0].grantType;
                                                            client_auth= obJSON.oauth2[0].clientAuth;
                                                                
                                                            var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                            var pollTimer = window.setInterval(function() {
                                                                try {
                                                                    console.log("url here: ", win.document.URL); //here url
                                                                    if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                        window.clearInterval(pollTimer);
                                                                        var url =   win.document.URL;
                                                                        acToken =   gup(url, 'code');
                                                                        resolve(acToken)
                                                                        // tokenType = gup(url, 'token_type');
                                                                        // expiresIn = gup(url, 'expires_in');
                                                                        win.close();
                                                                        // return validateToken(acToken)
                                                                    }
                                                                } catch(e) {
                                                                    console.log("error in oauth")
                                                                }
                                                            }, 200);
                                
                                                            function gup(url, name) {
                                                                name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                var regex = new RegExp( regexS );
                                                                var results = regex.exec( url );
                                                                if( results == null )
                                                                    return "";
                                                                else
                                                                    return results[1];
                                                            }//end of gup()
                                                            
                                                        })
                                                        .then(token=>{ 
                                                            return new Promise((resolve, reject) => {
                                                            console.log("Token: ",token)
                                                            console.log("Token URL: ",token_url)
                                                            $.ajax({
                                                                url: token_url,
                                                                method: "POST",
                                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                success: function(response) {
                                                                    console.log("response: ",response);
                                                                    //important to check access token and token type (e.g. bearer)
                                                                    tok = response.access_token;
                                                                    console.log("tok: ", tok)
                                                                    resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                },
                                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                                    console.log("error: ",response);
                                                                }
                                                            })
                                                        })
                                                        // return something
                                                        })
                                
                                                }else{ //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                    //console.log("result: ",result);
                                                    return result;
                                                }
                    
                                            })//firebase
                                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })
                                                
                                            }
                                        });
                                    }

                                    //***************************** METHODS *********************************/
                                    if(methods){
                                    for(var m=0;  m<methods.length; ++m){
                                        // console.log("methods[m]: ", methods[m].name)
                                        var mName = methods[m].name;
                                        var mEndpoint = methods[m].endpoint;
                                        // var mParams = methods[m].params;
                
                                        Object.defineProperty(o, mName.toString(), { value: function(mArgs) { 
                                            // if(mParams){
                                            //     for(var p=0; p<mParams.length; ++p){
                                            //         //Object.entries(mParams[p]).forEach(([key, value]) => {
                                            //             mParamList+=mParams[p]//`${key}`
                                            //             mParamList+="="
                                            //             mParamList+=mArgs[p]
                                            //         // });
                                            //         if(p+1<mParams.length){
                                            //             mParamList+="&" 
                                            //         }
                                            //     }
                                            // }

                                            var paramLen = Object.entries(mArgs).length;
                                            // console.log("paramLen: ", paramLen)

                                            for (const [key, value] of Object.entries(mArgs)) {
                                                --paramLen
                                                console.log(`${key}: ${value}`);
                                                mParamList+= key
                                                mParamList+="="
                                                mParamList+= value
                                                if(paramLen>0){
                                                    mParamList+="&" 
                                                }
                                            }

                                            console.log("mParamList: ", mParamList)
                                            return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                            obJSON = snapshot.val();
                                            console.log(obJSON)
                                        
                                            if(obJSON.oauth2){
                                                // console.log("oauth2")
                
                                                var tokenPromise;
                                                var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                console.log(sTokens)
                                                const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                if(sTokens[elementsIndex].token!=""){
                                                            tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                            .then(token=>{ 
                                                                return new Promise((resolve, reject) => {
                                                                    console.log("Token: ",token)
                                                                    $.ajax({
                                                                        url: token_url,
                                                                        method: "POST",
                                                                        data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                        success: function(response) {
                                                                            console.log("response: ",response);
                                                                            tok = response.access_token;
                                                                            expires_in = response.expires_in;
                                                                            console.log("tok: ", tok)
                                                                            console.log("expires_in: ", expires_in)
                                                                            // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                            // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                            //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                            let newArray = [...sTokens]
                                                                            newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                            newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                            // this.setState({newArray});

                                                                            localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                            console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                        
                                                                            resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                        },
                                                                        error: function(response, jqXHR, textStatus, errorThrown) {
                                                                            console.log("error: ",response);
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }else{
                                                            tokenPromise= new Promise((resolve, reject) => {
                                                                console.log("auth function");
                                                                auth_url= obJSON.oauth2[0].authURL;
                                                                token_url= obJSON.oauth2[0].tokenURL;
                                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                                client_id= obJSON.oauth2[0].clientId;
                                                                client_secret= obJSON.oauth2[0].clientSec;
                                                                response_type= obJSON.oauth2[0].resType;
                                                                scope= obJSON.oauth2[0].scope;
                                                                grant_type= obJSON.oauth2[0].grantType;
                                                                client_auth= obJSON.oauth2[0].clientAuth;
                                                                    
                                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                var pollTimer = window.setInterval(function() {
                                                                    try {
                                                                        console.log("url here: ", win.document.URL); //here url
                                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                            window.clearInterval(pollTimer);
                                                                            var url =   win.document.URL;
                                                                            acToken =   gup(url, 'code');
                                                                            resolve(acToken)
                                                                            // tokenType = gup(url, 'token_type');
                                                                            // expiresIn = gup(url, 'expires_in');
                                                                            win.close();
                                                                        }
                                                                    } catch(e) {
                                                                        console.log("error in oauth")
                                                                    }
                                                                }, 200);
                                        
                                                                function gup(url, name) {
                                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                    var regex = new RegExp( regexS );
                                                                    var results = regex.exec( url );
                                                                    if( results == null )
                                                                        return "";
                                                                    else
                                                                        return results[1];
                                                                }//end of gup()
                                                                    
                                                            })
                                                            .then(token=>{ 
                                                                return new Promise((resolve, reject) => {
                                                                    console.log("Token: ",token)
                                                                    $.ajax({
                                                                        url: token_url,
                                                                        method: "POST",
                                                                        data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                        success: function(response) {
                                                                            console.log("response: ",response);
                                                                            tok = response.access_token;
                                                                            expires_in = response.expires_in;
                                                                            console.log("tok: ", tok)
                                                                            console.log("expires_in: ", expires_in)
                                                                            // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                            // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                            let newArray = [...sTokens]
                                                                            newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                            newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                            // this.setState({newArray});

                                                                            localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                            console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                        
                        
                                                                            resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                        },
                                                                        error: function(response, jqXHR, textStatus, errorThrown) {
                                                                            console.log("error: ",response);
                                                                        }
                                                                    })
                                                                })
                                                            })
                                                        }
                                    
                                                return tokenPromise

                            
                                            }else{ //no oauth
                                                // console.log("!!!oauth2")
                                                result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                return result;
                                            }
                
                                            })//firebase
                                            .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                        }
                                        });
                                    //   });

                                    }//loop to create methods
                                    }
                                    //remove the fields that are not in the class
                                    var keys = Object.keys(o)
                                    for(var k=0; k<keys.length; ++k){
                                        if(!fields.includes(keys[k])){
                                            delete o[keys[k]];
                                        }
                                    }
                                }//end of else of no array

                                return o;
                            })         
                            // return obj; 
                        };//end of self function

                    }
                    }//if objects

                    if(siteKey == "functions"){
                        for (var v=0; v< siteVal.length; ++v) {
                            // console.log("siteVal[v]: ", siteVal[v])
                            let funcName = siteVal[v].name;
                            //var mName = methods[m].name;
                            let mEndpoint = siteVal[v].endpoint;
                            // let mParams = siteVal[v].params;
                            let mObject = siteVal[v].object;
                            let mParamList="";
                            let mID = siteVal[v].id;

                            var properties=[], fields=[];
                            firebase.database().ref('/abstractions/'+site+'/objects/'+mObject+'/properties').once('value').then(function(snapshot) {
                                snapshot.forEach(function(childSnapshot) { 
                                    properties.push(childSnapshot.val())
                                })
                            }).then(()=>{
                                for(var f=0; f< properties.length; ++f){
                                    if(properties[f].field != undefined){
                                        fields.push(properties[f].property)
                                    }
                                }
                            })

                            window[site][funcName] = function(...mArgs) { return siteFunction(...mArgs) }; 
                            
                            function siteFunction(mArgs) { 
                                // console.log("site: ", site)
                                var paramLen = Object.entries(mArgs).length;

                                for (const [key, value] of Object.entries(mArgs)) {
                                    --paramLen
                                    console.log(`${key}: ${value}`);
                                    mParamList+= key
                                    mParamList+="="
                                    mParamList+= value
                                    if(paramLen>0){
                                        mParamList+="&" 
                                    }
                                }
                                //   console.log("mParamList: ", mParamList)
                                // if(mArgs.length>0){
                                //     if(mParams){
                                //         for(var p=0; p<Object.entries(mArgs).length; ++p){
                                //                 mParamList+=mParams[p]//`${key}`
                                //                 mParamList+="="
                                //                 mParamList+=mArgs[p]//THIS ASSUMES THAT id value will be sent
                                //             if(p+1<mParams.length){
                                //                 mParamList+="&" 
                                //             }
                                //         }
                                //     }
                                // }else{
                                //     // console.log("methods[m]:2 ", ob.imageId)
                                //     // let elemIndexM = properties.findIndex(element => element.field == methods[m].params[0])
                                //     // let endpointM = properties[elemIndexM].property;
                                //     // console.log("HERE: ", ob[endpointM])
                                //     mParamList+=mParams[0]
                                //     mParamList+="="
                                //     mParamList+=ob[mParams[0]]
                                // }

                                console.log("mParamList: ", mParamList)
                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                obJSON = snapshot.val();
                                //console.log(obJSON)
                            
                                if(obJSON.oauth2){
                                    // console.log("oauth2")

                                    var tokenPromise;
                                    var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                    console.log(sTokens)
                                    const elementsIndex = sTokens.findIndex(element => element.site == site)
                                    console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                    if(sTokens[elementsIndex].token!=""){
                                                tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                .then(token=>{ 
                                                    return new Promise((resolve, reject) => {
                                                        console.log("Token: ",token)
                                                        $.ajax({
                                                            url: token_url,
                                                            method: "POST",
                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                            success: function(response) {
                                                                console.log("response: ",response);
                                                                tok = response.access_token;
                                                                expires_in = response.expires_in;
                                                                console.log("tok: ", tok)
                                                                console.log("expires_in: ", expires_in)
                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                let newArray = [...sTokens]
                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                // this.setState({newArray});

                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))

                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                            },
                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                console.log("error: ",response);
                                                            }
                                                        })
                                                    })
                                                })
                                            }else{
                                                tokenPromise= new Promise((resolve, reject) => {
                                                    console.log("auth function");
                                                    auth_url= obJSON.oauth2[0].authURL;
                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                    client_id= obJSON.oauth2[0].clientId;
                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                    response_type= obJSON.oauth2[0].resType;
                                                    scope= obJSON.oauth2[0].scope;
                                                    grant_type= obJSON.oauth2[0].grantType;
                                                    client_auth= obJSON.oauth2[0].clientAuth;
                                                        
                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                    var pollTimer = window.setInterval(function() {
                                                        try {
                                                            console.log("url here: ", win.document.URL); //here url
                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                window.clearInterval(pollTimer);
                                                                var url =   win.document.URL;
                                                                acToken =   gup(url, 'code');
                                                                resolve(acToken)
                                                                // tokenType = gup(url, 'token_type');
                                                                // expiresIn = gup(url, 'expires_in');
                                                                win.close();
                                                            }
                                                        } catch(e) {
                                                            console.log("error in oauth")
                                                        }
                                                    }, 200);
                            
                                                    function gup(url, name) {
                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                        var regex = new RegExp( regexS );
                                                        var results = regex.exec( url );
                                                        if( results == null )
                                                            return "";
                                                        else
                                                            return results[1];
                                                    }//end of gup()
                                                        
                                                })
                                                .then(token=>{ 
                                                    return new Promise((resolve, reject) => {
                                                        console.log("Token: ",token)
                                                        $.ajax({
                                                            url: token_url,
                                                            method: "POST",
                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                            success: function(response) {
                                                                console.log("response: ",response);
                                                                tok = response.access_token;
                                                                expires_in = response.expires_in;
                                                                console.log("tok: ", tok)
                                                                console.log("expires_in: ", expires_in)
                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                let newArray = [...sTokens]
                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                // this.setState({newArray});

                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))


                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                            },
                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                console.log("error: ",response);
                                                            }
                                                        })
                                                    })
                                                })
                                            }
                        
                                    return tokenPromise

                
                                }else{ //no oauth
                                    // console.log("!!!oauth2")
                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                    return result;
                                }

                                })//firebase
                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                .then(o => {
                                    console.log("result: ", o)
                                    // console.log("properties!!! ", properties)

                                    //map response to class properties                
                                    if(o.constructor === Array){
                                        console.log("ARRAY");
                                        o.forEach(function(ob) {
                                            for(var p=0; p<properties.length; ++p){
                                                if(properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                                    if (properties[p].property != properties[p].field && ob[properties[p].field]) {
                                                        Object.defineProperty(ob, properties[p].property, Object.getOwnPropertyDescriptor(ob, properties[p].field));
                                                        delete ob[properties[p].field];
                                                    }
                                                }else{ //if the property is a type
                                                    let propType = properties[p].property;
                                                    let typeName = properties[p].type;
                                                    let idVal = ob[mID]
                                                    // console.log("typeIdFun1: ", mID)
                                                    // console.log("ob[typeId]Fun1: ", ob[mID])
                
                                                    Object.defineProperty(ob, propType, { 
                                                        get: function() { 
                                                            let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                                console.log("typeOb2: ", snapshot.val())
                                                                // return self(snapshot.val(), type, propType, ob[typeId]);
                                                                return self(snapshot.key, snapshot.val(), mObject, propType, idVal);

                                                            });
                                                            return promise;
                                                        }
                                                    });//end of getter
                
                                                }
                                            }
                                    
                                            //***************************** GETTERS *********************************/
                
                
                                            //***************************** SETTERS *********************************/
                                            // if(setters){
                                            // for(s in setters){
                                            //     // console.log("setter: ", setters[s])   
                                            //     var field = setters[s].field; //API endpoint field to be set
                                            //     var prop;
                                            //     var setEndpoint =  setters[s].endpoint;
                                            //     var setParams = setters[s].params;
                                            //     var idd = setters[s].id;
                                            //     //get the schema.org property mapped to this field
                                            //     for(f in properties){
                                            //         if(properties[f].field == field){
                                            //             prop = properties[f].property;
                                            //         }
                                            //     }
                
                                            //     Object.defineProperty(ob, prop, { 
                                            //         set: function(newValue) { 
                                            //             console.log("newValue: ", newValue)
                                            //             this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                            //             obJSON = snapshot.val();
                                            //             console.log(obJSON)
                                            //             if(obJSON.oauth2){
                                            //                 console.log("oauth2")
                                            //                 return new Promise((resolve, reject) => {
                                            //                         console.log("auth function");
                                            //                         auth_url= obJSON.oauth2[0].authURL;
                                            //                         token_url= obJSON.oauth2[0].tokenURL;
                                            //                         redirect_url= obJSON.oauth2[0].callbackURL;
                                            //                         client_id= obJSON.oauth2[0].clientId;
                                            //                         client_secret= obJSON.oauth2[0].clientSec;
                                            //                         response_type= obJSON.oauth2[0].resType;
                                            //                         scope= obJSON.oauth2[0].scope;
                                            //                         grant_type= obJSON.oauth2[0].grantType;
                                            //                         client_auth= obJSON.oauth2[0].clientAuth;
                                                                        
                                            //                         var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                            //                         var pollTimer = window.setInterval(function() {
                                            //                             try {
                                            //                                 console.log("url here: ", win.document.URL); //here url
                                            //                                 if (win.document.URL.indexOf(redirect_url) != -1) {
                                            //                                     window.clearInterval(pollTimer);
                                            //                                     var url =   win.document.URL;
                                            //                                     acToken =   gup(url, 'code');
                                            //                                     resolve(acToken)
                                            //                                     // tokenType = gup(url, 'token_type');
                                            //                                     // expiresIn = gup(url, 'expires_in');
                                            //                                     win.close();
                                            //                                     // return validateToken(acToken)
                                            //                                 }
                                            //                             } catch(e) {
                                            //                                 console.log("error in oauth")
                                            //                             }
                                            //                         }, 200);
                                        
                                            //                         function gup(url, name) {
                                            //                             name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                            //                             var regexS = "[\?&]"+name+"=([^&#]*)";
                                            //                             var regex = new RegExp( regexS );
                                            //                             var results = regex.exec( url );
                                            //                             if( results == null )
                                            //                                 return "";
                                            //                             else
                                            //                                 return results[1];
                                            //                         }//end of gup()
                                                                    
                                            //                     })
                                            //                     .then(token=>{ 
                                            //                         return new Promise((resolve, reject) => {
                                            //                         console.log("Token: ",token)
                                            //                         console.log("Token URL: ",token_url)
                                            //                         $.ajax({
                                            //                             url: token_url,
                                            //                             method: "POST",
                                            //                             data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                            //                             success: function(response) {
                                            //                                 console.log("response: ",response);
                                            //                                 //important to check access token and token type (e.g. bearer)
                                            //                                 tok = response.access_token;
                                            //                                 console.log("tok: ", tok)
                                            //                                 resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                            //                             },
                                            //                             error: function(response, jqXHR, textStatus, errorThrown) {
                                            //                                 console.log("error: ",response);
                                            //                             }
                                            //                         })
                                            //                     })
                                            //                     // return something
                                            //                     })
                                        
                                            //             }else{ //no oauth
                                            //                 console.log("!!!oauth2")
                                            //                 result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                            //                 //console.log("result: ",result);
                                            //                 return result;
                                            //             }
                            
                                            //         })//firebase
                                            //         .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })
                                                        
                                            //         }
                                            //     });
                                            // }}
                
                                            //***************************** METHODS *********************************/
                                         if(methods){ 
                                            for(var m=0;  m<methods.length; ++m){
                                                var mName = methods[m].name;
                                                var mEndpoint = methods[m].endpoint;
                                                var mParams = methods[m].params;

                                                // add the imageId
                                                Object.defineProperty(ob, mName.toString(), { value: function(...mArgs) { 
                                                    if(mArgs.length>0){
                                                        if(mParams){
                                                            for(var p=0; p<mParams.length; ++p){
                                                                //Object.entries(mParams[p]).forEach(([key, value]) => {
                                                                    mParamList+=mParams[p]//`${key}`
                                                                    mParamList+="="
                                                                    mParamList+=mArgs[p]//THIS ASSUMES THAT id value will be sent
                                                                // });
                                                                if(p+1<mParams.length){
                                                                    mParamList+="&" 
                                                                }
                                                            }
                                                        }
                                                    }else{
                                                        // console.log("methods[m]:2 ", ob.imageId)
                                                        // let elemIndexM = properties.findIndex(element => element.field == methods[m].params[0])
                                                        // let endpointM = properties[elemIndexM].property;
                                                        // console.log("HERE: ", ob[endpointM])
                                                        mParamList+=mParams[0]
                                                        mParamList+="="
                                                        mParamList+=ob[mParams[0]]
                                                    }
                
                                                    console.log("mParamList: ", mParamList)
                                                    return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                    obJSON = snapshot.val();
                                                    //console.log(obJSON)
                                                
                                                    if(obJSON.oauth2){
                                                        // console.log("oauth2")
                        
                                                        var tokenPromise;
                                                        var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                        console.log(sTokens)
                                                        const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                        console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                        if(sTokens[elementsIndex].token!=""){
                                                                    tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                    .then(token=>{ 
                                                                        return new Promise((resolve, reject) => {
                                                                            console.log("Token: ",token)
                                                                            $.ajax({
                                                                                url: token_url,
                                                                                method: "POST",
                                                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                                success: function(response) {
                                                                                    console.log("response: ",response);
                                                                                    tok = response.access_token;
                                                                                    expires_in = response.expires_in;
                                                                                    console.log("tok: ", tok)
                                                                                    console.log("expires_in: ", expires_in)
                                                                                    // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                    // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                    //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                    let newArray = [...sTokens]
                                                                                    newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                    newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                    // this.setState({newArray});
                
                                                                                    localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                    console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                                
                                                                                    resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                                },
                                                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                    console.log("error: ",response);
                                                                                }
                                                                            })
                                                                        })
                                                                    })
                                                                }else{
                                                                    tokenPromise= new Promise((resolve, reject) => {
                                                                        console.log("auth function");
                                                                        auth_url= obJSON.oauth2[0].authURL;
                                                                        token_url= obJSON.oauth2[0].tokenURL;
                                                                        redirect_url= obJSON.oauth2[0].callbackURL;
                                                                        client_id= obJSON.oauth2[0].clientId;
                                                                        client_secret= obJSON.oauth2[0].clientSec;
                                                                        response_type= obJSON.oauth2[0].resType;
                                                                        scope= obJSON.oauth2[0].scope;
                                                                        grant_type= obJSON.oauth2[0].grantType;
                                                                        client_auth= obJSON.oauth2[0].clientAuth;
                                                                            
                                                                        var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                        var pollTimer = window.setInterval(function() {
                                                                            try {
                                                                                console.log("url here: ", win.document.URL); //here url
                                                                                if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                    window.clearInterval(pollTimer);
                                                                                    var url =   win.document.URL;
                                                                                    acToken =   gup(url, 'code');
                                                                                    resolve(acToken)
                                                                                    // tokenType = gup(url, 'token_type');
                                                                                    // expiresIn = gup(url, 'expires_in');
                                                                                    win.close();
                                                                                }
                                                                            } catch(e) {
                                                                                console.log("error in oauth")
                                                                            }
                                                                        }, 200);
                                                
                                                                        function gup(url, name) {
                                                                            name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                            var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                            var regex = new RegExp( regexS );
                                                                            var results = regex.exec( url );
                                                                            if( results == null )
                                                                                return "";
                                                                            else
                                                                                return results[1];
                                                                        }//end of gup()
                                                                            
                                                                    })
                                                                    .then(token=>{ 
                                                                        return new Promise((resolve, reject) => {
                                                                            console.log("Token: ",token)
                                                                            $.ajax({
                                                                                url: token_url,
                                                                                method: "POST",
                                                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                                success: function(response) {
                                                                                    console.log("response: ",response);
                                                                                    tok = response.access_token;
                                                                                    expires_in = response.expires_in;
                                                                                    console.log("tok: ", tok)
                                                                                    console.log("expires_in: ", expires_in)
                                                                                    // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                    // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                    let newArray = [...sTokens]
                                                                                    newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                    newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                    // this.setState({newArray});
                
                                                                                    localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                    console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                                
                                
                                                                                    resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                                },
                                                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                    console.log("error: ",response);
                                                                                }
                                                                            })
                                                                        })
                                                                    })
                                                                }
                                            
                                                        return tokenPromise
                
                                    
                                                    }else{ //no oauth
                                                        // console.log("!!!oauth2")
                                                        result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                        return result;
                                                    }
                        
                                                    })//firebase
                                                    .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                                }
                                                });
                                            //   });
                
                                            }//loop to create methods
                                           }
                                                
                                        });//loop over array of objects
                
                
                                        //remove the fields that are not in the class
                                        var keys = Object.keys(o[0])
                                        for(var k=0; k<keys.length; ++k){
                                            if(!fields.includes(keys[k])){
                                                o.forEach(function(ob) {
                                                    delete ob[keys[k]];
                                                })
                                            }
                                        }
                
                                    }else{
                                        // console.log("NOT ARRAY")
                                        for(var p=0; p<properties.length; ++p){
                                            if(properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                                if (properties[p].property != properties[p].field && o[properties[p].field]) {
                                                    Object.defineProperty(o, properties[p].property,Object.getOwnPropertyDescriptor(o, properties[p].field));
                                                    delete o[properties[p].field];
                                                }
                                            }else{ //if the property is a type
                                                let propType = properties[p].property;
                                                let typeName = properties[p].type;
                                                let idVal = ob[mID]
                                                console.log("typeIdFun2: ", mID)
                                                console.log("ob[typeId]Fun2: ", ob[mID])

                                                // creat a getter for property of type Type
                                                this.status = {};
                                                Object.defineProperty(o, propType, { 
                                                    enumerable: true,
                                                    get: function() { 
                                                        let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                            console.log("typeOb3: ", snapshot.val())
                                                            // return self(snapshot.val(), type, propType, o[typeId]);
                                                            return self(snapshot.key, snapshot.val(), mObject, propType, idVal);
                                                        });
                                                        return promise;
                                                    }
                                                });
                                            }
                                        }//end of for loop properties
                
                                        //***************************** GETTERS *********************************/
                
                
                                        //***************************** SETTERS *********************************/
                                        for(s in setters){
                                            // console.log("setter: ", setters[s])   
                                            var field = setters[s].field; //API endpoint field to be set
                                            var prop;
                                            var setEndpoint =  setters[s].endpoint;
                                            var setParams = setters[s].params;
                                            var idd = setters[s].id;
                                            //get the schema.org property mapped to this field
                                            for(var f=0; f< properties.length; ++f){
                                                if(properties[f].field == field){
                                                    prop = properties[f].property;
                                                }
                                            }
                
                                            Object.defineProperty(o, prop, { 
                                                set: function(newValue) { 
                                                    console.log("newValue: ", newValue)
                                                    this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                    obJSON = snapshot.val();
                                                    console.log(obJSON)
                                                    if(obJSON.oauth2){
                                                        // console.log("oauth2")
                                                        return new Promise((resolve, reject) => {
                                                                console.log("auth function");
                                                                auth_url= obJSON.oauth2[0].authURL;
                                                                token_url= obJSON.oauth2[0].tokenURL;
                                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                                client_id= obJSON.oauth2[0].clientId;
                                                                client_secret= obJSON.oauth2[0].clientSec;
                                                                response_type= obJSON.oauth2[0].resType;
                                                                scope= obJSON.oauth2[0].scope;
                                                                grant_type= obJSON.oauth2[0].grantType;
                                                                client_auth= obJSON.oauth2[0].clientAuth;
                                                                    
                                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                var pollTimer = window.setInterval(function() {
                                                                    try {
                                                                        console.log("url here: ", win.document.URL); //here url
                                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                            window.clearInterval(pollTimer);
                                                                            var url =   win.document.URL;
                                                                            acToken =   gup(url, 'code');
                                                                            resolve(acToken)
                                                                            // tokenType = gup(url, 'token_type');
                                                                            // expiresIn = gup(url, 'expires_in');
                                                                            win.close();
                                                                            // return validateToken(acToken)
                                                                        }
                                                                    } catch(e) {
                                                                        console.log("error in oauth")
                                                                    }
                                                                }, 200);
                                    
                                                                function gup(url, name) {
                                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                    var regex = new RegExp( regexS );
                                                                    var results = regex.exec( url );
                                                                    if( results == null )
                                                                        return "";
                                                                    else
                                                                        return results[1];
                                                                }//end of gup()
                                                                
                                                            })
                                                            .then(token=>{ 
                                                                return new Promise((resolve, reject) => {
                                                                console.log("Token: ",token)
                                                                console.log("Token URL: ",token_url)
                                                                $.ajax({
                                                                    url: token_url,
                                                                    method: "POST",
                                                                    data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                    success: function(response) {
                                                                        console.log("response: ",response);
                                                                        //important to check access token and token type (e.g. bearer)
                                                                        tok = response.access_token;
                                                                        console.log("tok: ", tok)
                                                                        resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                    },
                                                                    error: function(response, jqXHR, textStatus, errorThrown) {
                                                                        console.log("error: ",response);
                                                                    }
                                                                })
                                                            })
                                                            // return something
                                                            })
                                    
                                                    }else{ //no oauth
                                                        // console.log("!!!oauth2")
                                                        result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                        //console.log("result: ",result);
                                                        return result;
                                                    }
                        
                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })
                                                    
                                                }
                                            });
                                        }
                
                                        //***************************** METHODS *********************************/
                                      if(methods){
                                        for(var m=0;  m<methods.length; ++m){
                                            // console.log("methods[m]: ", methods[m].name)
                                            var mName = methods[m].name;
                                            var mEndpoint = methods[m].endpoint;
                                            var mParams = methods[m].params;
                    
                                            Object.defineProperty(o, mName.toString(), { value: function(...mArgs) { 
                                                if(mParams){
                                                    for(var p=0; p<mParams.length; ++p){
                                                        //Object.entries(mParams[p]).forEach(([key, value]) => {
                                                            mParamList+=mParams[p]//`${key}`
                                                            mParamList+="="
                                                            mParamList+=mArgs[p]
                                                        // });
                                                        if(p+1<mParams.length){
                                                            mParamList+="&" 
                                                        }
                                                    }
                                                }
                                                console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                console.log(obJSON)
                                            
                                                if(obJSON.oauth2){
                                                    // console.log("oauth2")
                    
                                                    var tokenPromise;
                                                    var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                    console.log(sTokens)
                                                    const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                    console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                    if(sTokens[elementsIndex].token!=""){
                                                                tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                .then(token=>{ 
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});
                
                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                            
                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }else{
                                                                tokenPromise= new Promise((resolve, reject) => {
                                                                    console.log("auth function");
                                                                    auth_url= obJSON.oauth2[0].authURL;
                                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                                    client_id= obJSON.oauth2[0].clientId;
                                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                                    response_type= obJSON.oauth2[0].resType;
                                                                    scope= obJSON.oauth2[0].scope;
                                                                    grant_type= obJSON.oauth2[0].grantType;
                                                                    client_auth= obJSON.oauth2[0].clientAuth;
                                                                        
                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                acToken =   gup(url, 'code');
                                                                                resolve(acToken)
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);
                                            
                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if( results == null )
                                                                            return "";
                                                                        else
                                                                            return results[1];
                                                                    }//end of gup()
                                                                        
                                                                })
                                                                .then(token=>{ 
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});
                
                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                            
                            
                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                        
                                                    return tokenPromise
                
                                
                                                }else{ //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }
                    
                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                            }
                                            });
                                        //   });
                
                                        }//loop to create methods
                                      }
                                        //remove the fields that are not in the class
                                        var keys = Object.keys(o)
                                        for(var k=0; k<keys.length; ++k){
                                            if(!fields.includes(keys[k])){
                                                delete o[keys[k]];
                                            }
                                        }
                                    }//end of else of no array
                
                                    return o;
                                })  
                            
                            }


                            function self (typekey, typeOb, caller, prop, ...args) { 
                                // console.log("typeOb:", typeOb)
                                // console.log("caller:", caller)
                                console.log("callerTYPE:", typekey)
                                console.log("typeId: ", typeOb.id)
                                console.log("args: ", args)
                
                                currentType = typekey;
                
                                // console.log("prop:", prop)
                
                                if(prop == "none"){
                                    var endpoint = typeOb.construct[caller].endpoint;
                                    var params = typeOb.construct[caller].input;
                                    // var typeId = typeOb.id
                                    // console.log("typeId1: ", typeId)
                                }else{
                                    var arrEndpoints= typeOb.construct[caller];
                                    console.log("arrEndpoints: ", arrEndpoints)
                                    var elemIndex = arrEndpoints.findIndex(element => element.property == prop)
                                    var endpoint = typeOb.construct[caller][elemIndex].endpoint;
                                    var params = typeOb.construct[caller][elemIndex].input;
                                    // var typeId = typeOb.construct[caller][elemIndex].id;
                                    // console.log("typeId2: ", typeId)
                                }
                
                                var idValue = args[0];
                                var typeId = typeOb.id;
                                var properties = typeOb.properties;
                                var getters = typeOb.getters;
                                var setters = typeOb.setters;
                                var methods = typeOb.methods;
                                var fields=[], paramList="", mParamList="";
                
                                if(params){
                                    for(var p=0; p<params.length; ++p){
                                        Object.entries(params[p]).forEach(([key, value]) => {
                                            paramList+=`${key}`
                                            paramList+="="
                                            paramList+=args[p]
                                        });
                                        if(p+1<params.length){
                                            paramList+="&" 
                                        }
                                    }
                                }
                
                                for(var f=0; f< properties.length; ++f){
                                    if(properties[f].field != undefined){
                                        fields.push(properties[f].property)
                                    }
                                }
                
                                // var obj={};
                                // return new Promise(function(resolve, reject) {resolve(fetch('https://scrapir.org/api/'+endpoint+'?'+paramList+'&Number of Results=2').then(response => response.json())) }).then(o => {                                        
                                return firebase.database().ref('/apis/'+endpoint).once('value').then(function(snapshot) {
                                    obJSON = snapshot.val();
                                    if(obJSON.oauth2){
                                        // console.log("oauth2")
                                        return new Promise((resolve, reject) => {
                                        console.log("auth function");
                                            auth_url= obJSON.oauth2[0].authURL;
                                            token_url= obJSON.oauth2[0].tokenURL;
                                            redirect_url= obJSON.oauth2[0].callbackURL;
                                            client_id= obJSON.oauth2[0].clientId;
                                            client_secret= obJSON.oauth2[0].clientSec;
                                            response_type= obJSON.oauth2[0].resType;
                                            scope= obJSON.oauth2[0].scope;
                                            grant_type= obJSON.oauth2[0].grantType;
                                            client_auth= obJSON.oauth2[0].clientAuth;
                                                
                                            var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                            //while(acToken === undefined){
                                            var pollTimer = window.setInterval(function() {
                                                try {
                                                    console.log("url here: ", win.document.URL); //here url
                                                    if (win.document.URL.indexOf(redirect_url) != -1) {
                                                        window.clearInterval(pollTimer);
                                                        var url =   win.document.URL;
                                                        acToken =   gup(url, 'code');
                                                        resolve(acToken)
                                                        // tokenType = gup(url, 'token_type');
                                                        // expiresIn = gup(url, 'expires_in');
                                                        win.close();
                                                        // return validateToken(acToken)
                                                    }
                                                } catch(e) {
                                                    console.log("error in oauth")
                                                }
                                            }, 200);
                
                                            function gup(url, name) {
                                                name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                var regexS = "[\?&]"+name+"=([^&#]*)";
                                                var regex = new RegExp( regexS );
                                                var results = regex.exec( url );
                                                if( results == null )
                                                    return "";
                                                else
                                                    return results[1];
                                            }//end of gup()
                                            
                                        })
                                        .then(token=>{ 
                                            return new Promise((resolve, reject) => {
                                            console.log("Token: ",token)
                                            console.log("Token URL: ",token_url)
                                            $.ajax({
                                                url: token_url,
                                                method: "POST",
                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                success: function(response) {
                                                    console.log("response: ",response);
                                                    //important to check access token and token type (e.g. bearer)
                                                    tok = response.access_token;
                                                    console.log("tok: ", tok)
                                                    resolve('https://scrapir.org/api/'+endpoint+'?tokenAPI='+tok)
                                                    //console.log("result: ",result);
                                                    //return result;
                                                },
                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                    console.log("error: ",response);
                                                }
                                            })
                                        })
                                        // return something
                                        })
                
                                    }else{ //no oauth
                                        // console.log("NOT oauth2")
                                        result =  'https://scrapir.org/api/'+endpoint+'?'+paramList
                                        return result;
                                    }
                                })//firebase
                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                .then(o => {
                                    console.log("result: ", o)
                                    //map response to class properties                
                                    if(o.constructor === Array){
                                        // console.log("ARRAY");
                                        o.forEach(function(ob) {
                                            for(var p=0; p<properties.length; ++p){
                                                if(properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                                    if (properties[p].property != properties[p].field && ob[properties[p].field]) {
                                                        Object.defineProperty(ob, properties[p].property, Object.getOwnPropertyDescriptor(ob, properties[p].field));
                                                        delete ob[properties[p].field];
                                                    }
                                                }else{ //if the property is a type
                                                    let propType = properties[p].property;
                                                    let typeName = properties[p].type;
                
                                                    Object.defineProperty(ob, propType, { 
                                                        get: function() { 
                                                            let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                                console.log("typeOb4: ", snapshot.val())
                                                                // return self(snapshot.val(), type, propType, ob[typeId]);
                                                                return self(snapshot.key, snapshot.val(), currentType, propType, ob[typeId]);
                                                            });
                                                            return promise;
                                                        }
                                                    });//end of getter
                
                                                }
                                            }
                                    
                                            //***************************** GETTERS *********************************/
                
                
                                            //***************************** SETTERS *********************************/
                                            for(s in setters){
                                                // console.log("setter: ", setters[s])   
                                                var field = setters[s].field; //API endpoint field to be set
                                                var prop;
                                                var setEndpoint =  setters[s].endpoint;
                                                var setParams = setters[s].params;
                                                var idd = setters[s].id;
                                                //get the schema.org property mapped to this field
                                                for(var f=0; f< properties.length; ++f){
                                                    if(properties[f].field == field){
                                                        prop = properties[f].property;
                                                    }
                                                }
                
                                                Object.defineProperty(ob, prop, { 
                                                    set: function(newValue) { 
                                                        console.log("newValue: ", newValue)
                                                        this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                        obJSON = snapshot.val();
                                                        console.log(obJSON)
                                                        if(obJSON.oauth2){
                                                            // console.log("oauth2")
                                                            return new Promise((resolve, reject) => {
                                                                    // console.log("auth function");
                                                                    auth_url= obJSON.oauth2[0].authURL;
                                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                                    client_id= obJSON.oauth2[0].clientId;
                                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                                    response_type= obJSON.oauth2[0].resType;
                                                                    scope= obJSON.oauth2[0].scope;
                                                                    grant_type= obJSON.oauth2[0].grantType;
                                                                    client_auth= obJSON.oauth2[0].clientAuth;
                                                                        
                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                acToken =   gup(url, 'code');
                                                                                resolve(acToken)
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                                // return validateToken(acToken)
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);
                                        
                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if( results == null )
                                                                            return "";
                                                                        else
                                                                            return results[1];
                                                                    }//end of gup()
                                                                    
                                                                })
                                                                .then(token=>{ 
                                                                    return new Promise((resolve, reject) => {
                                                                    console.log("Token: ",token)
                                                                    console.log("Token URL: ",token_url)
                                                                    $.ajax({
                                                                        url: token_url,
                                                                        method: "POST",
                                                                        data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                        success: function(response) {
                                                                            console.log("response: ",response);
                                                                            //important to check access token and token type (e.g. bearer)
                                                                            tok = response.access_token;
                                                                            console.log("tok: ", tok)
                                                                            resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                        },
                                                                        error: function(response, jqXHR, textStatus, errorThrown) {
                                                                            console.log("error: ",response);
                                                                        }
                                                                    })
                                                                })
                                                                // return something
                                                                })
                                        
                                                        }else{ //no oauth
                                                            // console.log("!!!oauth2")
                                                            result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                            //console.log("result: ",result);
                                                            return result;
                                                        }
                            
                                                    })//firebase
                                                    .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })
                                                        
                                                    }
                                                });
                                            }
                
                                            //***************************** METHODS *********************************/
                                          if(methods){  
                                            for(var m=0;  m<methods.length; ++m){
                                                var mName = methods[m].name;
                                                var mEndpoint = methods[m].endpoint;
                                                var mParams = methods[m].params;
                
                                                // add the imageId
                                                Object.defineProperty(ob, mName.toString(), { value: function(...mArgs) { 
                                                    if(mArgs.length>0){
                                                        if(mParams){
                                                            for(var p=0; p<mParams.length; ++p){
                                                                //Object.entries(mParams[p]).forEach(([key, value]) => {
                                                                    mParamList+=mParams[p]//`${key}`
                                                                    mParamList+="="
                                                                    mParamList+=mArgs[p]//THIS ASSUMES THAT id value will be sent
                                                                // });
                                                                if(p+1<mParams.length){
                                                                    mParamList+="&" 
                                                                }
                                                            }
                                                        }
                                                    }else{
                                                        // console.log("methods[m]:2 ", ob.imageId)
                                                        // let elemIndexM = properties.findIndex(element => element.field == methods[m].params[0])
                                                        // let endpointM = properties[elemIndexM].property;
                                                        // console.log("HERE: ", ob[endpointM])
                                                        mParamList+=mParams[0]
                                                        mParamList+="="
                                                        mParamList+=ob[mParams[0]]
                                                    }
                
                                                    console.log("mParamList: ", mParamList)
                                                    return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                    obJSON = snapshot.val();
                                                    //console.log(obJSON)
                                                
                                                    if(obJSON.oauth2){
                                                        // console.log("oauth2")
                        
                                                        var tokenPromise;
                                                        var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                        console.log(sTokens)
                                                        const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                        console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                        if(sTokens[elementsIndex].token!=""){
                                                                    tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                    .then(token=>{ 
                                                                        return new Promise((resolve, reject) => {
                                                                            console.log("Token: ",token)
                                                                            $.ajax({
                                                                                url: token_url,
                                                                                method: "POST",
                                                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                                success: function(response) {
                                                                                    console.log("response: ",response);
                                                                                    tok = response.access_token;
                                                                                    expires_in = response.expires_in;
                                                                                    console.log("tok: ", tok)
                                                                                    console.log("expires_in: ", expires_in)
                                                                                    // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                    // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                    //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                    let newArray = [...sTokens]
                                                                                    newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                    newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                    // this.setState({newArray});
                
                                                                                    localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                    console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                                
                                                                                    resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                                },
                                                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                    console.log("error: ",response);
                                                                                }
                                                                            })
                                                                        })
                                                                    })
                                                                }else{
                                                                    tokenPromise= new Promise((resolve, reject) => {
                                                                        console.log("auth function");
                                                                        auth_url= obJSON.oauth2[0].authURL;
                                                                        token_url= obJSON.oauth2[0].tokenURL;
                                                                        redirect_url= obJSON.oauth2[0].callbackURL;
                                                                        client_id= obJSON.oauth2[0].clientId;
                                                                        client_secret= obJSON.oauth2[0].clientSec;
                                                                        response_type= obJSON.oauth2[0].resType;
                                                                        scope= obJSON.oauth2[0].scope;
                                                                        grant_type= obJSON.oauth2[0].grantType;
                                                                        client_auth= obJSON.oauth2[0].clientAuth;
                                                                            
                                                                        var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                        var pollTimer = window.setInterval(function() {
                                                                            try {
                                                                                console.log("url here: ", win.document.URL); //here url
                                                                                if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                    window.clearInterval(pollTimer);
                                                                                    var url =   win.document.URL;
                                                                                    acToken =   gup(url, 'code');
                                                                                    resolve(acToken)
                                                                                    // tokenType = gup(url, 'token_type');
                                                                                    // expiresIn = gup(url, 'expires_in');
                                                                                    win.close();
                                                                                }
                                                                            } catch(e) {
                                                                                console.log("error in oauth")
                                                                            }
                                                                        }, 200);
                                                
                                                                        function gup(url, name) {
                                                                            name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                            var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                            var regex = new RegExp( regexS );
                                                                            var results = regex.exec( url );
                                                                            if( results == null )
                                                                                return "";
                                                                            else
                                                                                return results[1];
                                                                        }//end of gup()
                                                                            
                                                                    })
                                                                    .then(token=>{ 
                                                                        return new Promise((resolve, reject) => {
                                                                            console.log("Token: ",token)
                                                                            $.ajax({
                                                                                url: token_url,
                                                                                method: "POST",
                                                                                data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                                success: function(response) {
                                                                                    console.log("response: ",response);
                                                                                    tok = response.access_token;
                                                                                    expires_in = response.expires_in;
                                                                                    console.log("tok: ", tok)
                                                                                    console.log("expires_in: ", expires_in)
                                                                                    // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                    // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                    let newArray = [...sTokens]
                                                                                    newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                    newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                    // this.setState({newArray});
                
                                                                                    localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                    console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                                
                                
                                                                                    resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                                },
                                                                                error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                    console.log("error: ",response);
                                                                                }
                                                                            })
                                                                        })
                                                                    })
                                                                }
                                            
                                                        return tokenPromise
                
                                    
                                                    }else{ //no oauth
                                                        // console.log("!!!oauth2")
                                                        result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                        return result;
                                                    }
                        
                                                    })//firebase
                                                    .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                                }
                                                });
                                            //   });
                
                                            }//loop to create methods
                                          }   
                                        });//loop over array of objects
                
                
                                        //remove the fields that are not in the class
                                        var keys = Object.keys(o[0])
                                        for(var k=0; k<keys.length; ++k){
                                            if(!fields.includes(keys[k])){
                                                o.forEach(function(ob) {
                                                    delete ob[keys[k]];
                                                })
                                            }
                                        }
                
                                    }else{
                                        // console.log("NOT ARRAY")
                                        for(var p=0; p<properties.length; ++p){
                                            if(properties[p].field){// it won't check type properties (e.g. comment for VideoObject)
                                                if (properties[p].property != properties[p].field && o[properties[p].field]) {
                                                    Object.defineProperty(o, properties[p].property,Object.getOwnPropertyDescriptor(o, properties[p].field));
                                                    delete o[properties[p].field];
                                                }
                                            }else{ //if the property is a type
                                                let propType = properties[p].property;
                                                let typeName = properties[p].type;                                
                                                console.log("typeId: ", typeId);
                                                console.log("o[typeId]1: ", o[typeId])
                                                var idVal = o[typeId];
                
                                                // creat a getter for property of type Type
                                                Object.defineProperty(o, propType, { 
                                                    get: function() { 
                                                        let promise = firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                            console.log("typeOb1: ", snapshot.val())
                                                            console.log("o[typeId]2: ", idVal)
                                                            return self(snapshot.key, snapshot.val(), currentType, propType, idVal);
                                                        });
                                                        return promise;
                                                    }
                                                });
                
                                                //*** if you want to remove the getter, replce iti with this 
                                                // o[propType]= function(){return ""};                               
                                                // (async function(){
                                                //     o[propType] = await firebase.database().ref('/abstractions/'+site+'/objects/'+typeName).once('value').then(function(snapshot) {
                                                //         console.log("typeOb1: ", snapshot.val())
                                                //         return self(snapshot.key, snapshot.val(), currentType, propType, o[typeId]);
                                                //     });
                                                //     return o;
                                                // })()
                
                                            }
                                        }//end of for loop properties
                
                                        //***************************** GETTERS *********************************/
                
                
                                        //***************************** SETTERS *********************************/
                                        for(s in setters){
                                            // console.log("setter: ", setters[s])   
                                            var field = setters[s].field; //API endpoint field to be set
                                            var prop;
                                            var setEndpoint =  setters[s].endpoint;
                                            var setParams = setters[s].params;
                                            var idd = setters[s].id;
                                            //get the schema.org property mapped to this field
                                            for(var f=0; f< properties.length; ++f){
                                                if(properties[f].field == field){
                                                    prop = properties[f].property;
                                                }
                                            }
                
                                            Object.defineProperty(o, prop, { 
                                                set: function(newValue) { 
                                                    console.log("newValue: ", newValue)
                                                    this.pro = firebase.database().ref('/apis/'+setEndpoint).once('value').then(function(snapshot) {
                                                    obJSON = snapshot.val();
                                                    console.log(obJSON)
                                                    if(obJSON.oauth2){
                                                        // console.log("oauth2")
                                                        return new Promise((resolve, reject) => {
                                                                console.log("auth function");
                                                                auth_url= obJSON.oauth2[0].authURL;
                                                                token_url= obJSON.oauth2[0].tokenURL;
                                                                redirect_url= obJSON.oauth2[0].callbackURL;
                                                                client_id= obJSON.oauth2[0].clientId;
                                                                client_secret= obJSON.oauth2[0].clientSec;
                                                                response_type= obJSON.oauth2[0].resType;
                                                                scope= obJSON.oauth2[0].scope;
                                                                grant_type= obJSON.oauth2[0].grantType;
                                                                client_auth= obJSON.oauth2[0].clientAuth;
                                                                    
                                                                var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                var pollTimer = window.setInterval(function() {
                                                                    try {
                                                                        console.log("url here: ", win.document.URL); //here url
                                                                        if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                            window.clearInterval(pollTimer);
                                                                            var url =   win.document.URL;
                                                                            acToken =   gup(url, 'code');
                                                                            resolve(acToken)
                                                                            // tokenType = gup(url, 'token_type');
                                                                            // expiresIn = gup(url, 'expires_in');
                                                                            win.close();
                                                                            // return validateToken(acToken)
                                                                        }
                                                                    } catch(e) {
                                                                        console.log("error in oauth")
                                                                    }
                                                                }, 200);
                                    
                                                                function gup(url, name) {
                                                                    name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                    var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                    var regex = new RegExp( regexS );
                                                                    var results = regex.exec( url );
                                                                    if( results == null )
                                                                        return "";
                                                                    else
                                                                        return results[1];
                                                                }//end of gup()
                                                                
                                                            })
                                                            .then(token=>{ 
                                                                return new Promise((resolve, reject) => {
                                                                console.log("Token: ",token)
                                                                console.log("Token URL: ",token_url)
                                                                $.ajax({
                                                                    url: token_url,
                                                                    method: "POST",
                                                                    data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                    success: function(response) {
                                                                        console.log("response: ",response);
                                                                        //important to check access token and token type (e.g. bearer)
                                                                        tok = response.access_token;
                                                                        console.log("tok: ", tok)
                                                                        resolve('https://scrapir.org/api/'+setEndpoint+'?tokenAPI='+tok+'&'+field+'='+newValue+'&'+idd+'='+idValue)
                                                                    },
                                                                    error: function(response, jqXHR, textStatus, errorThrown) {
                                                                        console.log("error: ",response);
                                                                    }
                                                                })
                                                            })
                                                            // return something
                                                            })
                                    
                                                    }else{ //no oauth
                                                        // console.log("!!!oauth2")
                                                        result =  'https://scrapir.org/api/'+setEndpoint+'?'+paramList+'&'+pro+'='+newValue+'&id='+identifier
                                                        //console.log("result: ",result);
                                                        return result;
                                                    }
                        
                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url)) })   })
                                                    
                                                }
                                            });
                                        }
                
                                        //***************************** METHODS *********************************/
                                      if(methods){
                                        for(var m=0;  m<methods.length; ++m){
                                            // console.log("methods[m]: ", methods[m].name)
                                            var mName = methods[m].name;
                                            var mEndpoint = methods[m].endpoint;
                                            var mParams = methods[m].params;
                    
                                            Object.defineProperty(o, mName.toString(), { value: function(mArgs) { 

                                                var paramLen = Object.entries(mArgs).length;
                                                // console.log("paramLen: ", paramLen)

                                                for (const [key, value] of Object.entries(mArgs)) {
                                                    --paramLen
                                                    console.log(`${key}: ${value}`);
                                                    mParamList+= key
                                                    mParamList+="="
                                                    mParamList+= value
                                                    if(paramLen>0){
                                                        mParamList+="&" 
                                                    }
                                                }
                                            
                                                // if(mParams){
                                                //     for(var p=0; p<mParams.length; ++p){
                                                //         //Object.entries(mParams[p]).forEach(([key, value]) => {
                                                //             mParamList+=mParams[p]//`${key}`
                                                //             mParamList+="="
                                                //             mParamList+=mArgs[p]
                                                //         // });
                                                //         if(p+1<mParams.length){
                                                //             mParamList+="&" 
                                                //         }
                                                //     }
                                                // }
                                                console.log("mParamList: ", mParamList)
                                                return firebase.database().ref('/apis/'+mEndpoint).once('value').then(function(snapshot) {
                                                obJSON = snapshot.val();
                                                console.log(obJSON)
                                            
                                                if(obJSON.oauth2){
                                                    // console.log("oauth2")
                    
                                                    var tokenPromise;
                                                    var sTokens = JSON.parse(localStorage.getItem('tokens'));
                                                    console.log(sTokens)
                                                    const elementsIndex = sTokens.findIndex(element => element.site == site)
                                                    console.log("sTokens[elementsIndex]: ", sTokens[elementsIndex].token)
                                                    if(sTokens[elementsIndex].token!=""){
                                                                tokenPromise= new Promise((resolve, reject) => {resolve(sTokens[elementsIndex].token)})
                                                                .then(token=>{ 
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                //const elementsIndex = this.sTokens.findIndex(element => element.site == site)
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});
                
                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                            
                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }else{
                                                                tokenPromise= new Promise((resolve, reject) => {
                                                                    console.log("auth function");
                                                                    auth_url= obJSON.oauth2[0].authURL;
                                                                    token_url= obJSON.oauth2[0].tokenURL;
                                                                    redirect_url= obJSON.oauth2[0].callbackURL;
                                                                    client_id= obJSON.oauth2[0].clientId;
                                                                    client_secret= obJSON.oauth2[0].clientSec;
                                                                    response_type= obJSON.oauth2[0].resType;
                                                                    scope= obJSON.oauth2[0].scope;
                                                                    grant_type= obJSON.oauth2[0].grantType;
                                                                    client_auth= obJSON.oauth2[0].clientAuth;
                                                                        
                                                                    var win = window.open(auth_url+"?response_type="+JSON.parse(JSON.stringify(response_type))+"&scope="+JSON.parse(JSON.stringify(scope))+"&client_id="+JSON.parse(JSON.stringify(client_id))+"&redirect_uri="+JSON.parse(JSON.stringify(redirect_url))+"", "windowname1", 'width=800, height=600');
                                                                    var pollTimer = window.setInterval(function() {
                                                                        try {
                                                                            console.log("url here: ", win.document.URL); //here url
                                                                            if (win.document.URL.indexOf(redirect_url) != -1) {
                                                                                window.clearInterval(pollTimer);
                                                                                var url =   win.document.URL;
                                                                                acToken =   gup(url, 'code');
                                                                                resolve(acToken)
                                                                                // tokenType = gup(url, 'token_type');
                                                                                // expiresIn = gup(url, 'expires_in');
                                                                                win.close();
                                                                            }
                                                                        } catch(e) {
                                                                            console.log("error in oauth")
                                                                        }
                                                                    }, 200);
                                            
                                                                    function gup(url, name) {
                                                                        name = name.replace(/[[]/,"\[").replace(/[]]/,"\]");
                                                                        var regexS = "[\?&]"+name+"=([^&#]*)";
                                                                        var regex = new RegExp( regexS );
                                                                        var results = regex.exec( url );
                                                                        if( results == null )
                                                                            return "";
                                                                        else
                                                                            return results[1];
                                                                    }//end of gup()
                                                                        
                                                                })
                                                                .then(token=>{ 
                                                                    return new Promise((resolve, reject) => {
                                                                        console.log("Token: ",token)
                                                                        $.ajax({
                                                                            url: token_url,
                                                                            method: "POST",
                                                                            data: {client_id: client_id ,client_secret: client_secret ,redirect_uri: redirect_url ,code: token ,grant_type:grant_type},
                                                                            success: function(response) {
                                                                                console.log("response: ",response);
                                                                                tok = response.access_token;
                                                                                expires_in = response.expires_in;
                                                                                console.log("tok: ", tok)
                                                                                console.log("expires_in: ", expires_in)
                                                                                // localStorage.setItem('tokens', JSON.stringify(sitesToken));
                                                                                // console.log("tokens: ", localStorage.getItem('tokens'));
                                                                                let newArray = [...sTokens]
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], token: tok}
                                                                                newArray[elementsIndex] = {...newArray[elementsIndex], expires_in: expires_in}
                                                                                // this.setState({newArray});
                
                                                                                localStorage.setItem('tokens', JSON.stringify(newArray));
                                                                                console.log("NEW LOCAL STORGAE: ", localStorage.getItem('tokens'))
                            
                            
                                                                                resolve('https://scrapir.org/api/'+mEndpoint+'?tokenAPI='+tok+'&'+mParamList)
                                                                            },
                                                                            error: function(response, jqXHR, textStatus, errorThrown) {
                                                                                console.log("error: ",response);
                                                                            }
                                                                        })
                                                                    })
                                                                })
                                                            }
                                        
                                                    return tokenPromise
                
                                
                                                }else{ //no oauth
                                                    // console.log("!!!oauth2")
                                                    result =  'https://scrapir.org/api/'+mEndpoint+'?'+mParamList
                                                    return result;
                                                }
                    
                                                })//firebase
                                                .then(url => { console.log("url: ", url); return new Promise(function(resolve, reject) {resolve(fetch(url).then(response => response.json() )) })   })
                                            }
                                            });
                                        //   });
                
                                        }//loop to create methods
                                      }
                                        //remove the fields that are not in the class
                                        var keys = Object.keys(o)
                                        for(var k=0; k<keys.length; ++k){
                                            if(!fields.includes(keys[k])){
                                                delete o[keys[k]];
                                            }
                                        }
                                    }//end of else of no array
                
                                    return o;
                                })         
                                // return obj; 
                            };


                        }
                    }//if functions

                    });

                });

            results.push(promise);

        })// end of snapshot.forEach

        return Promise.all(results);

    }) //end of snapshot

}



Mavo.Backend.register($.Class({
    // Mandatory. You may instead extend another backend, e.g. Mavo.Backend.Github
    extends: Mavo.Backend,
    id: "Shapir", 
    constructor: function() {
        this.permissions.on(["read"]); // Permissions of this particular backend.
        this.service    = this.mavo.element.getAttribute("mv-source-service");
        this.type       = this.mavo.element.getAttribute("mv-source-action");
        this.action     = this.mavo.element.getAttribute("mv-source-action");
        this.params     = this.mavo.element.getAttribute("mv-source-params");
        this.attributes = this.mavo.element.attributes
        // Add mv-source-id
        // Add mv-source-search    
    },

    update: function(url, o) {
        this.super.update.call(this, url, o);
        this.service    = this.mavo.element.getAttribute("mv-source-service");
        this.type       = this.mavo.element.getAttribute("mv-source-action");
        this.action     = this.mavo.element.getAttribute("mv-source-action");
        this.params     = this.mavo.element.getAttribute("mv-source-params");
        this.attributes = this.mavo.element.attributes
    },

    // Low-level functions for reading data. You don’t need to implement this
    // if the mv-storage/mv-source value is a URL and reading the data is just
    // a GET request to that URL.
    get: function(url) {
        if(this.attributes['mv-source-service']){// I added this silly if to avoid returning anything if I used mv-value. Not the best way to handle this case
            //constructing one of my global functions from all the mv-source- attributes 
            // var func = this.service+'.'+this.type+'('+this.attributes['mv-source-params'].value+')';
            var func = this.service+'.'+this.type+'('+JSON.stringify(this.attributes['mv-source-params'].value)+')';
            return new Promise(function(resolve, reject) {resolve( eval(func) )});
        }
    },

    // High level function for reading data. Calls this.get().
    // You rarely need to override this.
    load: function() {
		//Should return a promise that resolves to the data as an object
            return this.ready
                .then(() => shapir()) //I added this line to load all the global functions from Shapir library 
                .then(() => this.get())
                .then(response => {
                    if (typeof response != "string") {
                        return response;
                    }
                    response = response.replace(/^\ufeff/, ""); // Remove Unicode BOM
                    return this.format.parse(response);
                });
    },

    // Low-level saving code.
    // serialized: Data serialized according to this.format
    // path: Path to store data
    // o: Arbitrary options
    put: function(serialized, path = this.path, o = {}) {
        // Returns promise
    },

    // If your backend supports uploads, this is mandatory.
    // file: File object to be uploaded
    // path: relative path to store uploads (e.g. "images")
    upload: function(file, path) {
        // Upload code. Should call this.put()
    },

    // High level function for storing data.
    // You rarely need to override this, except to avoid serialization.
    store: function(data, {path, format = this.format} = {}) {
        // Should return a promise that resolves when the data is saved successfully
    },

    // Takes care of authentication. If passive is true, only checks if
    // the user is already logged in, but does not present any login UI.
    // Typically, you’d call this.login(true) in the constructor

    login: function(passive) {
        // Typically, you’d check if a user is already authenticated
        // and return Promise.resolve() if so.

        // Returns promise that resolves when the user has successfully authenticated
    },

    // Log current user out
    logout: function() {
        // Returns promise
        // return this.oAuthLogout();
    },
    

    static: {
        // Mandatory and very important! This determines when your backend is used.
        // value: The mv-storage/mv-source/mv-init value
        test: function(value) {
            return value.startsWith("shapir");
        }
    }
}));