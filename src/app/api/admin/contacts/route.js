import { NextResponse } from "next/server";
import { fetchContacts } from "@/lib/firebase";

export async function GET() {
  try {
    const contacts = await fetchContacts();
    return NextResponse.json({ contacts });
  } catch (err) {
    console.error("Failed to fetch contacts:", err);
    return NextResponse.json(
      { error: "Failed to fetch contacts." },
      { status: 500 }
    );
  }
}
