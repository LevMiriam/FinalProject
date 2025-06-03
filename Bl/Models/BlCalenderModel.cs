using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Bl.Models
{
    class BlCalenderModel
    {
        public class HebcalResponse
        {
            [JsonPropertyName("items")]
            public List<CalendarItem> Items { get; set; }
        }

        public class CalendarItem
        {
            [JsonPropertyName("category")]
            public string Category { get; set; }

            [JsonPropertyName("date")]
            public string Date { get; set; }

            [JsonPropertyName("title")]
            public string Title { get; set; }
        }

    }
}
