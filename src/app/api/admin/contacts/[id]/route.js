import { NextResponse } from "next/server";
import { markContactRead, deleteContact } from "@/lib/firebase";

export async function PATCH(request, { params }) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    await markContactRead(id, Boolean(body.read));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update contact:", err);
    return NextResponse.json(
      { error: "Failed to update contact." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await deleteContact(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete contact:", err);
    return NextResponse.json(
      { error: "Failed to delete contact." },
      { status: 500 }
    );
  }
}
