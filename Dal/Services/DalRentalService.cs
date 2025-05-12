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
    public class DalRentalService: IDalOrders
    {
		private readonly dbClass _context;
		public DalRentalService(dbClass context)
		{
			_context = context;
		}
	}
}
