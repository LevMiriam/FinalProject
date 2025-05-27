using System;
using System.Collections.Generic;

namespace Server.models;

public partial class SpecialRate
{
    public int Id { get; set; }

    public decimal DiscountPercentage { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }
}
