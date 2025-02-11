import { useParams } from "react-router-dom";

const api = import.meta.env.VITE_API_URL || "https://trafccate.com/api";

// Use local worker from installed package

function ViewDocument() {
  const { documentId } = useParams();
  const pdfUrl = `${api}/car/view/${documentId}`;

  return (
    <div>
      <object data={pdfUrl} type="application/pdf" width="100%" height="1000px">
        <p>
          Your browser does not support PDFs.{" "}
          <a href="/document.pdf">Download the PDF</a>.
        </p>
      </object>
    </div>
  );
}

export default ViewDocument;
