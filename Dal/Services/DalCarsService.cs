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
            return _context.Cars.ToList();
        }

        public Car GetCarById(int id)
        {
            var car=_context.Cars.FirstOrDefault(c=> c.Id ==id);
            return car ==null ? null : car;
        }

        public bool AddCar(Car car)
        {
            try
            {
                _context.Cars.Add(car);
                int result = _context.SaveChanges();
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

    }
}
