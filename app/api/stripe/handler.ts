import { NextRequest, NextResponse } from "next/server";
import { POST } from "./route";

export async function handler(req: NextRequest) {
  if (req.method === "POST") {
    return await POST(req);
  } else {
    return new NextResponse("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }
}
