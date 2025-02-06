using iTextSharp.text.pdf;
using iTextSharp.text;
using System.Drawing;

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
    public class ItemService: IItemService
    {
        private readonly ItemRepository  _itemRepository;

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
            string templatePath = "F:\\Ecommerce .Net\\Project_Net\\Car-Agency\\server\\src\\wwwroot\\new1.jpg"; // صورة القالب
            string outputPath = "F:\\Ecommerce .Net\\Project_Net\\Car-Agency\\server\\src\\wwwroot\\ExportCertificate.pdf";

            using (FileStream fs = new FileStream(outputPath, FileMode.Create))
            {
                Document document = new Document(PageSize.A4);
                PdfWriter writer = PdfWriter.GetInstance(document, fs);
                document.Open();

                // تحميل صورة القالب
                iTextSharp.text.Image background = iTextSharp.text.Image.GetInstance(templatePath);
                background.SetAbsolutePosition(0, 0);
                background.ScaleToFit(PageSize.A4.Width, PageSize.A4.Height);
                document.Add(background);

                // إنشاء طبقة الكتابة فوق الصورة
                PdfContentByte cb = writer.DirectContent;
                BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                cb.SetFontAndSize(bf, 12);
                cb.SetColorFill(BaseColor.BLACK);

                // إضافة البيانات في أماكنها
                cb.BeginText();
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.VehicleType, 335, 720, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.ExportPlateNumber, 335, 160, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.RegistrationPlateNumber, 335, 660, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.RegistrationDate, 335, 233, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.RegistrationExpiryDate, 335, 234, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.VehicleMake, 335, 235, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.Category, 335, 234, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.ModelYear, 335, 560, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.CountryOfOrigin, 689, 540, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.VehicleColor, 335, 520, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.ChassisNumber, 335, 500, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.EngineNumber, 335, 480, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.NumberOfDoors.ToString(), 335, 460, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.FuelType, 335, 440, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.NumberOfSeats.ToString(), 335, 420, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.EmptyWeight.ToString(), 335, 400, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.InsuranceCompany, 335, 380, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.InsuranceType, 335, 335, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.InsurancePolicyNumber, 400, 340, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.InsuranceExpiryDate, 400, 320, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.OwnerName, 400, 300, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.Nationality, 400, 280, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.PassportNumber, 400, 260, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.TrafficCodeNumber, 400, 240, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.EmiratesIdNumber, 400, 220, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.DriverName, 400, 200, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.LicenseNumber, 400, 180, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.DriverNationality, 400, 160, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.LicenseSource, 400, 140, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.CertificateIssueDate, 400, 120, 0);
                cb.ShowTextAligned(Element.ALIGN_LEFT, item.CertificateReferenceNumber, 400, 100, 0);
                cb.EndText();
                document.Close();
            }
}


       



    }
}
