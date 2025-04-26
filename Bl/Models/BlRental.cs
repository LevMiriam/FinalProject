using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class BlRental
{
    public int RentalId { get; set; }

    public int CarId { get; set; }

    public int CustomerId { get; set; }

    public DateOnly RentalDate { get; set; }

    public DateOnly ReturnDate { get; set; }

    public string Price { get; set; } = null!;

    public virtual Car Car { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;
}
