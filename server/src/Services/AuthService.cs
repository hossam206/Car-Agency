using Microsoft.IdentityModel.Tokens;
using Server.Dtos;
using Server.Models;
using Server.Repositorys;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services
{
    public interface IAuthService
    {
        Task<User> GetUser(string email, string password);
        public string GenerateJwtToken(UserDto user);
    }

    public class AuthService : IAuthService
    {
        private readonly AuthRepository _authRepository;
        private readonly string _role;
        private readonly string _key;

        public AuthService(AuthRepository authRepository, IConfiguration configuration)
        {
            _authRepository = authRepository;
            _role = Environment.GetEnvironmentVariable("ROLE");
            _key = Environment.GetEnvironmentVariable("KEY");
        }

        public async Task<User> GetUser(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;
            return await _authRepository.GetUser(email, password);
        }

        public string GenerateJwtToken(UserDto user)
        {
            var key = Encoding.ASCII.GetBytes(_key);

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Role, _role)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
