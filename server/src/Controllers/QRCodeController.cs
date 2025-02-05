using Server.Services;
using Microsoft.AspNetCore.Mvc;
using QRCoder;
using System.Drawing;
using System.Drawing.Imaging;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QRCodeController : ControllerBase
    {
        private readonly QRCodeService _qrCodeService;

        public QRCodeController(QRCodeService qrCodeService)
        {
            _qrCodeService = qrCodeService;
        }

    }
}
