using Bl.Models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public List<Rental> GetActiveRentalsToday();
        public List<Rental> GetUserRentalHistory(int userId);








    }
}
