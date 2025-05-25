using Bl.Api;
using Dal.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlOrderService : IBlOrders
    {
		private readonly IDalOrders _dalOrders;
		public BlOrderService(IDalOrders dalOrders)
		{
			_dalOrders = dalOrders;
		}
	}
}
