using Bl.Models;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl
{
	public class DalToBl
	{
		public static BlCustomer ToCustomer(Customer customer)
		{
			if (customer != null)
			{
				return new BlCustomer()
				{
					Id = customer.Id,
					Name = customer.Name,
				};
			}
			else
				return null;
		}

		public static BlSignUpCustomer ToSignUpCustomer(Customer customer)
		{
			if (customer != null)
			{
				return new BlSignUpCustomer()
				{
					Id = customer.Id,
					Name = customer.Name,
					Phone = customer.Phone,
					Email = customer.Email,
					DriverLicenseNumber = customer.DriverLicenseNumber

				};
			}
			else
				return null;
		}
	}
}
