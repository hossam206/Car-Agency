import axios from "axios";

const api = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

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
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `download_${documentId}.pdf`;

    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadStatus(documentId, "success"); // Update to success
  } catch (error) {
    setDownloadStatus(documentId, "failed"); // Update to failed
    alert("Error downloading the file. Please try again.");
    console.error("Download error:", error);
  }
};
