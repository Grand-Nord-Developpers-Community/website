import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

export function useNotificationPermission() {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );
  const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);

  const registerServiceWorker = useCallback(async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });

      if (navigator.serviceWorker.controller) {
        setIsServiceWorkerReady(true);
      } else {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (
                installingWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                setIsServiceWorkerReady(true);
              }
            };
          }
        };
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }, []);

  const handlePermission = useCallback(async () => {
    if (typeof Notification === "undefined") {
      toast.error("Notification pas permis , reactivez dans vos paramètre");
      return;
    }

    const currentPermission = Notification.permission;
    setPermission(currentPermission);

    if (currentPermission === "default") {
      const newPermission = await Notification.requestPermission();
      setPermission(newPermission);

      if (newPermission === "granted") {
        await registerServiceWorker();
      } else {
        console.error("Notification permission denied");
        toast.error("Notification pas permis , reactivez dans vos paramètre");
      }
    } else if (currentPermission === "granted") {
      await registerServiceWorker();
    }
  }, [registerServiceWorker]);

  return {
    permission,
    isServiceWorkerReady,
    handlePermission,
  };
}
