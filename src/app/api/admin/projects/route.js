import { NextResponse } from "next/server";
import { fetchProjects, addProject } from "@/lib/firebase";

export async function GET() {
  try {
    const projects = await fetchProjects();
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    return NextResponse.json(
      { error: "Failed to fetch projects." },
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

  const { Title, Description, Img, Link, TechStack } = body;

  if (!Title?.trim()) {
    return NextResponse.json(
      { error: "Title is required." },
      { status: 400 }
    );
  }

  try {
    const id = await addProject({
      Title: Title.trim(),
      Description: Description?.trim() || "",
      Img: Img?.trim() || "",
      Link: Link?.trim() || "",
      TechStack: Array.isArray(TechStack) ? TechStack : [],
    });
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("Failed to add project:", err);
    return NextResponse.json(
      { error: "Failed to add project." },
      { status: 500 }
    );
  }
}
