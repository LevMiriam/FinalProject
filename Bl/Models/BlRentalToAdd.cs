using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlRentalToAdd
    {
        public DateOnly RentalDate { get; set; }

        public DateOnly ReturnDate { get; set; }

        public BlCar Car { get; set; } = null!;
    }
}
