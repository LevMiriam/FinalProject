using System;
using System.Collections.Generic;

namespace Server.models;

public partial class Rental
{
    public int RentalId { get; set; }

    public int CarId { get; set; }

    public int CustomerId { get; set; }

    public DateOnly RentalDate { get; set; }

    public DateOnly ReturnDate { get; set; }

    public double Price { get; set; }

    public virtual Car Car { get; set; } = null!;

    public virtual Customer Customer { get; set; } = null!;
}
