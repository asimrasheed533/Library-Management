import path from "path";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { uploadFile } from "@/utils/upload-file";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const pdf = formData.get("pdf") as File;
    const image = formData.get("image") as File;
    const title = formData.get("title") as string;
    const name = formData.get("name") as string;
    const author = formData.get("author") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    if (!pdf || !pdf.name || !image || !image.name) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const pdfFilename = await uploadFile(pdf, uploadDir);
    const imageFilename = await uploadFile(image, uploadDir);

    const book = await prisma.book.create({
      data: {
        title,
        name,
        author,
        description,
        price,
        category,
        pdfPath: `/uploads/${pdfFilename}`,
        imagePath: `/uploads/${imageFilename}`,
      },
    });
    return NextResponse.json(
      { message: "File uploaded successfully", book },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error while creating a book", err);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
