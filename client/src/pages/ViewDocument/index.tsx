import { useParams } from "react-router-dom";
const api = import.meta.env.VITE_API_URL;
function ViewDocument() {
  const { documentId } = useParams();
  const pdfUrl = `${api}/car/view/${documentId}`;
  const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl
  )}`;

  return (
    <div>
      <iframe
        src={googleViewerUrl}
        width="100%"
        height="1000px"
        style={{ border: "none" }}
      ></iframe>
      <p>
        If the PDF is not displayed,{" "}
        <a href={pdfUrl} download>
          download it here
        </a>
        .
      </p>
    </div>
  );
}

export default ViewDocument;
