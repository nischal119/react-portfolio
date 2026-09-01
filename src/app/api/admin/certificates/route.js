import { NextResponse } from "next/server";
import { fetchCertificates, addCertificate } from "@/lib/firebase";

export async function GET() {
  try {
    const certificates = await fetchCertificates();
    return NextResponse.json({ certificates });
  } catch (err) {
    console.error("Failed to fetch certificates:", err);
    return NextResponse.json(
      { error: "Failed to fetch certificates." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
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
    const id = await addCertificate({
      Title: Title.trim(),
      Img: Img?.trim() || "",
    });
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("Failed to add certificate:", err);
    return NextResponse.json(
      { error: "Failed to add certificate." },
      { status: 500 }
    );
  }
}
