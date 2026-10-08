import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    service: "DARK STORE",
    status: "online",
    version: "1.0.0",
  });
}
