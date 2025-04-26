using Dal.Api;
using Dal.

using System;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.models;

namespace Dal.Services
{
    public class DalCustomersService : IDalCustomers
    {
        private readonly dbClass _context;
        public DalCustomersService(dbClass context)
        {
            _context = context;
        }

        public bool AddCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            int result= _context.SaveChanges();
            return result > 0;
        }
    }
}
