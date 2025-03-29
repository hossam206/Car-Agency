import axios from "axios";
const api = import.meta.env.VITE_API_URL;
export const handleDownloadPdf = async (
  documentId: number,
  path: string,
  setDownloadStatus: (id: number, status: string) => void
) => {
   setDownloadStatus(documentId, "loading"); // Set status to loading
  try {
    const response = await axios.get(`${api}/${path}/${documentId}`, {
      responseType: "blob",
      withCredentials: true,
    });

    // Create a Blob URL
    const url = window.URL.createObjectURL(new Blob([response.data]));

    // Extract filename from headers
    const contentDisposition =
      response.headers["content-disposition"] ||
      response.headers["Content-Disposition"];
    let filename = `certificate_${documentId}.pdf`;

    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    // Create a download link
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Revoke the object URL to free up memory
    setTimeout(() => window.URL.revokeObjectURL(url), 100);

    setDownloadStatus(documentId, "success"); // Update to success
  } catch (error) {
    setDownloadStatus(documentId, "failed"); // Update to failed
    console.error("Download error:", error);
    alert("Error downloading the file. Please try again.");
  }
};
