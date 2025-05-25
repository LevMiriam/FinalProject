using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class CarRate
{
    public int Id { get; set; }

    public int CarId { get; set; }

    public decimal Price { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public virtual Car Car { get; set; } = null!;
}
