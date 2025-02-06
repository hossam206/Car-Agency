using Microsoft.AspNetCore.Mvc;
using Server.Dtos;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto data)
        {
            try
                             
            {
                var user =  _authService.GetUser(data.Email, data.Password);

                if (user == null)
                {
                    return BadRequest(new { message = "Something Error" });
                }
              
                var token = _authService.GenerateJwtToken(data);
                Response.Cookies.Append("AuthToken",token ,new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7),
                });
                Response.Cookies.Delete("token");
                Response.Cookies.Delete("refreshToken");
                return Ok(new { message = "Login successfully"});
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while executing the action.");
                return StatusCode(500, new { message = "Internal Server Error" ,error =ex });
            }
        }
    }
}
