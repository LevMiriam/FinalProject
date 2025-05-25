using Bl.Models;
using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class BlCar
{
    public int Id { get; set; }
    public string Model { get; set; } = null!;
    public int NumOfSeats { get; set; }
    public BlLocationToAdd blLocationToAdd { get; set; } = null;
}
