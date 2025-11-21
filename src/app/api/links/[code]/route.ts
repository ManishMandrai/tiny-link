import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Stats
export async function GET(
  req: Request,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(link, { status: 200 });
}

// Delete
export async function DELETE(
  req: Request,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;

  try {
    await prisma.link.delete({
      where: { code },
    });

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
}
