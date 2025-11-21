import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CODE_REGEX = /^[A-Za-z0-9]{3,8}$/;

function validateUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function generateCode() {
  // simple random 6-char code [a-z0-9]
  return Math.random().toString(36).slice(2, 8);
}

// POST /api/links  -> create short link
export async function POST(req: Request) {
  try {
    const { url, code } = await req.json();

    if (!url || !validateUrl(url)) {
      return NextResponse.json(
        { message: "Invalid URL" },
        { status: 400 }
      );
    }

    let finalCode: string = code;

    if (finalCode) {
      if (!CODE_REGEX.test(finalCode)) {
        return NextResponse.json(
          { message: "Invalid code format" },
          { status: 400 }
        );
      }
    } else {
      finalCode = generateCode();
    }

    const link = await prisma.link.create({
      data: {
        url,
        code: finalCode,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (err: any) {
    // Unique constraint error for "code"
    if (err?.code === "P2002") {
      return NextResponse.json(
        { message: "Code already exists" },
        { status: 409 }
      );
    }

    console.error("POST /api/links error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

// GET /api/links  -> list all links
export async function GET() {
  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(links, { status: 200 });
}
