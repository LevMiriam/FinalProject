using Bl.Api;
using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.models;
using System.Runtime.ConstrainedExecution;

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
        public bool AddCar(BlCar blcar)
        {
            if (blcar.Id <= 0 || string.IsNullOrWhiteSpace( blcar.Model))
            {
                return false;
            }
            var newCar = new Car
            {
                Id = blcar.Id,
                Available = blcar.Available,
                Model = blcar.Model,
            };

            bool isSuccess = _dalCars.AddCar(newCar);
            return isSuccess;

        }

    }
}
