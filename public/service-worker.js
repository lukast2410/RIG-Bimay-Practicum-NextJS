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
  try {
    const applicationServerKey = 'BJKekXcDQgJ_y0kO7Wb2oYMWLodN-79U9d3ydfgTlOmxwkGB7IPU9tuObaQRfhSGuLAa9sIFt1mFhkVggjQBOKY'
    const options = { applicationServerKey, userVisibleOnly: true }
    const result = await self.registration.pushManager.subscribe(options)
    const subscription = result.toJSON()
  } catch (error) {
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