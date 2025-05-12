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


        public BlManager(IDalManager dalManager)
        {
			BlCustomers = new BlCustomersService(dalManager.DalCustomers);
			BlOrder = new BlRentalService(dalManager.DalOrders);
            BlCars = new BlCarsService(dalManager.DalCars);
        }
    }
}
