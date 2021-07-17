self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is activated.
  console.log('service worker activated!')
})

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;
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
        console.log('already visible')
        return;
      }
    }
    if (clients.openWindow){
      return clients.openWindow('/');
    }
  }))
});