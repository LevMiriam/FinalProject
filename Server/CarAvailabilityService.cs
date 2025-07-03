using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Dal;
using Dal.models;
using Microsoft.Extensions.DependencyInjection;

namespace Server
{
    public class CarAvailabilityService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public CarAvailabilityService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        //    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        //    {
        //        while (!stoppingToken.IsCancellationRequested)
        //        {
        //            using (var scope = _serviceProvider.CreateScope())
        //            {
        //                var context = scope.ServiceProvider.GetRequiredService<dbClass>();
        //                var today = DateOnly.FromDateTime(DateTime.Today);

        //                // עדכון זמינות רכבים
        //                var rentalsToUpdate = await context.Rentals
        //                    .Include(r => r.Car)
        //                    .Where(r => r.RentalDate == today && r.Car.Available)
        //                    .AsNoTracking() // שימוש ב-AsNoTracking לשיפור ביצועים
        //                    .ToListAsync(stoppingToken);

        //                foreach (var rental in rentalsToUpdate)
        //                {
        //                    rental.Car.Available = false;
        //                }

        //                // עדכון רכבים שהוחזרו
        //                var endedRentals = await context.Rentals
        //                    .Include(r => r.Car)
        //                    .Where(r => r.ReturnDate < today && !r.Car.Available)
        //                    .AsNoTracking() // שימוש ב-AsNoTracking לשיפור ביצועים
        //                    .ToListAsync(stoppingToken);

        //                foreach (var rental in endedRentals)
        //                {
        //                    rental.Car.Available = true;
        //                }

        //                try
        //                {
        //                    await context.SaveChangesAsync(stoppingToken);
        //                }
        //                catch (DbUpdateException ex)
        //                {
        //                    // טיפול בשגיאות שמירה
        //                    // הוסף לוגים או טיפול בשגיאות כאן
        //                    Console.WriteLine($"Error saving changes: {ex.Message}"); // הוספת לוגים
        //                }
        //            }

        //            await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
        //        }
        //    }
        //}
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<dbClass>();
                    var today = DateOnly.FromDateTime(DateTime.Today);

                    // עדכון זמינות רכבים - רכבים שהושכרו היום
                    var rentalsToUpdate = await context.Rentals
                        .Include(r => r.Car)
                        .Where(r => r.RentalDate == today && r.Car.Available)
                        .ToListAsync(stoppingToken);

                    foreach (var rental in rentalsToUpdate)
                    {
                        var car = rental.Car;
                        if (car != null)
                        {
                            car.Available = false;
                            context.Cars.Update(car);
                        }
                    }

                    // עדכון רכבים שהוחזרו
                    var endedRentals = await context.Rentals
                        .Include(r => r.Car)
                        .Where(r => r.ReturnDate < today && !r.Car.Available)
                        .ToListAsync(stoppingToken);

                    foreach (var rental in endedRentals)
                    {
                        var car = rental.Car;
                        if (car != null)
                        {
                            car.Available = true;
                            context.Cars.Update(car);
                        }
                    }

                    try
                    {
                        await context.SaveChangesAsync(stoppingToken);
                    }
                    catch (DbUpdateException ex)
                    {
                        Console.WriteLine($"Error saving changes: {ex.InnerException?.Message}");
                    }
                }

                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }
        }
    }
}


