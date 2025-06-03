using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Rate
{
    public int Id { get; set; }

    public decimal DailyRate { get; set; }

    public decimal WeeklyRate { get; set; }

    public decimal BiWeeklyRate { get; set; }

    public decimal MonthlyRate { get; set; }

    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
