using Bl.Models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IBlcars
    {
        public List<CarFormDto> GetAllCars();
        public Task<bool> AddCarAsync(CarFormDto carForm)
;
        public bool DeleteCarById(int id);
        public Task<bool> UpdateCarDetailsAsync(CarFormDto carForm);

        //public bool UpdateCarDetails(BlCarToAdd blCarToAdd);
        public Car GetCarById(int id);
        public List<BlCar> GetCarsByCity(string city);
        public List<BlCar> GetCars(string city = null, string neighborhood = null, int? seats = null, string model = null);
    }
}
