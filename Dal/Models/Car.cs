using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Car
{
    public int Id { get; set; }

    public string Make { get; set; } = null!;

    public string Model { get; set; } = null!;

    public string Year { get; set; } = null!;

    public string LicensePlate { get; set; } = null!;

    public bool Available { get; set; }

    public int NumOfSeats { get; set; }

    public int LocationId { get; set; }

    public decimal BaseRate { get; set; }

    public virtual ICollection<CarRate> CarRates { get; set; } = new List<CarRate>();

    public virtual Location Location { get; set; } = null!;

    public virtual ICollection<Rental> Rentals { get; set; } = new List<Rental>();

    public virtual ICollection<SpecialRate> SpecialRates { get; set; } = new List<SpecialRate>();
}
