using System.ComponentModel.DataAnnotations;

namespace Server.Dtos
{
    public class UserDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
