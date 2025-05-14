import fs from "fs";
import { PDFDocument, PDFPage } from "pdf-lib";
import { rgb, RGB } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import path from "path";

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

  const fontBytesBold = fs.readFileSync(
    path.join(__dirname, "../Pdf/alfont_com_Wafeq-SemiBold.otf")
  );
  const fontPathEn = fs.readFileSync(
    path.join(__dirname, "../Pdf/Copihue-Normal.otf")
  );
  const fontPathAr = fs.readFileSync(
    path.join(__dirname, "../Pdf/alfont_com_Wafeq-Regular.otf")
  );
  const SmallFontSize = 7.3;
console.log(__dirname)
  // Load template
  const templateBytes = fs.readFileSync(
    path.join(__dirname, "../Pdf/ExportCertificate.pdf")
  );
  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);

  // Embed fonts
  const fontEn = await pdfDoc.embedFont(fontPathEn);
  const fontAr = await pdfDoc.embedFont(fontPathAr);
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
