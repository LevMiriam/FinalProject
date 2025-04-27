using Bl.Api;
using Dal;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlCustomersService : IBlCustomers
    {
        private readonly IDalCustomers _dalCustomers; 
        public BlCustomersService(IDalCustomers dalCustomers)
        {
			_dalCustomers = dalCustomers;
        }
        public bool AddNewCustomer(Customer customer)
        {
            if (string.IsNullOrEmpty(customer.Name))
                throw new ArgumentNullException("Customr's name can't be null");
			if (string.IsNullOrEmpty(customer.Phone))
				throw new ArgumentNullException("Customr's Phone can't be null");
			if (string.IsNullOrEmpty(customer.Email))
				throw new ArgumentNullException("Customr's Email can't be null");
			if (string.IsNullOrEmpty(customer.DriverLicenseNumber))
				throw new ArgumentNullException("Customr's DriverLicenseNumber can't be null");
            return _dalCustomers.AddCustomer(customer);
		}

        public bool DeleteCustomer(Customer customer)
        {
          return _dalCustomers.DeleteCustomer(customer);
        }

        public List<Customer> GetAllCustomers() 
        {
            return _dalCustomers.GetAllCustomers();
        }
    }
}
