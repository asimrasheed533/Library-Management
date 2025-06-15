import { unlink } from "fs/promises";

export async function deleteFile(filePath: string) {
  try {
    const fullPath = `${process.cwd()}/public/${filePath}`;
    await unlink(fullPath);
    console.log(`File deleted successfully: ${fullPath}`);
  } catch (error) {
    console.error(`Failed to delete file: ${filePath}`, error);
  }
}
