using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class CarWithAvailabilityDto
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public bool Available { get; set; }
        public bool IsAvailableNow { get; set; }
    }
}
