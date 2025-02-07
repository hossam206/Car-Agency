using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Repositorys
{
    public interface IAuthRepository {
        Task<User> Login(string email ,string password);
    }

    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationContextDb _context;

        public AuthRepository(ApplicationContextDb context)
        {
            _context = context;
        }

        public async Task<User> Login(string email , string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(e => e.Email.ToLower() == email.ToLower() && e.Password == password );
           if (user == null) 
                return null;
            return user;
        }
    }
}
