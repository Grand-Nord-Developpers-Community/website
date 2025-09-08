self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: data.badge || "/icon.png",
      image: data.image || "/icon.png",
      vibrate: [100, 50, 100],
      data: {
        url: data.url || "http://localhost:3000",
        dateOfArrival: Date.now(),
        primaryKey: "2",
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received.", event);
  event.notification.close();

  const notificationData = event.notification.data;
  const urlToOpen = notificationData.url;
  event.waitUntil(clients.openWindow(urlToOpen));
});
