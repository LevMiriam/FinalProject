using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
	public interface IDalManager
	{
		IDalCustomers DalCustomers { get; }
		IDalOrders DalOrders { get; }
        public IDalCars DalCars { get; }

    }
}
