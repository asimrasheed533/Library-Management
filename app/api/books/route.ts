import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books, { status: 200 });
  } catch (err: any) {
    console.error("Error while fetching books", err);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
