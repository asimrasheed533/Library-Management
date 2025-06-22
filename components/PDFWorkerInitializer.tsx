"use client";

import { useEffect } from "react";
import { pdfjs } from "react-pdf";

export default function PDFWorkerInitializer() {
  useEffect(() => {
    // Configure PDF.js worker to use the local worker file
    if (typeof window !== "undefined") {
      // Use local worker that matches our pdfjs-dist version (4.8.69)
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      // Reset worker port for clean initialization
      if (pdfjs.GlobalWorkerOptions.workerPort) {
        pdfjs.GlobalWorkerOptions.workerPort = null;
      }

      console.log("PDF.js worker configured with local worker");
      console.log("Worker URL:", pdfjs.GlobalWorkerOptions.workerSrc);
      console.log("Expected to match pdfjs-dist version 4.8.69");
    }
  }, []);

  return null; // This component doesn't render anything
}
