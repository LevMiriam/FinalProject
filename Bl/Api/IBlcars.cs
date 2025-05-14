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
        public List<BlCarToAdd> GetAllCars();
        public bool AddCar(BlCarToAdd car);
        public bool DeleteCarById(int id);
        public bool UpdateCarDetails(BlCarToAdd blCarToAdd);
        public Car GetCarById(int id);
    }
}
