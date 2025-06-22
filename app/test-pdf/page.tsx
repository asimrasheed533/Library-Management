"use client";

import PDFViewer from "@/components/PDFViewer";
import PDFWorkerInitializer from "@/components/PDFWorkerInitializer";
import { useState } from "react";

export default function TestPDF() {
  const [showPDF, setShowPDF] = useState(false);
  const [testUrl, setTestUrl] = useState("/uploads/1750523552814.pdf");

  const testDirectAccess = () => {
    window.open(testUrl, "_blank");
  };

  const testFetch = async () => {
    try {
      console.log("Testing fetch for:", testUrl);
      const response = await fetch(testUrl);
      console.log("Fetch response:", {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url,
        ok: response.ok,
      });

      if (response.ok) {
        const blob = await response.blob();
        console.log("Blob details:", {
          size: blob.size,
          type: blob.type,
        });
      } else {
        const text = await response.text();
        console.log("Error response:", text);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <PDFWorkerInitializer />
      <h1>PDF Test Page</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Test URL: </label>
        <input
          type="text"
          value={testUrl}
          onChange={(e) => setTestUrl(e.target.value)}
          style={{ width: "400px", padding: "5px", marginRight: "10px" }}
        />{" "}
        <button onClick={testDirectAccess} style={{ padding: "5px 10px" }}>
          Open Direct
        </button>
        <button
          onClick={testFetch}
          style={{ padding: "5px 10px", marginLeft: "10px" }}
        >
          Test Fetch
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setShowPDF(!showPDF)}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          {showPDF ? "Close PDF Viewer" : "Open PDF Viewer"}
        </button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h3>Test URLs:</h3>{" "}
        <button onClick={() => setTestUrl("/uploads/1750523552814.pdf")}>
          Direct Path PDF
        </button>
        <button
          onClick={() => setTestUrl("/api/files/1750523552814.pdf")}
          style={{ marginLeft: "10px" }}
        >
          API Route PDF
        </button>
        <button
          onClick={() =>
            setTestUrl(
              "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            )
          }
          style={{ marginLeft: "10px" }}
        >
          External PDF
        </button>
      </div>

      {showPDF && (
        <PDFViewer file={testUrl} onClose={() => setShowPDF(false)} />
      )}
    </div>
  );
}
