// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import * as pdfjsLib from "pdfjs-dist";
// import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url"; // Import worker from the package
// import { PiSpinner } from "react-icons/pi";

// // Set the worker source
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// const api = import.meta.env.VITE_API_URL;

// function ViewDocument() {
//   const { carId } = useParams();
//   const [images, setImages] = useState<string[]>([]);

//   const getDocument = async () => {
//     try {
//       const response = await axios.get(`${api}/car/view/${carId}`, {
//         headers: { Accept: "application/pdf" },
//         responseType: "blob",
//       });
//       console.log(response);
//       const pdfBlob = new Blob([response.data], { type: "application/pdf" });
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//        const loadingTask = pdfjsLib.getDocument(pdfUrl);
//       const pdf = await loadingTask.promise;

//       const imageUrls: string[] = [];

//       for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
//         const page = await pdf.getPage(pageNum);
//         const scale = 2; // Adjust for better resolution
//         const viewport = page.getViewport({ scale });

//         const canvas = document.createElement("canvas");
//         const context = canvas.getContext("2d")!;
//         canvas.width = viewport.width;
//         canvas.height = viewport.height;

//         await page.render({ canvasContext: context, viewport }).promise;
//         imageUrls.push(canvas.toDataURL("image/png"));
//       }

//       setImages(imageUrls);
//     } catch (error) {
//       console.error("Error fetching PDF:", error);
//     }
//   };
//   useEffect(() => {
//     getDocument();
//   }, []);

//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center p-4  ">
//       {images?.length > 0 ? (
//         images?.map((imgSrc, index) => (
//           <img
//             key={index}
//             src={imgSrc}
//             alt={`Page ${index + 1}`}
//             className=" my-10 w-full rounded-lg h-screen max-w-screen-md"
//           />
//         ))
//       ) : (
//         <p className="text-center text-gray-500 flex flex-col items-center justify-center">
//           <PiSpinner
//             size={28}
//             className="animate-spin transition duration-500 ease-in-out"
//           />
//           Loading pdf...
//         </p>
//       )}
//     </div>
//   );
// }

// export default ViewDocument;

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PiSpinnerLight } from "react-icons/pi";
import { useParams } from "react-router-dom";
const api = import.meta.env.VITE_API_URL;
const PDFViewer = () => {
  const [viewerState, setViewerState] = useState<{
    status: "loading" | "loaded" | "error";
    url?: string;
    error?: string;
  }>({ status: "loading" });

  const isMobile = useRef(
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  );

  useEffect(() => {
    let blobUrl: string | null = null;
    let isMounted = true;

    const fetchPDF = async () => {
      const { carId } = useParams();
      try {
        const response = await axios.get(`${api}/car/view/${carId}`, {
          responseType: "blob",
          headers: { Accept: "application/pdf" },
        });

        blobUrl = URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );

        if (isMounted) {
          setViewerState({ status: "loaded", url: blobUrl });
        }
      } catch (err) {
        console.error("Error fetching PDF:", err);
        if (isMounted) {
          setViewerState({
            status: "error",
            error: "Failed to load document. Please try again.",
          });
        }
      }
    };

    fetchPDF();

    return () => {
      isMounted = false;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, []);

  switch (viewerState.status) {
    case "loading":
      return (
        <div className="flex justify-center h-screen p-4 flex-col items-center">
          <PiSpinnerLight
            className="animate-spin transition-all duration-400 ease-in-out"
            size={20}
          />
          Loading PDF...
        </div>
      );

    case "error":
      return (
        <div className="flex justify-center p-4 text-red-500">
          {viewerState.error}
        </div>
      );

    case "loaded":
      return (
        <div className="pdf-viewer-container">
          {isMobile.current ? (
            <div className="mobile-pdf-fallback">
              <p>For best experience on mobile, please open the PDF:</p>
              <a
                href={viewerState.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pdf-open-button"
              >
                Open PDF in New Tab
              </a>
            </div>
          ) : (
            <iframe
              src={viewerState.url}
              width="100%"
              height="800px"
              title="PDF Viewer"
              style={{ border: "none" }}
              className="pdf-iframe"
              key={viewerState.url}
            />
          )}
        </div>
      );

    default:
      return null;
  }
};

export default PDFViewer;
