using Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly  ItemService _itemService;
        public ItemController(ItemService itemService)
        {
            _itemService = itemService;
        }
    }
}
