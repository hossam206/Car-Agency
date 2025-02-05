using Server.Data;

namespace Server.Models
{
    public interface IItemRepository
    {

    }
    public class ItemRepository
    {
        private readonly ApplicationContextDb _context;

        public ItemRepository(ApplicationContextDb context)
        {
            _context = context;
        }
    }
}
