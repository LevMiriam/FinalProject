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
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<dbClass>();

                    var today = DateOnly.FromDateTime(DateTime.Today);

                    // עדכון זמינות רכבים
                    var rentalsToUpdate = context.Rentals
                        .Include(r => r.Car)
                        .Where(r => r.RentalDate == today && !r.Car.Available)
                        .ToList();

                    foreach (var rental in rentalsToUpdate)
                    {
                        rental.Car.Available = false;
                    }

                    // עדכון רכבים שהוחזרו
                    var endedRentals = context.Rentals
                        .Include(r => r.Car)
                        .Where(r => r.ReturnDate < today && !r.Car.Available)
                        .ToList();

                    foreach (var rental in endedRentals)
                    {
                        rental.Car.Available = true;
                    }

                    await context.SaveChangesAsync(stoppingToken);
                }

                await Task.Delay(TimeSpan.FromSeconds(10), stoppingToken);
            }
        }

    }
}
