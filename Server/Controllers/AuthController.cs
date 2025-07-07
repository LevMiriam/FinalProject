using Bl.Models;
using Bl;
using Bl.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IBlManager _blManager;
        public AuthController(IBlManager blManager)
        {
            _blManager = blManager;
        }

        [HttpPost("signup")]
        public IActionResult SignUp([FromBody] BlSignUpCustomer customer)
        {
            bool userExists = _blManager.BlCustomers.UserExists(customer.Name);
            if (userExists)
                return BadRequest("User already exists");
            if (string.IsNullOrWhiteSpace(customer.Role))
            {
                customer.Role = "User"; 
            }
            bool success = _blManager.BlCustomers.SignUp(customer);

            if (!success)
                return BadRequest("Registration failed");

            return Ok($"Hello {customer.Name}!!");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] int id, [FromServices] JwtService jwtService)
        {
            var customer = _blManager.BlCustomers.LogIn(id);
            if (customer == null)
                return Unauthorized("User not found");

            var token = jwtService.GenerateToken(customer.Id, customer.Role, customer.Name);
            return Ok(new { token });
        }

    }
}
