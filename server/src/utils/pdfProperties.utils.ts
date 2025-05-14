import fs from "fs";
import { PDFDocument, PDFPage } from "pdf-lib";
import { rgb, RGB } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import path from "path";
  console.log(__dirname);
interface PdfResources {
  page: PDFPage;
  fontEn: any;
  fontAr: any;
  fontBold: any;
  pdfDoc: PDFDocument;
  WhiteColor: RGB;
  SmallFontSize: number;
}

export const pdfProperties = async (): Promise<PdfResources> => {
  // Load fonts

  // const fontBytesBold = fs.readFileSync(String(process.env.PATH_FONT_BOLD));
  // const fontBytesEn = fs.readFileSync(String(process.env.PATH_FONT_EN));
  // const fontBytesAr = fs.readFileSync(String(process.env.PATH_FONT_AR));
  const fontBytesBold = path.join(
    __dirname,
    "Pdf",
    "alfont_com_Wafeq-SemiBold.otf"
  );
  const fontBytesEn = path.join(__dirname, "Pdf", "Copihue-Normal.otf");
  const fontBytesAr = path.join(
    __dirname,
    "Pdf",
    "alfont_com_Wafeq-Regular.otf"
  );
  const SmallFontSize = 7.3;

  // Load template
  // const templateBytes = fs.readFileSync(String(process.env.PATH_PDF));

  const templateBytes = path.join(__dirname, "Pdf", "ExportCertificate.pdf");
  console.log(__dirname);
  console.log("Template file path:", templateBytes);
  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);

  // Embed fonts
  const fontEn = await pdfDoc.embedFont(fontBytesEn);
  const fontAr = await pdfDoc.embedFont(fontBytesAr);
  const fontBold = await pdfDoc.embedFont(fontBytesBold);

  // Load colors
  const WhiteColor: RGB = rgb(240 / 255, 248 / 255, 1);

  // Load pages
  pdfDoc.registerFontkit(fontkit);
  const pages = pdfDoc.getPages();
  const page = pages[0];

  return {
    page,
    fontEn,
    fontAr,
    fontBold,
    pdfDoc,
    WhiteColor,
    SmallFontSize,
  };
};
