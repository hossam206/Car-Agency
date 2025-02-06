using System.Drawing;
using System.Drawing.Imaging;
using ZXing;
using ZXing.Common;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.IO.Image;
using iText.Layout.Element;
using iText.Kernel.Font;
using iText.IO.Font;
using iText.Kernel.Colors;
using iText.IO.Font.Constants;
using Image = iText.Layout.Element.Image;
using iText.Kernel.Geom;




namespace Server.Models
{
    public interface IItemService
    {
        Task<object> GetAll(int page);
        Task<Item> GetById(int id);
        Task<bool> Add(Item item);
        Task<bool> Delete(int id);
        Task<bool> Update(Item item, int id);
        void GenerateCertificate(Item item);
    }
    public class ItemService : IItemService
    {
        private readonly ItemRepository _itemRepository;
        private const string TemplatePath = "F:\\new.jpg";
        private const string OutputPath = "F:\\ExportCertificate.pdf";
        private const string QrCodePath = "F:\\QRCode.png";
        private static readonly PdfFont Font = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);
        private const float LargeFontSize = 10;
        private const float SmallFontSize = 8;
        private static readonly DeviceRgb BlueColor = new DeviceRgb(53, 60, 145);
        private static readonly DeviceRgb WhiteColor = new DeviceRgb(249, 251, 255);

        public ItemService(ItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<bool> Add(Item item)
        {
            if (item == null)
                return false;
            return await _itemRepository.Add(item);
        }

        public async Task<bool> Delete(int id)
        {
            if (id == null)
                return false;
            return await _itemRepository.Delete(id);
        }

        public async Task<object> GetAll(int page)
        {
            return await _itemRepository.GetAll(page);
        }

        public async Task<Item> GetById(int id)
        {
            return await _itemRepository.GetById(id);
        }

        public async Task<bool> Update(Item item, int id)
        {
            if (item == null || id == null)
                return false;
            return await _itemRepository.Update(item, id);
        }


        public void GenerateCertificate(Item item)
        {
            string url = "https://localhost:7299/api/item/create/7";
            GenerateQrCode(url, QrCodePath);

            using (PdfWriter writer = new PdfWriter(OutputPath))
            using (PdfDocument pdf = new PdfDocument(writer))
            using (Document document = new Document(pdf))
            {
                AddImage(document, TemplatePath, 0, 0, PageSize.A4.GetWidth(), PageSize.A4.GetHeight());
                AddImage(document, QrCodePath, 250, 397, 64, 50);
                AddCertificateText(document, item);
            }
        }

        private static void AddCertificateText(Document document, Item item)
        {
            var textElements = new (string, float, float, float, DeviceRgb)[]
            {
            (item.ExportCountryTo, 173, 725, LargeFontSize, WhiteColor),
            (item.ExportCountryTo, 150, 624, LargeFontSize, WhiteColor),
            (item.VehicleType, 340, 714, LargeFontSize, BlueColor),
            (item.ExportPlateNumber, 340, 683, LargeFontSize, BlueColor),
            (item.RegistrationPlateNumber, 340, 652, LargeFontSize, BlueColor),
            (item.RegistrationDate, 340, 619, LargeFontSize, BlueColor),
            (item.RegistrationExpiryDate, 340, 586, LargeFontSize, BlueColor),
            (item.VehicleMake, 340, 554, LargeFontSize, BlueColor),
            (item.Category, 340, 521, LargeFontSize, BlueColor),
            (item.ModelYear, 340, 488, LargeFontSize, BlueColor),
            (item.CountryOfOrigin, 340, 456, LargeFontSize, BlueColor),
            (item.VehicleColor, 340, 424, LargeFontSize, BlueColor),
            (item.ChassisNumber, 340, 394, LargeFontSize, BlueColor),
            (item.EngineNumber, 410, 359, LargeFontSize, BlueColor),
            (item.NumberOfDoors.ToString(), 340, 329, LargeFontSize, BlueColor),
            (item.FuelType, 340, 297, LargeFontSize, BlueColor),
            (item.NumberOfSeats.ToString(), 340, 266, LargeFontSize, BlueColor),
            (item.EmptyWeight.ToString(), 340, 233, LargeFontSize, BlueColor),
            (item.InsuranceCompany, 340, 200, LargeFontSize, BlueColor),
            (item.InsuranceType, 340, 170, LargeFontSize, BlueColor),
            (item.InsurancePolicyNumber, 340, 139, LargeFontSize, BlueColor),
            (item.InsuranceExpiryDate, 340, 107, LargeFontSize, BlueColor),
            (item.OwnerName, 268, 365, LargeFontSize, BlueColor),
            (item.OwnerName, 25, 338, LargeFontSize, BlueColor),
            (item.Nationality, 25, 311, LargeFontSize, BlueColor),
            (item.PassportNumber, 140, 280, LargeFontSize, BlueColor),
            (item.TrafficCodeNumber, 140, 258, LargeFontSize, BlueColor),
            (item.EmiratesIdNumber, 140, 228, LargeFontSize, BlueColor),
            (item.DriverName, 220, 210, LargeFontSize, BlueColor),
            (item.DriverName, 78, 189, LargeFontSize, BlueColor),
            (item.LicenseNumber, 140, 172, LargeFontSize, BlueColor),
            (item.DriverNationality, 140, 152, LargeFontSize, BlueColor),
            (item.LicenseSource, 140, 122, LargeFontSize, BlueColor),
            (item.CertificateIssueDate, 22, 500, SmallFontSize, WhiteColor),
            (item.CertificateIssueDate, 260, 492, SmallFontSize, WhiteColor),
            (item.CertificateReferenceNumber, 242, 450, SmallFontSize, WhiteColor)
            };

            foreach (var (text, x, y, fontSize, color) in textElements)
            {
                AddText(document, text, x, y, fontSize, color);
            }
        }

        private static void AddText(Document document, string text, float x, float y, float fontSize, DeviceRgb color)
        {
            document.Add(new Paragraph(text).SetFont(Font).SetFontSize(fontSize).SetFontColor(color).SetFixedPosition(x, y, 200));
        }

        private static void AddImage(Document document, string path, float x, float y, float width, float height)
        {
            Image image = new Image(ImageDataFactory.Create(path)).SetFixedPosition(x, y).ScaleToFit(width, height);
            document.Add(image);
        }

        private static void GenerateQrCode(string text, string filePath)
        {
            var writer = new BarcodeWriterPixelData
            {
                Format = BarcodeFormat.QR_CODE,
                Options = new EncodingOptions { Height = 150, Width = 150, Margin = 1 }
            };

            var pixelData = writer.Write(text);

            using (Bitmap bitmap = new Bitmap(pixelData.Width, pixelData.Height, PixelFormat.Format32bppArgb))
            {
                for (int y = 0; y < pixelData.Height; y++)
                {
                    for (int x = 0; x < pixelData.Width; x++)
                    {
                        System.Drawing.Color pixelColor = pixelData.Pixels[(y * pixelData.Width + x) * 4] == 0 ? System.Drawing.Color.Black : System.Drawing.Color.White;
                        bitmap.SetPixel(x, y, pixelColor);
                    }
                }
                bitmap.Save(filePath, ImageFormat.Png);
            }
        }
    }

}
