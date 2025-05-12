using Bl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dal.models;
using Bl.Api;
using Bl.Models;


namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        public readonly IBlManager _blManager;
		public CustomersController(IBlManager blManager)
		{
			_blManager = blManager;
		}


		[HttpPost("signup")]
		public IActionResult SignUp([FromBody] BlSignUpCustomer customer)
		{
			bool success = _blManager.BlCustomers.SignUp(customer);
			return success ? Ok("Registered successfully") : BadRequest("Registration failed");
		}

	
		[HttpPost("login")]
		public IActionResult LogIn([FromBody] int id)
		{
			var customer = _blManager.BlCustomers.LogIn(id);

			if (customer != null)
			{
				return Ok($"Welcome {customer.Name}!");
			}
			else
			{
				return StatusCode(299, "Customer not found. Please sign up");
			}
		}


		[HttpPost("AddCustomer")]
		public IActionResult AddCustomer(Customer customer)
		{
			if (ModelState.IsValid)
			{
				bool succsses= _blManager.BlCustomers.AddNewCustomer(customer);
				if (succsses) 
					return Ok("The customer added succssesfully");
				ModelState.AddModelError(" ", "The customer can't added.");
			}
			return Ok($"Invalid details");
		}

        [HttpGet]
        public IActionResult GetAllCustomers()
        {
            return Ok(_blManager.BlCustomers.GetAllCustomers());
        }

        [HttpDelete("DeleteCustomerById")]
		public IActionResult DeleteCustomerById(int id)
		{
			return _blManager.BlCustomers.DeleteCustomerById(id)
				? Ok("The customer deleted successfully.")
				: BadRequest("The delete failed.");
		}

	

        [HttpDelete("delete-inactive/{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            int monthsWithoutRentals = 18;
            bool success = _blManager.BlCustomers.DeleteCustomerIfInactive(id, monthsWithoutRentals);
            if (success)
            {
                return Ok($"Customer with ID {id} was deleted due to inactivity.");
            }

            return NotFound($"Customer with ID {id} was not found or is still active.");
        }

        [HttpDelete("delete-inactive")]
        public IActionResult DeleteInactiveCustomers([FromQuery] int months)
        {
            if (months <= 0)
            {
                return BadRequest("Months must be greater than 0.");
            }

            int deletedCount = _blManager.BlCustomers.DeleteInactiveCustomers(months);
            if (deletedCount > 0)
            {
                return Ok($"{deletedCount} inactive customers were deleted.");
            }


            return NoContent();
        }

        [HttpPut("updateCustomer/{id}")]
        public IActionResult UpdateCustomer(int id, [FromBody] BlSignUpCustomer updatedCustomer)
        {
            if (updatedCustomer == null)
            {
                return BadRequest("The updatedCustomer field is required.");
            }

            if (id != updatedCustomer.Id)
            {
                return BadRequest("Customer ID mismatch.");
            }

            try
            {
                bool success = _blManager.BlCustomers.UpdateCustomerDetails(updatedCustomer);
                if (success)
                {
                    return Ok("Customer details updated successfully.");
                }

                return NotFound("Customer not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
