"use client";

import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

interface PDFViewerProps {
  file: string;
  onClose: () => void;
}

export default function PDFViewer({ file, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [scale, setScale] = useState<number>(1.2);
  const [retryCount, setRetryCount] = useState<number>(0);

  // Reset state when file changes
  React.useEffect(() => {
    setLoading(true);
    setPageNumber(1);
    setNumPages(0);
    setRetryCount(0);
  }, [file]);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
    console.log("PDF loaded successfully with", numPages, "pages");
  }
  function onDocumentLoadError(error: Error) {
    console.error("Error while loading document:", error);
    console.error("PDF file URL:", file);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    // Try to fetch the URL directly to see what we get
    fetch(file)
      .then((response) => {
        console.log("Direct fetch response:", {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          url: response.url,
        });
        return response.arrayBuffer();
      })
      .then((buffer) => {
        console.log("Response content details:", {
          size: buffer.byteLength,
          firstBytes: new Uint8Array(buffer.slice(0, 10)),
          isPDF:
            new Uint8Array(buffer.slice(0, 4)).toString() === "37,80,68,70", // %PDF
        });
      })
      .catch((fetchError) => {
        console.error("Direct fetch failed:", fetchError);
      });

    setLoading(false);
  }

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setLoading(true);
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
              disabled={pageNumber <= 1}
              className="pdf-control-btn"
            >
              Previous
            </button>
            <span className="pdf-page-info">
              Page {pageNumber} of {numPages}
            </span>
            <button
              onClick={() => setPageNumber(Math.min(numPages, pageNumber + 1))}
              disabled={pageNumber >= numPages}
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
            </div>
          )}{" "}
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            key={`${file}-${retryCount}`} // Force re-render on retry
            options={{
              cMapUrl: `https://unpkg.com/pdfjs-dist@3.11.174/cmaps/`,
              cMapPacked: true,
              standardFontDataUrl: `https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/`,
              disableAutoFetch: false,
              disableStream: false,
              httpHeaders: {
                Accept: "application/pdf",
              },
            }}
            loading={
              <div className="pdf-loading">
                <div className="loading-spinner"></div>
                <p>Loading PDF...</p>
              </div>
            }
            error={
              <div className="pdf-loading">
                <p style={{ color: "#ef4444" }}>
                  Failed to load PDF. Please try again.
                </p>
                <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                  File: {file}
                </p>
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={handleRetry}
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Retry (Attempt {retryCount + 1})
                  </button>
                  <button
                    onClick={() => window.open(file, "_blank")}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Open in New Tab
                  </button>
                </div>
              </div>
            }
          >
            {numPages > 0 && (
              <Page
                pageNumber={pageNumber}
                scale={scale}
                loading={
                  <div className="pdf-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading page...</p>
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
