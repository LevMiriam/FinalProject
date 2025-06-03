using Bl.Models;
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
        public  Task<bool> CreateRentalOrderAsync(BlRentalToAdd rentalOrder);

        //public decimal CalculateRentalPrice(BlRentalToAdd rentalOrder);
        public Task<decimal> CalculateRentalPriceAsync(BlRentalToAdd rentalOrder);

        public Task<List<BlUnavailableDate>> GetUnavailableDatesAsync(int year, int month);
        public Task ValidateRentalAndReturnDatesAsync(DateOnly rentalDate, DateOnly returnDate);




    }
}
