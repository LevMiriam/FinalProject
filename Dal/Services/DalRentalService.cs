using Dal.Api;
using Dal.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
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
        private static readonly HttpClient _httpClient = new HttpClient();

        //public bool IsCarAvailable(int carId, DateOnly rentalStartDate, DateOnly rentalEndDate)
        //{
        //    return !_context.Rentals
        //        .Any(r => r.Car.Id == carId &&
        //                   r.RentalDate < rentalEndDate &&
        //                   r.ReturnDate > rentalStartDate);
        //}
        public async Task<bool> IsCarAvailableAsync(int carId, DateOnly rentalStartDate, DateOnly rentalEndDate)
        {
            return !await _context.Rentals
                .AnyAsync(r => r.Car.Id == carId &&
                               r.RentalDate < rentalEndDate &&
                               r.ReturnDate > rentalStartDate);
        }

        //public bool CreateRentalOrder(Rental rentalOrder)
        //{
        //    try
        //    {
        //        rentalOrder.Customer  = _context.Customers
        //            .FirstOrDefault(c => c.Id == rentalOrder.CustomerId);
        //        _context.Rentals.Add(rentalOrder);
        //        int result = _context.SaveChanges();
        //        return result > 0;
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        Console.WriteLine(ex.InnerException?.Message);
        //        return false;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.Message);
        //        return false;
        //    }
        //}

        public async Task<bool> CreateRentalOrderAsync(Rental rentalOrder)
        {
            try
            {
                rentalOrder.Customer = await _context.Customers
                    .FirstOrDefaultAsync(c => c.Id == rentalOrder.CustomerId);

                await _context.Rentals.AddAsync(rentalOrder);

                int result = await _context.SaveChangesAsync();

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



        public async Task<string> FetchCalendarDataAsync(int year, int month)
        {
            var url = "https://www.hebcal.com/hebcal";

            var queryParams = new Dictionary<string, string>
            {
                { "v", "1" },
                { "cfg", "json" },
                { "maj", "on" },
                { "min", "on" },
                { "mod", "on" },
                { "nx", "on" },
                { "year", year.ToString() },
                { "month", month.ToString() },
                { "ss", "on" },
                { "mf", "on" },
                { "c", "on" },
                { "geo", "geoname" },
                { "geonameid", "293918" } // פתח תקווה
            };

            var queryString = new FormUrlEncodedContent(queryParams).ReadAsStringAsync().Result;
            var fullUrl = $"{url}?{queryString}";

            var response = await _httpClient.GetAsync(fullUrl);
            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsStringAsync();
        }
    }
}


