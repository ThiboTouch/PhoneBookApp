using Microsoft.Azure.Cosmos;
using PhoneBook.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneBook.Services
{

    public class CosmosDbService : ICosmosDbService
    {
        private Container _container;

        public CosmosDbService(
            CosmosClient dbClient,
            string databaseName,
            string containerName)
        {
            this._container = dbClient.GetContainer(databaseName, containerName);
        }

        public async Task AddItemAsync(PhoneBookModel item)
        {
            await this._container.CreateItemAsync<PhoneBookModel>(item, new PartitionKey(item.Id));
        }

        public async Task DeleteItemAsync(string id)
        {
            await this._container.DeleteItemAsync<PhoneBookModel>(id, new PartitionKey(id));
        }

        public async Task<PhoneBookModel> GetItemAsync(string id)
        {
            try
            {
                ItemResponse<PhoneBookModel> response = await this._container.ReadItemAsync<PhoneBookModel>(id, new PartitionKey(id));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return default;
            }

        }

        public async Task<IEnumerable<PhoneBookModel>> GetItemsAsync(string queryString)
        {
            var query = this._container.GetItemQueryIterator<PhoneBookModel>(new QueryDefinition(queryString));
            List<PhoneBookModel> results = new List<PhoneBookModel>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();

                results.AddRange(response.ToList());
            }

            return results;
        }

        public async Task UpdateItemAsync(string id, PhoneBookModel item)
        {
            await this._container.UpsertItemAsync(item, new PartitionKey(id));
        }
    }

}
