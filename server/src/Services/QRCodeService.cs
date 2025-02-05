using Server.Repositorys;

namespace Server.Services
{
    public interface IQRCodeService
    {

    }
    public class QRCodeService: IQRCodeService
    {
        private readonly QRCodeRepository  _qRCodeRepository;

        public QRCodeService(QRCodeRepository qRCodeRepository)
        {
            _qRCodeRepository = qRCodeRepository;
        }

    }
}
