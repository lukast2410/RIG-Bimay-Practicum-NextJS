if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,a,t)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const c={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return n;case"module":return c;default:return e(s)}}))).then((e=>{const s=t(...e);return n.default||(n.default=s),n}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/P_peAXJgnyuOFlMY2GCOM/_buildManifest.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/P_peAXJgnyuOFlMY2GCOM/_ssgManifest.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/27204daadb586bf90fb0cdc9b90224dc65509a84.67e87716625288eaf5a9.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/29.2c15d1967f834b3ea831.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/30.1d0c2955e8ade680dfea.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/31.7ac85afe46f471290fd9.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/36e44df2b61729b6b732697e4caa290238aa3976.43bb23c685133efdfe25.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/58fc6bb45e38e6e8f5655ca2ae10d32d951e3dde.f3fd8a55431abf246458.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/67f7b0da1a6176312f6de2f78b2fcbfb0379e8b7.a9d474078f3c5a4c022e.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/72a30a16.32de00d83003db6ab2c7.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/b034762d7c3cba2b5dc3bfff8ca80366ce6e3419.a46ba959a7a0bce3fb95.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/b637e9a5.4070ccc01a0b96a958c6.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/cb1608f2.7ff329c1d046b8bdf13c.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/commons.cbf87bf53d6b8e360006.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/e78312c5.5d0d1eefb932f632c970.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/eb2f3b5b765a2b01fd1f10a2a86e954a44a77543.088dd4d21d5584167a9d.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/framework.6fff953eb0f638171baa.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/main-f3df9cd2f9c4d58b3416.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/_app-30ce14ff0ade276150c2.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/_error-832caf3e27ee6c76ae63.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/auth/login-ab8c6e112f1b99ceb1af.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/course/%5Bsubject%5D/case-submission-e4b7428955cd8c5ddf47.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/course/%5Bsubject%5D/group-27bfbcf7557ca562c480.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/course/%5Bsubject%5D/info-0bcf0d097f1afd9b3d32.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/course/%5Bsubject%5D/session-material-d861e3799cf9859abf7e.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/extra-class-9096c776d4f4194a3120.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/extra-class/%5BExtraClassId%5D-cfa18814587aa5120b3f.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/extra-class/add-cb8247cdaeb35cec6f6a.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/extra-class/update/%5BExtraClassId%5D-ad21e1e5f6dcdb457c92.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/index-1fae1e62b6c60e7d2eb6.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/notification-61e6c43f7a34ada870d4.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/pages/schedule-ff0fae810c8fcd1dd776.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/polyfills-265a51dacb3992e55d6f.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/chunks/webpack-c45858eee2b1adc3fb79.js",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/css/4224e2a2155a4113d646.css",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/css/75b1efbd835150e00d63.css",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/_next/static/css/d18fcbc3aa6ba0edd30f.css",revision:"P_peAXJgnyuOFlMY2GCOM"},{url:"/assets/binus-icon.png",revision:"03fff70c775de49e21d9fb51da94e316"},{url:"/assets/binus.png",revision:"9b1028d14c08af77fff7cd3f298b21d7"},{url:"/assets/involvement.png",revision:"e5c78f36777aedebe94d2b30e2230184"},{url:"/assets/logo-binus.png",revision:"77c1f4dab92d0feeab6a02e537779f87"},{url:"/assets/logo-binus192x192.png",revision:"3d51a055739f3d6f10f5c2095f20d752"},{url:"/assets/logo-binus384x384.png",revision:"b87e82db8eea74bc6aacd749e8769a0a"},{url:"/assets/ribbon.png",revision:"9d64d895dd421b74070203458fe1664d"},{url:"/favicon.ico",revision:"63b9ae3edb234c595c51eac40ca72e28"},{url:"/manifest.json",revision:"fc33ba8b99e37408ecc85c94c04dc311"},{url:"/service-worker.js",revision:"99c865206a6024f2133ddfccbabed711"},{url:"/static/favicon.ico",revision:"e7cf3f3db09d04924a38ba7b6a641945"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));

const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

self.addEventListener('activate', async (e) => {
  // This will be called only once when the service worker is activated.
  console.log('service activate')
  try {
    const applicationServerKey = 'BJKekXcDQgJ_y0kO7Wb2oYMWLodN-79U9d3ydfgTlOmxwkGB7IPU9tuObaQRfhSGuLAa9sIFt1mFhkVggjQBOKY'
    const options = { applicationServerKey, userVisibleOnly: true }
    const result = await self.registration.pushManager.subscribe(options)
    const subscription = result.toJSON()
    console.log(subscription)
  } catch (error) {
    console.log('error subscription')
  }
})

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  e.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  e.waitUntil(clients.matchAll({
    type: "window",
    includeUncontrolled: true
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url.includes('/') && client.visibilityState != 'visible') {
        return client.focus();
      }else if(client.visibilityState == 'visible'){
        return;
      }
    }
    if (clients.openWindow){
      if(notification.data.type == 'ExtraClass'){
        return clients.openWindow('/extra-class/' + notification.data.link);
      }else if(notification.data.type == 'Group'){
        return clients.openWindow('/course/' + notification.data.link + '/group');
      }
    }
  }))
});

self.addEventListener('push', (event) => {
  if (event.data) {
    showLocalNotification(JSON.parse(event.data.text()), self.registration)
  }
})

const showLocalNotification = (body, swRegistration) => {
  const options = {
    ...body,
    icon: '/assets/logo-binus.png'
  }
  swRegistration.showNotification(body.title, options)
}