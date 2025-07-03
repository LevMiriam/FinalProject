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
        public List<CarFormDto> GetAllCars()
        {
            var cars = _dalManager.DalCars.GetAllCars();
            var carsToAdd = _mapper.Map<List<CarFormDto>>(cars);
            return carsToAdd;
        }
        public async Task<bool> UpdateCarDetailsAsync(CarFormDto carForm)
        {
            if (carForm == null)
                throw new ArgumentNullException(nameof(carForm), "Updated car cannot be null.");

            var blCarToAdd = _mapper.Map<BlCarToAdd>(carForm);

            if (carForm.Image != null && carForm.Image.Length > 0)
            {
                using var ms = new MemoryStream();
                await carForm.Image.CopyToAsync(ms);
                blCarToAdd.Image = ms.ToArray();
            }

            var newCar = _mapper.Map<Car>(blCarToAdd);

            return _dalManager.DalCars.UpdateCar(newCar);
        }

        public Car GetCarById(int id)
        {
            var carTask = _dalManager.DalCars.GetCarByIdAsync(id);
            carTask.Wait(); 
            return carTask.Result; 
        }

        public async Task<bool> AddCarAsync(CarFormDto carForm)
        {
            if (string.IsNullOrWhiteSpace(carForm.Location?.City))
            {
                throw new ArgumentException("חובה להזין עיר במיקום.");
            }
            var carToAdd = _mapper.Map<BlCarToAdd>(carForm);
            if (carForm.Image != null && carForm.Image.Length > 0)
            {
                using var ms = new MemoryStream();
                await carForm.Image.CopyToAsync(ms);
                carToAdd.Image = ms.ToArray();
            }
            else
            {
                Console.WriteLine("No image was received for upload.");
            }
            var carEntity = _mapper.Map<Car>(carToAdd);
            return _dalManager.DalCars.AddCar(carEntity);
        }

        public bool DeleteCarById(int id)
        {
            return _dalManager.DalCars.DeleteCarById(id);
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
