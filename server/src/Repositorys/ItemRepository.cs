using Microsoft.EntityFrameworkCore;
using Server.Data;

namespace Server.Models
{
    public interface IItemRepository
    {
        Task<object> GetAll(int page);
        Task<Item> GetById(int id);
        Task<bool> Add(Item item);
        Task<bool> Delete(int id);
        Task<bool> Update(Item item, int id);
    }
    public class ItemRepository : IItemRepository
    {
        private readonly ApplicationContextDb _context;

        public ItemRepository(ApplicationContextDb context)
        {
            _context = context;
        }

        public async Task<bool> Add(Item item)
        {
            try
            {
                await _context.Items.AddAsync(item);
                var result = await _context.SaveChangesAsync();
                return result > 0;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> Delete(int id)
        {
            try
            {
                var item = await _context.Items.FindAsync(id);
                if (item == null)
                    return false;
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<object> GetAll(int page)
        {
            var items = await _context.Items.ToListAsync();
            if (items == null)
                return null;

            var result = Pagination(page, items);
            return result;
        }

        public async Task<Item> GetById(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
                return null;
            return item;
        }

        private object Pagination(int pageNum, List<Item> items)
        {
            int page = Math.Max(pageNum, 1);
            var result = items.Skip((page - 1) * 10).Take(10);
            int totalPages = (int)Math.Ceiling(items.Count / (double)10);
            return new
            {
                TotalCar = items.Count,
                TotalPages = totalPages,
                CurrentPage = page,
                RemainPages = Math.Max(items.Count - 10 * page, 0),
                LimitPage = 10,
                Car = result
            };
        }

        public async Task<bool> Update(Item item, int id)
        {
            var result = await _context.Items.FindAsync(id);
            if (result == null)
                return false;

            item.Id = id;
            _context.Entry(result).CurrentValues.SetValues(item);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
