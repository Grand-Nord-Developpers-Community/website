import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";

export async function POST(req: Request) {
  try {
    const { fileURL } = await req.json();

    const file = await fs.readFile(fileURL);

    //console.log(fileURL)
    // Use `getPlaiceholder` to process the image
    const { base64 } = await getPlaiceholder(file);

    
    return Response.json({base64 },{
      status: 200,
    });
  } catch (error) {
    console.error("Error generating placeholder:", error);
    return Response.json({ message: "Internal Server Error" }, {
      status: 500,
    })
  }
}
