import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  const s = req.nextUrl.searchParams.get("size");
  const size = parseInt(s || "150");
  if (!username) {
    return new NextResponse("Missing username", { status: 400 });
  }

  const dummyJsonUrl = `https://dummyjson.com/icon/${username}/${size}`;

  try {
    const externalRes = await fetch(dummyJsonUrl);

    if (!externalRes.ok) {
      return new NextResponse("Failed to fetch avatar", { status: 502 });
    }

    const buffer = await externalRes.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": externalRes.headers.get("Content-Type") || "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(buffer.byteLength),
      },
    });
  } catch (err) {
    return new NextResponse("Error fetching avatar", { status: 500 });
  }
}
