namespace PhoneBook.Services
{
    using PhoneBook.Models;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    public interface ICosmosDbService
    {
        Task<IEnumerable<PhoneBookModel>> GetItemsAsync(string query);
        Task<PhoneBookModel> GetItemAsync(string id);
        Task AddItemAsync(PhoneBookModel item);
        Task UpdateItemAsync(string id, PhoneBookModel item);
        Task DeleteItemAsync(string id);
    }
}
