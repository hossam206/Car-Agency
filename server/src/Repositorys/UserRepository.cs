using Server.Data;

namespace Server.Models
{
    public interface IUserRepository { 
    
    }

    public class UserRepository : IUserRepository
    {
        private readonly ApplicationContextDb _context;

        public UserRepository(ApplicationContextDb context)
        {
            _context = context;
        }
    }
}
