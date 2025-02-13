import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const api = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

function ViewDocument() {
  const { documentId } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const getDocument = async () => {
      try {
        const response = await axios.get(`${api}/car/view/${documentId}`, {
          headers: { Accept: "application/pdf" },
          responseType: "blob",
        });

        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfObjectUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfObjectUrl);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    getDocument();
  }, [documentId]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      {pdfUrl ? (
        <>
          <iframe src={pdfUrl} className="w-full h-full border-none"></iframe>
        </>
      ) : (
        <p className="text-center text-gray-500">Loading PDF...</p>
      )}
    </div>
  );
}

export default ViewDocument;
