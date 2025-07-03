using AutoMapper;
using Bl.Api;
using Bl.Models;
using Dal;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlCustomersService : IBlCustomers
    {
        private readonly IDalManager _dalManager;
        private readonly IMapper _mapper;

        public BlCustomersService(IDalManager dalManager, IMapper mapper)
        {
            _dalManager = dalManager;
            _mapper = mapper;

        }
        public bool UserExists(string name)
        {
            return _dalManager.DalCustomers.UserExists(name);
        }
        public bool SignUp(BlSignUpCustomer blSignUpCustomer)
        {
            if (string.IsNullOrWhiteSpace(blSignUpCustomer.Name)
               || blSignUpCustomer.Id <= 0
               || string.IsNullOrWhiteSpace(blSignUpCustomer.Phone)
               || string.IsNullOrWhiteSpace(blSignUpCustomer.Email)
               || string.IsNullOrWhiteSpace(blSignUpCustomer.DriverLicenseNumber))
                return false;
            var existing = _dalManager.DalCustomers.LogIn(blSignUpCustomer.Email, blSignUpCustomer.PasswordHash);
            if (existing != null)
                return false;
            var newCustomer = _mapper.Map<Customer>(blSignUpCustomer);
            _dalManager.DalCustomers.SignUp(newCustomer);
            return true;
        }

        //public Customer LogIn(int id)
        //{
        //    return _dalManager.DalCustomers.LogIn(id);
        //}
        public Customer LogIn(string email, string password)
        {
            return _dalManager.DalCustomers.LogIn(email, password);
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
            return _dalManager.DalCustomers.AddCustomer(customer);
        }

        public bool DeleteCustomerById(int id)
        {
            return _dalManager.DalCustomers.DeleteCustomerById(id);
        }
        public List<Customer> GetAllCustomers()
        {
            return _dalManager.DalCustomers.GetAllCustomers();
        }

        public bool DeleteCustomerIfInactive(int customerId, int months)
        {
            if (months <= 0)
            {
                throw new ArgumentException("Months must be greater than 0.");
            }

            bool hasRentals = _dalManager.DalCustomers.HasRentalsInLastMonths(customerId, months);
            if (hasRentals)
            {
                return _dalManager.DalCustomers.DeleteCustomer(customerId);
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

            return _dalManager.DalCustomers.DeleteInactiveCustomers(months);
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
            var newCustomer = _mapper.Map<Customer>(blSignUpCustomer);

            return _dalManager.DalCustomers.UpdateCustomer(newCustomer);
        }

    }
}
