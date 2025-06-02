using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Models
{
    public class BlRate
    {
        public int Id { get; set; }
        public decimal DailyRate { get; set; }
        public decimal WeeklyRate { get; set; }
        public decimal BiWeeklyRate { get; set; }
        public decimal MonthlyRate { get; set; }

        //public static Rate CreateFromCar(Car car)
        //{
        //    return new Rate
        //    {
        //        Id = car.Id,
        //        DailyRate = car.BaseRate,
        //        WeeklyRate = car.BaseRate * (decimal)0.95,
        //        BiWeeklyRate = car.BaseRate * (decimal)0.90,
        //        MonthlyRate = car.BaseRate * (decimal)0.85,
        //    };
        //}
    }
}
