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
        public List<Car> GetAllCars();
        public bool AddCar(BlCar blcar);
    }
}
