import fs from "fs";
import path from "path";
import multer from "multer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadHandler = async (req, res) => {
  upload.single("pdf")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "File upload failed", message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { title, name, description, userId } = req.body;

    try {
      const book = await prisma.book.create({
        data: {
          title,
          name,
          description,
          pdfPath: `/uploads/${req.file.filename}`,
          userId,
        },
      });

      res.status(200).json({ message: "File uploaded successfully", book });
    } catch (error) {
      console.error("Error storing file path:", error);
      res.status(500).json({ error: "Database error" });
    }
  });
};

export default uploadHandler;
