"use client";

import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker with matching version
if (typeof window !== "undefined") {
  // Use local worker that matches our pdfjs-dist version (4.8.69)
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  // Reset worker port to ensure clean initialization
  if (pdfjs.GlobalWorkerOptions.workerPort) {
    pdfjs.GlobalWorkerOptions.workerPort = null;
  }

  console.log("PDF.js worker configured with local worker");
  console.log("Worker version should match pdfjs-dist 4.8.69");
}

interface PDFViewerProps {
  file: string;
  onClose: () => void;
}

export default function PDFViewer({ file, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1.2);
  const [error, setError] = useState<string | null>(null);

  // Reset state when file changes
  useEffect(() => {
    setLoading(true);
    setPageNumber(1);
    setNumPages(0);
    setError(null);
  }, [file]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    console.log("PDF loaded successfully with", numPages, "pages");
  }

  function onDocumentLoadError(error: Error) {
    console.error("Error while loading document:", error);
    console.error("PDF file URL:", file);
    setError(error.message);
    setLoading(false);

    // Test if the file is accessible
    fetch(file)
      .then((response) => {
        console.log("File fetch test:", {
          status: response.status,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries()),
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.blob();
      })
      .then((blob) => {
        console.log("File blob:", {
          size: blob.size,
          type: blob.type,
        });
      })
      .catch((fetchError) => {
        console.error("File fetch failed:", fetchError);
      });
  }
  const handleRetry = () => {
    // Reset state and try loading PDF again
    setLoading(true);
    setError(null);
    setNumPages(0);
    setPageNumber(1);
  };

  return (
    <div className="pdf-viewer-overlay">
      <div className="pdf-viewer-container">
        <div className="pdf-viewer-header">
          <div className="pdf-viewer-controls">
            <button
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              disabled={pageNumber <= 1 || numPages === 0}
              className="pdf-control-btn"
            >
              Previous
            </button>
            <span className="pdf-page-info">
              Page {pageNumber} of {numPages || 0}
            </span>
            <button
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages || numPages === 0}
              className="pdf-control-btn"
            >
              Next
            </button>
            <div className="pdf-zoom-controls">
              <button
                onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                className="pdf-control-btn"
              >
                Zoom Out
              </button>
              <span className="pdf-zoom-info">{Math.round(scale * 100)}%</span>
              <button
                onClick={() => setScale(Math.min(2, scale + 0.1))}
                className="pdf-control-btn"
              >
                Zoom In
              </button>
            </div>
          </div>
          <button onClick={onClose} className="pdf-close-btn">
            ✕
          </button>
        </div>{" "}
        <div className="pdf-viewer-content">
          {loading && (
            <div className="pdf-loading">
              <div className="loading-spinner"></div>
              <p>Loading PDF...</p>
              <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                File: {file}
              </p>
            </div>
          )}{" "}
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            options={{
              cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/cmaps/",
              cMapPacked: true,
              standardFontDataUrl:
                "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.8.69/standard_fonts/",
              disableAutoFetch: false,
              disableStream: false,
              disableRange: false,
              // Ensure compatibility with direct file URLs
              httpHeaders: {},
              withCredentials: false,
            }}
            loading={
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>Loading PDF document...</p>
              </div>
            }
            error={
              error ? (
                <div className="pdf-loading">
                  <p style={{ color: "#ef4444" }}>
                    Failed to load PDF: {error}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    File: {file}
                  </p>
                  <div style={{ marginTop: "10px" }}>
                    <button
                      onClick={handleRetry}
                      style={{
                        marginRight: "10px",
                        padding: "8px 16px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Retry
                    </button>
                    <button
                      onClick={() => window.open(file, "_blank")}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Open in New Tab
                    </button>
                  </div>
                </div>
              ) : null
            }
          >
            {numPages > 0 && (
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderAnnotationLayer={true}
                renderTextLayer={true}
                loading={
                  <div className="pdf-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading page {pageNumber}...</p>
                  </div>
                }
                error={
                  <div className="pdf-loading">
                    <p style={{ color: "#ef4444" }}>
                      Failed to load page {pageNumber}
                    </p>
                  </div>
                }
              />
            )}
          </Document>
        </div>
      </div>

      <style jsx>{`
        .pdf-viewer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.8);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .pdf-viewer-container {
          background: white;
          border-radius: 8px;
          width: 90%;
          height: 90%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .pdf-viewer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        .pdf-viewer-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .pdf-zoom-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-left: 1rem;
        }

        .pdf-control-btn {
          padding: 0.5rem 1rem;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .pdf-control-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .pdf-control-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pdf-close-btn {
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s;
        }

        .pdf-close-btn:hover {
          background: #dc2626;
        }

        .pdf-page-info,
        .pdf-zoom-info {
          font-size: 0.875rem;
          color: #374151;
          font-weight: 500;
        }

        .pdf-viewer-content {
          flex: 1;
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 1rem;
          background: #f3f4f6;
        }

        .pdf-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          color: #6b7280;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .pdf-viewer-container {
            width: 95%;
            height: 95%;
          }

          .pdf-viewer-controls {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .pdf-zoom-controls {
            margin-left: 0;
          }

          .pdf-control-btn {
            padding: 0.375rem 0.75rem;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
