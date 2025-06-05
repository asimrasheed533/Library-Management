import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function uploadFile(
  file: File,
  uploadDir: string
): Promise<string> {
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = path.extname(file.name);
    const filename = `${Date.now()}${extension}`;
    const filePath = path.join(uploadDir, filename);

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, {
        recursive: true,
      });
    }

    await writeFile(filePath, buffer);
    return filename;
  } catch (error) {
    throw new Error(
      `Failed to upload file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
