using Dal.Api;
using Dal.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DalRentalService : IDalRentals
    {
        private readonly dbClass _context;
        public DalRentalService(dbClass context)
        {
            _context = context;
        }

        public bool CreateRentalOrder(Rental rentalOrder)
        {
            try
            {
                _context.Rentals.Add(rentalOrder);
                int result = _context.SaveChanges();
                return result > 0;
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine(ex.InnerException?.Message);
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        // DAL: Get Special Rate
        public SpecialRate GetSpecialRateForCarAndDateRange(int carId, DateOnly startDate, DateOnly endDate)
        {
            return _context.SpecialRates
                .FirstOrDefault(rate => /*rate.CarId == carId &&*/
                                        rate.StartDate <= startDate &&
                                        rate.EndDate >= endDate);
        }

        // DAL: Get Rates
        public Rate GetRatesForCar(int carId)
        {
            var rate = _context.Rates.FirstOrDefault(rate => rate.Id == carId);

            if (rate == null)
            {
                // טיפול במקרה שהריבית לא נמצאה
                // לדוגמה, תוכל להחזיר null או לזרוק שגיאה מותאמת אישית
                throw new InvalidOperationException($"Rate not found for the given car ID: {carId}.");
            }

            return rate;
        }
    }
}


