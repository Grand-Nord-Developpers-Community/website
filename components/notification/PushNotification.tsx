"use client";

import { create } from "zustand";
import { useEffect, useState } from "react";
import { subscribeUser } from "@/actions/webpush.action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Bell, X } from "lucide-react";
import { useConfirm } from "@omit/react-confirm-dialog";
import { useSession } from "../auth/SessionProvider";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;

// --- Zustand global store ---
type NotificationState = {
  asked: boolean; // already shown confirm?
  setAsked: () => void;
};

const useNotificationStore = create<NotificationState>((set) => ({
  asked: false,
  setAsked: () => set({ asked: true }),
}));

// --- Helper to convert VAPID key ---
// function urlBase64ToUint8Array(base64String: string) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);
//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

export default function NotificationManager() {
  const { user } = useSession();
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );
  const [showBanner, setShowBanner] = useState(
    permission === "denied" ? true : false
  );
  const { asked, setAsked } = useNotificationStore();
  const confirm = useConfirm();
  useEffect(() => {
    if (permission === "granted" || permission === "denied") {
      setAsked();
      return;
    }

    if (!asked) {
      (async () => {
        const result = await confirm({
          icon: (
            <>
              <div
                className="flex size-9 shrink-0 items-center justify-center mb-2 rounded-full border"
                aria-hidden="true"
              >
                <Bell className="opacity-60" size={16} />
              </div>
            </>
          ),
          title: "Recevez nos notifications en temps réel",
          description:
            "Autorisez les notifications pour être averti immédiatement des nouveautés, mises à jour importantes et alertes personnalisées.",
          cancelText: "Retour",
          cancelButton: {
            variant: "outline",
          },
          confirmText: "activer",
          confirmButton: {
            variant: "secondary",
          },
        });

        setAsked(); // mark confirm as shown

        if (result) {
          // small delay for natural UX
          setTimeout(async () => {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              console.log("✅ Notifications activées");
              await registerAndSubscribe();
            } else if (permission === "denied") {
              console.warn("❌ Notifications refusées");
              setShowBanner(true); // show instructions
            }
          }, 500);
        }
      })();
    }
  }, [asked, setAsked]);
  useEffect(() => {
    if (!user) return;

    const pending = localStorage.getItem("pendingPushSubscription");
    if (pending) {
      const subscription = JSON.parse(pending);
      subscribeUser(subscription)
        .then(() => {
          console.log("✅ Subscription associated with user");
          localStorage.removeItem("pendingPushSubscription");
        })
        .catch(console.error);
    }
  }, [user]);
  async function registerAndSubscribe() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY,
      });
      localStorage.setItem(
        "pendingPushSubscription",
        JSON.stringify(subscription.toJSON())
      );
      const res = await subscribeUser(subscription.toJSON());
      if (res.success) {
        localStorage.removeItem("pendingPushSubscription");
      }
      console.log("Subscription saved:", res.success);
    } catch (err) {
      console.error("Erreur lors de l’inscription au push:", err);
    }
  }

  return (
    <>
      {showBanner && (
        <Alert className="fixed z-30 bottom-4 right-4 max-w-sm border-secondary/50 text-secondary  [&>svg]:text-yellow-500 border-b-4 pb-4 shadow-sm">
          <AlertTriangle className="size-5" />
          <AlertTitle className="mt-2">Notifications désactivées</AlertTitle>
          <AlertDescription className="mt-2 text-gray-700">
            Vous avez refusé les notifications. Pour les activer, rendez-vous
            dans les paramètres de votre navigateur et autorisez les
            notifications pour ce site.
          </AlertDescription>
          <button
            className="absolute top-3 right-3"
            onClick={() => setShowBanner(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </Alert>
      )}
    </>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { subscribeUser } from "@/actions/webpush.action";
// import { Button } from "../ui/button";

// const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

// export default function PushNotification() {
//   const [permission, setPermission] = useState<string | null>(null);
//   const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);

//   useEffect(() => {
//     const handleNotificationPermission = async () => {
//       if (typeof Notification !== "undefined") {
//         const currentPermission = Notification.permission;
//         setPermission(currentPermission);

//         if (currentPermission === "default") {
//           const newPermission = await Notification.requestPermission();
//           setPermission(newPermission);

//           if (newPermission === "granted") {
//             await registerServiceWorker();
//           } else {
//             console.error("Notification permission denied");
//           }
//         } else if (currentPermission === "granted") {
//           await registerServiceWorker();
//         }
//       }
//     };

//     handleNotificationPermission();
//   }, []);

//   async function registerServiceWorker() {
//     try {
//       const registration = await navigator.serviceWorker.register("/sw.js", {
//         scope: "/",
//         updateViaCache: "none",
//       });

//       if (navigator.serviceWorker.controller) {
//         setIsServiceWorkerReady(true);
//       } else {
//         // Wait for service worker to be installed
//         registration.onupdatefound = () => {
//           const installingWorker = registration.installing;
//           if (installingWorker) {
//             installingWorker.onstatechange = () => {
//               if (
//                 installingWorker.state === "installed" &&
//                 navigator.serviceWorker.controller
//               ) {
//                 setIsServiceWorkerReady(true);
//               }
//             };
//           }
//         };
//       }
//     } catch (error) {
//       console.error("Service Worker registration failed:", error);
//     }
//   }

//   useEffect(() => {
//     const subscribeToPush = async () => {
//       if (isServiceWorkerReady) {
//         try {
//           const registration = await navigator.serviceWorker.ready;
//           const sub = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: VAPID_PUBLIC_KEY,
//           });

//           const res = await subscribeUser(sub.toJSON());
//           console.log("Subscription successful:", res.success);
//         } catch (error) {
//           console.error("Push subscription failed:", error);
//         }
//       }
//     };

//     subscribeToPush();
//   }, [isServiceWorkerReady]);

//   return (
//     <div>
//       {permission === "denied" ? (
//         <div style={{ color: "red" }}>
//           <p>
//             Notifications are blocked. Please enable them in your browser
//             settings.
//           </p>
//           <p>
//             To enable notifications, go to your browser settings and allow
//             notifications for this site.
//           </p>
//         </div>
//       ) : permission === "default" ? (
//         <Button
//           onClick={(e) => {
//             e.preventDefault();
//             Notification.requestPermission()
//               .then(setPermission)
//               .catch((e) => console.log(e));
//             console.log("pressed");
//           }}
//         >
//           Allow Notifications
//         </Button>
//       ) : null}
//     </div>
//   );
// }

//new
// "use client";

// import { useEffect, useState } from "react";
// import { subscribeUser } from "@/actions/webpush.action";
// import { Button } from "../ui/button";

// const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

// export default function PushNotification() {
//   const [permission, setPermission] = useState<NotificationPermission>(
//     typeof Notification !== "undefined" ? Notification.permission : "default"
//   );
//   const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);

//   async function registerServiceWorker() {
//     try {
//       const registration = await navigator.serviceWorker.register("/sw.js", {
//         scope: "/",
//         updateViaCache: "none",
//       });

//       await navigator.serviceWorker.ready;
//       setIsServiceWorkerReady(true);
//       return registration;
//     } catch (error) {
//       console.error("Service Worker registration failed:", error);
//     }
//   }
//   useEffect(() => {
//     const subscribeToPush = async () => {
//       if (isServiceWorkerReady) {
//         try {
//           const registration = await navigator.serviceWorker.ready;
//           const sub = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: VAPID_PUBLIC_KEY,
//           });

//           const res = await subscribeUser(sub.toJSON());
//           console.log("Subscription successful:", res.success);
//         } catch (error) {
//           console.error("Push subscription failed:", error);
//         }
//       }
//     };

//     subscribeToPush();
//   }, [isServiceWorkerReady]);
//   async function handleEnableNotifications() {
//     try {
//       const newPermission = await Notification.requestPermission();
//       setPermission(newPermission);

//       if (newPermission === "granted") {
//         const registration = await registerServiceWorker();
//         if (registration) {
//           const sub = await registration.pushManager.subscribe({
//             userVisibleOnly: true,
//             applicationServerKey: VAPID_PUBLIC_KEY!,
//           });

//           const res = await subscribeUser(sub.toJSON());
//           console.log("Subscription successful:", res.success);
//         }
//       } else {
//         console.warn("Notification permission denied by user.");
//       }
//     } catch (err) {
//       console.error("Failed to enable notifications:", err);
//     }
//   }

//   return (
//     <div>
//       {permission === "granted" ? (
//         <p style={{ color: "green" }}>Notifications enabled ✅</p>
//       ) : permission === "denied" ? (
//         <p style={{ color: "red" }}>
//           Notifications are blocked. Enable them in browser settings.
//         </p>
//       ) : (
//         <Button onClick={handleEnableNotifications}>Allow Notifications</Button>
//       )}
//     </div>
//   );
// }
