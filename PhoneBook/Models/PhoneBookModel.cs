using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneBook.Models
{
    public class PhoneBookModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        [Required(ErrorMessage ="Phone book name is required")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "entries")]
        public List<PhoneBookEntry> Entries { get; set; }
    }
}
