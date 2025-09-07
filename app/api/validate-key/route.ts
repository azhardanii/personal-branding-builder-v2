import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { accessKey } = await req.json();

    if (!accessKey) {
      return NextResponse.json({ success: false, message: "No key provided" }, { status: 400 });
    }

    const validKeys = process.env.VALID_KEYS?.split(",") || [];

    if (validKeys.includes(accessKey.trim())) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Invalid key" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
