using AutoMapper;
using Bl.Api;
using Bl.Services;
using Dal;
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
        public IBlOrders BlOrder { get; }
        public IBlcars BlCars { get; }


        public BlManager(IDalManager dalManager, IMapper mapper)
        {
			BlCustomers = new BlCustomersService(dalManager.DalCustomers,mapper);
			BlOrder = new BlRentalService(dalManager.DalOrders);
            BlCars = new BlCarsService(dalManager.DalCars, mapper);
        }
    }
}
