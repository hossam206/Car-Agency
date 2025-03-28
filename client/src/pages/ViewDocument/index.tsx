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
//   const { documentId } = useParams();
//   const [images, setImages] = useState<string[]>([]);

//   const getDocument = async () => {
//     try {
//       const response = await axios.get(`${api}/car/view/${documentId}`, {
//         headers: { Accept: "application/pdf" },
//         responseType: "blob",
//       });
//       console.log(response);
//       const pdfBlob = new Blob([response.data], { type: "application/pdf" });
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       console.log(pdfBlob, pdfUrl);
//       const loadingTask = pdfjsLib.getDocument(pdfUrl);
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
//     <div className="w-screen h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
//       {images?.length > 0 ? (
//         images?.map((imgSrc, index) => (
//           <img
//             key={index}
//             src={imgSrc}
//             alt={`Page ${index + 1}`}
//             className=" my-10 shadow-lg rounded-lg h-screen max-w-screen-md"
//           />
//         ))
//       ) : (
//         <p className="text-center text-gray-500">
//           <PiSpinner
//             size={28}
//             className="animate-spin transition duration-500 ease-in-out"
//           />
//         </p>
//       )}
//     </div>
//   );
// }

// export default ViewDocument;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { PiSpinner } from "react-icons/pi";
import { Button } from "@/Components/ui/button"; // افترضت أن لديك مكون Button
import { FaPlus, FaMinus, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// تحديد مصدر العامل (worker) لـ pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const api = import.meta.env.VITE_API_URL;

function ViewDocument() {
  const { documentId } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1); // الصفحة الحالية
  const [scale, setScale] = useState<number>(1.5); // مقياس العرض
  const [loading, setLoading] = useState<boolean>(true);

  const getDocument = async () => {
    try {
      const response = await axios.get(`${api}/car/view/${documentId}`, {
        headers: { Accept: "application/pdf" },
        responseType: "blob",
      });
      console.log(response, documentId);
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocument();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [documentId]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // دوال التحكم في شريط الأدوات
  const goToPreviousPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) setPageNumber(pageNumber + 1);
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.25, 3)); // الحد الأقصى 3
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.25, 0.5)); // الحد الأدنى 0.5
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center p-4 bg-gray-100 overflow-auto">
      {/* شريط الأدوات */}
      {pdfUrl && numPages && (
        <div className="fixed top-4 left-0 right-0 flex justify-center z-10 bg-white shadow-md p-2 rounded-lg max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            className="mx-2"
          >
            <FaArrowLeft />
          </Button>
          <span className="flex items-center mx-4">
            الصفحة {pageNumber} من {numPages}
          </span>
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
            className="mx-2"
          >
            <FaArrowRight />
          </Button>
          <Button variant="outline" onClick={zoomOut} className="mx-2">
            <FaMinus />
          </Button>
          <Button variant="outline" onClick={zoomIn} className="mx-2">
            <FaPlus />
          </Button>
        </div>
      )}

      {/* عرض الـ PDF */}
      <div className="flex flex-col justify-center items-center mt-16">
        {loading ? (
          <p className="flex flex-col justify-center items-center text-gray-500 font-medium">
            <PiSpinner
              size={28}
              className="animate-spin transition duration-500 ease-in-out"
            />
            Loading ...
          </p>
        ) : pdfUrl ? (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.error("Error loading PDF:", error)}
            loading={
              <p className="text-center text-gray-500">
                <PiSpinner
                  size={28}
                  className="animate-spin transition duration-500 ease-in-out"
                />
              </p>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              className="my-10 shadow-lg rounded-lg max-w-screen-md"
            />
          </Document>
        ) : (
          <p className="text-center text-red-500">فشل في تحميل المستند</p>
        )}
      </div>
    </div>
  );
}

export default ViewDocument;
