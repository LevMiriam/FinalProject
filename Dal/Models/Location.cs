using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Location
{
    public int Id { get; set; }

    public string City { get; set; } = null!;

    public string Neighborhood { get; set; } = null!;

    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
