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
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using System.Text.Json.Serialization;

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
    

        public async Task<bool> CreateRentalOrderAsync(BlRentalToAdd rentalOrder)
        {
            if (rentalOrder == null || rentalOrder.Car == null)
                return false;
            await ValidateRentalAndReturnDatesAsync(rentalOrder.RentalDate, rentalOrder.ReturnDate);
            // בדוק אם הרכב פנוי
            var carToRental = await _dalManager.DalCars.GetCarByIdAsync(rentalOrder.Car.Id);
            bool isAvailable = await _dalManager.DalRentals.IsCarAvailableAsync(carToRental.Id, rentalOrder.RentalDate, rentalOrder.ReturnDate);
            if (!isAvailable)
                throw new Exception($"The car is not available on these dates.");
            // צור את ההזמנה
            var dalRental = _mapper.Map<Rental>(rentalOrder);
            dalRental.Car = carToRental;
            bool result = await _dalManager.DalRentals.CreateRentalOrderAsync(dalRental);

            return result;
        }



        public async Task<decimal> CalculateRentalPriceAsync(BlRentalToAdd rentalOrder)
        {
            var result = await CreateRentalOrderAsync(rentalOrder);
            if (!result)
                return 0;
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
                    totalPrice += remainingDays * (rates.DailyRate);
                }
                else if (remainingDays <= 14)
                {
                    totalPrice += remainingDays * (rates.WeeklyRate);
                }
                else if (remainingDays <= 30)
                {
                    totalPrice += remainingDays * (rates.BiWeeklyRate);
                }
                else
                {
                    totalPrice += remainingDays * (rates.MonthlyRate);
                }
            }

            return totalPrice;
        }

        public async Task<List<BlUnavailableDate>> GetUnavailableDatesAsync(int year, int month)
        {
            string json = await _dalManager.DalRentals.FetchCalendarDataAsync(year, month);
            var root = JsonSerializer.Deserialize<BlCalenderModel.HebcalResponse>(json);

            var now = DateTime.Now;

            var unavailableDates = root.Items
                .Where(item =>
                {
                    if (!DateTime.TryParse(item.Date, out var parsedDate))
                        return false;
                    if (item.Title.Contains("Erev", StringComparison.OrdinalIgnoreCase))
                    {
                        var limitTime = parsedDate.AddMinutes(-10);
                        if (now < limitTime)
                            return false;
                    }
                    // אם זה יום שישי עם קטגוריה "candles" - בדוק את זמן ההדלקה והסר אם אפשר להזמין
                    if (item.Category == "candles")
                    {
                        var limitTime = parsedDate.AddMinutes(-10);
                        if (now < limitTime)
                            return false; // עדיין אפשר להזמין, אז אל תסמן כחסום
                    }
                    // בדיקה רגילה לשבת וחגים
                    return (item.Category == "holiday" || item.Category == "candles") &&
                           parsedDate.Date >= now.Date;
                })
                .Select(item => new BlUnavailableDate
                {
                    Date = item.Date,
                    Reason = item.Title
                })
                .ToList();
            var daysInMonth = DateTime.DaysInMonth(year, month);
            for (int day = 1; day <= daysInMonth; day++)
            {
                var date = new DateTime(year, month, day);
                if (date.DayOfWeek == DayOfWeek.Saturday)
                {
                    var dateOnlyStr = date.ToString("yyyy-MM-dd");
                    bool alreadyExists = unavailableDates.Any(d => d.Date == dateOnlyStr);
                    if (!alreadyExists)
                    {
                        unavailableDates.Add(new BlUnavailableDate
                        {
                            Date = dateOnlyStr,
                            Reason = "שבת"
                        });
                    }
                }
            }
            return unavailableDates;
        }

        public async Task ValidateRentalAndReturnDatesAsync(DateOnly rentalDate, DateOnly returnDate)
        {
            if (rentalDate < DateOnly.FromDateTime(DateTime.Today))
                throw new Exception("Cannot rent on a past date.");

            if (returnDate < rentalDate)
                throw new Exception("Return date cannot be before rental date.");

            // איחוד כל התאריכים שיש לבדוק מתוך טווח ההשכרה וההחזרה
            List<BlUnavailableDate> unavailableDates = new();

            // אם זה אותו חודש – מספיק קריאה אחת
            if (rentalDate.Month == returnDate.Month && rentalDate.Year == returnDate.Year)
            {
                unavailableDates = await GetUnavailableDatesAsync(rentalDate.Year, rentalDate.Month);
            }
            else
            {
                // במקרה של חודש שונה – מאחדים תוצאות משני חודשים
                var dates1 = await GetUnavailableDatesAsync(rentalDate.Year, rentalDate.Month);
                var dates2 = await GetUnavailableDatesAsync(returnDate.Year, returnDate.Month);
                unavailableDates = dates1.Concat(dates2).ToList();
            }

            // בדיקה לכל תאריך בטווח ההשכרה עד ההחזרה (כולל)
            var rentalBlocked = unavailableDates.FirstOrDefault(d =>
            DateOnly.FromDateTime(DateTime.Parse(d.Date)) == rentalDate);

            if (rentalBlocked != null)
                throw new Exception($"Date {rentalBlocked.Date} is not allowed – {rentalBlocked.Reason}");

            var returnBlocked = unavailableDates.FirstOrDefault(d =>
                DateOnly.FromDateTime(DateTime.Parse(d.Date)) == returnDate);

            if (returnBlocked != null)
                throw new Exception($"Date {returnBlocked.Date} is not allowed – {returnBlocked.Reason}");
        }


    }
}
