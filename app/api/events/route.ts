import { NextResponse } from "next/server";
import { getEvents } from "@/actions/event.action";
export const dynamic = "force-dynamic";
type Event = {
  title: string;
  description: string;
  id: string;
  location: string;
  createdAt: Date;

  link: string | null;
  creatorId: string;
  creator: {
    id: string;
  };
};
export async function GET() {
  try {
    const events = await getEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.log("impossible de charger les Event");
    return NextResponse.json(
      { error: "Failed to fetch Events" },
      { status: 500 }
    );
  }
}
