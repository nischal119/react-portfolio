import { NextResponse } from "next/server";
import { updateProject, deleteProject } from "@/lib/firebase";

export async function PUT(request, { params }) {
  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { Title, Description, Img, Link, TechStack } = body;

  if (!Title?.trim()) {
    return NextResponse.json(
      { error: "Title is required." },
      { status: 400 }
    );
  }

  try {
    await updateProject(id, {
      Title: Title.trim(),
      Description: Description?.trim() || "",
      Img: Img?.trim() || "",
      Link: Link?.trim() || "",
      TechStack: Array.isArray(TechStack) ? TechStack : [],
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update project:", err);
    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;

  try {
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete project:", err);
    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 }
    );
  }
}
