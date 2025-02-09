import axios from "axios";
const api = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
export const handleDownloadPdf = async (documentId: any, path: string) => {
  try {
    const response = await axios.get(`${api}/${path}/${documentId}`, {
      responseType: "blob", // This is critical for handling file downloads
      withCredentials: true,
    });

    // Create a Blob from the response data
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // Create a link element for downloading the file
    const link = document.createElement("a");
    link.href = url;
    // Set the file name (you may get it from the response headers or hardcode it)
    const contentDisposition = response.headers["content-disposition"];
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1].replace(/"/g, "")
      : `download_${documentId}.pdf`;

    link.setAttribute("download", filename);

    // Append the link to the body, trigger click, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    alert("sorry error happened while downloading the file,try again");
    console.error("Error downloading file:", error);
  }
};
