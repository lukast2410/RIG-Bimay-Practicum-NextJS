if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,r,i)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const a={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return n;case"module":return a;default:return e(s)}}))).then((e=>{const s=i(...e);return n.default||(n.default=s),n}))})))}}define("./service-worker.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/0I0O4rPqfij-n5Obmm-w4/_buildManifest.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/0I0O4rPqfij-n5Obmm-w4/_ssgManifest.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/27204daadb586bf90fb0cdc9b90224dc65509a84.67e87716625288eaf5a9.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/29.2c15d1967f834b3ea831.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/30.1d0c2955e8ade680dfea.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/31.7ac85afe46f471290fd9.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/36e44df2b61729b6b732697e4caa290238aa3976.43bb23c685133efdfe25.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/58fc6bb45e38e6e8f5655ca2ae10d32d951e3dde.4eec4f21149848fe042c.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/67f7b0da1a6176312f6de2f78b2fcbfb0379e8b7.a9d474078f3c5a4c022e.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/72a30a16.32de00d83003db6ab2c7.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/b034762d7c3cba2b5dc3bfff8ca80366ce6e3419.a46ba959a7a0bce3fb95.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/b637e9a5.4070ccc01a0b96a958c6.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/cb1608f2.7ff329c1d046b8bdf13c.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/commons.cbf87bf53d6b8e360006.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/e78312c5.5d0d1eefb932f632c970.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/eb2f3b5b765a2b01fd1f10a2a86e954a44a77543.088dd4d21d5584167a9d.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/framework.6fff953eb0f638171baa.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/main-33204a8dc0ee2b46d972.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/_app-f190534f5d266b9158dc.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/_error-832caf3e27ee6c76ae63.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/auth/login-1733d0b7e17c55e07b21.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/course/%5Bsubject%5D/case-submission-a61f8ac40592e4f12b88.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/course/%5Bsubject%5D/group-db3233cf011341b2f4be.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/course/%5Bsubject%5D/info-5fad4515a39e83e2cec8.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/course/%5Bsubject%5D/session-material-92a043d67a010264e58a.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/extra-class-9096c776d4f4194a3120.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/extra-class/%5BExtraClassId%5D-cfa18814587aa5120b3f.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/extra-class/add-c870f09877253c90b185.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/extra-class/update/%5BExtraClassId%5D-ad21e1e5f6dcdb457c92.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/index-4641b882f7bb097db039.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/notification-61e6c43f7a34ada870d4.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/pages/schedule-69bf8932ebec41d7cb81.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/polyfills-265a51dacb3992e55d6f.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/chunks/webpack-c45858eee2b1adc3fb79.js",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/css/0b3e19f380c48e63a663.css",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/css/75b1efbd835150e00d63.css",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/_next/static/css/d18fcbc3aa6ba0edd30f.css",revision:"0I0O4rPqfij-n5Obmm-w4"},{url:"/assets/binus.png",revision:"9b1028d14c08af77fff7cd3f298b21d7"},{url:"/assets/involvement.png",revision:"e5c78f36777aedebe94d2b30e2230184"},{url:"/assets/logo-binus.png",revision:"77c1f4dab92d0feeab6a02e537779f87"},{url:"/assets/ribbon.png",revision:"9d64d895dd421b74070203458fe1664d"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"876f93fd7a8f097472b722e2621703c2"},{url:"/sw.js",revision:"5409e9a0182d907c7ec51010c39d2f89"},{url:"/sw.js.map",revision:"ca7edf7aeceaeea46b03dbce6693b65c"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:r})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
