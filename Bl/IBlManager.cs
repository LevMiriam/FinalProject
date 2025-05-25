using Bl.Api;
using Bl.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
	public interface IBlManager
	{
		IBlCustomers BlCustomers { get; }
		IBlOrders BlOrder { get; }
	}
}
