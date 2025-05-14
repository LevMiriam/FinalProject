using Dal.Api;
using Dal;

using System;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Services
{
    public class DalCustomersService : IDalCustomers
    {
        private readonly dbClass _context;
        public DalCustomersService(dbClass context)
        {
            _context = context;
        }
        public void SignUp(Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
        }

        public Customer LogIn(int id)
        {
            var cus = _context.Customers.FirstOrDefault(c => c.Id == id);
            return cus;
        }

        //public Customer IsCustomer(int id)
        //{
        //	var customer = _context.Customers.FirstOrDefault(c => c.Id == id);
        //	return customer;
        //}

        public bool AddCustomer(Customer customer)
        {
            _context.Customers.Add(customer);
            int result = _context.SaveChanges();
            return result > 0;
        }
        public List<Customer> GetAllCustomers()
        {
            return _context.Customers.ToList();
        }

        public bool DeleteCustomerById(int id)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Id == id);
            _context.Customers.Remove(customer);
            int result = _context.SaveChanges();
            return result > 0;
        }

        public bool HasRentalsInLastMonths(int customerId, int months)
        {
            try
            {
                var cutoffDate = DateTime.Now.AddMonths(-months);



                bool a = _context.Rentals
                     .Any(r => r.CustomerId == customerId && r.ReturnDate < DateOnly.FromDateTime(cutoffDate));
                return a;
            }
            catch (Exception ex)
            {

                Console.WriteLine($"Error checking rentals: {ex.Message}");
                return false;
            }
        }

        public bool DeleteCustomer(int customerId)
        {
            try
            {
                var customer = _context.Customers.FirstOrDefault(c => c.Id == customerId);
                if (customer == null)
                {
                    Console.WriteLine($"Customer with ID {customerId} not found.");
                    return false;
                }
                customer = _context.Customers.Include(c => c.Rentals)
                                  .FirstOrDefault(c => c.Id == customerId);
                if (customer == null)
                {
                    Console.WriteLine($"Customer with ID {customerId} not found.");
                    return false;
                }

                _context.Rentals.RemoveRange(customer.Rentals);

                _context.Customers.Remove(customer);

                return _context.SaveChanges() > 0;

            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine($"Database error while deleting customer: {dbEx.Message}");
                if (dbEx.InnerException != null)
                {
                    Console.WriteLine($"Inner exception: {dbEx.InnerException.Message}");
                }
                return false;
            }

            catch (Exception ex)
            {
                Console.WriteLine($"Error deleting customer: {ex.Message}");
                return false;
            }
        }



        public int DeleteInactiveCustomers(int months)
        {
            try
            {
                var cutoffDate = DateTime.Now.AddMonths(-months);
                var inactiveCustomers = _context.Customers
                    .Where(c => !c.Rentals.Any(r => r.RentalDate > DateOnly.FromDateTime(cutoffDate)))
                    .ToList();

                if (!inactiveCustomers.Any())
                {
                    Console.WriteLine("No inactive customers found for deletion.");
                    return 0;
                }

                foreach (var customer in inactiveCustomers)
                {
                    var rentalsToDelete = _context.Rentals.Where(r => r.CustomerId == customer.Id).ToList();
                    if (rentalsToDelete.Any())
                    {
                        _context.Rentals.RemoveRange(rentalsToDelete);
                        Console.WriteLine($"Deleted {rentalsToDelete.Count} rentals for customer {customer.Id}");
                    }
                }

                _context.Customers.RemoveRange(inactiveCustomers);
                int result = _context.SaveChanges();
                Console.WriteLine($"{result} Records deleted from the database.");
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during batch deletion: {ex.Message}");
                return 0;
            }
        }

        public bool UpdateCustomer(Customer customer)
        {
            try
            {
                var existingCustomer = _context.Customers.Find(customer.Id);
                if (existingCustomer == null)
                {
                    Console.WriteLine($"Customer with ID {customer.Id} not found.");
                    return false;
                }

                existingCustomer.Name = customer.Name;
                existingCustomer.Phone = customer.Phone;
                existingCustomer.Email = customer.Email;
                existingCustomer.DriverLicenseNumber = customer.DriverLicenseNumber;

                return _context.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error updating customer: {ex.Message}");
                return false;
            }
        }
    }
}
