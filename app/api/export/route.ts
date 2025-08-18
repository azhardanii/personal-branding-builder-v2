// app/api/export/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbzCT8tBQutrEfPz8o-zGmUIPtaakFpV4wEW1Yevi0JGwvianfApgT86jGEq5GSn43QJ/exec";

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type");
    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { success: false, error: "Unexpected response", raw: text };
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed" },
    { status: 405 }
  );
}