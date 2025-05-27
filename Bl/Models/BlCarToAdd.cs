using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlCarToAdd
    {
        public int Id { get; set; }

        public string Make { get; set; } = null!;

        public string Model { get; set; } = null!;

        public string Year { get; set; } = null!;

        public string LicensePlate { get; set; } = null!;

        public bool Available { get; set; }

        public int NumOfSeats { get; set; }
        public decimal BaseRate { get; set; }
        public int LocationId { get; set; }
        public BlLocationToAdd Location { get; set; } = null!;
        //public virtual ICollection<Rental> Rentals { get; set; } = new List<Rental>();

    }
}
