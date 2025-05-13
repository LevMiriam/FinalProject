using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDalCars
    {
        public List<Car> GetAllCars();
        public bool AddCar(Car car);
        public bool DeleteCarById(int carId);
        public bool UpdateCar(Car car);
        public Car GetCarById(int id);
    }
}
