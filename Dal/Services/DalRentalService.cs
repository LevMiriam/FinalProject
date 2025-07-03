using Dal.Api;
using Dal.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
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
        public async Task<bool> IsCarAvailableAsync(int carId, DateOnly requestedStartDate, DateOnly requestedEndDate)
        {
            return !await _context.Rentals
                .AnyAsync(r => r.CarId == carId &&
                               r.RentalDate <= requestedEndDate &&
                               r.ReturnDate >= requestedStartDate);
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

                // בדוק אם הרכב זמין לתאריכים שנבחרו
                bool isCarAvailable = await _context.Rentals
                    .AnyAsync(r => r.CarId == rentalOrder.CarId &&
                                   r.RentalDate < rentalOrder.ReturnDate &&
                                   rentalOrder.RentalDate < r.ReturnDate);

                if (isCarAvailable)
                {
                    throw new Exception("The car is not available for the selected dates.");
                }

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

        public bool Charge(decimal amount)
        {
            // כאן אמורה להיות קריאה ל-API חיצוני של חברת סליקה
            Console.WriteLine($"Charging {amount}₪ via mock gateway...");
            return true;
        }

        public void SendInvoice(string toEmail, decimal amount)
        {
            string subject = "חשבונית עבור תשלום";
            string body = $@"
<html dir='rtl'>
  <body style='font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;'>
    <div style='max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: right;'>
      <div margin-bottom: 30px;'>
        <img src='https://www.cartube.co.il/car-photos/68-%D7%94%D7%95%D7%A0%D7%93%D7%94/996-%D7%94%D7%95%D7%A0%D7%93%D7%94-%D7%90%D7%99%D7%A0%D7%A1%D7%99%D7%99%D7%98/997-2012-%D7%94%D7%95%D7%A0%D7%93%D7%94-%D7%90%D7%99%D7%A0%D7%A1%D7%99%D7%99%D7%98#&gid=1&pid=1' alt='לוגו' width='60' style='margin-bottom: 10px;' />
        <h2 style='margin: 0; color: #2c3e50;'>,שלום רב</h2>
      </div>

      <p style=""
    font-size: 16px; 
    line-height: 1.6; 
    direction: rtl; 
    unicode-bidi: embed;
"">
  קיבלנו את התשלום שלך על סך 
  <strong style=""color: #27ae60;"">{amount} ₪</strong>.<br/>
  אנו מודים לך על הבחירה בשירות שלנו!
</p>

      <div style='margin: 30px 0; text-align: center;'>
        <a href='https://your-website.com' 
           style='display: inline-block; padding: 12px 24px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;'>
          למעבר לאתר
        </a>
      </div>

      <hr style='border: none; border-top: 1px solid #ddd; margin: 30px 0;' />

      <p style='font-size: 13px; color: #888; text-align: center;'>
         Way2Go צוות<br/>
        <a href='mailto:way2gocomp@gmail.com' style='color: #888;'>Way2Go@gmail.com</a>
      </p>
    </div>
  </body>
</html>";

            // הגדרות החשבון השולח
            string fromEmail = "way2gocomp@gmail.com"; // שימי כאן את האימייל של העסק
            string password = "kgos ymsv yioz hiog"; // לא הסיסמה הרגילה – הסבר למטה!

            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential(fromEmail, password),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(fromEmail, "Way2Go");
                mailMessage.To.Add(toEmail);
                mailMessage.Subject = subject;
                mailMessage.Body = body;
                mailMessage.IsBodyHtml = true;
                smtpClient.Send(mailMessage);

                Console.WriteLine("Email sent successfully to " + toEmail);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending email: " + ex.Message);
            }
        }

        public List<Rental> GetRentalsByUserId(int userId)
        {
            return _context.Rentals.Where(r => r.CustomerId == userId).ToList();
        }

        public List<Rental> GetActiveRentalsToday()
        {
            var today = DateOnly.FromDateTime(DateTime.Today);
            return _context.Rentals
                .Where(r => r.RentalDate <= today && r.RentalDate >= today)
                .ToList();
        }
        public async Task<Dictionary<int, bool>> GetCarsAvailabilityAsync(DateOnly start, DateOnly end)
        {
            var overlappingRentals = await _context.Rentals
                .Where(r => r.RentalDate <= end && r.ReturnDate >= start)
                .Select(r => r.CarId)
                .ToListAsync();

            var allCarIds = await _context.Cars.Select(c => c.Id).ToListAsync();

            var availability = new Dictionary<int, bool>();
            foreach (var carId in allCarIds)
            {
                availability[carId] = !overlappingRentals.Contains(carId);
            }
            return availability;
        }
    }
}


