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

    }
}
