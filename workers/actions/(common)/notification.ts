import { Device } from "@/lib/db/schema";
import webpush, { CustomPushSubscription } from "@/server/webpush";

export interface NoficationProps {
  data: {
    title: string;
    body: string;
    icon: string;
    badge?: string;
    image: string;
    url: string;
  };
  device: Device;
}
export async function sendNotification({ data, device }: NoficationProps) {
  const d = device.pushSubscription as unknown as CustomPushSubscription;
  const res = await webpush.sendNotification(
    d,
    JSON.stringify({
      ...data,
    })
  );
  console.log("send notification with statut : " + res.statusCode);
}
