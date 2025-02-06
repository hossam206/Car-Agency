using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Repositorys
{
    public interface IAuthRepository {
        Task<User> GetUser(string email ,string password);
    }

    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationContextDb _context;

        public AuthRepository(ApplicationContextDb context)
        {
            _context = context;
        }

        public async Task<User> GetUser(string email , string password)
        {
            return await _context.Users.FirstOrDefaultAsync(e => e.Email == email && e.Password == password);
        }
    }
}
