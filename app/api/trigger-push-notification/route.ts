import { db } from "@/lib/db";
import { userTable } from "@/lib/db/schema";
import webpush, { CustomPushSubscription } from "@/server/webpush";
import { eq } from "drizzle-orm";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({
      status: false,
      message: "Missing userId",
    });
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.id, userId),
    with: {
      devices: true,
    },
  });

  if (!user?.devices.length) {
    return Response.json({
      status: false,
      message: "No devices found",
    });
  }

  const device = user.devices[0];
  const pushSubscription = device.pushSubscription as CustomPushSubscription;
  if (!pushSubscription) {
    return Response.json({
      status: false,
      message: "No push subscription found",
    });
  }

  try {
    const res = await webpush.sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "GNDC news users !!!",
        body: "un nouveau utilisateur GNDC ",
        icon: "http://localhost:3000/api/avatar?username=elsahou",
        url: "https://localhost:3000",
        badge: "/badge.png",
        image: "/badge.png",
      })
    );

    return Response.json({
      status: true,
      message: res,
    });
  } catch (error) {
    return Response.json({
      status: false,
      message: error,
    });
  }
};
