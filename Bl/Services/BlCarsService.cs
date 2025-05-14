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
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Bl.Services
{
    public class BlCarsService : IBlcars
    {
        private readonly IDalCars _dalCars;
        private readonly IMapper _mapper;


        public BlCarsService(IDalCars dalCars, IMapper mapper)
        {
            _dalCars = dalCars;
            _mapper = mapper;

        }
        public List<BlCarToAdd> GetAllCars()
        {
            var cars = _dalCars.GetAllCars();   
            var carsToAdd = _mapper.Map<List<BlCarToAdd>>(cars);

            return carsToAdd;
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
                || string.IsNullOrWhiteSpace(car.LicensePlate)
                || car.NumOfSeats < 2
                || car.LocationId <= 0
                )

            {
                return false;
            }
            var location = _mapper.Map<Location>(car.Location);

            var newCar = _mapper.Map<Car>(car);

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

            var newCar = _mapper.Map<Car>(blCarToAdd);

            return _dalCars.UpdateCar(newCar);
        }


    }
}
