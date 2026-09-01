import { NextResponse } from "next/server";
import { fetchAnalytics } from "@/lib/firebase";

export async function GET() {
  try {
    const analytics = await fetchAnalytics();
    return NextResponse.json(analytics);
  } catch (err) {
    console.error("Failed to fetch analytics:", err);
    return NextResponse.json(
      { error: "Failed to fetch analytics." },
      { status: 500 }
    );
  }
}
