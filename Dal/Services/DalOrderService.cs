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
    public class DalOrderService: IDalOrders
    {
		private readonly dbClass _context;
		public DalOrderService(dbClass context)
		{
			_context = context;
		}
	}
}
