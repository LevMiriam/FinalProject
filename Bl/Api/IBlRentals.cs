using Bl.Models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Bl.Services.BlRentalService;

namespace Bl.Api
{
    public interface IBlRentals
    {
        //public bool CreateRentalOrder(BlRentalToAdd rentalOrder);
        public  Task<string> CreateRentalOrderAsync(BlRentalToAdd rentalOrder);

        //public decimal CalculateRentalPrice(BlRentalToAdd rentalOrder);
        public Task<decimal> CalculateRentalPriceAsync(BlRentalToAdd rentalOrder);

        public Task<List<BlUnavailableDate>> GetUnavailableDatesAsync(int year, int month);
        public Task ValidateRentalAndReturnDatesAsync(DateOnly rentalDate, DateOnly returnDate);
        public bool ProcessPayment(string customerEmail, decimal amount);
        public List<BlRentalToAdd> GetActiveRentalsToday();
        public List<BlRentalToAdd> GetUserRentalHistory(int userId);

        public Task<List<CarWithAvailabilityDto>> GetAllCarsWithAvailabilityAsync(DateOnly? start, DateOnly? end);







    }
}
