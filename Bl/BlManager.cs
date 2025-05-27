using AutoMapper;
using Bl.Api;
using Bl.Services;
using Dal;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
    public class BlManager: IBlManager
    {


        public IBlCustomers BlCustomers { get; }
        public IBlRentals BlRental { get; }
        public IBlcars BlCars { get; }


        public BlManager(IDalManager dalManager, IMapper mapper)
        {
			BlCustomers = new BlCustomersService(dalManager,mapper);
            BlRental = new BlRentalService(dalManager, mapper);
            BlCars = new BlCarsService(dalManager, mapper);
        }
    }
}
