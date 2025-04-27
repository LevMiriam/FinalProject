using Dal.models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDalCustomers
    {
		public bool AddCustomer(Customer customer);
		public bool DeleteCustomer(Customer customer);
		public List<Customer> GetAllCustomers();
	
	}
}
 