using Dal.Api;
using Dal.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DalCarsService : IDalCars
    {
        private readonly dbClass _context;
        public DalCarsService(dbClass context)
        {
            _context = context;
        }

        public List<Car> GetAllCars()
        {
            return _context.Cars.Include(c => c.Location).ToList();
        }

        public Car GetCarById(int id)
        {
            var car = _context.Cars.FirstOrDefault(c => c.Id == id);
            return car == null ? null : car;
        }

        public bool AddCar(Car car)
        {
            try
            {
                var existingLocation = _context.Locations
                    .FirstOrDefault(loc => loc.Id == car.LocationId);

                if (existingLocation != null)
                {
                    car.Location = existingLocation;
                }
                else
                {
                    _context.Locations.Add(car.Location);
                    car.Location = car.Location;
                }

                var rate = new Rate
                {
                    Id = car.Id,
                    DailyRate = car.BaseRate,
                    WeeklyRate = car.BaseRate * (decimal)0.95,
                    BiWeeklyRate = car.BaseRate * (decimal)0.90,
                    MonthlyRate = car.BaseRate * (decimal)0.85,
                };

                _context.Rates.Add(rate);
                _context.SaveChanges(); 

                car.RateId = rate.Id;
                _context.Cars.Add(car);

                int result = _context.SaveChanges(); 

                if (result <= 0)
                {
                    _context.Rates.Remove(rate);
                    if (existingLocation == null)
                    {
                        _context.Locations.Remove(car.Location);
                    }
                    _context.SaveChanges();
                }

                return result > 0;
            }
            catch (DbUpdateException ex)
            {
                Console.WriteLine($"DbUpdateException: {ex.Message}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                }
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"General Exception: {ex.Message}");
                return false;
            }
        }



        public bool DeleteCarById(int carId)
        {
            var car = _context.Cars.FirstOrDefault(c => c.Id == carId);
            _context.Cars.Remove(car);
            int result = _context.SaveChanges();
            return result > 0;
        }

        public bool UpdateCar(Car car)
        {
            try
            {
                var existingCar = _context.Cars.Find(car.Id);
                if (existingCar == null)
                {
                    Console.WriteLine($"Car with ID {car.Id} not found.");
                    return false;
                }

                existingCar.Id = car.Id;
                existingCar.Make = car.Make;
                existingCar.Model = car.Model;
                existingCar.Year = car.Year;
                existingCar.LicensePlate = car.LicensePlate;
                existingCar.Available = car.Available;

                return _context.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating car: {ex.Message}");
                return false;
            }
        }

        public List<Car> GetCarsByCity(string city)
        {
            return _context.Cars
                .Where(car => car.Available &&
                              _context.Locations.Any(location =>
                                  location.Id == car.LocationId &&
                                  location.City == city))
                .ToList();
        }
        public List<Car> GetCars(string city = null, string neighborhood = null, int? seats = null, string model = null)
        {
            var query = _context.Cars.AsQueryable();

            if (!string.IsNullOrEmpty(city))
            {
                query = query.Where(car => car.Available &&
                    _context.Locations.Any(location =>
                        location.Id == car.LocationId &&
                        location.City == city));
            }

            if (!string.IsNullOrEmpty(neighborhood))
            {
                query = query.Where(car => car.Available &&
                    _context.Locations.Any(location =>
                        location.Id == car.LocationId &&
                        location.Neighborhood == neighborhood));
            }

            if (seats.HasValue)
            {
                query = query.Where(car => car.NumOfSeats == seats.Value);
            }

            if (!string.IsNullOrEmpty(model))
            {
                query = query.Where(car => car.Model == model);
            }

            return query.Include(c => c.Location).ToList();
        }


    }
}
