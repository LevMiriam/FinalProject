using Bl.Models;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Api
{
    public interface IBlCustomers
    {
		public bool SignUp(BlSignUpCustomer blSignUpCustomer);
        public Customer LogIn(int id);
		public bool AddNewCustomer(Customer customer);
		public bool DeleteCustomerById(int id);
		public List<Customer> GetAllCustomers();
        public bool DeleteCustomerIfInactive(int customerId, int months);
        int DeleteInactiveCustomers(int months); 
        bool UpdateCustomerDetails(BlSignUpCustomer updatedCustomer);


    }
}
