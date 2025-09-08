import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:noreply@gndc.tech",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export interface CustomPushSubscription extends PushSubscription {
  keys: {
    p256dh: string;
    auth: string;
  };
}

export default webpush;
