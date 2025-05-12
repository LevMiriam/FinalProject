using Bl.Api;
using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlRentalService : IBlOrders
    {
		private readonly IDalOrders _dalOrders;
		public BlRentalService(IDalOrders dalOrders)
		{
			_dalOrders = dalOrders;
		}
	}
}
