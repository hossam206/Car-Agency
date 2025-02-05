namespace Server.Models
{
    public interface IItemService
    {

    }
    public class ItemService: IItemService
    {
        private readonly ItemRepository  _itemRepository;

        public ItemService(ItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }
    }
}
