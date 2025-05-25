using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class BlCustomer
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    //public virtual ICollection<BlRental> Rentals { get; set; } = new List<BlRental>();
}
