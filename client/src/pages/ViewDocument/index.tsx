import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"; // Import worker from the package
import { PiSpinner } from "react-icons/pi";

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const api = import.meta.env.VITE_API_URL;

function ViewDocument() {
  const { documentId } = useParams();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const getDocument = async () => {
      try {
        const response = await axios.get(`${api}/car/view/${documentId}`, {
          headers: { Accept: "application/pdf" },
          responseType: "blob",
        });

        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        const imageUrls: string[] = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const scale = 2; // Adjust for better resolution
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d")!;
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          imageUrls.push(canvas.toDataURL("image/png"));
        }

        setImages(imageUrls);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    getDocument();
  }, [documentId]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      {images.length > 0 ? (
        images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Page ${index + 1}`}
            className=" my-10 shadow-lg rounded-lg h-screen max-w-screen-md"
          />
        ))
      ) : (
        <p className="text-center text-gray-500">
          <PiSpinner size={28}  className="animate-spin transition duration-500 ease-in-out"/>
        </p>
      )}
    </div>
  );
}

export default ViewDocument;
