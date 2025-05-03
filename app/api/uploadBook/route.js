import prisma from "@/lib/prisma";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 },
});

// Create a new book
export const addBook = async (req, res) => {
  try {
    const { title, isAnonymous, userId } = req.body;

    const reportData = {
      title,
      description,
      isAnonymous: isAnonymous === "true",
    };

    // Add user reference if not anonymous and userId is provided
    if (!reportData.isAnonymous && userId) {
      reportData.user = userId;
    }

    // Add image path if an image was uploaded
    if (req.file) {
      reportData.image = `uploads/${req.file.filename}`;
    }

    const report = await Report.create(reportData);

    res.status(201).json(report);
  } catch (error) {
    console.error("Create report error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all reports for a user
export const getUserReports = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const reports = await Report.find({ user: userId }).sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    console.error("Get user reports error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single report by ID
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Check if the report belongs to the user or is anonymous
    if (report.user && report.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this report" });
    }

    res.json(report);
  } catch (error) {
    console.error("Get report by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
