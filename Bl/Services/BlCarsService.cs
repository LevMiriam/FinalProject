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
using Dal;

namespace Bl.Services
{
    public class BlCarsService : IBlcars
    {
        private readonly IDalManager _dalManager;
        private readonly IMapper _mapper;

        public BlCarsService(IDalManager dalManager, IMapper mapper)
        {
            _dalManager = dalManager;
            _mapper = mapper;
        }
        public List<BlCarToAdd> GetAllCars()
        {
            var cars = _dalManager.DalCars.GetAllCars();   
            var carsToAdd = _mapper.Map<List<BlCarToAdd>>(cars);

            return carsToAdd;
        }
        public Car GetCarById(int id)
        {
            return _dalManager.DalCars.GetCarById(id);
        }
        public bool AddCar(BlCarToAdd car)
        {
            if (car.Id <= 0 || string.IsNullOrWhiteSpace(car.Model)
                || string.IsNullOrWhiteSpace(car.Year)
                || string.IsNullOrWhiteSpace(car.Make)
                || string.IsNullOrWhiteSpace(car.LicensePlate)
                || car.NumOfSeats < 2
                //|| car.LocationId <= 0
                )
            {
                return false;
            }
            var newCar = _mapper.Map<Car>(car);

            bool isSuccess = _dalManager.DalCars.AddCar(newCar);
            return isSuccess;

        }
        public bool DeleteCarById(int id)
        {
            return _dalManager.DalCars.DeleteCarById(id);
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

            return _dalManager.DalCars.UpdateCar(newCar);
        }

        public List<BlCar> GetCarsByCity(string city)
        {
            List<Car> cars = _dalManager.DalCars.GetCarsByCity(city);

            var carsToAdd = _mapper.Map<List<BlCar>>(cars);

            return carsToAdd;
        }
        public List<BlCar> GetCars(string city = null, string neighborhood = null, int? seats = null, string model = null)
        {
            var cars = _dalManager.DalCars.GetCars(city, neighborhood, seats, model);

            var carsToShow = _mapper.Map<List<BlCar>>(cars);

            return carsToShow;
        }
    }
}
