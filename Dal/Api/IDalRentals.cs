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
        //public bool CreateRentalOrder(Rental rentalOrder);
        public Task<bool> CreateRentalOrderAsync(Rental rentalOrder);
        public Rate GetRatesForCar(int carId);
        public SpecialRate GetSpecialRateForCarAndDateRange(int carId, DateOnly startDate, DateOnly endDate);
        //public bool IsCarAvailable(int carId, DateOnly rentalStartDate, DateOnly rentalEndDate);
        public Task<bool> IsCarAvailableAsync(int carId, DateOnly rentalStartDate, DateOnly rentalEndDate);

        public Task<string> FetchCalendarDataAsync(int year, int month);

        public bool Charge(decimal amount);
        public void SendInvoice(string toEmail, decimal amount);
        public List<Rental> GetActiveRentalsToday();
        public List<Rental> GetRentalsByUserId(int userId);

        public Task<Dictionary<int, bool>> GetCarsAvailabilityAsync(DateOnly start, DateOnly end);



    }
}
