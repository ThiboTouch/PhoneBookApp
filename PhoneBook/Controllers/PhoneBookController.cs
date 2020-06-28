using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Language;
using PhoneBook.DTOs;
using PhoneBook.Helpers;
using PhoneBook.Models;
using PhoneBook.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Security.Cryptography.X509Certificates;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;

namespace PhoneBook.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PhoneBookController : ControllerBase
    {
        private readonly ICosmosDbService _cosmosDbService;

        public PhoneBookController(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            PhoneBookModel item = await _cosmosDbService.GetItemAsync(id);
            if (item != null)
                return Ok(item);
            else
                return NotFound("Item was not found.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationDTO pagination)
        {
            var items = await _cosmosDbService.GetItemsAsync("SELECT * FROM c");
            var queryable = items.AsQueryable();
            await HttpContext.InsertPaginationParametersInResponse(queryable, pagination.RecordsPerPage);
            var phonebooks = queryable.Paginate(pagination).ToList();
            return Ok(phonebooks);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePhoneBook(PhoneBookModel phoneBook)
        {
            var items = await _cosmosDbService.GetItemsAsync("SELECT * FROM c");

            if (items.Any(x => x.Name.ToLower() == phoneBook.Name.ToLower()))
                return Conflict($"Phone book with name \"{phoneBook.Name}\" already exists.");

            phoneBook.Id = Guid.NewGuid().ToString();
            await _cosmosDbService.AddItemAsync(phoneBook);
            return Ok(new { phoneBook.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePhoneBook(string id, PhoneBookModel model)
        {
            PhoneBookModel item = await _cosmosDbService.GetItemAsync(id);

            if (item != null)
            {
                model.Id = item.Id;
                model.Entries = item.Entries;
                await _cosmosDbService.UpdateItemAsync(id, model);
                return Ok();
            }
            return NotFound("Item was not found");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoneBook(string id)
        {
            PhoneBookModel item = await _cosmosDbService.GetItemAsync(id);

            if (item != null)
            {
                await _cosmosDbService.DeleteItemAsync(id);
                return Ok();
            }
            return NotFound("Item was not found");
        }

        [HttpPost("entries/{id}")]
        public async Task<IActionResult> AddEntry(string id, PhoneBookEntry entry)
        {
            PhoneBookModel pb = await _cosmosDbService.GetItemAsync(id);
            if (pb != null)
            {
                if (pb.Entries == null || !pb.Entries.Any(e => e.PhoneNumber == entry.PhoneNumber))
                {
                    if (pb.Entries == null)
                        pb.Entries = new List<PhoneBookEntry>();
                    pb.Entries.Add(entry);
                    await _cosmosDbService.UpdateItemAsync(id, pb);
                    return Ok(pb.Entries);
                }
                else
                {
                    return Conflict("Phone number already exists in the phone book.");
                }
            }
            return NotFound("No phone book found.");
        }

        [HttpDelete("entries/{id}/{phoneNumber}")]
        public async Task<IActionResult> DeleteEntry(string id, string phoneNumber)
        {
            PhoneBookModel pb = await _cosmosDbService.GetItemAsync(id);
            if (pb != null)
            {
                var entry = pb.Entries.FirstOrDefault(e => e.PhoneNumber == phoneNumber);
                if (pb.Entries.Remove(entry))
                    await _cosmosDbService.UpdateItemAsync(id, pb);
                return Ok();
            }
            return NotFound("No phone book found.");
        }

        [HttpPatch("entries/{id}/{phoneNumber}")]
        public async Task<IActionResult> PatchEntry(string id, string phoneNumber, JsonPatchDocument<PhoneBookEntry> patchDocument)
        {
            if (patchDocument == null)
            {
                return BadRequest();
            }

            PhoneBookModel pb = await _cosmosDbService.GetItemAsync(id);
            if (pb != null)
            {
                var entry = pb.Entries.FirstOrDefault(e => e.PhoneNumber == phoneNumber);
                patchDocument.ApplyTo(entry);
                await _cosmosDbService.UpdateItemAsync(id, pb);
                return Ok(pb.Entries);
            }
            return NotFound("No phone book found.");
        }
    }
}
