"use client";
import PageBanner from "@/components/PageBanner";
import PDFViewer from "@/components/PDFViewerNew";
import { Book } from "@/constant/types";
import useQuery from "@/hooks/useQuery";
import "@/style/home.scss";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
export default function Detail({ token }: { token: string | null }) {
  const { id } = useParams();
  const { data, isLoading } = useQuery<Book>(`/api/books/${id}`);
  const [showPDFViewer, setShowPDFViewer] = useState(false);
  const [downloading, setDownloading] = useState(false);

  console.log("data", data);
  const handleDownload = async () => {
    if (!data?.pdfPath) return;

    setDownloading(true);
    try {
      // Try to use the API route first, then fallback to direct path
      const pdfUrl = data.pdfPath.startsWith("/uploads/")
        ? `/api/files/${data.pdfPath.replace("/uploads/", "")}`
        : data.pdfPath;

      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${data.title || data.name || "book"}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      // Try direct path as fallback
      try {
        const a = document.createElement("a");
        a.href = data.pdfPath;
        a.download = `${data.title || data.name || "book"}.pdf`;
        a.click();
      } catch (fallbackError) {
        console.error("Fallback download also failed:", fallbackError);
        alert("Failed to download PDF. Please try again.");
      }
    } finally {
      setDownloading(false);
    }
  };
  const handleReadBook = () => {
    if (!data?.pdfPath) return;

    // Use direct path to public/uploads files for better PDF.js compatibility
    let pdfUrl;
    if (data.pdfPath.startsWith("/uploads/")) {
      pdfUrl = data.pdfPath; // Use direct path
    } else if (data.pdfPath.startsWith("uploads/")) {
      pdfUrl = `/${data.pdfPath}`; // Add leading slash
    } else {
      pdfUrl = `/uploads/${data.pdfPath}`; // Assume it's just the filename
    }

    console.log("Original PDF path:", data.pdfPath);
    console.log("Using direct PDF URL:", pdfUrl);

    setShowPDFViewer(true);
  };

  if (isLoading) {
    return (
      <>
        <PageBanner title="Book Detail" />
        <div className="bookDetail__container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading book details...</p>
          </div>
        </div>
        <style jsx>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 4rem 2rem;
            color: #6b7280;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
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
        `}</style>
      </>
    );
  }
  return (
    <>
      <PageBanner title="Book Detail" />{" "}
      {showPDFViewer && data?.pdfPath && (
        <PDFViewer
          file={
            data.pdfPath.startsWith("/uploads/")
              ? data.pdfPath
              : data.pdfPath.startsWith("uploads/")
              ? `/${data.pdfPath}`
              : `/uploads/${data.pdfPath}`
          }
          onClose={() => setShowPDFViewer(false)}
        />
      )}
      <div className="bookDetail__container">
        <div className="bookDetail__container__left">
          <Image
            className="bookDetail__container__left__img"
            width={300}
            height={300}
            src={data?.imagePath || "/placeholder-image.jpg"}
            alt="library"
          />

          {token ? (
            <>
              <button
                className="bookDetail__container__left__download"
                onClick={handleDownload}
                disabled={downloading || !data?.pdfPath}
              >
                {downloading ? (
                  <>
                    <div className="button-spinner"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-download"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download Book
                  </>
                )}
              </button>
              <button
                className="bookDetail__container__left__download"
                onClick={handleReadBook}
                disabled={!data?.pdfPath}
                style={{
                  backgroundColor: "#000",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "8px" }}
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                Read Book
              </button>
            </>
          ) : (
            <div
              className="bookDetail__container__left__disclaimer"
              style={{
                padding: "10px",
                marginTop: "15px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "4px",
                color: "#6c757d",
                textAlign: "center",
              }}
            >
              <Link href="/signIn" style={{ margin: 0, color: "black" }}>
                Sign in to Download or Read this book.
              </Link>
            </div>
          )}
        </div>
        <div className="bookDetail__container__right">
          <div className="bookDetail__container__right__title">
            {data?.name}
          </div>
          <div className="bookDetail__container__right__author">
            {data?.author}
          </div>
          <div className="book__detail__line" />
          <div className="book__detail__about__title">About this book</div>
          <div className="book__detail__about__sub__title">
            {data?.description}
          </div>
        </div>
      </div>
      <style jsx>{`
        .button-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .bookDetail__container__left__download:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .bookDetail__container__left__download:disabled:hover {
          background-color: inherit;
        }
      `}</style>
    </>
  );
}
