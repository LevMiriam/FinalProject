using Bl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Dal.models;


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
		[HttpPost]
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



	}
}
