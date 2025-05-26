import { writeFile } from "fs/promises";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const formData = await req.formData();

  const file = formData.get("pdf") as File;
  const title = formData.get("title") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const userId = formData.get("userId") as string;

  if (!file || !file.name) {
    return new Response(JSON.stringify({ error: "No file uploaded" }), {
      status: 400,
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", filename);

  try {
    await writeFile(filePath, buffer);

    const book = await prisma.book.create({
      data: {
        title,
        name,
        description,
        pdfPath: `/uploads/${filename}`,
        userId,
      },
    });

    return new Response(
      JSON.stringify({ message: "Upload successful", book }),
      {
        status: 200,
      }
    );
  } catch (err: any) {
    console.error("Upload error:", err);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
    });
  }
}
