using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Api
{
    public interface IDalCustomers
    {
        public bool UserExists(string username);


        public void SignUp(Customer customer);
        public Customer LogIn(string email, string password);

        public bool AddCustomer(Customer customer);
		public bool DeleteCustomerById(int id);
		public List<Customer> GetAllCustomers();
        public bool HasRentalsInLastMonths(int customerId, int months);
        public bool DeleteCustomer(int customerId);
        int DeleteInactiveCustomers(int months); 
        bool UpdateCustomer(Customer updatedCustomer);


    }
}
