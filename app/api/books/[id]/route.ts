import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteFile } from "@/utils/delete-file";

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
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const book = await prisma.book.delete({
      where: { id: id },
    });

    Promise.all([
      await deleteFile(book.pdfPath),
      await deleteFile(book.imagePath),
    ]);

    return NextResponse.json(book, { status: 200 });
  } catch (err: any) {
    console.error("Error while fetching book", err);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}
