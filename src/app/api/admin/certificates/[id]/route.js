import { NextResponse } from "next/server";
import { updateCertificate, deleteCertificate } from "@/lib/firebase";

export async function PUT(request, { params }) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { Title, Img } = body;

  if (!Title?.trim()) {
    return NextResponse.json(
      { error: "Title is required." },
      { status: 400 }
    );
  }

  try {
    await updateCertificate(id, {
      Title: Title.trim(),
      Img: Img?.trim() || "",
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update certificate:", err);
    return NextResponse.json(
      { error: "Failed to update certificate." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await deleteCertificate(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete certificate:", err);
    return NextResponse.json(
      { error: "Failed to delete certificate." },
      { status: 500 }
    );
  }
}
