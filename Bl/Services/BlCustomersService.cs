using Bl.Api;
using Bl.Models;
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

		public bool SignUp(BlSignUpCustomer blSignUpCustomer)
		{
			if (string.IsNullOrWhiteSpace(blSignUpCustomer.Name)
	           || blSignUpCustomer.Id <= 0
	           || string.IsNullOrWhiteSpace(blSignUpCustomer.Phone)
	           || string.IsNullOrWhiteSpace(blSignUpCustomer.Email)
	           || string.IsNullOrWhiteSpace(blSignUpCustomer.DriverLicenseNumber))
				return false;
			var existing = _dalCustomers.LogIn(blSignUpCustomer.Id);
			if (existing != null)
				return false;
			var newCustomer = new Customer
			{
				Id = blSignUpCustomer.Id,
				Name = blSignUpCustomer.Name,
				Phone = blSignUpCustomer.Phone,
				Email = blSignUpCustomer.Email,
				DriverLicenseNumber = blSignUpCustomer.DriverLicenseNumber

			};

			_dalCustomers.SignUp(newCustomer);
			return true;
		}

		public Customer LogIn(int id)
		{
			return _dalCustomers.LogIn(id);
		}

		public bool AddNewCustomer(Customer customer)
		{
			if (string.IsNullOrEmpty(customer.Name))
				throw new ArgumentNullException("Customr's name can't be null");
			if (string.IsNullOrEmpty(customer.Phone))
				throw new ArgumentNullException("Customr's phone can't be null");
			if (string.IsNullOrEmpty(customer.Email))
				throw new ArgumentNullException("Customr's email can't be null");
			if (string.IsNullOrEmpty(customer.DriverLicenseNumber))
				throw new ArgumentNullException("Customr's driverLicenseNumber can't be null");
			return _dalCustomers.AddCustomer(customer);
		}

		public bool DeleteCustomerById(int id)
		{
			return _dalCustomers.DeleteCustomerById(id);
		}
		public List<Customer> GetAllCustomers()
		{
			return _dalCustomers.GetAllCustomers();
		}

        public bool DeleteCustomerIfInactive(int customerId, int months)
        {
            if (months <= 0)
            {
                throw new ArgumentException("Months must be greater than 0.");
            }

            bool hasRentals = _dalCustomers.HasRentalsInLastMonths(customerId, months);
            if (hasRentals)
            {
                return _dalCustomers.DeleteCustomer(customerId);
            }

            Console.WriteLine($"Customer with ID {customerId} is still active.");
            return false;
        }

        public int DeleteInactiveCustomers(int months)
        {
            if (months <= 0)
            {
                throw new ArgumentException("Months must be greater than 0.");
            }

            return _dalCustomers.DeleteInactiveCustomers(months);
        }

        public bool UpdateCustomerDetails(BlSignUpCustomer blSignUpCustomer)
        {
            if (blSignUpCustomer == null)
            {
                throw new ArgumentNullException(nameof(blSignUpCustomer), "Updated customer cannot be null.");
            }
            if (string.IsNullOrWhiteSpace(blSignUpCustomer.Name)
               || blSignUpCustomer.Id <= 0
               || string.IsNullOrWhiteSpace(blSignUpCustomer.Phone)
               || string.IsNullOrWhiteSpace(blSignUpCustomer.Email)
               || string.IsNullOrWhiteSpace(blSignUpCustomer.DriverLicenseNumber))
                return false;
            var newCustomer = new Customer
            {
                Id = blSignUpCustomer.Id,
                Name = blSignUpCustomer.Name,
                Phone = blSignUpCustomer.Phone,
                Email = blSignUpCustomer.Email,
                DriverLicenseNumber = blSignUpCustomer.DriverLicenseNumber

            };

            return _dalCustomers.UpdateCustomer(newCustomer);
        }

    }
}
