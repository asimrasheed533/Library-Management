import { pdfjs } from "react-pdf";

// Configure PDF.js worker
if (typeof window !== "undefined") {
  // Use local worker file
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
}

export { pdfjs };
