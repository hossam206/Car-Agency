using System.ComponentModel.DataAnnotations;

namespace Server.Dtos
{
    public class UserDto
    {
        [EmailAddress]

        public string Email { get; set; }

        public string Password { get; set; }
    }
}
