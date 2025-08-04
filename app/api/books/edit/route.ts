import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import path from "path";
import { uploadFile } from "@/utils/upload-file";

export async function PUT(req: Request) {
  const formData = await req.formData();
  const pdf = formData.get("pdf");
  const image = formData.get("image");
  const title = formData.get("title") as string;
  const name = formData.get("name") as string;
  const author = formData.get("author") as string;
  const price = formData.get("price") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  let pdfFilename = undefined;
  let imageFilename = undefined;

  if (pdf instanceof File && pdf.size > 0) {
    pdfFilename = await uploadFile(pdf, uploadDir);
    pdfFilename = `/uploads/${pdfFilename}`;
  } else {
    pdfFilename = pdf as string;
  }

  if (image instanceof File && image.size > 0) {
    imageFilename = await uploadFile(image, uploadDir);
    imageFilename = `/uploads/${imageFilename}`;
  } else {
    imageFilename = image as string;
  }

  console.log("pdf", pdf);
  console.log("image", image);
  console.log("imageFilename", imageFilename);
  console.log("pdfFilename", pdfFilename);

  try {
    const id = formData.get("id") as string;
    const updatedBook = await prisma.book.update({
      where: { id: id },
      data: {
        title,
        name,
        author,
        price,
        pdfPath: pdfFilename,
        imagePath: imageFilename,
      },
    });
    return NextResponse.json(updatedBook, { status: 200 });
  } catch (err: any) {
    console.error("Error while fetching book", err);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}
