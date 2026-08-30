import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

const CONTACT_EMAIL = "dhungeln12@gmail.com";
const MIN_SUBMIT_MS = 3000;

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export async function POST(request) {
  const rate = checkRateLimit(request);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfter) },
      }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, message, website, formLoadedAt } = body;

  if (website) {
    return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
  }

  if (formLoadedAt && Date.now() - Number(formLoadedAt) < MIN_SUBMIT_MS) {
    return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
  }

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, phone, and message are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        _subject: `Portfolio contact from ${name.trim()}`,
        _captcha: "false",
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 502 }
    );
  }
}
