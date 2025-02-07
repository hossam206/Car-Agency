using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.IO.Image;
using iText.Kernel.Geom;
using ZXing;
using ZXing.Common;
using System.Drawing;
using System.Drawing.Imaging;
using iText.Kernel.Font;
using iText.IO.Font.Constants;
using iText.Kernel.Colors;
using Image = iText.Layout.Element.Image;
using iText.IO.Font;
using Rectangle = System.Drawing.Rectangle;


namespace Server.Models
{
    public interface ICarService
    {
        Task<object> GetAll(int page);
        Task<Car> GetById(int id);
        Task<bool> Add(Car car);
        Task<bool> Delete(int id);
        Task<bool> Update(Car car, int id);
        Task<MemoryStream> GenerateCertificate(int id);
        Task<int> Count();
    }
    public class CarService : ICarService
    {
        private readonly CarRepository _carRepository;
        private static readonly string TemplatePath = @"F:\Ecommerce_Net\Project_Net\Car-Agency\server\src\Pdf\ExportCertificate.jpeg";
        private const float LargeFontSize = 10;
        private const float SmallFontSize = 8;
        private static readonly DeviceRgb BlueColor = new DeviceRgb(53, 60, 145);
        private static readonly DeviceRgb WhiteColor = new DeviceRgb(249, 251, 255);

        public CarService(CarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        public async Task<bool> Add(Car car)
        {
            if (car == null)
                return false;
            return await _carRepository.Add(car);
        }

        public async Task<bool> Delete(int id)
        {
            if (id == null)
                return false;
            return await _carRepository.Delete(id);
        }

        public async Task<object> GetAll(int page)
        {
            return await _carRepository.GetAll(page);
        }

        public async Task<Car> GetById(int id)
        {
            return await _carRepository.GetById(id);
        }

        public async Task<bool> Update(Car car, int id)
        {
            if (car == null || id == null)
                return false;
            return await _carRepository.Update(car, id);
        }


        public async Task<int> Count()
        {
            return await _carRepository.Count();
        }

        // Generate Certificate
        public async Task<MemoryStream> GenerateCertificate(int id)
        {
            var carRetrieved = await GetById(id);
            if (carRetrieved == null)
            {
                throw new Exception("Car not found.");
            }
            string url = $"https://localhost:7299/api/car/download/{id}";

            ImageData qrCodeImageData = GenerateQrCode(url);  // Generate a new QR Code image data.
            byte[] templateBytes = File.ReadAllBytes(TemplatePath); // Read template bytes.

            using (var tempStream = new MemoryStream())
            {

                PdfWriter writer = new PdfWriter(tempStream);
                PdfDocument pdf = new PdfDocument(writer);
                Document document = new Document(pdf);
                PdfFont font = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);

                AddImage(document, ImageDataFactory.Create(templateBytes), 0, 0, PageSize.A4.GetWidth(), PageSize.A4.GetHeight());
                AddImage(document, ImageDataFactory.Create(qrCodeImageData.GetData()), 250, 397, 64, 50);
                AddCertificateText(document, carRetrieved, font);

                document.Close();

                var finalStream = new MemoryStream(tempStream.ToArray());
                finalStream.Position = 0;
                return finalStream;
            }
        }

        // Add Image QRcode and  export certificate
        private void AddImage(Document document, ImageData imageData, float x, float y, float width, float height)
        {
            Image image = new Image(imageData);
            image.SetFixedPosition(x, y);
            image.ScaleToFit(width, height);
            document.Add(image);
        }

