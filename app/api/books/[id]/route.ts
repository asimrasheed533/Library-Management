import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const book = await prisma.book.findUnique({
      where: { id: id },
    });
    return NextResponse.json(book, { status: 200 });
  } catch (err: any) {
    console.error("Error while fetching book", err);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}
