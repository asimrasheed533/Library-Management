import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("pdf") as File;
  const title = formData.get("title") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  if (!file || !file.name) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}${path.extname(file.name)}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDir, filename);

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  try {
    await writeFile(filePath, buffer);

    const book = await prisma.book.create({
      data: {
        title,
        name,
        description,
        pdfPath: `/uploads/${filename}`,
      },
    });

    return NextResponse.json(
      { message: "File uploaded successfully", book },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Error while creating a book", err);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}