        // Generate Text
        private static void AddCertificateText(Document document, Car car, PdfFont font)
        {
            var textElements = new (string, float, float, float, DeviceRgb)[]
            {
            (car.ExportCountryTo, 173, 725, LargeFontSize, WhiteColor),
            (car.ExportCountryTo, 150, 624, LargeFontSize, WhiteColor),
            (car.VehicleType, 340, 714, LargeFontSize, BlueColor),
            (car.ExportPlateNumber, 340, 683, LargeFontSize, BlueColor),
            (car.RegistrationPlateNumber, 340, 652, LargeFontSize, BlueColor),
            (car.RegistrationDate, 340, 619, LargeFontSize, BlueColor),
            (car.RegistrationExpiryDate, 340, 586, LargeFontSize, BlueColor),
            (car.VehicleMake, 340, 554, LargeFontSize, BlueColor),
            (car.Category, 340, 521, LargeFontSize, BlueColor),
            (car.ModelYear, 340, 488, LargeFontSize, BlueColor),
            (car.CountryOfOrigin, 340, 456, LargeFontSize, BlueColor),
            (car.VehicleColor, 340, 424, LargeFontSize, BlueColor),
            (car.ChassisNumber, 340, 394, LargeFontSize, BlueColor),
            (car.EngineNumber, 410, 359, LargeFontSize, BlueColor),
            (car.NumberOfDoors.ToString(), 340, 329, LargeFontSize, BlueColor),
            (car.FuelType, 340, 297, LargeFontSize, BlueColor),
            (car.NumberOfSeats.ToString(), 340, 266, LargeFontSize, BlueColor),
            (car.EmptyWeight.ToString(), 340, 233, LargeFontSize, BlueColor),
            (car.InsuranceCompany, 340, 200, LargeFontSize, BlueColor),
            (car.InsuranceType, 340, 170, LargeFontSize, BlueColor),
            (car.InsurancePolicyNumber, 340, 139, LargeFontSize, BlueColor),
            (car.InsuranceExpiryDate, 340, 107, LargeFontSize, BlueColor),
            (car.OwnerName, 268, 365, LargeFontSize, BlueColor),
            (car.OwnerName, 25, 338, LargeFontSize, BlueColor),
            (car.Nationality, 25, 311, LargeFontSize, BlueColor),
            (car.PassportNumber, 140, 280, LargeFontSize, BlueColor),
            (car.TrafficCodeNumber, 140, 258, LargeFontSize, BlueColor),
            (car.EmiratesIdNumber, 140, 228, LargeFontSize, BlueColor),
            (car.DriverName, 220, 210, LargeFontSize, BlueColor),
            (car.DriverName, 78, 189, LargeFontSize, BlueColor),
            (car.LicenseNumber, 140, 172, LargeFontSize, BlueColor),
            (car.DriverNationality, 140, 152, LargeFontSize, BlueColor),
            (car.LicenseSource, 140, 122, LargeFontSize, BlueColor),
            (car.CertificateIssueDate, 22, 500, SmallFontSize, WhiteColor),
            (car.CertificateIssueDate, 260, 492, SmallFontSize, WhiteColor),
            (car.CertificateReferenceNumber, 242, 450, SmallFontSize, WhiteColor)
            };

            foreach (var (text, x, y, fontSize, color) in textElements)
            {
                AddText(document, text, x, y, fontSize, color, font);
            }
        }

        // Add text to document
        private static void AddText(Document document, string text, float x, float y, float fontSize, DeviceRgb color, PdfFont font)
        {
            document.Add(new Paragraph(text)
                .SetFont(font)
                .SetFontSize(fontSize)
                .SetFontColor(color)
                .SetFixedPosition(x, y, 200));
        }

        // Generate QrCode
        private static ImageData GenerateQrCode(string text)
        {
            var writer = new BarcodeWriterPixelData
            {
                Format = BarcodeFormat.QR_CODE,
                Options = new EncodingOptions { Height = 150, Width = 150, Margin = 1 }
            };

            var pixelData = writer.Write(text);
            using (var bitmap = new Bitmap(pixelData.Width, pixelData.Height, PixelFormat.Format32bppArgb))
            {
                var rect = new Rectangle(0, 0, bitmap.Width, bitmap.Height);
                var bitmapData = bitmap.LockBits(rect, ImageLockMode.WriteOnly, bitmap.PixelFormat);
                IntPtr ptr = bitmapData.Scan0;

                System.Runtime.InteropServices.Marshal.Copy(pixelData.Pixels, 0, ptr, pixelData.Pixels.Length);
                bitmap.UnlockBits(bitmapData);

                using (var ms = new MemoryStream())
                {
                    bitmap.Save(ms, ImageFormat.Jpeg);
                    return ImageDataFactory.Create(ms.ToArray());
                }
            }
        }
    }
}
