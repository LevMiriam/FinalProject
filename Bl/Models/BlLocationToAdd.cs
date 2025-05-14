using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlLocationToAdd
    {
        public int Id { get; set; }

        public string City { get; set; } = null!;

        public string Neighborhood { get; set; } = null!;
    }
}
