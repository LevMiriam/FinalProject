using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlRentalService : IBlRentals
    {

		private readonly IDalManager _dalManager;
        private readonly IMapper _mapper;

        public BlRentalService(IDalManager dalManager, IMapper mapper)
		{
            _dalManager = dalManager;
            _mapper = mapper;
		}

        public bool CreateRentalOrder(BlRentalToAdd rentalOrder)
        {
            if (rentalOrder == null || rentalOrder.Car == null)
            {
                return false;
            }
            var dalRental = _mapper.Map<Rental>(rentalOrder);
            return _dalManager.DalRentals.CreateRentalOrder(dalRental);
        }

        public decimal CalculateRentalPrice(BlRentalToAdd rentalOrder)
        {
            // שליפת תאריכי ההשכרה
            DateOnly startDate = rentalOrder.RentalDate;
            DateOnly endDate = rentalOrder.ReturnDate;
            int rentalDays = (endDate.DayNumber - startDate.DayNumber) + 1;

            // בדיקה אם יש תעריף מיוחד בטווח התאריכים
            var specialRate = _dalManager.DalRentals.GetSpecialRateForCarAndDateRange(
                rentalOrder.Car.Id, startDate, endDate);

            decimal totalPrice = 0;

            if (specialRate != null)
            {
                // חישוב מספר הימים שבהם התעריף המיוחד רלוונטי
                DateOnly specialStartDate = specialRate.StartDate > startDate ? specialRate.StartDate : startDate;
                DateOnly specialEndDate = specialRate.EndDate < endDate ? specialRate.EndDate : endDate;

                int specialRentalDays = (specialEndDate.DayNumber - specialStartDate.DayNumber) + 1;
                var newCar = _mapper.Map<Car>(rentalOrder.Car);

                // חישוב לפי תעריף מיוחד
                totalPrice += specialRentalDays * newCar.BaseRate * specialRate.DiscountPercentage;
            }

            // חישוב על יתרת הימים אם יש
            DateOnly remainingStartDate = specialRate != null && specialRate.EndDate >= endDate ? endDate.AddDays(1) : startDate;
            DateOnly remainingEndDate = endDate;

            if (remainingStartDate <= remainingEndDate)
            {
                int remainingDays = (remainingEndDate.DayNumber - remainingStartDate.DayNumber) + 1;

                var newCar = _mapper.Map<Car>(rentalOrder.Car);
                var rates = _dalManager.DalRentals.GetRatesForCar(rentalOrder.Car.Id);

                if (remainingDays <= 7)
                {
                    totalPrice += remainingDays * (rates.DailyRate ?? 0);
                }
                else if (remainingDays <= 14)
                {
                    totalPrice += remainingDays * (rates.WeeklyRate ?? 0) ;
                }
                else if (remainingDays <= 30)
                {
                    totalPrice += remainingDays * (rates.BiWeeklyRate ?? 0) ;
                }
                else
                {
                    totalPrice += remainingDays * (rates.MonthlyRate ?? 0);
                }
            }

            return totalPrice;
        }

    }
}
 