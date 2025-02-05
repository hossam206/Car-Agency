using Server.Data;

namespace Server.Repositorys
{
    public interface IQRCodeRepository
    {

    }

    public class QRCodeRepository : IQRCodeRepository
    {
        private readonly ApplicationContextDb _context;

        public QRCodeRepository(ApplicationContextDb context)
        {
            _context = context;
        }
    }
}
