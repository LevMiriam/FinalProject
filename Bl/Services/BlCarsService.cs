using Bl.Api;
using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.models;
using System.Runtime.ConstrainedExecution;
using Bl.Models;

namespace Bl.Services
{
    public class BlCarsService : IBlcars
    {
        private readonly IDalCars _dalCars;

        public BlCarsService(IDalCars dalCars)
        {
            _dalCars = dalCars;
        }
        public List<Car> GetAllCars()
        {
            return _dalCars.GetAllCars();
        }

        public Car GetCarById(int id)
        {
          return _dalCars.GetCarById(id);
        }
        public bool AddCar(BlCarToAdd car)
        {
            if (car.Id <= 0 || string.IsNullOrWhiteSpace(car.Model) 
                || string.IsNullOrWhiteSpace(car.Year) 
                || string.IsNullOrWhiteSpace(car.Make) 
                || string.IsNullOrWhiteSpace(car.LicensePlate))
            {
                return false;
            }
            var newCar = new Car
            {
                Id = car.Id,
                Available = car.Available,
                Model = car.Model,
                Year = car.Year,
                Make = car.Make,
                LicensePlate = car.LicensePlate,

            };

            bool isSuccess = _dalCars.AddCar(newCar);
            return isSuccess;

        }

        public bool DeleteCarById(int id)
        {
            return _dalCars.DeleteCarById(id);
        }

        public bool UpdateCarDetails(BlCarToAdd blCarToAdd)
        {
            if (blCarToAdd == null)
            {
                throw new ArgumentNullException(nameof(blCarToAdd), "Updated car cannot be null.");
            }
            if (blCarToAdd.Id <= 0
               || string.IsNullOrWhiteSpace(blCarToAdd.Make)
               || string.IsNullOrWhiteSpace(blCarToAdd.Model)
               || string.IsNullOrWhiteSpace(blCarToAdd.LicensePlate)
               || string.IsNullOrWhiteSpace(blCarToAdd.Year)

               )
                return false;
            var newCar = new Car
            {
                Id = blCarToAdd.Id,
                Model = blCarToAdd.Model,
                Make = blCarToAdd.Make,
                LicensePlate = blCarToAdd.LicensePlate,
                Available = blCarToAdd.Available,
                Year = blCarToAdd.Year,

            };

            return _dalCars.UpdateCar(newCar);
        }


    }
}
