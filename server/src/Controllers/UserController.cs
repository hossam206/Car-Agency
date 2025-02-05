using Server.Models;
using Microsoft.AspNetCore.Mvc;
namespace Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetAllCars()
        {
            // logic to return data
            return Ok(new { message = "List of Cars" });
        }
    }
}
