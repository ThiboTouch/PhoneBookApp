using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PhoneBook.Models
{
    public class PhoneBookEntry
    {

        [JsonProperty(PropertyName = "name")]
        [Required(ErrorMessage = "The phone book's entry name is required.")]
        [MaxLength(128, ErrorMessage = "Max length is 128 characters.")]
        [MinLength(2, ErrorMessage = "Min Length is 2 characters.")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "phonenumber")]
        [Required(ErrorMessage = "The phone book's entry number is required.")]
        [RegularExpression(@"^(27|0)[0-9]{9}",
         ErrorMessage = "Phone number is not in correct format.")]
        public string PhoneNumber { get; set; }
    }
}
