using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDalRentals
    {
        public bool CreateRentalOrder(Rental rentalOrder);
        public Rate GetRatesForCar(int carId);
        public SpecialRate GetSpecialRateForCarAndDateRange(int carId, DateOnly startDate, DateOnly endDate);
    }
}
