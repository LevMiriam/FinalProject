using Dal.Api;
using Dal.models;
using Dal.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
	public class DalManager: IDalManager
	{
		public IDalCustomers DalCustomers { get; }
		public IDalOrders DalOrders { get; }

		private readonly dbClass _context;
		public DalManager()
		{
		  _context = new dbClass();
			DalCustomers = new DalCustomersService(_context);
			DalOrders = new DalOrderService( _context);
		}


	}
}
