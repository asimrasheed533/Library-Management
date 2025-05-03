import { writeFile } from "fs/promises";
import path from "path";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const title = formData.get("title");
  const name = formData.get("name");
  const description = formData.get("description");

  if (!file || typeof file === "string") {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = Date.now() + path.extname(file.name);
  const uploadDir = path.join(process.cwd(), "public/uploads");

  await writeFile(`${uploadDir}/${filename}`, buffer);

  const pdfPath = `/uploads/${filename}`;

  try {
    const book = await prisma.book.create({
      data: { title, name, description, pdfPath },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error uploading book:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
